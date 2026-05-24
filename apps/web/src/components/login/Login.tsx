"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "ui/lib/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { Input } from "ui/lib/components/ui/input";
import { Separator } from "ui/lib/components/ui/separator";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { writeToLocalStorage } from "@/lib/localStorage";

const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="24"
    height="24"
    viewBox="0 0 48 48"
  >
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    ></path>
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    ></path>
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    ></path>
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    ></path>
  </svg>
);

const FacebookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="24"
    height="24"
    viewBox="0 0 48 48"
  >
    <linearGradient
      id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1"
      x1="9.993"
      x2="40.615"
      y1="9.993"
      y2="40.615"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0" stopColor="#2aa4f4"></stop>
      <stop offset="1" stopColor="#007ad9"></stop>
    </linearGradient>
    <path
      fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)"
      d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"
    ></path>
    <path
      fill="#fff"
      d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"
    ></path>
  </svg>
);

const AppleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="22"
    height="22"
    viewBox="0,0,256,256"
  >
    <g
      fillRule="nonzero"
      stroke="none"
      strokeWidth="1"
      strokeLinecap="butt"
      strokeLinejoin="miter"
      strokeMiterlimit="10"
      strokeDasharray=""
      strokeDashoffset="0"
      fontFamily="none"
      fontWeight="none"
      fontSize="none"
      textAnchor="none"
      style={{ mixBlendMode: "normal" }}
    >
      <g transform="scale(8.53333,8.53333)">
        <path d="M25.565,9.785c-0.123,0.077 -3.051,1.702 -3.051,5.305c0.138,4.109 3.695,5.55 3.756,5.55c-0.061,0.077 -0.537,1.963 -1.947,3.94c-1.119,1.703 -2.361,3.42 -4.247,3.42c-1.794,0 -2.438,-1.135 -4.508,-1.135c-2.223,0 -2.852,1.135 -4.554,1.135c-1.886,0 -3.22,-1.809 -4.4,-3.496c-1.533,-2.208 -2.836,-5.673 -2.882,-9c-0.031,-1.763 0.307,-3.496 1.165,-4.968c1.211,-2.055 3.373,-3.45 5.734,-3.496c1.809,-0.061 3.419,1.242 4.523,1.242c1.058,0 3.036,-1.242 5.274,-1.242c0.966,0.001 3.542,0.292 5.137,2.745zM15.001,6.688c-0.322,-1.61 0.567,-3.22 1.395,-4.247c1.058,-1.242 2.729,-2.085 4.17,-2.085c0.092,1.61 -0.491,3.189 -1.533,4.339c-0.935,1.242 -2.545,2.177 -4.032,1.993z"></path>
      </g>
    </g>
  </svg>
);

const Login = () => {
  // const { data: session } = useSession();
  // const { user } = session;
  const router = useRouter();
  const [signingIn, setSigningIn] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginWithCredentials = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      username: userCredentials.username,
      password: userCredentials.password,
    });
    if (result?.error) {
      toast.error("Invalid credentials");
      return;
    }

    toast.success("Login Successful");
    router.push("/");
  };

  const handleLoginWithProvider = async (provider: string) => {
    setSigningIn(true);
    try {
      await signIn(provider, { callbackUrl: "/" });
    } catch (err) {
      setSigningIn(false);
    }
  };

  return (
    <div className="w-full h-full flex max-h-screen">
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          alt="Discover Collections"
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
              Welcome back to the collection.
            </h2>
            <p className="text-lg text-slate-200 leading-relaxed mb-8">
              Log in to access your saved items, track your recent orders, and
              see what's new in your personalized feed.
            </p>

            <div className="p-6 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20">
              <p className="italic text-slate-100 mb-4 text-sm">
                "The best shopping experience I've had online. The curated
                collections are always on point!"
              </p>
              <div className="flex items-center gap-3">
                <img
                  className="w-10 h-10 rounded-full border-2 border-white/20"
                  src="https://i.pravatar.cc/100?img=5"
                />
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest">
                    Sarah Jenkins
                  </p>
                  <p className="text-[10px] text-slate-400">Verified Shopper</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-sm text-slate-400">
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
            <h1 className="text-4xl font-extrabold tracking-tight mb-3">
              Sign In
            </h1>
            <p className="text-slate-500 font-medium">
              Enter your credentials to access your account.
            </p>
          </div>

          <form onSubmit={handleLoginWithCredentials} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                Email
              </label>
              <Input
                name="username"
                placeholder="name@company.com"
                value={userCredentials?.username}
                onChange={handleChange}
                className="w-full px-5 py-4 h-14 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all"
              />
            </div>
            <div className="space-y-2 mt-3">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  Forgot?
                </a>
              </div>
              <Input
                name="password"
                type="password"
                placeholder="••••••••••••"
                value={userCredentials?.password}
                onChange={handleChange}
                className="w-full px-5 py-4 h-14 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all"
              />
            </div>

            <Button
              type="submit"
              className="text-base w-full bg-slate-900 h-14 rounded-2xl font-bold"
            >
              Login
            </Button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase font-bold tracking-widest text-slate-300">
              <span className="bg-white px-4">Or continue with</span>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-3 border border-slate-200 py-3.5 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all active:scale-[0.98]">
              {signingIn ? "..." : <GoogleIcon />}
              Google
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 border border-slate-200 py-3 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all active:scale-[0.98]">
                <FacebookIcon />
                Facebook
              </button>
              <button className="flex items-center justify-center gap-2 border border-slate-200 py-3 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all active:scale-[0.98]">
                <AppleIcon />
                Apple
              </button>
            </div>
          </div>

          <p className="text-center mt-10 text-sm text-slate-400 font-medium">
            New to Fake Store?{" "}
            <a
              href="/register"
              className="text-blue-600 font-bold hover:underline"
            >
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
