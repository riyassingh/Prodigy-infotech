import React, { useState, useEffect, createContext, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import DashBoard from "./Pages/DashBoard";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Products from "./Pages/Products";
import AddProducts from "./Pages/Products/addProducts";
import AddCategory from "./Pages/AddCategory/addCategory";
import SubCategory from "./Pages/AddCategory/SubCategory";
import Users from "./Pages/Users/users";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import Verify from "./Pages/Verify";
import VerifyEmail from "./Pages/verify1";
import MyAccount from "./Pages/myAccount/index";

import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import AdminCategoryManager from "./Pages/categoryList";
import ProductList from "./Pages/productList/productlist";
import ProductUploader from "./Pages/Products/addProducts";

// Create Contexts
const DialogContext = createContext();
export const AuthContext = createContext();

// Slide Transition for Fullscreen Dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Main App Component
function App() {
  return (
    <Router>
      <AuthProvider>
        <DialogProvider>
          <AppContent />
        </DialogProvider>
      </AuthProvider>
    </Router>
  );
}

// ✅ Auth Provider (Manages admin login state)
export function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(() => {
    const storedUser = localStorage.getItem("adminInfo");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchAdminProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch admin profile");
        }

        const data = await res.json();
        setUserInfo(data);
        localStorage.setItem("adminInfo", JSON.stringify(data));
        setIsLogin(true);
      } catch (error) {
        console.error("Auto-login error:", error.message);
        setIsLogin(false);
        setUserInfo(null);
        localStorage.removeItem("adminInfo");
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchAdminProfile();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin, userInfo, setUserInfo, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// ✅ Dialog Provider (Global dialog box)
function DialogProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);
  const [dialogTitle, setDialogTitle] = useState("Dialog");

  const openDialog = (content, title = "Dialog") => {
    setDialogContent(content);
    setDialogTitle(title);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setDialogContent(null);
  };

  return (
    <DialogContext.Provider value={{ open, openDialog, closeDialog }}>
      {children}
      <GlobalDialog content={dialogContent} title={dialogTitle} />
    </DialogContext.Provider>
  );
}

// ✅ Layout Wrapper: Header + Sidebar + Main Routes
function AppContent() {
  const location = useLocation();
  const { isLogin, loading } = useContext(AuthContext);

  const hideSidebar =
    ["/login", "/signup", "/forgotpassword"].some((p) =>
      location.pathname.toLowerCase().startsWith(p)
    ) || location.pathname.startsWith("/verify");

  // ⏳ Wait for loading to complete
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="flex">
        {!hideSidebar && (
          <div className="w-[20%]">
            <Sidebar />
          </div>
        )}
        <main className={`pl-${hideSidebar ? "0" : "72"} mt-24 w-full`}>
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/products" element={<Products />} />
            <Route path="/addcategory" element={<AddCategory />} />
            <Route path="/subcategory" element={<SubCategory />} />
            <Route path="/users" element={<Users />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/productUpload" element={<ProductUploader/>} />
            <Route path="/admin/verify/:token" element={<VerifyEmail />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/myaccount" element={<MyAccount />} />
            <Route path="/products/add" element={<AddProducts />} />
            <Route path="/categoryList" element={<AdminCategoryManager />} />
            <Route path="/productList" element={<ProductList />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

// ✅ Global Dialog Component
function GlobalDialog({ content, title }) {
  const { open, closeDialog } = useContext(DialogContext);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={closeDialog}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }} className="!bg-gray-100 shadow-md">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={closeDialog}>
            <CloseIcon className="text-black" />
          </IconButton>
          <Typography
            sx={{ ml: 2, flex: 1 }}
            variant="h6"
            component="div"
            className="text-black font-semibold"
          >
            {title}
          </Typography>
          <Button
            autoFocus
            color="inherit"
            onClick={closeDialog}
            className="!text-black hover:text-gray-200"
          >
            Close
          </Button>
        </Toolbar>
      </AppBar>
      <div className="p-6">{content}</div>
    </Dialog>
  );
}

export { DialogContext };
export default App;
