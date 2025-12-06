import SaudiRiyalIcon from "@/assets/images/SaudiRiyalSymbol.svg";
import React from "react";
import { AiOutlineDollar } from "react-icons/ai";
import { useTranslations } from "next-intl";

interface ActiveLoan {
  id?: number;
  name?: string;
  loan_amount?: number;
  remaining_installments?: number;
  paid_installments_percentage?: number;
  end_date?: string;
  status?: string;
  total_installments?: number;
}

interface LoanStatusCardProps {
  activeLoan?: ActiveLoan | null;
}

function LoanStatusCard({ activeLoan }: LoanStatusCardProps) {
  const t = useTranslations("userProfile.loanStatusCard");
  const isLoading = false;
  const hasLoans = !!activeLoan;

  // Loading Skeleton
  if (isLoading) {
    return (
      <div className="bg-primary rounded-xl p-6 text-white shadow-lg mb-6 border-white border-8 animate-pulse">
        <div className="flex flex-row-reverse items-center justify-between">
          {/* Right side skeleton */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-white/20 rounded-full"></div>
            <div className="flex items-center gap-2 mt-4">
              <div className="h-4 w-20 bg-white/20 rounded"></div>
              <div className="h-6 w-8 bg-white/20 rounded"></div>
            </div>
          </div>

          {/* Left side skeleton */}
          <div className="flex flex-col">
            <div className="flex items-center justify-start gap-2 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-full"></div>
              <div className="h-5 w-24 bg-white/20 rounded"></div>
            </div>

            <div className="flex items-center justify-start gap-2 mb-6 px-4">
              <div className="h-10 w-32 bg-white/20 rounded"></div>
              <div className="w-8 h-8 bg-white/20 rounded"></div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <div className="h-5 w-20 bg-white/20 rounded"></div>
                <div className="h-5 w-24 bg-white/20 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty State - No Loans
  if (!hasLoans) {
    return (
      <div className="bg-[#686E94] rounded-xl p-8 shadow-lg mb-6 border-white border-4 relative overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full -ml-20 -mb-20"></div>
        </div>

        <div className="relative flex flex-col items-center justify-center text-center py-8">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-8 mb-5 shadow-xl">
            <AiOutlineDollar className="w-16 h-16 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">
            {t("noLoans")}
          </h3>
          <p className="text-white/80 text-base max-w-sm leading-relaxed">
            {t("noLoansDescription")}
          </p>
          <div className="mt-6 flex items-center gap-2 text-white/60 text-sm">
            <div className="w-2 h-2 bg-white/60 rounded-full"></div>
            <span>{t("loanDetailsAvailable")}</span>
          </div>
        </div>
      </div>
    );
  }

  // Normal State - With Loan Data
  return (
    <div className="bg-[#686E94] rounded-xl p-6 text-white shadow-lg mb-6 border-white border-8">
      <div className="flex flex-row-reverse items-center justify-between">
        {/* Progress Circle and Remaining Installments - Right side in RTL */}
        <div className="flex flex-col items-center">
          <div
            className="radial-progress bg-gradient-to-b from-[#4750707e] to-[#6b74959d] text-xl font-bold text-secondary border-gray-100 border-4"
            style={
              {
                "--value": activeLoan?.paid_installments_percentage || 0,
              } as React.CSSProperties
            }
            aria-valuenow={activeLoan?.paid_installments_percentage || 0}
            role="progressbar"
          >
            {activeLoan?.paid_installments_percentage || 0}%
          </div>
          {/* Remaining Installments below circle */}
          <div className="text-center flex items-center gap-2 mt-4">
            <div className="font-bold">{t("remainingInstallments")}</div>
            <div className="text-2xl font-bold">
              {activeLoan?.remaining_installments || 0}
            </div>
          </div>
        </div>

        {/* Content - Left side in RTL */}
        <div className="flex flex-col">
          {/* Total Amount Section */}
          <div className="flex items-center justify-start gap-2 mb-4">
            <div className="bg-white/20 rounded-full p-1.5">
              <AiOutlineDollar className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-lg">{t("totalLoan")}</span>
          </div>

          {/* Amount Display */}
          <div className="flex items-center justify-start gap-2 mb-6 px-4">
            <span className="text-4xl font-bold">
              {activeLoan?.loan_amount?.toLocaleString() || 0}
            </span>
            <SaudiRiyalIcon className="fill-secondary inline-block w-8 h-8" />
          </div>

          {/* Bottom Info Row */}
          <div className="flex items-center justify-between text-sm opacity-90">
            <div className="text-start flex gap-2">
              <span className="font-bold text-lg">{t("endDate")}</span>
              <span className="text-lg">{activeLoan?.end_date || "-"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanStatusCard;
