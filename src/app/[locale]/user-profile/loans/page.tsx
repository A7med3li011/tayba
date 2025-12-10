"use client";
import LoanCard from "@/components/user-profile/LoanCard";
import { useRouter } from "next/navigation";
import { FaCommentDollar } from "react-icons/fa";
import { getUserLoansList } from "@/actions/loan.actions";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";

interface Loan {
  id: number;
  name: string;
  loan_amount: number;
  loan_reason: string;
  number_of_installments: number;
  submission_date: string;
  start_date: string | null;
  end_date: string | null;
  status: "under_review" | "approved" | "rejected";
}

export default function LoanDashboard() {
  const [loans, setLoans] = useState([]);
  const t = useTranslations("userProfile.loansPage");
  const locale = useLocale();

  const getLoans = async () => {
    const loansData = await getUserLoansList(1, 10);
    setLoans(loansData?.loans ?? []);
  };

  useEffect(() => {
    getLoans();
  }, []);

  console.log(loans, "lllllll");
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 justify-between w-full bg-[#d0d5dd52] p-3 rounded-xl">
          <div className="flex items-center gap-2 ">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <FaCommentDollar className="w-6 h-6 text-primary" />
            </div>
            <span className="text-primary text-lg font-bold">{t("title")}</span>
          </div>
          <button
            onClick={() =>
              router.push(`/${locale}/user-profile/loans/loan-request`)
            }
            className="border-2 border-secondary text-secondary px-5 py-1 rounded-full font-bold cursor-pointer hover:bg-secondary hover:text-white transition-colors"
          >
            {t("requestLoan")}
          </button>
        </div>
      </div>

      {/* Loan Cards */}
      <div className="space-y-4">
        {loans.map((loan: Loan) => (
          <LoanCard
            key={loan.id}
            id={loan.id}
            name={loan.name}
            loan_amount={loan.loan_amount}
            loan_reason={loan.loan_reason}
            number_of_installments={loan.number_of_installments}
            submission_date={loan.submission_date}
            start_date={loan.start_date}
            end_date={loan.end_date}
            status={loan.status}
          />
        ))}
      </div>
    </div>
  );
}
