"use client";
import Navbar from "@/components/navbar/navbar";
import background from "@/assets/images/LandingImgs/landingHeaderBG.png";
import headerWhiteTop from "@/assets/images/LandingImgs/header-white-top.png";
import headerWhiteBottom from "@/assets/images/LandingImgs/header-white-bottom.png";
import headerBottomImg from "@/assets/images/LandingImgs/headerBottomImg.png";
import usersRating from "@/assets/images/LandingImgs/usersRating.png";
import Image from "next/image";
import WhyChooseUs from "@/components/WhyChooseUs/whyChooseUs";
import LoanFundingIntro from "@/components/LoanFundingIntroCard/LoanFundingIntro";
import TestimonialsCarousel from "@/components/TestimonialCard/testimonialCard";
import FAQAccordion from "@/components/FAQAccordion/FAQAccordion";
import Footer from "@/components/Footer/footer";
import { useRouter } from "@/i18n/navigation";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useLocale, useTranslations } from "next-intl";
import { useState, useEffect, useCallback } from "react";
import { getSliders, Slider } from "@/actions/slider.actions";

export default function LandingPage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("hero");
  const isRTL = locale === "ar";

  const [sliders, setSliders] = useState<Slider[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    getSliders().then((data) => {
      if (data.length > 0) {
        setSliders(data);
      }
    });
  }, []);

  const goToNextSlide = useCallback(() => {
    if (sliders.length <= 1) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % sliders.length);
      setIsTransitioning(false);
    }, 500);
  }, [sliders.length]);

  useEffect(() => {
    if (sliders.length <= 1) return;
    const interval = setInterval(goToNextSlide, 5000);
    return () => clearInterval(interval);
  }, [sliders.length, goToNextSlide]);

  const currentSlider = sliders[currentSlide];

  return (
    <>
      <header className="w-full relative h-auto lg:h-[70vh] xl:h-[75vh] pb-10 lg:pb-0 mb-16">
        {/* Background Image with Gradient Overlay - Fading Slider */}
        {sliders.length > 0 ? (
          sliders.map((slider, index) => (
            <div
              key={slider.id}
              className={`absolute inset-0 bg-cover bg-no-repeat bg-center transition-opacity duration-500 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              style={{
                backgroundImage: `url(${slider.image_url})`,
              }}
            />
          ))
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-no-repeat bg-center"
            style={{
              backgroundImage: `url(${background.src})`,
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#4750707e] to-[#6b74959d]" />

        {/* Content */}
        <div className="relative z-10">
          <Navbar />
          {/* Hero Content Section */}
          <div className="container ms-auto px-4 sm:px-5 pt-20 lg:pt-16">
            <div className="flex items-center justify-start lg:justify-center">
              <div
                className={`text-center md:text-start text-white max-w-4xl w-full lg:w-[500px] xl:w-[600px] ${
                  isRTL ? "lg:mr-64 xl:mr-80" : "lg:ml-64 xl:ml-80"
                }`}
              >
                <h1
                  className={`text-5xl lg:text-[64px] font-bold mb-6 leading-tight text-stroke transition-opacity duration-500 ease-in-out ${
                    isTransitioning ? "opacity-0" : "opacity-100"
                  }`}
                >
                  {currentSlider?.name || t("title")}{" "}
                  {!currentSlider && (
                    <span className="text-white">{t("titleHighlight")}</span>
                  )}
                </h1>

                <p
                  className={`text-lg lg:text-xl mb-8 leading-relaxed transition-opacity duration-500 ease-in-out min-h-[60px] lg:min-h-[80px] ${
                    isTransitioning ? "opacity-0" : "opacity-90"
                  }`}
                >
                  {currentSlider?.description || t("description")}
                </p>

                <button
                  onClick={() =>
                    router.push("/user-profile/loans/loan-request")
                  }
                  className={`bg-[#838AB0] cursor-pointer hover:bg-secondary/90 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 flex items-center gap-2 w-fit mx-auto ${
                    isRTL
                      ? "lg:ml-0 lg:mr-auto -translate-x-10"
                      : "lg:mr-0 lg:ml-auto translate-x-10"
                  }`}
                >
                  <span>{t("cta")}</span>
                  {isRTL ? (
                    <FaArrowLeftLong className="w-5 h-5" />
                  ) : (
                    <FaArrowRightLong className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Top decorative image - responsive sizing */}
          <Image
            src={headerWhiteTop.src}
            alt="header-white-top"
            width={450}
            height={100}
            className={`absolute top-0 hidden lg:block w-[35vw] max-w-[400px] h-auto ${
              isRTL ? "start-0" : "start-0 -scale-x-100"
            }`}
          />
        </div>

        {/* Bottom decorative image - responsive sizing */}
        <Image
          src={headerWhiteBottom.src}
          alt="header-white-bottom"
          width={800}
          height={100}
          className={`bottom-0 absolute hidden lg:block w-[50vw] max-w-[800px] h-auto ${
            isRTL ? "start-0" : "start-0 -scale-x-100"
          }`}
        />

        <div
          className={`absolute bottom-2 hidden lg:block ${
            isRTL ? "right-10" : "left-10"
          }`}
        >
          <Image
            src={headerBottomImg.src}
            alt="header-bottom-img"
            width={420}
            height={100}
            className={`w-[30vw] max-w-[420px] h-auto ${
              !isRTL && "-scale-x-100"
            }`}
          />
          <Image
            src={usersRating.src}
            alt="users-rating"
            width={200}
            height={100}
            className={`absolute -bottom-16 z-10 w-[11vw] max-w-[200px] h-auto ${
              isRTL ? "left-0" : "right-0"
            }`}
          />
        </div>
      </header>
      <WhyChooseUs />
      <LoanFundingIntro />
      <TestimonialsCarousel />
      <FAQAccordion />
      <Footer contactUsFooter={false} />
    </>
  );
}
