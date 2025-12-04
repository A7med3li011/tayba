"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import mainLogo from "@/assets/images/main-logo.png";
import { Link } from "@/i18n/navigation";
import { userRegister } from "@/actions/auth.actions";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations, useLocale } from "next-intl";

interface RegisterFormData {
  name: string;
  email: string;
  phone: string;
  national_id: string;
  id_expiry_date: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const t = useTranslations("auth");
  const locale = useLocale();

  const registerSchema = z
    .object({
      name: z
        .string()
        .nonempty(t("validation.nameRequired"))
        .min(2, t("validation.nameMin")),
      email: z
        .string()
        .nonempty(t("validation.emailRequired"))
        .email(t("validation.emailInvalid")),
      phone: z
        .string()
        .nonempty(t("validation.phoneRequired"))
        .min(9, t("validation.phoneLength"))
        .max(15, t("validation.phoneLength"))
        .regex(/^\d+$/, t("validation.phoneNumeric")),
      national_id: z
        .string()
        .nonempty(t("validation.nationalIdRequired"))
        .length(10, t("validation.nationalIdLength"))
        .regex(/^\d+$/, t("validation.nationalIdNumeric")),
      id_expiry_date: z
        .string()
        .min(1, t("validation.expiryDateRequired"))
        .refine(
          (date) => new Date(date) >= new Date(new Date().setHours(0, 0, 0, 0)),
          t("validation.expiryDateFuture")
        ),
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
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    criteriaMode: "all",
    mode: "onChange",
  });

  const handleRegister = async (data: RegisterFormData) => {
    setError("");
    setSuccess("");
    try {
      const response = await userRegister(data);
      if (response?.success === true) {
        // Set cookies for OTP verification
        document.cookie = `otp_email=${encodeURIComponent(
          data.email
        )}; path=/; max-age=3600`;
        document.cookie = `otp_type=register; path=/; max-age=3600`;

        setSuccess(t("register.success"));
        setTimeout(() => {
          router.push(`/${locale}/auth/otp-verification`);
        }, 2000);
        return;
      }
      if (response?.success === false) {
        setError(response?.error ?? t("register.error"));
        return;
      }
      setError(t("register.error"));
    } catch (e) {
      console.error("Register failed:", e);
      setError(t("register.error"));
    }
  };

  return (
    <div className="w-full">
      {/* Logo and Welcome Section */}
      <div className="text-start mb-8">
        <div className="mb-8">
          <Image
            src={mainLogo.src}
            alt="Logo"
            width={170}
            height={170}
            className=""
          />
        </div>
        <h1 className="text-4xl font-bold text-primary mb-2">
          {t("register.title")}
        </h1>
      </div>

      {/* Registration Form */}
      <form onSubmit={handleSubmit(handleRegister)} className="space-y-2">
        {/* Alerts */}
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
        {/* Name Field */}
        <div className="space-y-2">
          <Label
            htmlFor="name"
            className="text-sm font-bold text-[#919499] block"
          >
            {t("register.name")}
          </Label>
          <Input
            id="name"
            type="text"
            placeholder={t("register.namePlaceholder")}
            className="h-12 placeholder:text-gray-400 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            {...register("name")}
            required
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        {/* Email Field */}
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-sm font-bold text-[#919499] block"
          >
            {t("register.email")}
          </Label>
          <Input
            id="email"
            type="email"
            placeholder={t("register.emailPlaceholder")}
            className="h-12 placeholder:text-gray-400 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            {...register("email")}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        {/* Phone Field */}
        <div className="space-y-2">
          <Label
            htmlFor="phone"
            className="text-sm font-bold text-[#919499] block"
          >
            {t("register.phone")}
          </Label>
          <Input
            dir="rtl"
            id="phone"
            type="tel"
            placeholder={t("register.phonePlaceholder")}
            className="h-12 placeholder:text-gray-400 placeholder:text-start border-gray-300 rounded-lg text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            {...register("phone")}
            required
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* ID Number and Expiry Date Fields */}
        <div className="grid grid-cols-2 gap-4">
          {/* ID Number Field */}
          <div className="space-y-2">
            <Label
              htmlFor="idNumber"
              className="text-sm font-bold text-[#919499] block"
            >
              {t("register.nationalId")}
            </Label>
            <Input
              dir="rtl"
              id="national_id"
              type="text"
              placeholder={t("register.nationalIdPlaceholder")}
              className="h-12 placeholder:text-gray-400 placeholder:text-start border-gray-300 rounded-lg text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              {...register("national_id")}
              required
            />
            {errors.national_id && (
              <p className="text-red-500 text-sm mt-1">
                {errors.national_id.message}
              </p>
            )}
          </div>

          {/* Expiry Date Field */}
          <div className="space-y-2" dir="rtl">
            <Label
              htmlFor="expiryDate"
              className="text-sm font-bold text-[#919499] block"
            >
              {t("register.expiryDate")}
            </Label>
            <Input
              id="id_expiry_date"
              type="date"
              placeholder={t("register.expiryDatePlaceholder")}
              className="h-12 placeholder:text-gray-400 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              {...register("id_expiry_date")}
              required
            />
            {errors.id_expiry_date && (
              <p className="text-red-500 text-sm mt-1">
                {errors.id_expiry_date.message}
              </p>
            )}
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-sm font-bold text-[#919499] block"
          >
            {t("register.password")}
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder={t("register.passwordPlaceholder")}
              className="h-12 placeholder:text-gray-400 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              {...register("password")}
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

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <Label
            htmlFor="confirmPassword"
            className="text-sm font-bold text-[#919499] block"
          >
            {t("register.confirmPassword")}
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder={t("register.confirmPasswordPlaceholder")}
              className="h-12 placeholder:text-gray-400 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              {...register("confirmPassword")}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute end-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Register Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#4F5573] hover:bg-[#4F5573]/90 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold h-14 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all mt-8"
        >
          {isSubmitting ? t("register.submitting") : t("register.submit")}
        </Button>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            {t("register.hasAccount")}
            {"  "}
            <Link
              href="/auth/login"
              className="text-secondary hover:text-secondary/90 font-bold"
            >
              {t("register.login")}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
