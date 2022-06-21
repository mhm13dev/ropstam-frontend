import { useParams, Navigate, useNavigate } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";
import axios from "../../config/axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/auth";
import { CategorySchema } from "../../schemas/category.schema";
import { toast } from "react-toastify";

const SingleCategory = () => {
  const auth = useAuth();
  const params = useParams();
  const navigate = useNavigate();

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
      .get(`${process.env.REACT_APP_SERVER_URL}/api/categories/${params.id}`)
      .then(({ data }) => {
        reset({ name: data.category.name });
      })
      .catch((err) => {
        if (err.constructor.name === "AxiosError" && err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Something Went Wrong");
        }
      });
  }, [params.id, reset]);

  function onSubmit(data) {
    axios
      .patch(
        `${process.env.REACT_APP_SERVER_URL}/api/categories/${params.id}`,
        data
      )
      .then(({ data }) => {
        toast.success(data.message);
        reset({ name: data.category.name });
      })
      .catch((err) => {
        if (err.constructor.name === "AxiosError" && err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Something Went Wrong");
        }
      });
  }

  function deleteCategory() {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/api/categories/${params.id}`)
      .then(({ data }) => {
        toast.success(data.message);
        navigate("/categories");
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
            Categories - Ropstam Solutions
          </h1>

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
            <div className="mr-4">
              <input
                type="submit"
                value={"Update"}
                className="block rounded w-max py-2 px-8 mx-auto cursor-pointer focus:outline-none text-indigo-500 hover:text-white focus:text-white ring-2 ring-indigo-500 focus:bg-indigo-500 hover:bg-indigo-500  "
              />
            </div>
            <div>
              <input
                type="button"
                value={"Delete"}
                className="block rounded w-max py-2 px-8 mx-auto cursor-pointer focus:outline-none text-red-500 hover:text-white focus:text-white ring-2 ring-red-500 focus:bg-red-500 hover:bg-red-500  "
                onClick={deleteCategory}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingleCategory;
