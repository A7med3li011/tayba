"use client";
export const dynamic = "force-dynamic";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RiGraduationCapFill } from "react-icons/ri";
import SaudiRiyalIcon from "@/assets/images/SaudiRiyalSymbol.svg";
import { useSearchParams } from "next/navigation";
import { getLoanDetails } from "@/actions/loan.actions";
import { useTranslations } from "next-intl";
import LoadingScreen from "@/components/Loading/LoadingScreen";

interface Installment {
  amount?: number;
  due_date?: string;
  status?: string;
  statusColor?: string;
  statusTextColor?: string;
}

interface LoanDetails {
  loan_amount?: number;
  remaining_amount?: number;
  number_of_installments?: number;
  submission_date?: string;
  installments?: Installment[];
}

export default function LoanInfo() {
  const t = useTranslations("userProfile.loanInfo");

  const [loanDetails, setLoanDetails] = useState<LoanDetails>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  // Helper function to translate payment status
  const getTranslatedStatus = (status: string | undefined): string => {
    if (!status) return "N/A";

    // Map backend status values to translation keys
    const statusKey = status.toLowerCase().trim();
    return t(`paymentStatus.${statusKey}`) || status;
  };

  const getLoan = async (id: string | null) => {
    if (!id) {
      setError("No loan ID provided");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const loansData = await getLoanDetails(id);
      console.log(loansData.data.loan_details, "zzzzzzzzz");
      setLoanDetails(loansData.data.loan_details);
    } catch (err) {
      console.error("Error fetching loan details:", err);
      setError("Failed to load loan details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLoan(id);
  }, [id]);

  console.log(id);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingScreen />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
          <button
            onClick={() => getLoan(id)}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            {t("retry") || "Retry"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 shadow-lg rounded-2xl p-5 py-10">
      {/* Top Progress Card */}
      <Card className="border border-primary rounded-2xl p-0 py-3">
        <CardContent className="p-6 py-0">
          <div className="flex items-center justify-between">
            {/* Left side - Title and graduation cap icon */}
            <div className="flex items-center gap-4">
              <div className="bg-[#F2F2F7] p-4 rounded-xl">
                <RiGraduationCapFill className="text-primary text-3xl" />
              </div>
              <div className="text-right">
                <h2 className="text-xl font-semibold text-gray-800">
                  {t("studyLoan")}
                </h2>
                <p className="text-gray-600">
                  {loanDetails?.number_of_installments} {t("months")}
                </p>
              </div>
            </div>
            {/* Right side - Progress percentage with curved progress bar */}
            <div className="flex items-center gap-4">
              <div className="relative">
                {/* Circular progress indicator */}
                {/* <div className="w-16 h-16 relative"> */}
                <div
                  className="radial-progress text-secondary border-gray-300 border-2"
                  style={
                    {
                      "--value":
                        loanDetails?.loan_amount &&
                        loanDetails?.remaining_amount
                          ? ((loanDetails?.loan_amount -
                              loanDetails?.remaining_amount) /
                              loanDetails?.loan_amount) *
                            100
                          : 0,
                      "--size": "3.5rem",
                      "--thickness": "5px",
                    } as React.CSSProperties
                  }
                  aria-valuenow={
                    loanDetails?.loan_amount && loanDetails?.remaining_amount
                      ? ((loanDetails?.loan_amount -
                          loanDetails?.remaining_amount) /
                          loanDetails?.loan_amount) *
                        100
                      : 0
                  }
                  role="progressbar"
                >
                  {loanDetails?.loan_amount && loanDetails?.remaining_amount
                    ? (
                        ((loanDetails?.loan_amount -
                          loanDetails?.remaining_amount) /
                          loanDetails?.loan_amount) *
                        100
                      ).toFixed(0)
                    : "0"}
                  %
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-gray-300 rounded-2xl p-3">
        {/* Main Details Grid */}
        <Card>
          <CardContent className="px-8">
            <div className="">
              <div className="space-y-4">
                {/* first row */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                  <div>
                    <p className="text-gray-600 mb-1">{t("loanAmount")}</p>
                    <p className="text-lg font-semibold text-primary">
                      {loanDetails?.loan_amount}
                      <SaudiRiyalIcon className="fill-secondary inline-block w-5 h-5" />
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">{t("remainingAmount")}</p>
                    <p className="text-lg font-semibold text-primary">
                      {loanDetails?.remaining_amount}
                      <SaudiRiyalIcon className="fill-secondary inline-block w-5 h-5" />
                    </p>
                  </div>
                </div>
                {/* second row */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                  <div>
                    <p className="text-gray-600 mb-1">
                      {t("installmentCount")}
                    </p>
                    <p className="text-lg font-semibold text-primary">
                      {loanDetails?.number_of_installments}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">
                      {t("installmentAmount")}
                    </p>
                    <p className="text-lg font-semibold text-primary">
                      {loanDetails?.loan_amount} {""}
                      <SaudiRiyalIcon className="fill-secondary inline-block w-4 h-4" />
                      {t("perMonth")}
                    </p>
                  </div>
                </div>
                {/* third row */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 mb-1">{t("applicationDate")}</p>
                    <p className="text-lg text-primary font-bold">
                      {/* {loanData.applicationDate} */}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">{t("endDate")}</p>
                    <p className="text-lg text-primary font-bold">
                      {loanDetails?.submission_date}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Schedule */}
        <Card className="border border-gray-300 rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-primary">
                {t("installments")}
              </h3>
              {/* <Button
                variant="outline"
                className="text-secondary border-secondary hover:bg-secondary hover:text-white cursor-pointer rounded-full px-6 font-bold"
              >
                {t("earlyPayment")}
              </Button> */}
            </div>

            {/* Table Header */}
            <div className="flex justify-between p-4 px-6 text-gray-600 font-medium  border-t border-gray-100">
              <div className="">{t("amount")}</div>
              <div className="">{t("date")}</div>
              <div className="">{t("status")}</div>
            </div>

            {/* Table Rows */}
            <div className="space-y-3 mt-4">
              {loanDetails?.installments?.map((payment, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm"
                >
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <div className=" flex items-center gap-1">
                      <span className="text-gray-800 font-semibold text-lg">
                        {payment?.amount?.toFixed(2) || "N/A"}
                      </span>
                      <SaudiRiyalIcon className="fill-yellow-500 w-5 h-5" />
                    </div>
                    <div className="text-center text-gray-600 font-medium">
                      {payment?.due_date || "N/A"}
                    </div>
                    <div className="text-end">
                      {payment.status?.toLowerCase() === "due" ? (
                        <Button
                          variant="default"
                          className="bg-secondary hover:bg-secondary/90 text-white rounded-lg   cursor-pointer px-6 py-2 font-bold"
                          onClick={() => {
                            // Handle payment action
                            console.log("Pay installment:", payment);
                          }}
                        >
                          {t("paymentStatus.pay")}
                        </Button>
                      ) : (
                        <span
                          className={`px-4 py-2 rounded-lg ${payment.statusTextColor} text-sm font-bold ${payment.statusColor}`}
                        >
                          {getTranslatedStatus(payment.status)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </Card>
    </div>
  );
}
