import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import SaudiRiyalIcon from "@/assets/images/SaudiRiyalSymbol.svg";
import FileUploadField from "./FileUploadField";
import { useLocale, useTranslations } from "next-intl";

// Simple data structure - everything in one place!
interface FinancialData {
  incomeAmount: string;
  rentAmount: string;
  electricityAvg: string;
  hasOtherCommitments: boolean;
  otherCommitmentsDetails: string;
  incomeProofFile: File | null;
}

interface FinancialStatusFormProps {
  data: FinancialData; // All data in one object
  onChange: (
    field: keyof FinancialData,
    value: string | boolean | File | null
  ) => void; // Single change handler
}

export default function FinancialStatusForm({
  data,
  onChange,
}: FinancialStatusFormProps) {
  const t = useTranslations("loanRequestForm.financialStatus");
  const locale = useLocale();
  return (
    <Card className="w-full bg-gray-50 border-0 shadow-none">
      <CardHeader className="p-0">
        <CardTitle className="text-right text-primary text-xl font-bold bg-[#D0D5DD52] px-6 py-3 rounded-xl">
          {t("title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label
            htmlFor="monthlyIncome"
            className="text-right block text-gray-600 font-bold"
          >
            {t("monthlyIncome")}
          </Label>
          <div className="relative">
            <Input
              id="monthlyIncome"
              type="text"
              placeholder="8000.00"
              value={data.incomeAmount}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || /^\d*\.?\d*$/.test(value)) {
                  onChange("incomeAmount", value);
                }
              }}
              onKeyDown={(e) => {
                if (
                  !/[0-9.]/.test(e.key) &&
                  ![
                    "Backspace",
                    "Delete",
                    "ArrowLeft",
                    "ArrowRight",
                    "Tab",
                  ].includes(e.key)
                ) {
                  e.preventDefault();
                }
              }}
              className="text-right h-12 "
              dir="rtl"
            />
            <span
              className={`absolute ${
                locale == "ar" ? "end-3" : "start-3"
              }  top-1/2 transform -translate-y-1/2 text-gray-500 text-lg`}
            >
              <SaudiRiyalIcon className="fill-primary inline-block w-4 h-4" />
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="rentAmount"
            className="text-right block text-gray-600 font-bold"
          >
            {t("rentAmount")}
          </Label>
          <div className="relative">
            <Input
              id="rentAmount"
              type="text"
              placeholder="2500.00"
              value={data.rentAmount}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || /^\d*\.?\d*$/.test(value)) {
                  onChange("rentAmount", value);
                }
              }}
              onKeyDown={(e) => {
                if (
                  !/[0-9.]/.test(e.key) &&
                  ![
                    "Backspace",
                    "Delete",
                    "ArrowLeft",
                    "ArrowRight",
                    "Tab",
                  ].includes(e.key)
                ) {
                  e.preventDefault();
                }
              }}
              className="text-right h-12 "
              dir="rtl"
            />
            <span
              className={`absolute ${
                locale == "ar" ? "end-3" : "start-3"
              } top-1/2 transform -translate-y-1/2 text-gray-500 text-lg`}
            >
              <SaudiRiyalIcon className="fill-primary inline-block w-4 h-4" />
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="electricityAvg"
            className="text-right block text-gray-600 font-bold"
          >
            {t("electricityAvg")}
          </Label>
          <div className="relative">
            <Input
              id="electricityAvg"
              type="text"
              placeholder="300.50"
              value={data.electricityAvg}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || /^\d*\.?\d*$/.test(value)) {
                  onChange("electricityAvg", value);
                }
              }}
              onKeyDown={(e) => {
                if (
                  !/[0-9.]/.test(e.key) &&
                  ![
                    "Backspace",
                    "Delete",
                    "ArrowLeft",
                    "ArrowRight",
                    "Tab",
                  ].includes(e.key)
                ) {
                  e.preventDefault();
                }
              }}
              className="text-right h-12 "
              dir="rtl"
            />
            <span
              className={`absolute ${
                locale == "ar" ? "end-3" : "start-3"
              } top-1/2 transform -translate-y-1/2 text-gray-500 text-lg`}
            >
              <SaudiRiyalIcon className="fill-primary inline-block w-4 h-4" />
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="hasOtherCommitments"
              checked={data.hasOtherCommitments}
              onChange={(e) =>
                onChange("hasOtherCommitments", e.target.checked)
              }
              className="w-5 h-5 text-green-600 border-2 border-gray-300 rounded focus:ring-green-500"
            />
            <Label
              htmlFor="hasOtherCommitments"
              className="text-gray-700 font-bold cursor-pointer"
            >
              {t("hasOtherCommitments")}
            </Label>
          </div>
        </div>

        {data.hasOtherCommitments && (
          <div className="space-y-2">
            <Label
              htmlFor="otherCommitmentsDetails"
              className="text-right block text-gray-600 font-bold"
            >
              {t("otherCommitmentsDetails")}
            </Label>
            <Input
              id="otherCommitmentsDetails"
              type="text"
              placeholder={t("uploadFile")}
              value={data.otherCommitmentsDetails}
              onChange={(e) =>
                onChange("otherCommitmentsDetails", e.target.value)
              }
              className="text-right h-12"
              dir="rtl"
            />
          </div>
        )}

        <FileUploadField
          id="incomeProof"
          label={t("incomeProof")}
          selectedFile={data.incomeProofFile}
          onChange={(e) => {
            const file = e.target.files?.[0];
            onChange("incomeProofFile", file || null);
          }}
        />
      </CardContent>
    </Card>
  );
}
