import { ArrowRight, Eye, EyeClosed } from "lucide-react";
import { useState, useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import Footer from "../../components/Footer";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signInThunk, clearError } from "../../redux/slices/userSlice";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isPending, error } = useSelector((state) => state.userState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (dataInput) => {
    try {
      await dispatch(signInThunk(dataInput)).unwrap();
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <>
      <section className="h-screen flex justify-center items-center font-sans bg-primary">
        <div className="grid gap-8 w-screen md:w-110 mx-7">
          <h1 className="text-2xl font-black text-center">ShortLink</h1>
          <form
            className="rounded-lg border-gray-300 grid gap-4 px-8 py-8 bg-white shadow-md"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <p className="text-2xl md:text-xl font-semibold">Welcome Back</p>
              <p className="text-sm md:text-xs">
                Please enter your details to sign in
              </p>
            </div>
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
            <div className="grid gap-5">
              <div className="grid gap-2">
                <label htmlFor="email" className="font-medium text-sm ">
                  Email Address
                </label>
                <div>
                  <input
                    type="email"
                    {...register("email", { required: "email is required" })}
                    id="email"
                    placeholder="name@gmail.com"
                    className="rounded-lg w-full border py-2.5 px-4 md:py-2 md:px-3"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex justify-between">
                  <label htmlFor="password" className="font-medium text-sm ">
                    Password
                  </label>
                  <Link className="text-blue-600 font-bold text-sm md:text-xs hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "password is required",
                    })}
                    id="password"
                    placeholder="••••••••"
                    className="rounded-lg border py-2.5 px-4 w-full md:py-2 md:px-3"
                  />
                  {showPassword ? (
                    <Eye
                      className="absolute top-2.5 right-5 cursor-pointer"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <EyeClosed
                      className="absolute top-2.5 right-5 cursor-pointer "
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                  {errors.password && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                disabled={isPending}
                className="rounded-lg flex justify-center items-center gap-2 font-semibold text-lg md:text-sm lg:py-1 bg-blue-600 text-white py-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "Logging In..." : "Log In"} <ArrowRight className="md:w-5" />
              </button>
              <p className="font-semibold text-xs text-center text-gray-400">
                OR CONTINUE WITH
              </p>
              <button className="flex text-sm gap-4 justify-center items-center font-medium cursor-pointer">
                <FaGoogle />
                Sign In With Google
              </button>
            </div>
          </form>
          <p className="text-center text-xs text-slate-600">
            Dont have an account?{" "}
            <Link
              to={"/auth/register"}
              className="text-blue-600 font-bold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Login;
