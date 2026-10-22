import { LinkIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { signUpThunk, clearError } from "../../redux/slices/userSlice";
import Footer from "../../components/Footer";
import { useEffect } from "react";

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { full_name: "", email: "", password: "", confirm: "" },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isPending, error } = useSelector((state) => state.userState);

  const password = watch("password");

  const onSubmit = async (dataInput) => {
    try {
      await dispatch(signUpThunk(dataInput)).unwrap();
      navigate("/auth/login");
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
      <section className="flex min-h-screen flex-col bg-primary font-sans text-slate-900">
        <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
          <div className="mb-7 flex flex-col items-center text-center">
            <span className="mb-4 flex size-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
              <LinkIcon />
            </span>
            <h1 className="text-xl font-bold tracking-tight">Create Account</h1>
            <p className="mt-1 text-xs text-slate-500">
              Join the elite architects of the web.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-md">
            {error && (
              <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
              <div className="grid gap-1">
                <label htmlFor="full_name" className="text-sm">
                  Full Name
                </label>
                <input
                  type="text"
                  {...register("full_name", {
                    required: "Full name is required",
                    minLength: {
                      value: 3,
                      message: "Full name must be at least 3 characters",
                    },
                  })}
                  placeholder="John Doe"
                  id="full_name"
                  className="rounded-lg border px-3 py-2"
                />
                {errors.full_name && (
                  <p className="text-xs text-red-500">
                    {errors.full_name.message}
                  </p>
                )}
              </div>

              <div className="grid gap-1">
                <label htmlFor="email" className="text-sm">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                  placeholder="name@gmail.com"
                  id="email"
                  className="rounded-lg border px-3 py-2"
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="grid gap-1">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  placeholder="••••••••"
                  id="password"
                  className="rounded-lg border px-3 py-2"
                />
                {errors.password && (
                  <p className="text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="grid gap-1">
                <label htmlFor="confirm" className="text-sm">
                  Confirm Password
                </label>
                <input
                  type="password"
                  {...register("confirm", {
                    required: "Confirm password is required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  placeholder="••••••••"
                  id="confirm"
                  className="rounded-lg border px-3 py-2"
                />
                {errors.confirm && (
                  <p className="text-xs text-red-500">
                    {errors.confirm.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-500 text-sm font-semibold text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPending ? "Signing Up..." : "Sign Up"}
              </button>
            </form>

            <p className="mt-5 text-center text-xs text-slate-500">
              By signing up, you agree to our{" "}
              <a href="#" className="font-medium text-blue-700 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="font-medium text-blue-700 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>

          <p className="mt-8 text-xs text-slate-600">
            Already have an account?{" "}
            <Link
              to={"/auth/login"}
              className="font-bold text-blue-700 hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Register;
