import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "../../config/axios";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { CategorySchema } from "../../schemas/category.schema";
import CategoriesTable from "./categories.table";
import PageHeading from "../../components/page.heading";

const Categories = () => {
  const auth = useAuth();
  const [categories, setCategories] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: joiResolver(CategorySchema, {
      errors: { wrap: { label: "", array: "" } },
      abortEarly: false,
    }),
  });

  useEffect(() => {
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
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/categories`, data)
      .then(({ data }) => {
        toast.success(data.message);
        setCategories((prev) => [...prev, data.category]);
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
          <PageHeading text="Categories - Ropstam Solutions" />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-xl mx-auto flex mb-12"
          >
            <div className="grow mr-4">
              <input
                type="text"
                placeholder="Category Name"
                {...register("name")}
                className={`appearance-none w-full p-2 rounded font-light placeholder-gray-500 text-gray-900 focus:outline-none ring-2 ring-gray-300 focus:ring-indigo-500 ${
                  errors.name ? "ring-red-500 focus:ring-red-500" : ""
                }`}
                autoComplete="false"
              />
              {errors.name && (
                <p className="font-light mt-2 text-red-500 text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="submit"
                value={"Create"}
                className="block rounded w-max py-2 px-8 mx-auto cursor-pointer focus:outline-none text-indigo-500 hover:text-white focus:text-white ring-2 ring-indigo-500 focus:bg-indigo-500 hover:bg-indigo-500  "
              />
            </div>
          </form>

          <div>
            <CategoriesTable data={categories} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
