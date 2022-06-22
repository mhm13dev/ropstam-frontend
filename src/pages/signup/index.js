import React from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import axios from "../../config/axios";
import { useAuth } from "../../context/auth";
import { SignupSchema } from "../../schemas/user.schema";
import { toast } from "react-toastify";
import PageHeading from "../../components/page.heading";

const Signup = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(SignupSchema, {
      errors: { wrap: { label: "", array: "" } },
      abortEarly: false,
    }),
  });

  function onSubmit(data) {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/signup`, data)
      .then(({ data }) => {
        toast.success(data.message);
        navigate("/");
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
          <PageHeading text="Ropstam Solutions" />
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="appearance-none w-full p-2 rounded font-light placeholder-gray-500 text-gray-900 focus:outline-none ring-2 ring-gray-300 focus:ring-indigo-500"
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
                type="submit"
                value={"Signup"}
                className="block rounded w-max py-2 px-8 mx-auto cursor-pointer focus:outline-none text-indigo-500 hover:text-white focus:text-white ring-2 ring-indigo-500 focus:bg-indigo-500 hover:bg-indigo-500  "
              />
            </div>
          </form>

          <div className="mt-4 font-light text-center">
            Already have an account?{" "}
            <Link to={"/"} className="font-normal text-indigo-500 underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
