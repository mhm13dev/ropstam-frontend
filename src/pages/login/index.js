import React from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import axios from "../../config/axios";
import { useAuth } from "../../context/auth";
import { LoginSchema } from "../../schemas/user.schema";
import { toast } from "react-toastify";

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(LoginSchema, {
      errors: { wrap: { label: "", array: "" } },
      abortEarly: false,
    }),
  });

  function onSubmit(data) {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/login`, data)
      .then(({ data }) => {
        auth.setJwt(data.jwt);
        auth.setUser(data.user);
        toast.success(data.message);
        navigate("/dashboard");
      })
      .catch((err) => {
        if (err.constructor.name === "AxiosError" && err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Something Went Wrong");
        }
      });
  }

  if (auth.userLoading === "loaded" && auth.user) {
    return <Navigate to={"/dashboard"} replace />;
  }

  return (
    <div className="app-container">
      <div className="min-h-screen grid items-center p-4">
        <div className="max-w-xl w-full bg-white shadow mx-auto rounded-md p-8">
          <h1 className="text-2xl font-semibold text-center mb-8 text-indigo-500">
            Ropstam Solutions
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className={`appearance-none w-full p-2 rounded font-light placeholder-gray-500 text-gray-900 focus:outline-none ring-2 ring-gray-300 focus:ring-indigo-500 ${
                  errors.email ? "ring-red-500 focus:ring-red-500" : ""
                }`}
                autoComplete="false"
              />
              {errors.email && (
                <p className="font-light mt-2 text-red-500 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className={`appearance-none w-full p-2 rounded font-light placeholder-gray-500 text-gray-900 focus:outline-none ring-2 ring-gray-300 focus:ring-indigo-500 ${
                  errors.password ? "ring-red-500 focus:ring-red-500" : ""
                }`}
                autoComplete="false"
              />
              {errors.password && (
                <p className="font-light mt-2 text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="submit"
                value={"Login"}
                className="block rounded w-max py-2 px-8 mx-auto cursor-pointer focus:outline-none text-indigo-500 hover:text-white focus:text-white ring-2 ring-indigo-500 focus:bg-indigo-500 hover:bg-indigo-500  "
              />
            </div>
          </form>

          <div className="mt-4 font-light text-center">
            Don't have an account?{" "}
            <Link
              to={"/signup"}
              className="font-normal text-indigo-500 underline"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
