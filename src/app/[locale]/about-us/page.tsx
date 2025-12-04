import Navbar from "@/components/navbar/navbar";
import background from "@/assets/images/background-arabic.png";
import headerWhiteTop from "@/assets/images/LandingImgs/header-white-top.png";
import Footer from "@/components/Footer/footer";
import Image from "next/image";
import TestimonialsCarousel from "@/components/TestimonialCard/testimonialCard";
import Feature from "@/components/about/Feature";
import Card from "@/components/about/Card";
import Vision from "@/components/about/Vision";
import Landing_Hero from "@/components/landingHero/Landing_Hero";
import StrategicGoals from "@/components/about/strategicGoals";
import Vision2030Slide from "@/components/about/Vision2030Card";
import BoardMembers from "@/components/about/BoardMembers";
import { useLocale, useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("aboutUs");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const cards = [
    {
      title: t("statistics.lendingOperations"),
      num: "80",
      k: true,
    },
    {
      title: t("statistics.clients"),
      num: "54",
      k: true,
    },
    {
      title: t("statistics.expertConsultants"),
      num: "210",
      k: false,
    },
    {
      title: t("statistics.completedProjects"),
      num: "34",
      k: true,
    },
  ];
  return (
    <>
      <header className="w-full relative h-auto lg:h-[45vh] pb-10 lg:pb-0 mb-16">
        {/* Background Image with Gradient Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-[100%_40%]"
          style={{
            backgroundImage: `url(${background.src})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#4750707e] to-[#6b74959d]" />

        {/* Content */}
        <div className="relative z-10">
          <Navbar />
          {/* Hero Content Section */}
          <div className="flex justify-center items-center mt-5">
            <Landing_Hero
              mainText={t("hero.title")}
              linkOne={"/"}
              linkTwo={"/about-us"}
              textOne={t("hero.breadcrumb.home")}
              textTwo={t("hero.breadcrumb.about")}
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
        </div>
      </header>
      <div className="w-[80%] mx-auto">
        <Feature />
        <div className="grid md:grid-cols-4 grid-cols-2 mb-10 ">
          {cards.map((ele, index) => (
            <Card
              key={index}
              title={ele.title}
              num={ele.num}
              k={ele.k}
              isLast={index === cards.length - 1}
            />
          ))}
        </div>
        <Vision />
        <StrategicGoals />
        <Vision2030Slide />
        <BoardMembers />
      </div>
      <TestimonialsCarousel />

      <Footer contactUsFooter={false} />
    </>
  );
}
