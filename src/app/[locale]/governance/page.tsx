"use client";

import Navbar from "@/components/navbar/navbar";
import background from "@/assets/images/background-arabic.png";
import headerWhiteTop from "@/assets/images/LandingImgs/header-white-top.png";
import Footer from "@/components/Footer/footer";
import Image from "next/image";
import Landing_Hero from "@/components/landingHero/Landing_Hero";
import { FaChevronLeft } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import { useTranslations, useLocale } from "next-intl";

const governanceDocumentKeys = [
  "basicRegulation",
  "regulationsApprovalMinutes",
  "codeOfConductPolicy",
  "employeeEthicsCharter",
  "amlCftBoardRoles",
  "donationRedirectionPolicy",
  "boardSelectionAndRoles",
  "financialAdminAuthorities",
  "committeesAuthorities",
  "conflictOfInterestPolicy",
  "donationRefundMechanism",
  "ceoAppointmentRegulation",
  "ceoAuthorities",
  "generalAssemblyMembership",
  "hrAndWorkRegulation",
  "volunteerEthicsCharter",
  "organizationManagementRegulation",
  "internalControlSystem",
  "financialRegulation",
  "receivablesHandlingProcedures",
  "cashFollowUpProcedures",
  "procurementAndContractingProcedures",
  "assetPurchaseRegulation",
  "donationsCollectionPolicy",
  "assistanceDistributionPolicy",
  "dataPrivacyPolicy",
  "donationsCollectionPolicy2",
  "beneficiaryRelationsPolicy",
  "beneficiaryComplaintMechanism",
  "donationIncreaseMechanism",
  "activitiesRecognitionPolicy",
  "riskAssessmentPolicy",
  "investmentPolicy",
  "documentRetentionPolicy",
  "financialAccountingPoliciesGuide",
  "whistleblowerPolicy",
  "amlIndicatorsPolicy",
  "amlAgencyServicesPolicy",
  "dueDiligenceServices",
  "amlRiskManagementGuide",
  "policyEffectivenessVerificationMechanism",
] as const;

export default function Page() {
  const t = useTranslations("governance");
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <>
      <header className="w-full relative h-auto lg:h-[45vh] pb-10 lg:pb-0 mb-16">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-[100%_40%]"
          style={{
            backgroundImage: `url(${background.src})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#4750707e] to-[#6b74959d]" />
        <div className="relative z-10">
          <Navbar />
          <div className="flex justify-center items-center mt-5">
            <Landing_Hero
              mainText={t("hero.title")}
              linkOne={"/"}
              linkTwo={"/governance"}
              textOne={t("hero.breadcrumb.home")}
              textTwo={t("hero.breadcrumb.governance")}
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
        </div>
      </header>

      <div className="w-[90%] lg:w-[80%] mx-auto py-10 mb-10">
        {/* Header Section */}
        <div className="text-start mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-primary">
            {t("pageTitle")}{" "}
            <span className="text-secondary">{t("pageTitleHighlight")}</span>
          </h1>
        </div>

        {/* Documents Grid */}
        <div className="space-y-3">
          {governanceDocumentKeys.map((docKey, index) => (
            <div
              key={index}
              className="bg-white border-b border-gray-300 overflow-hidden cursor-pointer group"
            >
              <div className="flex items-stretch">
                <div className="flex-1 flex items-center justify-between px-4 py-3">
                  {/* Title */}
                  <div className="flex items-center gap-2">
                    <FaChevronLeft
                      className={`w-4 h-4 text-primary ${
                        !isRTL && "rotate-180"
                      }`}
                    />
                    <span className="text-sm lg:text-base font-bold text-black">
                      {t(`documents.${docKey}`)}
                    </span>
                  </div>

                  {/* Action and arrow */}
                  <div
                    className={`flex items-center gap-3 border border-primary rounded-md px-6 py-2 ${
                      isRTL
                        ? "border-r-[15px] border-r-primary"
                        : "border-l-[15px] border-l-primary"
                    }`}
                  >
                    <div>
                      <div className="circle rounded-full p-2 border border-primary">
                        <FaFilePdf className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <div className={isRTL ? "text-right" : "text-left"}>
                      <div className="text-[13px] leading-4 font-semibold text-[#1D4E74]">
                        {t("viewFile")}
                      </div>
                      <div className="text-xs text-gray-500">pdf - 426 KB</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer contactUsFooter={false} />
    </>
  );
}
