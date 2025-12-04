"use client";

import Navbar from "@/components/navbar/navbar";
import Image from "next/image";
import background from "@/assets/images/background-arabic.png";
import headerWhiteTop from "@/assets/images/LandingImgs/header-white-top.png";
import Landing_Hero from "@/components/landingHero/Landing_Hero";
import ContactFrom from "@/components/contactus/ContactFrom";
import BannerFrom from "@/components/contactus/BannerFrom";
import Footer from "@/components/Footer/footer";
import { useTranslations, useLocale } from "next-intl";

export default function Page() {
  const t = useTranslations("contactUs");
  const locale = useLocale();
  const isRTL = locale === "ar";
  // from-[#4750707e] to-[#6b74959d]
  return (
    <>
      <header
        className="w-full relative h-auto lg:h-[45vh] pb-10 lg:pb-0 bg-cover bg-center mb-16"
        style={{
          backgroundImage: `linear-gradient(#4750707e, #6b74959d) , url(${background.src})`,
          backgroundPosition: "100% 40%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Navbar />
        {/* Hero Content Section */}
        <div className="flex justify-center items-center mt-5">
          <Landing_Hero
            mainText={t("hero.title")}
            linkOne={"/"}
            linkTwo={"/contact-us"}
            textOne={t("hero.breadcrumb.home")}
            textTwo={t("hero.breadcrumb.contact")}
          />
        </div>
        <Image
          src={headerWhiteTop.src}
          alt="header-white-top"
          width={450}
          height={100}
          className={`absolute top-0 hidden lg:block w-[35vw] max-w-[400px] h-auto ${
            isRTL ? "start-0" : "start-0 -scale-x-100"
          }`}
        />

        <div className="absolute -bottom-15 right-10 hidden lg:block"></div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6 sm:my-8 lg:my-10">
        <p className="text-primary font-semibold text-lg sm:text-xl">
          {t("title")}
        </p>
        <h3 className="text-primary font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl py-2 sm:py-3 my-2 sm:my-3">
          {t("stayIn")} <span className="text-secondary">{t("touch")}</span>
        </h3>
        <p className="font-semibold text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
          {t("description")}
        </p>

        <div className="my-6 sm:my-8 lg:my-10 flex flex-col lg:flex-row gap-6 lg:gap-10 items-stretch">
          <div className="flex-1 lg:pr-4">
            <ContactFrom />
          </div>
          <div className="w-full lg:w-1/3">
            <BannerFrom />
          </div>
        </div>

        <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[544px] rounded-md overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.1776!2d46.6753!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2ee2b7c0b0b0b0%3A0x0!2sRiyadh%2C%20Saudi%20Arabia!5e0!3m2!1sen!2ssa!4v1625097657031!5m2!1sen!2ssa&style=feature:all|element:labels|visibility:off&style=feature:road|element:geometry|color:0x808080&style=feature:water|element:geometry|color:0x87ceeb&style=feature:landscape|element:geometry|color:0xf5f5f5"
            width="100%"
            height="100%"
            style={{
              border: 0,
              filter: "grayscale(100%) contrast(0.8) brightness(1.1)",
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-md"
          ></iframe>
        </div>
      </div>
      <Footer contactUsFooter={true} />
    </>
  );
}
