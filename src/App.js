import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "./config/axios";
import { useAuth } from "./context/auth";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import Categories from "./pages/categories";
import SingleCategory from "./pages/single.category";
import Cars from "./pages/cars";
import SingleCar from "./pages/single.car";
import Spinner from "./components/spinner";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  const auth = useAuth();

  useEffect(() => {
    auth.setUserLoading("loading");
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/me`)
      .then(({ data }) => {
        auth.setUser(data.user);
        auth.setUserLoading("loaded");
      })
      .catch(() => {
        auth.setUser(null);
        auth.setJwt("logged_out");
        auth.setUserLoading("loaded");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (auth.userLoading === "loading") {
    return <Spinner className="my-8" />;
  }

  return (
    <>
      <ToastContainer
        position="bottom-right"
        hideProgressBar={true}
        theme="light"
        transition={Slide}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:id" element={<SingleCategory />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/cars/:id" element={<SingleCar />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
