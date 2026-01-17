import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Stores from "./pages/Stores.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import OwnerDashboard from "./pages/OwnerDashboard.jsx";
import AdminAddUser from "./pages/AdminAddUser.jsx";
import AdminAddStore from "./pages/AdminAddStore.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Navbar from "./components/Navbar.jsx";
import MyRatings from "./pages/MyRatings.jsx";
import ChangePassword from "./components/ChangePassword.jsx";
import AdminStores from "./pages/AdminStores.jsx";
import AdminUsers from "./pages/AdminUsers.jsx";

const AppLayout = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {user && !hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-user"
          element={
            <ProtectedRoute>
              <AdminAddUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-store"
          element={
            <ProtectedRoute>
              <AdminAddStore />
            </ProtectedRoute>
          }
        />

        
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/stores"
          element={
            <ProtectedRoute>
              <Stores />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/ratings"
          element={
            <ProtectedRoute>
              <MyRatings />
            </ProtectedRoute>
          }
        />

    
        <Route
          path="/owner"
          element={
            <ProtectedRoute>
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
  path="/change-password"
  element={
    <ProtectedRoute>
      <ChangePassword />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/stores"
  element={
    <ProtectedRoute>
      <AdminStores />
    </ProtectedRoute>
  }
/>


        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
};



function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
