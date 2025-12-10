"use client";
import React from "react";
import { RiGraduationCapFill } from "react-icons/ri";
import RiyalIcon from "@/assets/images/SaudiRiyalSymbol.svg";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useLocale, useTranslations } from "next-intl";

interface LoanCardProps {
  id: number;
  name: string;
  loan_amount: number;
  loan_reason: string;
  number_of_installments: number;
  submission_date: string;
  start_date: string | null;
  end_date: string | null;
  status: "under_review" | "approved" | "rejected" | "draft";
  buttonText?: string;
  buttonColor?: string;
  buttonHoverColor?: string;
  onButtonClick?: () => void;
}

export default function LoanCard({
  loan_amount,
  id,
  loan_reason,
  number_of_installments,
  submission_date,
  status,
  buttonText,
  buttonColor = status === "under_review" || status === "draft"
    ? "bg-gray-400"
    : status === "approved"
    ? "bg-green-700"
    : "bg-red-700",
  buttonHoverColor = status === "under_review" || status === "draft"
    ? "hover:bg-gray-500"
    : status === "approved"
    ? "hover:bg-green-800"
    : "hover:bg-red-800",
}: LoanCardProps) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("userProfile.loanCard");

  const defaultButtonText =
    status === "under_review" || status === "draft"
      ? t("status.underReview")
      : status === "approved"
      ? t("status.approved")
      : t("status.rejected");
  const progressPercentage =
    status === "under_review" || status === "draft"
      ? 0
      : status === "approved"
      ? 50
      : 100;
  return (
    <div
      className="bg-white rounded-3xl shadow-sm border border-gray-300 p-6 mx-auto"
      dir="rtl"
    >
      {/* Top section with icon, title and amount */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 bg-[#F2F2F7] flex justify-center items-center rounded-lg ">
            {<RiGraduationCapFill className="text-primary text-2xl" />}
          </div>
          <div>
            <h3 className="text-lg font-bold">{loan_reason}</h3>
            <p className="text-sm text-gray-500">
              {number_of_installments} {t("months")}
            </p>
          </div>
        </div>
        <div className="">
          <div
            className="radial-progress bg-transparent text-secondary text-lg font-bold border-gray-100 border-4"
            style={
              {
                "--value": progressPercentage,
                "--size": "3rem",
                "--thickness": "4px",
              } as React.CSSProperties
            }
            aria-valuenow={progressPercentage}
            role="progressbar"
          >
            {progressPercentage}%
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <div className="text-gray-500 text-sm flex items-center gap-1">
            <span className="text-black text-2xl font-bold">{loan_amount}</span>
            <RiyalIcon className="w-5 h-5 inline-block fill-secondary" />
          </div>
          <div className="text-gray-500 text-sm">{submission_date}</div>
        </div>
        <button
          onClick={() => {
            // if (status !== "approved") {
            //   toast.error(t("loanNotApproved"));
            //   return;
            // }
            router.push(`/${locale}/user-profile/loans/loan-info?id=${id}`);
          }}
          className={`${buttonColor} text-white px-5 py-2 rounded-xl font-bold ${buttonHoverColor} cursor-pointer transition-colors`}
        >
          {buttonText || defaultButtonText}
        </button>
      </div>

      {/* Payment button */}
    </div>
  );
}
