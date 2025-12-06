import React from 'react'
import { User } from 'lucide-react'
import PersonalInfoForm from "@/app/[locale]/user-profile/personal-info/PersonalInfoForm"
import { useTranslations } from "next-intl"

export default function PersonalInfo() {
  const t = useTranslations("userProfile")

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 bg-[#D0D5DD52] p-3 rounded-xl">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-gray-600" />
        </div>
        <h1 className="text-lg font-semibold text-primary">{t("personalInfo")}</h1>
      </div>

      <PersonalInfoForm />
    </div>
  )
}
