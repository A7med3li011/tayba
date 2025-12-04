"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import mainLogo from "@/assets/images/main-logo.png";
import { Link } from "@/i18n/navigation";
import { userLogin } from "@/actions/auth.actions";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations, useLocale } from "next-intl";

interface LoginFormData {
  login: string;
  password: string;
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const router = useRouter();
  const t = useTranslations("auth");
  const locale = useLocale();

  const loginSchema = z.object({
    login: z
      .string()
      .nonempty(t("validation.emailRequired"))
      .email(t("validation.emailInvalid")),
    password: z
      .string()
      .nonempty(t("validation.passwordRequired"))
      .min(1, t("validation.passwordRequired")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    criteriaMode: "all",
    mode: "onChange",
  });

  const handleLogin = async (data: LoginFormData) => {
    setError("");
    setSuccess("");
    try {
      const response = await userLogin(data);
      console.log("Login successful:", response);
      if (response.success == true) {
        // Set cookies for OTP verification
        document.cookie = `otp_email=${encodeURIComponent(
          data.login
        )}; path=/; max-age=3600`;
        document.cookie = `otp_type=login; path=/; max-age=3600`;

        setSuccess(t("login.success"));
        setTimeout(() => {
          router.push(`/${locale}/auth/otp-verification`);
        }, 2000);
      }
      if (response.success == false) {
        setError(response.error);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError(t("login.error"));
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center gap-10">
      {/* Logo and Welcome Section */}
      <div className="text-start">
        <div className="mb-8">
          <Image
            src={mainLogo.src}
            alt="Logo"
            width={130}
            height={130}
            className=""
          />
        </div>
      </div>
      <h1 className="text-4xl font-bold text-primary mb-10">
        {t("login.title")}
      </h1>

      {/* Login Form */}
      <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-700 text-center font-medium">{error}</p>
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <p className="text-green-700 text-center font-medium">{success}</p>
          </div>
        )}

        {/* Email Field */}
        <div className="space-y-2">
          <Label
            htmlFor="login"
            className="text-sm font-bold text-[#919499] block"
          >
            {t("login.email")}
          </Label>
          <Input
            {...register("login")}
            id="login"
            type="email"
            placeholder={t("login.emailPlaceholder")}
            className="h-12 placeholder:text-gray-400 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
          />
          {errors.login && (
            <p className="text-red-500 text-sm mt-1">{errors.login.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-sm font-bold text-[#919499] block"
          >
            {t("login.password")}
          </Label>
          <div className="relative">
            <Input
              {...register("password")}
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder={t("login.passwordPlaceholder")}
              className="h-12 placeholder:text-gray-400 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute end-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Forgot Password Link */}
        <div className="text-end mb-6">
          <Link
            href="/auth/forgot-password"
            className="text-sm text-secondary hover:text-secondary/90 font-bold"
          >
            {t("login.forgotPassword")}
          </Link>
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#4F5573] hover:bg-[#4F5573]/90 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold h-14 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all mt-8"
        >
          {isSubmitting ? t("login.submitting") : t("login.submit")}
        </Button>

        {/* Register Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            {t("login.noAccount")}
            {"  "}
            <Link
              href="/auth/register"
              className="text-secondary hover:text-secondary/90 font-bold"
            >
              {t("login.createAccount")}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
