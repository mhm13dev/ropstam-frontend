import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "../../config/axios";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import CarsTable from "./cars.table";
import { NewCarSchema } from "../../schemas/car.schema";

const Cars = () => {
  const auth = useAuth();
  const [cars, setCars] = useState([]);
  const [categories, setCategories] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: joiResolver(NewCarSchema, {
      errors: { wrap: { label: "", array: "" } },
      abortEarly: false,
    }),
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/cars`)
      .then(({ data }) => {
        setCars(data.cars);
      })
      .catch((err) => {
        if (err.constructor.name === "AxiosError" && err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Something Went Wrong");
        }
      });
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/categories`)
      .then(({ data }) => {
        setCategories(data.categories);
      })
      .catch((err) => {
        if (err.constructor.name === "AxiosError" && err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Something Went Wrong");
        }
      });
  }, []);

  function onSubmit(data) {
    console.log(data);
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/cars`, data)
      .then(({ data }) => {
        toast.success(data.message);
        setCars((prev) => [...prev, data.car]);
        reset();
      })
      .catch((err) => {
        if (err.constructor.name === "AxiosError" && err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Something Went Wrong");
        }
      });
  }

  if (auth.userLoading === "loaded" && !auth.user) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <div className="app-container">
      <div className="min-h-screen p-4">
        <div className="w-full bg-white shadow mx-auto rounded-md p-8">
          <h1 className="text-2xl font-semibold text-center mb-12 text-indigo-500">
            Cars - Ropstam Solutions
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-xl mx-auto mb-12 space-y-4"
          >
            <div>
              <input
                type="text"
                placeholder="Car Model"
                {...register("model")}
                className={`appearance-none w-full p-2 rounded font-light placeholder-gray-500 text-gray-900 focus:outline-none ring-2 ring-gray-300 focus:ring-indigo-500 ${
                  errors.model ? "ring-red-500 focus:ring-red-500" : ""
                }`}
                autoComplete="false"
              />
              {errors.model && (
                <p className="font-light mt-2 text-red-500 text-sm">
                  {errors.model.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Make"
                {...register("make")}
                className={`appearance-none w-full p-2 rounded font-light placeholder-gray-500 text-gray-900 focus:outline-none ring-2 ring-gray-300 focus:ring-indigo-500 ${
                  errors.make ? "ring-red-500 focus:ring-red-500" : ""
                }`}
                autoComplete="false"
              />
              {errors.make && (
                <p className="font-light mt-2 text-red-500 text-sm">
                  {errors.make.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Color"
                {...register("color")}
                className={`appearance-none w-full p-2 rounded font-light placeholder-gray-500 text-gray-900 focus:outline-none ring-2 ring-gray-300 focus:ring-indigo-500 ${
                  errors.color ? "ring-red-500 focus:ring-red-500" : ""
                }`}
                autoComplete="false"
              />
              {errors.color && (
                <p className="font-light mt-2 text-red-500 text-sm">
                  {errors.color.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Registration Number"
                {...register("reg_num")}
                className={`appearance-none w-full p-2 rounded font-light placeholder-gray-500 text-gray-900 focus:outline-none ring-2 ring-gray-300 focus:ring-indigo-500 ${
                  errors.reg_num ? "ring-red-500 focus:ring-red-500" : ""
                }`}
                autoComplete="false"
              />
              {errors.reg_num && (
                <p className="font-light mt-2 text-red-500 text-sm">
                  {errors.reg_num.message}
                </p>
              )}
            </div>
            <div>
              <select
                {...register("category_id")}
                className={`w-full p-2 rounded font-light placeholder-gray-500 text-gray-900 focus:outline-none ring-2 ring-gray-300 focus:ring-indigo-500 ${
                  errors.category_id ? "ring-red-500 focus:ring-red-500" : ""
                }`}
              >
                <option value="choose">Choose</option>
                {categories.map((category) => {
                  return (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
              {errors.category_id && (
                <p className="font-light mt-2 text-red-500 text-sm">
                  {errors.category_id.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="submit"
                value={"Create Car"}
                className="block rounded w-max py-2 px-8 mx-auto cursor-pointer focus:outline-none text-indigo-500 hover:text-white focus:text-white ring-2 ring-indigo-500 focus:bg-indigo-500 hover:bg-indigo-500  "
              />
            </div>
          </form>

          <div>
            <CarsTable data={cars} categories={categories} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cars;
