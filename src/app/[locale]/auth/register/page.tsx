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
  mobile: string;
  national_id: string;
  id_expiry_date: string;
  gender: string;
  date_of_birth: string;
  social_status: string;
  building_no: string;
  street_name: string;
  secondary_no: string;
  district: string;
  zip: string;
  city: string;
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
      mobile: z
        .string()
        .nonempty("رقم الجوال 2 مطلوب")
        .min(9, "رقم الجوال يجب أن يكون بين 9 و 15 رقم")
        .max(15, "رقم الجوال يجب أن يكون بين 9 و 15 رقم")
        .regex(/^\d+$/, "رقم الجوال يجب أن يحتوي على أرقام فقط"),
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
      gender: z.string().nonempty("الجنس مطلوب"),
      date_of_birth: z.string().nonempty("تاريخ الميلاد مطلوب"),
      social_status: z.string().nonempty("الحالة الاجتماعية مطلوبة"),
      building_no: z
        .string()
        .nonempty("رقم المبنى مطلوب")
        .length(4, "رقم المبنى يجب أن يكون 4 أرقام")
        .regex(/^\d{4}$/, "رقم المبنى يجب أن يكون 4 أرقام فقط"),
      street_name: z
        .string()
        .nonempty("اسم الشارع مطلوب")
        .regex(
          /^[\u0600-\u06FF\s]+$/,
          "اسم الشارع يجب أن يحتوي على أحرف عربية فقط"
        ),
      secondary_no: z
        .string()
        .nonempty("الرقم الفرعي مطلوب")
        .length(4, "الرقم الفرعي يجب أن يكون 4 أرقام")
        .regex(/^\d{4}$/, "الرقم الفرعي يجب أن يكون 4 أرقام فقط"),
      district: z
        .string()
        .nonempty("الحي مطلوب")
        .regex(/^[\u0600-\u06FF\s]+$/, "الحي يجب أن يحتوي على أحرف عربية فقط"),
      zip: z
        .string()
        .nonempty("الرمز البريدي مطلوب")
        .length(5, "الرمز البريدي يجب أن يكون 5 أرقام")
        .regex(/^\d{5}$/, "الرمز البريدي يجب أن يكون 5 أرقام فقط"),
      city: z
        .string()
        .nonempty("المدينة مطلوبة")
        .regex(
          /^[\u0600-\u06FF\s]+$/,
          "المدينة يجب أن تحتوي على أحرف عربية فقط"
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
        document.cookie = `otp_type=signup; path=/; max-age=3600`;

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
        {/* Phone Fields */}
        <div className="grid grid-cols-2 gap-4">
          {/* Phone 1 Field */}
          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="text-sm font-bold text-[#919499] block"
            >
              {t("register.phone1")}
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
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Phone 2 Field */}
          <div className="space-y-2">
            <Label
              htmlFor="mobile"
              className="text-sm font-bold text-[#919499] block"
            >
              {t("register.phone2")}
            </Label>
            <Input
              dir="rtl"
              id="mobile"
              type="tel"
              placeholder={t("register.phone2Placeholder")}
              className="h-12 placeholder:text-gray-400 placeholder:text-start border-gray-300 rounded-lg text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              {...register("mobile")}
              required
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm mt-1">
                {errors.mobile.message}
              </p>
            )}
          </div>
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

        {/* Gender and Birthdate Fields */}
        <div className="grid grid-cols-2 gap-4">
          {/* Gender Field */}
          <div className="space-y-2">
            <Label
              htmlFor="gender"
              className="text-sm font-bold text-[#919499] block"
            >
              {t("register.gender")}
            </Label>
            <select
              id="gender"
              className="h-12 w-full rounded-lg border border-gray-300 bg-white px-3 text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              {...register("gender")}
              required
            >
              <option value="">{t("register.genderPlaceholder")}</option>
              <option value="male">{t("register.male")}</option>
              <option value="female">{t("register.female")}</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>

          {/* Birthdate Field */}
          <div className="space-y-2" dir="rtl">
            <Label
              htmlFor="date_of_birth"
              className="text-sm font-bold text-[#919499] block"
            >
              {t("register.birthdate")}
            </Label>
            <Input
              id="date_of_birth"
              type="date"
              className="h-12 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              {...register("date_of_birth")}
              required
            />
            {errors.date_of_birth && (
              <p className="text-red-500 text-sm mt-1">
                {errors.date_of_birth.message}
              </p>
            )}
          </div>
        </div>

        {/* Marital Status Field */}
        <div className="space-y-2">
          <Label
            htmlFor="social_status"
            className="text-sm font-bold text-[#919499] block"
          >
            {t("register.maritalStatus")}
          </Label>
          <select
            id="social_status"
            className="h-12 w-full rounded-lg border border-gray-300 bg-white px-3 text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            {...register("social_status")}
            required
          >
            <option value="">{t("register.maritalStatusPlaceholder")}</option>
            <option value="single">{t("register.single")}</option>
            <option value="married">{t("register.married")}</option>
            {/* <option value="divorced">{t("register.divorced")}</option> */}
            <option value="widower">{t("register.widowed")}</option>
          </select>
          {errors.social_status && (
            <p className="text-red-500 text-sm mt-1">
              {errors.social_status.message}
            </p>
          )}
        </div>

        {/* Address Section */}
        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-bold text-[#919499]">
            {t("register.addressTitle")}
          </h3>

          {/* Building Number and Street Name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="building_no"
                className="text-sm font-bold text-[#919499] block"
              >
                {t("register.buildingNumber")}
              </Label>
              <Input
                id="building_no"
                type="text"
                placeholder={t("register.buildingNumberPlaceholder")}
                maxLength={4}
                className="h-12 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("building_no")}
                required
              />
              {errors.building_no && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.building_no.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="street_name"
                className="text-sm font-bold text-[#919499] block"
              >
                {t("register.streetName")}
              </Label>
              <Input
                id="street_name"
                type="text"
                placeholder={t("register.streetNamePlaceholder")}
                className="h-12 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("street_name")}
                required
              />
              {errors.street_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.street_name.message}
                </p>
              )}
            </div>
          </div>

          {/* Sub Number and District */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="secondary_no"
                className="text-sm font-bold text-[#919499] block"
              >
                {t("register.subNumber")}
              </Label>
              <Input
                id="secondary_no"
                type="text"
                placeholder={t("register.subNumberPlaceholder")}
                maxLength={4}
                className="h-12 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("secondary_no")}
                required
              />
              {errors.secondary_no && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.secondary_no.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="district"
                className="text-sm font-bold text-[#919499] block"
              >
                {t("register.district")}
              </Label>
              <Input
                id="district"
                type="text"
                placeholder={t("register.districtPlaceholder")}
                className="h-12 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("district")}
                required
              />
              {errors.district && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.district.message}
                </p>
              )}
            </div>
          </div>

          {/* Postal Code and City */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="zip"
                className="text-sm font-bold text-[#919499] block"
              >
                {t("register.postalCode")}
              </Label>
              <Input
                id="zip"
                type="text"
                placeholder={t("register.postalCodePlaceholder")}
                maxLength={5}
                className="h-12 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("zip")}
                required
              />
              {errors.zip && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.zip.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="city"
                className="text-sm font-bold text-[#919499] block"
              >
                {t("register.city")}
              </Label>
              <Input
                id="city"
                type="text"
                placeholder={t("register.cityPlaceholder")}
                className="h-12 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("city")}
                required
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>
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
