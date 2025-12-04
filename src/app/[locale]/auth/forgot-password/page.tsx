"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Image from "next/image";
import mainLogo from "@/assets/images/main-logo.png";
import { forgotPassword } from "@/actions/auth.actions";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations, useLocale } from "next-intl";

interface ForgotPasswordFormData {
    email: string;
}

export default function ForgotPassword() {
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const router = useRouter();
    const t = useTranslations("auth");
    const locale = useLocale();

    const forgotPasswordSchema = z.object({
        email: z.string().nonempty(t("validation.emailRequired")).email(t("validation.emailInvalid")),
    });

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
        criteriaMode: "all",
        mode: "onChange",
    });

    const handleForgotPassword = async (data: ForgotPasswordFormData) => {
        setError("");
        setSuccess("");
        try {
            const response = await forgotPassword(data.email);
            if (response.success == true) {
                // Set cookies for OTP verification
                document.cookie = `otp_email=${encodeURIComponent(data.email)}; path=/; max-age=3600`;
                document.cookie = `otp_type=forgot_password; path=/; max-age=3600`;
                
                setSuccess(t("forgotPassword.success"));
                setTimeout(() => {
                    router.push(`/${locale}/auth/otp-verification`);
                }, 3000);
            }
            if (response.success == false) {
                setError(response.error);
            }
        } catch (error) {
            setError(error as string);
        }
    }

    return (
        <div className="">
            <div className="w-full mt-16">
                {/* Logo */}
                <div className="mb-12 flex justify-start">
                    <Image src={mainLogo.src} alt="Logo" width={200} height={200} className="" />
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold text-primary mb-8">
                    {t("forgotPassword.title")}
                </h1>

                {/* Description */}
                <p className="text-lg text-gray-600 mb-12 leading-relaxed">
                    {t("forgotPassword.description")}
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit(handleForgotPassword)} className="space-y-6">
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
                        <Label htmlFor="email" className="text-sm font-bold text-[#919499] block">
                            {t("forgotPassword.email")}
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder={t("forgotPassword.emailPlaceholder")}
                            className="h-14 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20"
                            {...register("email")}
                            required
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Confirm Button */}
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#4F5573] hover:bg-[#4F5573]/90 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold h-14 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                {t("forgotPassword.submitting")}
                            </>
                        ) : t("forgotPassword.submit")}
                    </Button>
                </form>
            </div>
        </div>
    );
}
