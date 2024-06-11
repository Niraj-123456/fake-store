"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "ui/components/ui/button";
import { Input } from "ui/components/ui/input";
import { Checkbox } from "ui/components/ui/checkbox";
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
    <div className="bg-gray-100 max-w-xl px-4 py-10 w-[36rem] flex flex-col justify-center items-center gap-4">
      <div>
        <h1 className="text-2xl font-semibold p-4">Register</h1>
      </div>

      <div className="w-full py-4 px-20">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <label className="text-gray-600">First Name</label>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <>
                  <Input placeholder="Your First Name..." {...field} />
                  {errors?.firstName && (
                    <div className="text-xs text-red-700">
                      {errors?.firstName.message}
                    </div>
                  )}
                </>
              )}
            />
          </div>
          <div className="flex flex-col gap-2 mt-3">
            <label className="text-gray-600">Last Name</label>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <>
                  <Input placeholder="Your Last Name..." {...field} />
                  {errors?.lastName && (
                    <div className="text-xs text-red-700">
                      {errors?.lastName.message}
                    </div>
                  )}
                </>
              )}
            />
          </div>
          <div className="flex flex-col gap-2 mt-3">
            <label className="text-gray-600">Email</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <>
                  <Input type="email" placeholder="Your Email..." {...field} />
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
            <label className="text-gray-600">Password</label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <>
                  <Input
                    type="password"
                    placeholder="Your Password..."
                    {...field}
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
            <label className="text-gray-600">Confirm Password</label>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <>
                  <Input
                    type="password"
                    placeholder="Your Confirm Password..."
                    {...field}
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
            <div className="flex items-center gap-2 mt-6">
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

              <label className="text-gray-600 text-sm">
                Agree to terms and conditions
              </label>
            </div>
            {errors?.agree && (
              <div className="text-xs text-red-700">
                {errors?.agree.message}
              </div>
            )}
          </div>
          <div className="mt-5 flex justify-between">
            <Button type="submit" className="text-md w-full" disabled={loading}>
              Register
            </Button>
          </div>
          <div className="text-center mt-4">
            <p className="text-sm">
              Already have account?{" "}
              <a href="/login" className="text-blue-700">
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
