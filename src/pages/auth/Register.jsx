import { LinkIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import Footer from "../../components/Footer";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "", confirm: "" },
  });

  const onSubmit = () => {};

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
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid gap-4"
            >
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
                  className="border px-3 py-2 rounded-lg"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>

              <div className="grid gap-1">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Email is required",
                  })}
                  placeholder="••••••••"
                  id="password"
                  className="border px-3 py-2 rounded-lg"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="grid gap-1">
                <label htmlFor="confirm" className="text-sm">
                  Confirm Password
                </label>
                <input
                  type="confirm"
                  {...register("confirm", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: `Password must be at least 6 characters`,
                    },
                  })}
                  placeholder="••••••••"
                  id="confirm"
                  className="border px-3 py-2 rounded-lg"
                />
                {errors.confirm && (
                  <p className="text-red-500 text-xs">
                    {errors.confirm.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-500 text-sm font-semibold text-white "
              >
                Sign Up
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
              href="#"
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
