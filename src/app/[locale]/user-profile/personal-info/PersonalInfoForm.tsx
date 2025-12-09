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
  mobile: string;
  nationalId: string;
  idExpiryDate: Date | null;
  gender: string;
  dateOfBirth: Date | null;
  socialStatus: string;
  buildingNo: string;
  streetName: string;
  secondaryNo: string;
  district: string;
  zip: string;
  city: string;
}

export default function PersonalInfoForm() {
  const { refreshUser } = useUser();
  const t = useTranslations("userProfile.personalInfoForm");
  const locale = useLocale();
  const [userInfo, setUserInfo] = useState<userInfoInterface>({
    fullName: "",
    email: "",
    phone: "",
    mobile: "",
    nationalId: "",
    idExpiryDate: null,
    gender: "",
    dateOfBirth: null,
    socialStatus: "",
    buildingNo: "",
    streetName: "",
    secondaryNo: "",
    district: "",
    zip: "",
    city: "",
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
        mobile: data.profile.mobile || "",
        nationalId: data.profile.national_id,
        idExpiryDate: data.profile.id_expiry_date
          ? parse(data.profile.id_expiry_date, "yyyy-MM-dd", new Date())
          : null,
        gender: data.profile.gender || "",
        dateOfBirth: data.profile.date_of_birth
          ? parse(data.profile.date_of_birth, "yyyy-MM-dd", new Date())
          : null,
        socialStatus: data.profile.social_status || "",
        buildingNo: data.profile.building_no || "",
        streetName: data.profile.street_name || "",
        secondaryNo: data.profile.secondary_no || "",
        district: data.profile.district || "",
        zip: data.profile.zip || "",
        city: data.profile.city || "",
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
        mobile: userInfo.mobile,
        national_id: userInfo.nationalId,
        id_expiry_date: userInfo.idExpiryDate
          ? format(userInfo.idExpiryDate, "yyyy-MM-dd")
          : "",
        gender: userInfo.gender,
        date_of_birth: userInfo.dateOfBirth
          ? format(userInfo.dateOfBirth, "yyyy-MM-dd")
          : "",
        social_status: userInfo.socialStatus,
        building_no: userInfo.buildingNo,
        street_name: userInfo.streetName,
        secondary_no: userInfo.secondaryNo,
        district: userInfo.district,
        zip: userInfo.zip,
        city: userInfo.city,
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

            {/* More skeletons for additional fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
              </div>
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

          {/* Phone Numbers */}
          <div className="grid grid-cols-2 gap-4">
            {/* Phone 1 */}
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

            {/* Phone 2 (Mobile) */}
            <div className="space-y-2">
              <Label
                htmlFor="mobile"
                className="text-start text-gray-700 font-bold"
              >
                {t("mobile")}
              </Label>
              <Input
                id="mobile"
                type="tel"
                value={userInfo.mobile}
                onChange={(e) => handleInputChange("mobile", e.target.value)}
                disabled={!isEditing}
                className={`text-end ${
                  !isEditing
                    ? "disabled:opacity-100 disabled:text-black bg-gray-100 cursor-not-allowed"
                    : "bg-white"
                } border-gray-200 rounded-lg h-12 px-4`}
                dir="ltr"
              />
            </div>
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

          {/* National ID and Expiry Date */}
          <div className="grid grid-cols-2 gap-4">
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

            {/* Date of Birth */}
            <div className="space-y-2">
              <Label
                htmlFor="dateOfBirth"
                className="text-start text-gray-700 font-bold"
              >
                {t("dateOfBirth")}
              </Label>
              <DatePicker
                selected={userInfo.dateOfBirth}
                onChange={(date) => handleInputChange("dateOfBirth", date)}
                locale={locale}
                dateFormat="dd/MM/yyyy"
                maxDate={new Date()}
                disabled={!isEditing}
                placeholderText={t("dateOfBirthPlaceholder")}
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
          </div>

          {/* Gender and Social Status */}
          <div className="grid grid-cols-2 gap-4">
            {/* Gender */}
            <div className="space-y-2">
              <Label
                htmlFor="gender"
                className="text-start text-gray-700 font-bold"
              >
                {t("gender")}
              </Label>
              <select
                id="gender"
                value={userInfo.gender}
                onChange={(e) => handleInputChange("gender", e.target.value)}
                disabled={!isEditing}
                className={`w-full ${
                  !isEditing
                    ? "disabled:opacity-100 disabled:text-black bg-gray-100 cursor-not-allowed"
                    : "bg-white"
                } border border-gray-200 rounded-lg h-12 px-4`}
              >
                <option value="">{t("genderPlaceholder")}</option>
                <option value="male">{t("male")}</option>
                <option value="female">{t("female")}</option>
              </select>
            </div>

            {/* Social Status */}
            <div className="space-y-2">
              <Label
                htmlFor="socialStatus"
                className="text-start text-gray-700 font-bold"
              >
                {t("socialStatus")}
              </Label>
              <select
                id="socialStatus"
                value={userInfo.socialStatus}
                onChange={(e) => handleInputChange("socialStatus", e.target.value)}
                disabled={!isEditing}
                className={`w-full ${
                  !isEditing
                    ? "disabled:opacity-100 disabled:text-black bg-gray-100 cursor-not-allowed"
                    : "bg-white"
                } border border-gray-200 rounded-lg h-12 px-4`}
              >
                <option value="">{t("socialStatusPlaceholder")}</option>
                <option value="single">{t("single")}</option>
                <option value="married">{t("married")}</option>
                <option value="divorced">{t("divorced")}</option>
                <option value="widowed">{t("widowed")}</option>
              </select>
            </div>
          </div>

          {/* Address Section */}
          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-bold text-gray-700">{t("addressTitle")}</h3>

            {/* Building Number and Street Name */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="buildingNo"
                  className="text-start text-gray-700 font-bold"
                >
                  {t("buildingNo")}
                </Label>
                <Input
                  id="buildingNo"
                  type="text"
                  value={userInfo.buildingNo}
                  onChange={(e) => handleInputChange("buildingNo", e.target.value)}
                  disabled={!isEditing}
                  maxLength={4}
                  className={`text-start ${
                    !isEditing
                      ? "disabled:opacity-100 disabled:text-black bg-gray-100 cursor-not-allowed"
                      : "bg-white"
                  } border-gray-200 rounded-lg h-12 px-4`}
                  dir={locale === "ar" ? "rtl" : "ltr"}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="streetName"
                  className="text-start text-gray-700 font-bold"
                >
                  {t("streetName")}
                </Label>
                <Input
                  id="streetName"
                  type="text"
                  value={userInfo.streetName}
                  onChange={(e) => handleInputChange("streetName", e.target.value)}
                  disabled={!isEditing}
                  className={`text-start ${
                    !isEditing
                      ? "disabled:opacity-100 disabled:text-black bg-gray-100 cursor-not-allowed"
                      : "bg-white"
                  } border-gray-200 rounded-lg h-12 px-4`}
                  dir={locale === "ar" ? "rtl" : "ltr"}
                />
              </div>
            </div>

            {/* Secondary Number and District */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="secondaryNo"
                  className="text-start text-gray-700 font-bold"
                >
                  {t("secondaryNo")}
                </Label>
                <Input
                  id="secondaryNo"
                  type="text"
                  value={userInfo.secondaryNo}
                  onChange={(e) => handleInputChange("secondaryNo", e.target.value)}
                  disabled={!isEditing}
                  maxLength={4}
                  className={`text-start ${
                    !isEditing
                      ? "disabled:opacity-100 disabled:text-black bg-gray-100 cursor-not-allowed"
                      : "bg-white"
                  } border-gray-200 rounded-lg h-12 px-4`}
                  dir={locale === "ar" ? "rtl" : "ltr"}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="district"
                  className="text-start text-gray-700 font-bold"
                >
                  {t("district")}
                </Label>
                <Input
                  id="district"
                  type="text"
                  value={userInfo.district}
                  onChange={(e) => handleInputChange("district", e.target.value)}
                  disabled={!isEditing}
                  className={`text-start ${
                    !isEditing
                      ? "disabled:opacity-100 disabled:text-black bg-gray-100 cursor-not-allowed"
                      : "bg-white"
                  } border-gray-200 rounded-lg h-12 px-4`}
                  dir={locale === "ar" ? "rtl" : "ltr"}
                />
              </div>
            </div>

            {/* Zip Code and City */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="zip"
                  className="text-start text-gray-700 font-bold"
                >
                  {t("zip")}
                </Label>
                <Input
                  id="zip"
                  type="text"
                  value={userInfo.zip}
                  onChange={(e) => handleInputChange("zip", e.target.value)}
                  disabled={!isEditing}
                  maxLength={5}
                  className={`text-start ${
                    !isEditing
                      ? "disabled:opacity-100 disabled:text-black bg-gray-100 cursor-not-allowed"
                      : "bg-white"
                  } border-gray-200 rounded-lg h-12 px-4`}
                  dir={locale === "ar" ? "rtl" : "ltr"}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="city"
                  className="text-start text-gray-700 font-bold"
                >
                  {t("city")}
                </Label>
                <Input
                  id="city"
                  type="text"
                  value={userInfo.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  disabled={!isEditing}
                  className={`text-start ${
                    !isEditing
                      ? "disabled:opacity-100 disabled:text-black bg-gray-100 cursor-not-allowed"
                      : "bg-white"
                  } border-gray-200 rounded-lg h-12 px-4`}
                  dir={locale === "ar" ? "rtl" : "ltr"}
                />
              </div>
            </div>
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
