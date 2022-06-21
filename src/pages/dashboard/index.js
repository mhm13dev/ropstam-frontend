import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "../../config/axios";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";

const Dashboard = () => {
  const auth = useAuth();
  const [carsCount, setCarsCount] = useState("-");
  const [categoriesCount, setCategoriesCount] = useState("-");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/cars/count`)
      .then(({ data }) => {
        setCarsCount(data.carsCount);
      })
      .catch((err) => {
        if (err.constructor.name === "AxiosError" && err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Something Went Wrong");
        }
      });

    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/categories/count`)
      .then(({ data }) => {
        setCategoriesCount(data.categoriesCount);
      })
      .catch((err) => {
        if (err.constructor.name === "AxiosError" && err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Something Went Wrong");
        }
      });
  }, []);

  if (auth.userLoading === "loaded" && !auth.user) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <div className="app-container">
      <div className="min-h-screen p-4">
        <div className="w-full bg-white shadow mx-auto rounded-md p-8">
          <h1 className="text-2xl font-semibold text-center mb-12 text-indigo-500">
            Dashboard - Ropstam Solutions
          </h1>

          <div className="space-y-12">
            <div className="border-2 border-indigo-500 p-8 max-w-sm mx-auto text-center rounded-md space-y-4">
              <p className="text-lg">Total Registered Cars:</p>
              <p className="text-4xl font-bold">{carsCount}</p>
              <Link
                to={"/cars"}
                className="block text-white bg-indigo-500 focus:bg-opacity-80 hover:bg-opacity-80 transition rounded-md w-max mx-auto py-2 px-4 focus:outline-none"
              >
                All Cars
              </Link>
            </div>

            <div className="border-2 border-indigo-500 p-8 max-w-sm mx-auto text-center rounded-md space-y-4">
              <p className="text-lg">Total Categories:</p>
              <p className="text-4xl font-bold">{categoriesCount}</p>
              <Link
                to={"/categories"}
                className="block text-white bg-indigo-500 focus:bg-opacity-80 hover:bg-opacity-80 transition rounded-md w-max mx-auto py-2 px-4 focus:outline-none"
              >
                All Categories
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
