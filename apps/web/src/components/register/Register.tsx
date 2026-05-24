"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "ui/lib/components/ui/button";
import { Input } from "ui/lib/components/ui/input";
import { Checkbox } from "ui/lib/components/ui/checkbox";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type User,
  UserRegistrationFormSchema,
} from "@/lib/validation/userValidation";
import { register } from "@/app/api/auth";
import { toast } from "sonner";

const Register = () => {
  const router = useRouter();
  const form = useForm<User>({
    resolver: zodResolver(UserRegistrationFormSchema),
  });
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit: SubmitHandler<User> = async (data) => {
    setLoading(true);
    const { firstName, lastName, email, password } = data;
    const username = firstName + lastName;
    try {
      const res = await register({ username, email, password });
      if (res.status === 201) {
        toast.success("User resubmitted successfully");
        router.push("/");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full max-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2000&auto=format&fit=crop"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          alt="Shopping Experience"
        />

        <div className="relative z-10 w-full flex flex-col justify-between p-16 text-white">
          <div className="flex items-center gap-2 font-extrabold text-2xl tracking-tight">
            <div className="bg-white text-slate-900 p-1.5 rounded-xl">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            Fake Store
          </div>

          <div className="max-w-md">
            <h2 className="text-5xl font-extrabold leading-tight mb-6">
              Elevate your daily shopping experience.
            </h2>
            <p className="text-lg text-slate-200 leading-relaxed mb-8">
              Join over 10,000+ shoppers and get access to exclusive drops,
              members-only pricing, and faster checkout.
            </p>

            <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <div className="flex -space-x-2">
                <img
                  className="w-8 h-8 rounded-full border-2 border-slate-800"
                  src="https://i.pravatar.cc/100?img=1"
                />
                <img
                  className="w-8 h-8 rounded-full border-2 border-slate-800"
                  src="https://i.pravatar.cc/100?img=2"
                />
                <img
                  className="w-8 h-8 rounded-full border-2 border-slate-800"
                  src="https://i.pravatar.cc/100?img=3"
                />
              </div>
              <span className="text-sm font-medium">
                Join our growing community
              </span>
            </div>
          </div>

          <div className="text-sm text-slate-300">
            &copy; 2024 Fake Store Inc. All rights reserved.
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-white">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 font-extrabold text-xl mb-12">
            <div className="bg-slate-900 text-white p-1 rounded-lg">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            Fake Store
          </div>

          <div className="mb-10">
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">
              Create Account
            </h1>
            <p className="text-slate-400 text-sm font-medium">
              Join our community and start shopping
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                  First Name
                </label>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Input
                        placeholder="John"
                        {...field}
                        className="w-full h-14 px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all text-sm"
                      />
                      {errors?.firstName && (
                        <div className="text-xs text-red-700">
                          {errors?.firstName.message}
                        </div>
                      )}
                    </>
                  )}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                  Last Name
                </label>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Input
                        placeholder="Doe"
                        {...field}
                        className="w-full h-14 px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all text-sm"
                      />
                      {errors?.lastName && (
                        <div className="text-xs text-red-700">
                          {errors?.lastName.message}
                        </div>
                      )}
                    </>
                  )}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                Email
              </label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      type="email"
                      placeholder="name@example.com"
                      {...field}
                      className="w-full h-14 px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all text-sm"
                    />
                    {errors?.email && (
                      <div className="text-xs text-red-700">
                        {errors?.email.message}
                      </div>
                    )}
                  </>
                )}
              />
            </div>
            <div className="flex flex-col gap-2 mt-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                Password
              </label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      type="password"
                      placeholder="••••••••••••"
                      {...field}
                      className="w-full h-14 px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all text-sm"
                    />
                    {errors?.password && (
                      <div className="text-xs text-red-700">
                        {errors?.password.message}
                      </div>
                    )}
                  </>
                )}
              />
            </div>
            <div className="flex flex-col gap-2 mt-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                Confirm Password
              </label>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      type="password"
                      placeholder="••••••••••••"
                      {...field}
                      className="w-full h-14 px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all text-sm"
                    />
                    {errors?.confirmPassword && (
                      <div className="text-xs text-red-700">
                        {errors?.confirmPassword.message}
                      </div>
                    )}
                  </>
                )}
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 mt-2">
                <Controller
                  name="agree"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Checkbox
                      onCheckedChange={onChange}
                      onBlur={onBlur}
                      checked={value}
                    />
                  )}
                />

                <label
                  htmlFor="terms"
                  className="text-xs text-slate-500 leading-tight"
                >
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>
              {errors?.agree && (
                <div className="text-xs text-red-700">
                  {errors?.agree.message}
                </div>
              )}
            </div>

            <div className="pt-6">
              <Button
                type="submit"
                className="text-md w-full h-14 rounded-2xl font-bold"
                disabled={loading}
              >
                Register
              </Button>
            </div>
          </form>
          <div className="text-center mt-4">
            <p className="text-center text-sm text-slate-400 font-medium">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-600 font-bold hover:underline"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
