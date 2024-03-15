// @ts-nocheck
import React, { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../../utilities/PostAPI";
import { setLoginStatus } from "../../utilities/AuthCheck";
import { useFormik } from "formik";
import { error_toaster, success_toaster } from "../../utilities/Toaster";
import { loginSchema } from "../../schemas/index";
import { MiniLoaderTwo } from "../../components/Loader";
import { errorStyle } from "../../utilities/Input";

export default function Login() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [rememberMe, setRememberMe] = useState(
    localStorage.getItem("rememberMe") || false
  );

  const initialValues = {
    email: localStorage.getItem("rememberedEmail") || "",
    password: localStorage.getItem("rememberedPassword") || "",
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, action) => {
      let res = await loginAPI("admin/auth/login", {
        email: values.email,
        password: values.password,
        dvToken: "182378xnp9d0s83u21809xhddchn08132cdxu89s0m3n",
      });
      console.log("🚀 ~ onSubmit: ~ res:", res);

      if (res?.data?.status === "1") {
        setLoader(false);
        localStorage.setItem("loginStatus", true);
        localStorage.setItem("accessToken", res?.data?.data?.accessToken);
        localStorage.setItem("userId", res?.data?.data?.userId);
        localStorage.setItem("userEmail", res?.data?.data?.email);
        localStorage.setItem("userJoinedOn", res?.data?.data?.joinOn);
        localStorage.setItem("userPhoneNo", res?.data?.data?.phoneNum);
        localStorage.setItem(
          "userName",
          `${res?.data?.data?.firstName} ${res?.data?.data?.lastName}`
        );
        localStorage.setItem("rememberMe", rememberMe);
        setLoginStatus(true);
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", values.email);
          localStorage.setItem("rememberedPassword", values.password);
        } else {
          localStorage.removeItem("rememberedEmail");
          localStorage.removeItem("rememberedPassword");
          localStorage.removeItem("rememberMe");
        }
        navigate("/");
        success_toaster("Login Successfully");
      } else {
        setLoader(false);
        error_toaster("Error");
      }
      action.resetForm();
    },
  });

  const handleCancel = () => {
    resetForm();
  };

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <section className="bg-themeBlue min-h-screen flex justify-center items-center relative overflow-hidden">
      <div>
        <img
          src="/images/angle-right.webp"
          alt="angle"
          className="w-96 absolute top-0 left-0 hidden md:block"
        />
        <img
          src="/images/angle-left.webp"
          alt="angle"
          className="w-80 absolute top-0 right-0 hidden md:block"
        />
        <img
          src="/images/angle-up.webp"
          alt="angle"
          className="w-[800px] absolute bottom-0 left-0 hidden md:block"
        />
      </div>

      {loader ? (
        <MiniLoaderTwo />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white px-8 py-12 rounded-xl space-y-4 w-[500px] relative z-50"
        >
          <div className={errors.email && touched.email && errorStyle}>
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="email"
                className="text-labelColor font-medium font-futura"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="border border-inputBorder rounded-md outline-none px-3 py-2"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email && (
                <div className="text-red-500">
                  <p>{errors.email}</p>
                </div>
              )}
            </div>
          </div>

          <div className={errors.email && touched.email && errorStyle}>
            <div className="flex flex-col gap-y-2 relative">
              <label
                htmlFor="password"
                className="text-labelColor font-medium font-futura"
              >
                Password
              </label>
              <input
                type={visible ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="border border-inputBorder rounded-md outline-none px-3 py-2"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <button
                onClick={() => setVisible(!visible)}
                type="button"
                className="text-labelColor absolute right-4 top-10"
              >
                {visible ? (
                  <AiOutlineEye size={24} />
                ) : (
                  <AiOutlineEyeInvisible size={24} />
                )}
              </button>

              {errors.password && touched.password && (
                <div className="text-red-600">
                  <p>{errors.password}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-x-2 items-center">
            <input
              type="checkbox"
              id="rememberMe"
              className="w-4 h-4"
              checked={rememberMe}
              onChange={handleRememberMe}
            />
            <label htmlFor="rememberMe" className="font-workSans font-medium">
              Remember Me
            </label>
          </div>

          <div className="flex justify-end gap-x-2">
            {/* <button
              className="bg-transparent text-theme font-semibold px-6 py-2 rounded-md border border-theme hover:text-white hover:bg-theme duration-200"
              onClick={handleCancel}
            >
              Cancel
            </button> */}
            <button
              className="bg-theme text-white font-semibold px-6 py-2 rounded-md border border-theme hover:text-theme hover:bg-transparent duration-200"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
