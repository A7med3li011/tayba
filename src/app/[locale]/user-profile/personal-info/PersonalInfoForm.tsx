"use client";
import { getProfileData, editProfileData } from "@/actions/profile.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useCallback, useEffect, useState } from "react";
import { useUser } from "@/contexts/UserContext";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { ar } from "date-fns/locale/ar";
import { enUS } from "date-fns/locale/en-US";
import { format, parse } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import {
  handleApiError,
  showSuccessToast,
  showErrorToast,
} from "@/lib/toast-utils";
import { useTranslations, useLocale } from "next-intl";

registerLocale("ar", ar);
registerLocale("en", enUS);

interface userInfoInterface {
  fullName: string;
  email: string;
  phone: string;
  nationalId: string;
  idExpiryDate: Date | null;
}

export default function PersonalInfoForm() {
  const { refreshUser } = useUser();
  const t = useTranslations("userProfile.personalInfoForm");
  const locale = useLocale();
  const [userInfo, setUserInfo] = useState<userInfoInterface>({
    fullName: "",
    email: "",
    phone: "",
    nationalId: "",
    idExpiryDate: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const getUserProfileData = useCallback(async () => {
    try {
      const data = await getProfileData();
      console.log(data);

      if (!data.success) {
        handleApiError({
          success: data.success,
          message: data.message,
          status: data.status,
        });
        return;
      }

      setUserInfo({
        fullName: data.profile.name,
        email: data.profile.email,
        phone: data.profile.phone,
        nationalId: data.profile.national_id,
        idExpiryDate: data.profile.id_expiry_date
          ? parse(data.profile.id_expiry_date, "yyyy-MM-dd", new Date())
          : null,
      });
    } catch (error) {
      console.error("Error fetching profile data:", error);
      const errorMessage =
        error instanceof Error ? error.message : t("unexpectedError");
      showErrorToast(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const profileData = {
        name: userInfo.fullName,
        email: userInfo.email,
        phone: userInfo.phone,
        national_id: userInfo.nationalId,
        id_expiry_date: userInfo.idExpiryDate
          ? format(userInfo.idExpiryDate, "yyyy-MM-dd")
          : "",
      };

      const response = await editProfileData(profileData);

      if (response.success) {
        showSuccessToast(response.message || t("saveSuccess"));
        setIsEditing(false);
        await refreshUser();
      } else {
        handleApiError({
          success: response.success,
          message: response.message,
          status: response.status,
        });
      }
    } catch (error) {
      console.error("Error saving profile data:", error);
      const errorMessage =
        error instanceof Error ? error.message : t("unexpectedError");
      showErrorToast(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (
    field: keyof userInfoInterface,
    value: string | Date | null
  ) => {
    setUserInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    getUserProfileData();
  }, [getUserProfileData]);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="space-y-6 w-full">
            {/* Skeleton for Full Name */}
            <div className="space-y-2">
              <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
            </div>

            {/* Skeleton for Email */}
            <div className="space-y-2">
              <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
            </div>

            {/* Skeleton for Phone */}
            <div className="space-y-2">
              <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
            </div>

            {/* Skeleton for National ID */}
            <div className="space-y-2">
              <div className="h-5 w-36 bg-gray-200 rounded animate-pulse" />
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
            </div>

            {/* Skeleton for ID Expiry Date */}
            <div className="space-y-2">
              <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
            </div>

            {/* Skeleton for Button */}
            <div className="pt-4 flex justify-end">
              <div className="h-12 w-32 bg-gray-200 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      ) : (
        /* Form */
        <div className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Label
              htmlFor="fullName"
              className="text-start text-gray-700 font-bold"
            >
              {t("fullName")}
            </Label>
            <Input
              id="fullName"
              type="text"
              value={userInfo.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              disabled={!isEditing}
              className={`text-start ${
                !isEditing
                  ? "disabled:opacity-100 disabled:text-black bg-gray-100 cursor-not-allowed"
                  : "bg-white"
              } border-gray-200 rounded-lg h-12 px-4`}
              dir={locale === "ar" ? "rtl" : "ltr"}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-start text-gray-700 font-bold"
            >
              {t("email")}
            </Label>
            <Input
              id="email"
              type="email"
              value={userInfo.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              disabled={!isEditing}
              className={`text-start ${
                !isEditing
                  ? "disabled:opacity-100 disabled:text-black bg-gray-100 cursor-not-allowed"
                  : "bg-white"
              } border-gray-200 rounded-lg h-12 px-4`}
              dir={locale === "ar" ? "rtl" : "ltr"}
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="text-start text-gray-700 font-bold"
            >
              {t("phone")}
            </Label>
            <Input
              id="phone"
              type="tel"
              value={userInfo.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              disabled={!isEditing}
              className={`text-end ${
                !isEditing
                  ? "disabled:opacity-100 disabled:text-black bg-gray-100 cursor-not-allowed"
                  : "bg-white"
              } border-gray-200 rounded-lg h-12 px-4`}
              dir="ltr"
            />
          </div>

          {/* National ID */}
          <div className="space-y-2">
            <Label
              htmlFor="nationalId"
              className="text-start text-gray-700 font-bold"
            >
              {t("nationalId")}
            </Label>
            <Input
              id="nationalId"
              type="text"
              value={userInfo.nationalId}
              onChange={(e) => handleInputChange("nationalId", e.target.value)}
              disabled={!isEditing}
              className={`text-start ${
                !isEditing
                  ? "disabled:opacity-100 disabled:text-black bg-gray-100 cursor-not-allowed"
                  : "bg-white"
              } border-gray-200 rounded-lg h-12 px-4`}
              dir={locale === "ar" ? "rtl" : "ltr"}
            />
          </div>

          {/* ID Expiry Date with DatePicker */}
          <div className="space-y-2">
            <Label
              htmlFor="idExpiryDate"
              className="text-start text-gray-700 font-bold"
            >
              {t("expiryDate")}
            </Label>
            <DatePicker
              selected={userInfo.idExpiryDate}
              onChange={(date) => handleInputChange("idExpiryDate", date)}
              locale={locale}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              disabled={!isEditing}
              placeholderText={t("expiryDatePlaceholder")}
              className={`w-full text-start ${
                !isEditing
                  ? "disabled:opacity-100 disabled:text-black bg-gray-100 cursor-not-allowed"
                  : "bg-white"
              } border border-gray-200 rounded-lg h-12 px-4`}
              wrapperClassName="w-full"
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
            />
          </div>

          {/* Edit/Save Button */}
          <div className="pt-4 flex justify-end">
            <Button
              onClick={() => {
                if (isEditing) {
                  handleSave();
                } else {
                  setIsEditing(true);
                }
              }}
              disabled={isSaving}
              variant="outline"
              className="w-auto px-8 py-3 border-2 border-secondary text-secondary hover:text-white hover:bg-secondary rounded-full font-bold bg-white disabled:opacity-50"
            >
              {isSaving
                ? t("saving")
                : isEditing
                ? t("saveChanges")
                : t("edit")}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
