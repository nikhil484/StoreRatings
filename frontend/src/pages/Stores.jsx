// import { useEffect, useState } from "react";
// import api from "../services/api.js";
// import { FaStar } from "react-icons/fa";

// const Stores = () => {
//   const [stores, setStores] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [search, setSearch] = useState("");
//   const [sortBy, setSortBy] = useState("name");
//   const [order, setOrder] = useState("asc");

//   const user = JSON.parse(localStorage.getItem("user"));

//   const fetchStores = async () => {
//     try {
//       const res = await api.get(
//         `/stores?userId=${user.id}&search=${search}&sortBy=${sortBy}&order=${order}`
//       );
//       setStores(res.data);
//     } catch (error) {
//       console.error("Failed to fetch stores");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStores();
//   }, [search, sortBy, order]);

//   const submitRating = async (storeId, rating) => {
//     try {
//       await api.post("/ratings", {
//         user_id: user.id,
//         store_id: storeId,
//         rating: Number(rating),
//       });

//       fetchStores();
//     } catch {
//       alert("Failed to submit rating");
//     }
//   };

//   if (loading) {
//     return <p className="p-6 text-gray-600">Loading stores...</p>;
//   }

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
   
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold">Explore Stores</h1>
//         <p className="text-gray-600">
//           Browse stores and submit your ratings
//         </p>
//       </div>

    
//       <div className="bg-white p-4 rounded-lg shadow mb-8 flex flex-col md:flex-row gap-4">
//         <input
//           type="text"
//           placeholder="Search by store name or address"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border rounded-md px-3 py-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         <select
//           value={sortBy}
//           onChange={(e) => setSortBy(e.target.value)}
//           className="border rounded-md px-3 py-2"
//         >
//           <option value="name">Sort by Name</option>
//           <option value="rating">Sort by Rating</option>
//         </select>

//         <select
//           value={order}
//           onChange={(e) => setOrder(e.target.value)}
//           className="border rounded-md px-3 py-2"
//         >
//           <option value="asc">Ascending</option>
//           <option value="desc">Descending</option>
//         </select>
//       </div>

    
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {stores.map((store) => (
//           <div
//             key={store.id}
//             className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
//           >
//             <h2 className="text-xl font-semibold mb-1">{store.name}</h2>
//             <p className="text-sm text-gray-600 mb-3">{store.address}</p>

        
//             <div className="flex items-center gap-2 mb-2">
//               <FaStar className="text-yellow-400" />
//               <span className="font-medium">
//                 {store.avg_rating ?? "No ratings yet"}
//               </span>
//               <span className="text-sm text-gray-500">
//                 (avg rating)
//               </span>
//             </div>

        
//             <div className="text-sm mb-4">
//               Your Rating:{" "}
//               <span className="font-semibold">
//                 {store.user_rating ?? "Not rated yet"}
//               </span>
//             </div>

            
//             <select
//               value={store.user_rating ?? ""}
//               onChange={(e) => submitRating(store.id, e.target.value)}
//               className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="" disabled>
//                 {store.user_rating ? "Update your rating" : "Rate this store"}
//               </option>
//               {[1, 2, 3, 4, 5].map((r) => (
//                 <option key={r} value={r}>
//                   {r} Star{r > 1 && "s"}
//                 </option>
//               ))}
//             </select>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Stores;


import { useEffect, useState } from "react";
import api from "../services/api.js";
import { FaStar } from "react-icons/fa";

const Stores = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");

  const fetchStores = async () => {
    try {
      const userStr = localStorage.getItem("user");
      console.log("User from localStorage:", userStr);
      
      if (!userStr) {
        console.error("No user found in localStorage");
        setLoading(false);
        return;
      }
      
      const user = JSON.parse(userStr);
      console.log("Parsed user:", user);
      
      const url = `/stores?userId=${user.id}&search=${search}&sortBy=${sortBy}&order=${order}`;
      console.log("Fetching from URL:", url);
      
      const res = await api.get(url);
      console.log("API Response:", res);
      console.log("Stores data:", res.data);
      
      setStores(res.data);
    } catch (error) {
      console.error("Failed to fetch stores:", error);
      console.error("Error details:", error.response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, [search, sortBy, order]);

  const submitRating = async (storeId, rating) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await api.post("/ratings", {
        user_id: user.id,
        store_id: storeId,
        rating: Number(rating),
      });

      fetchStores();
    } catch {
      alert("Failed to submit rating");
    }
  };

  if (loading) {
    return <p className="p-6 text-gray-600">Loading stores...</p>;
  }

  if (stores.length === 0) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Explore Stores</h1>
        <p className="text-gray-600">No stores found. Check console for details.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Explore Stores</h1>
        <p className="text-gray-600">
          Browse stores and submit your ratings
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-8 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by store name or address"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-md px-3 py-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded-md px-3 py-2"
        >
          <option value="name">Sort by Name</option>
          <option value="rating">Sort by Rating</option>
        </select>

        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className="border rounded-md px-3 py-2"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map((store) => (
          <div
            key={store.id}
            className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-1">{store.name}</h2>
            <p className="text-sm text-gray-600 mb-3">{store.address}</p>

            <div className="flex items-center gap-2 mb-2">
              <FaStar className="text-yellow-400" />
              <span className="font-medium">
                {store.avg_rating ?? "No ratings yet"}
              </span>
              <span className="text-sm text-gray-500">
                (avg rating)
              </span>
            </div>

            <div className="text-sm mb-4">
              Your Rating:{" "}
              <span className="font-semibold">
                {store.user_rating ?? "Not rated yet"}
              </span>
            </div>

            <select
              value={store.user_rating ?? ""}
              onChange={(e) => submitRating(store.id, e.target.value)}
              className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                {store.user_rating ? "Update your rating" : "Rate this store"}
              </option>
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r} Star{r > 1 && "s"}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stores;