"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import authSocials from "@/assets/images/authSocialMedia.png";
import iphone from "@/assets/images/iphone-register.png";
import iphoneLogin from "@/assets/images/iphone-login.png";
import iphoneOtp from "@/assets/images/iphone-otp.png";
import rectangle from "@/assets/images/Rectangle37.png";
import iphoneForgotPassword from "@/assets/images/iphone-forgotPassword.png";
import iphoneResetPassword from "@/assets/images/iphone-resetPassword.png";
import bgPattern from "@/assets/images/authPattern.png";
import { useTranslations } from "next-intl";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations("auth.layout");
  const pathname = usePathname();
  const page = pathname.includes("register")
    ? "register"
    : pathname.includes("login")
    ? "login"
    : pathname.includes("otp-verification")
    ? "otp-verification"
    : pathname.includes("forgot-password")
    ? "forgot-password"
    : pathname.includes("reset-password")
    ? "reset-password"
    : "";
  return (
    <>
      <div className="min-h-screen flex">
        {/* Right Half - App Promotion */}
        <div className="w-[40%] bg-gradient-to-br from-primary to-primary/90 flex flex-col items-center pt-16 p-8 text-white relative z-0 shadow-[inset_10px_0_10px_3px_rgba(0,0,0,0.3)]">
          <div className="text-start max-w-md">
            {/* Main Headline */}
            <h2 className="text-4xl font-bold mb-6">
              {t("headline")} <span className="text-secondary">{t("headlineHighlight")}</span>
            </h2>

            {/* Description */}
            <p className="text-lg leading-relaxed mb-12 opacity-90 font-bold">
              {t("description")}
            </p>

            {/* App Store Badges */}
            <div className="flex gap-4 justify-center mb-12">
              <Image
                src={authSocials.src}
                alt="authSocials"
                width={1200}
                height={1000}
              />
            </div>

            {/* Phone Mockup Container */}
            <div className="absolute bottom-0 start-0 end-0 h-60 z-10">
              {/* Rectangle Background - Behind iPhone */}
              {page == "otp-verification" ? (
                ""
              ) : (
                <>
                  <Image
                    src={rectangle.src}
                    alt="rectangle"
                    fill
                    className="object-cover z-0"
                  />
                </>
              )}
              {page === "register" && (
                <>
                  <Image
                    src={iphone}
                    alt="iphone"
                    width={400}
                    height={500}
                    className="absolute bottom-0 end-1/2 transform -translate-x-1/2 z-10"
                  />
                </>
              )}
              {page === "login" && (
                <>
                  <Image
                    src={iphoneLogin.src}
                    alt="iphone"
                    width={300}
                    height={500}
                    className="absolute bottom-0 start-0 transform z-10"
                  />
                </>
              )}
              {page === "otp-verification" && (
                <>
                  <Image
                    src={iphoneOtp.src}
                    alt="iphone"
                    width={500}
                    height={500}
                    className="absolute bottom-0 start-0 transform z-10"
                  />
                </>
              )}
              {page === "forgot-password" && (
                <>
                  <Image
                    src={iphoneForgotPassword.src}
                    alt="iphone"
                    width={300}
                    height={500}
                    className="absolute bottom-0 start-0 transform z-10"
                  />
                </>
              )}
              {page === "reset-password" && (
                <>
                  <Image
                    src={iphoneResetPassword.src}
                    alt="iphone"
                    width={400}
                    height={500}
                    className="absolute bottom-0 end-1/2 transform -translate-x-1/2 z-10"
                  />
                </>
              )}
            </div>
          </div>
        </div>
        {/* Left Half - Registration Form */}
        <div className="w-[60%] bg-white relative">
          <div className="absolute bottom-0 left-0 right-0 h-[250px] overflow-hidden">
            <Image
              src={bgPattern.src}
              alt="bgPattern"
              fill
              className="object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/70 to-white/100" />
          </div>
          <div className="w-full max-w-3xl mx-auto">
            <div className="scale-90 origin-center">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
