"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import mainLogo from "@/assets/images/main-logo.png";
import { resetPassword } from "@/actions/auth.actions";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations, useLocale } from "next-intl";

interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();
  const t = useTranslations("auth");
  const locale = useLocale();

  const resetPasswordSchema = z
    .object({
      password: z
        .string()
        .nonempty(t("validation.passwordRequired"))
        .min(8, t("validation.passwordMin"))
        .regex(/^[a-zA-Z0-9]+$/, t("validation.passwordAlphanumeric")),
      confirmPassword: z
        .string()
        .nonempty(t("validation.confirmPasswordRequired")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("validation.passwordMismatch"),
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    criteriaMode: "all",
    mode: "onChange",
  });

  // Helper function to get cookie value
  const getCookie = (name: string): string | null => {
    if (typeof document === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const cookieValue = parts.pop()?.split(";").shift() || null;
      return cookieValue ? decodeURIComponent(cookieValue) : null;
    }
    return null;
  };

  useEffect(() => {
    // Get email from cookie
    const cookieEmail = getCookie("otp_email");

    // Get OTP from cookie (set during OTP verification)
    const cookieOtp = getCookie("verified_otp");

    if (!cookieEmail || !cookieOtp) {
      // Redirect to forgot password if required data is missing
      router.push(`/${locale}/auth/forgot-password`);
      return;
    }

    setEmail(cookieEmail);
    setOtp(cookieOtp);
    setIsInitialized(true);
  }, [router, locale]);

  const handleResetPassword = async (data: ResetPasswordFormData) => {
    setError("");
    setSuccess("");
    try {
      const response = await resetPassword({
        email,
        otp,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      if (response.success == true) {
        // Clear the cookies after successful password reset
        document.cookie = "otp_email=; path=/; max-age=0";
        document.cookie = "otp_type=; path=/; max-age=0";
        document.cookie = "verified_otp=; path=/; max-age=0";

        setSuccess(t("resetPassword.success"));
        setTimeout(() => {
          router.push(`/${locale}/auth/login`);
        }, 2000);
      }
      if (response.success == false) {
        setError(response.error);
      }
    } catch (error) {
      setError(error as string);
    }
  };

  // Show loading while checking for cookies
  if (!isInitialized) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">{t("resetPassword.loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mt-16">
      {/* Logo */}
      <div className="mb-12 flex justify-start">
        <Image
          src={mainLogo.src}
          alt="Logo"
          width={200}
          height={200}
          className=""
        />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-primary mb-8">
        {t("resetPassword.title")}
      </h1>

      {/* Description */}
      <p className="text-lg text-gray-600 mb-12 leading-relaxed">
        {t("resetPassword.description")}
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit(handleResetPassword)} className="space-y-6">
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

        {/* Password Field */}
        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-sm font-bold text-[#919499] block"
          >
            {t("resetPassword.password")}
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder={t("resetPassword.passwordPlaceholder")}
              className="h-14 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20"
              {...register("password")}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <Label
            htmlFor="confirmPassword"
            className="text-sm font-bold text-[#919499] block"
          >
            {t("resetPassword.confirmPassword")}
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder={t("resetPassword.confirmPasswordPlaceholder")}
              className="h-14 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20"
              {...register("confirmPassword")}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Confirm Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#4F5573] hover:bg-[#4F5573]/90 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold h-14 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all mt-8"
        >
          {isSubmitting
            ? t("resetPassword.submitting")
            : t("resetPassword.submit")}
        </Button>
      </form>
    </div>
  );
}
