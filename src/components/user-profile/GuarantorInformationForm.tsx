import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { CalendarIcon, ChevronDown } from 'lucide-react';
import FileUploadField from './FileUploadField';

interface Country {
    id: number;
    name: string;
    code: string;
    image?: string;
}

// Simple data structure - everything in one place!
interface GuarantorData {
    name: string;
    nationalId: string;
    idExpiryDate: string;
    nationalityId: string;
    phone: string;
    email: string;
    street: string;
    workAddress: string;
    workPhone: string;
    city: string;
    backupName: string;
    backupPhone: string;
    jobTitle: string;
    totalSalary: string;
    jobStartDate: string;
    employer: string;
    employerAddress: string;
    directManagerName: string;
    directManagerJobTitle: string;
    hasActiveLoan: boolean;
    remainingLoanAmount: string;
    signatureFile: File | null;
    nationalAddressFile: File | null;
    validIdFile: File | null;
    incomeProofFile: File | null;
    creditReportFile: File | null;
}

interface GuarantorInformationFormProps {
    data: GuarantorData;  // All data in one object
    onChange: (field: keyof GuarantorData, value: string | boolean | File | null) => void;  // Single change handler
    countries: Country[];
    guarantorTermsChecked: boolean;
    onGuarantorTermsChange: () => void;
}

export default function GuarantorInformationForm({
    data,
    onChange,
    countries,
    guarantorTermsChecked,
    onGuarantorTermsChange
}: GuarantorInformationFormProps) {

    return (
        <Card className="w-full bg-gray-50 border-0 shadow-none">
            <CardHeader className="p-0">
                <CardTitle className="text-primary text-xl font-bold bg-[#D0D5DD52] px-6 py-3 rounded-xl">
                    بيانات الكفيل
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                        <Label htmlFor="guarantorName" className="block text-gray-600 font-medium">
                            الاسم
                        </Label>
                        <Input
                            id="guarantorName"
                            type="text"
                            placeholder="محمد أحمد محمد"
                            value={data.name}
                            onChange={(e) => onChange('name', e.target.value)}
                            className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400"
                        />
                    </div>

                    {/* Mobile Number */}
                    <div className="space-y-2">
                        <Label htmlFor="guarantorPhone" className="block text-gray-600 font-medium">
                            رقم الجوال
                        </Label>
                        <Input
                            id="guarantorPhone"
                            type="tel"
                            placeholder="+966509876543"
                            value={data.phone}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === '' || /^[0-9+\-\s()]*$/.test(value)) {
                                    onChange('phone', value);
                                }
                            }}
                            onKeyDown={(e) => {
                                if (!/[0-9+\-\s()]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400"
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="guarantorEmail" className="block text-gray-600 font-medium">
                            البريد الإلكتروني
                        </Label>
                        <Input
                            id="guarantorEmail"
                            type="email"
                            placeholder="mohammed@example.com"
                            value={data.email}
                            onChange={(e) => onChange('email', e.target.value)}
                            className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400"
                        />
                    </div>

                    {/* Nationality */}
                    <div className="space-y-2">
                        <Label htmlFor="guarantorNationality" className="block text-gray-600 font-medium">
                            الجنسية
                        </Label>
                        <div className="relative">
                            <select
                                id="guarantorNationality"
                                value={data.nationalityId}
                                onChange={(e) => onChange('nationalityId', e.target.value)}
                                className="h-12 w-full rounded-lg border border-gray-300 bg-white px-3 appearance-none cursor-pointer text-gray-600"
                            >
                                <option value="اختيار">اختيار</option>
                                {countries.map((c: Country) => (
                                    <option key={c.id} value={String(c.id)}>{c.name}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                


                    {/* ID Number */}
                    <div className="space-y-2">
                        <Label htmlFor="guarantorIdNumber" className="block text-gray-600 font-medium">
                            رقم الهوية
                        </Label>
                        <Input
                            id="guarantorIdNumber"
                            type="text"
                            placeholder="9876543210987"
                            value={data.nationalId}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === '' || /^\d*$/.test(value)) {
                                    onChange('nationalId', value);
                                }
                            }}
                            onKeyDown={(e) => {
                                if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400"
                        />
                    </div>

                    {/* Expiration Date */}
                    <div className="space-y-2">
                        <Label htmlFor="guarantorExpirationDate" className="block text-gray-600 font-medium">
                            تاريخ الانتهاء
                        </Label>
                        <div className="relative">
                            <Input
                                id="guarantorExpirationDate"
                                type="date"
                                placeholder="2029-06-15"
                                value={data.idExpiryDate}
                                onChange={(e) => onChange('idExpiryDate', e.target.value)}
                                className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400 pr-10"
                            />
                            <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        </div>
                    </div>

                    {/* City */}
                    <div className="space-y-2">
                        <Label htmlFor="guarantorCity" className="block text-gray-600 font-medium">
                            المدينة
                        </Label>
                        <Input
                            id="guarantorCity"
                            type="text"
                            placeholder="الرياض"
                            value={data.city}
                            onChange={(e) => onChange('city', e.target.value)}
                            className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400"
                        />
                    </div>
                    
                    {/* Address */}
                    <div className="space-y-2">
                        <Label htmlFor="guarantorAddress" className="block text-gray-600 font-medium">
                            عنوان السكن
                        </Label>
                        <Input
                            id="guarantorAddress"
                            type="text"
                            placeholder="شارع العليا، حي السفارات"
                            value={data.street}
                            onChange={(e) => onChange('street', e.target.value)}
                            className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400"
                        />
                    </div>



                    {/* Work Mobile */}
                    <div className="space-y-2">
                        <Label htmlFor="guarantorWorkMobile" className="block text-gray-600 font-medium">
                            جوال العمل
                        </Label>
                        <Input
                            id="guarantorWorkMobile"
                            type="tel"
                            placeholder="+966118765432"
                            value={data.workPhone}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === '' || /^[0-9+\-\s()]*$/.test(value)) {
                                    onChange('workPhone', value);
                                }
                            }}
                            onKeyDown={(e) => {
                                if (!/[0-9+\-\s()]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400"
                        />
                    </div>

                    {/* Work Title */}
                    <div className="space-y-2">
                        <Label htmlFor="guarantorWorkTitle" className="block text-gray-600 font-medium">
                            عنوان العمل
                        </Label>
                        <Input
                            id="guarantorWorkTitle"
                            type="text"
                            placeholder="وزارة التعليم"
                            value={data.workAddress}
                            onChange={(e) => onChange('workAddress', e.target.value)}
                            className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400"
                        />
                    </div>

                    {/* Job Title */}
                    <div className="space-y-2">
                        <Label htmlFor="guarantorJobTitle" className="block text-gray-600 font-medium">
                            المسمى الوظيفي للكفيل
                        </Label>
                        <Input
                            id="guarantorJobTitle"
                            type="text"
                            placeholder="ادخال"
                            value={data.jobTitle}
                            onChange={(e) => onChange('jobTitle', e.target.value)}
                            className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400"
                        />
                    </div>

                    {/* Total Salary */}
                    <div className="space-y-2">
                        <Label htmlFor="guarantorTotalSalary" className="block text-gray-600 font-medium">
                            اجمالي الراتب
                        </Label>
                        <Input
                            id="guarantorTotalSalary"
                            type="text"
                            placeholder="ادخال"
                            value={data.totalSalary}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === '' || /^\d*\.?\d*$/.test(value)) {
                                    onChange('totalSalary', value);
                                }
                            }}
                            onKeyDown={(e) => {
                                if (!/[0-9.]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400"
                        />
                    </div>

                    {/* Job Start Date */}
                    <div className="space-y-2">
                        <Label htmlFor="guarantorJobStartDate" className="block text-gray-600 font-medium">
                            تاريخ مباشرة الوظيفة
                        </Label>
                        <Input
                            id="guarantorJobStartDate"
                            type="date"
                            placeholder="YYYY-MM-DD"
                            value={data.jobStartDate}
                            onChange={(e) => onChange('jobStartDate', e.target.value)}
                            className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400"
                        />
                    </div>

                    {/* Employer */}
                    <div className="space-y-2">
                        <Label htmlFor="guarantorEmployer" className="block text-gray-600 font-medium">
                            جهة العمل
                        </Label>
                        <Input
                            id="guarantorEmployer"
                            type="text"
                            placeholder="ادخال"
                            value={data.employer}
                            onChange={(e) => onChange('employer', e.target.value)}
                            className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400"
                        />
                    </div>

                    {/* Employer Address */}
                    <div className="space-y-2">
                        <Label htmlFor="guarantorEmployerAddress" className="block text-gray-600 font-medium">
                            عنوان جهة العمل
                        </Label>
                        <Input
                            id="guarantorEmployerAddress"
                            type="text"
                            placeholder="ادخال"
                            value={data.employerAddress}
                            onChange={(e) => onChange('employerAddress', e.target.value)}
                            className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400"
                        />
                    </div>

                    {/* Direct Manager Name */}
                    <div className="space-y-2">
                        <Label htmlFor="guarantorDirectManagerName" className="block text-gray-600 font-medium">
                            اسم المدير المباشر
                        </Label>
                        <Input
                            id="guarantorDirectManagerName"
                            type="text"
                            placeholder="ادخال"
                            value={data.directManagerName}
                            onChange={(e) => onChange('directManagerName', e.target.value)}
                            className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400"
                        />
                    </div>

                    {/* Direct Manager Job Title */}
                    <div className="space-y-2">
                        <Label htmlFor="guarantorDirectManagerJobTitle" className="block text-gray-600 font-medium">
                            المسمى الوظيفي للمدير المباشر
                        </Label>
                        <Input
                            id="guarantorDirectManagerJobTitle"
                            type="text"
                            placeholder="ادخال"
                            value={data.directManagerJobTitle}
                            onChange={(e) => onChange('directManagerJobTitle', e.target.value)}
                            className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400"
                        />
                    </div>

                    {/* Active Loan Question */}
                    <div className="space-y-2 col-span-2">
                        <Label className="block text-gray-700 font-bold mb-3">
                            هل الكفيل لديه قرض قائم في الوقف؟
                        </Label>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    id="guarantorHasActiveLoanYes"
                                    name="guarantorHasActiveLoan"
                                    checked={data.hasActiveLoan === true}
                                    onChange={() => onChange('hasActiveLoan', true)}
                                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                                />
                                <Label htmlFor="guarantorHasActiveLoanYes" className="text-gray-700 cursor-pointer">
                                    نعم
                                </Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    id="guarantorHasActiveLoanNo"
                                    name="guarantorHasActiveLoan"
                                    checked={data.hasActiveLoan === false}
                                    onChange={() => {
                                        onChange('hasActiveLoan', false);
                                        onChange('remainingLoanAmount', '');
                                    }}
                                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                                />
                                <Label htmlFor="guarantorHasActiveLoanNo" className="text-gray-700 cursor-pointer">
                                    لا
                                </Label>
                            </div>
                        </div>
                    </div>

                    {/* Conditional: If Active Loan - Ask for Remaining Amount */}
                    {data.hasActiveLoan && (
                        <div className="space-y-2 col-span-2">
                            <Label htmlFor="guarantorRemainingLoanAmount" className="block text-gray-700 font-bold">
                                فكم هو المبلغ المتبقي؟
                            </Label>
                            <Input
                                id="guarantorRemainingLoanAmount"
                                type="text"
                                placeholder="ادخال المبلغ المتبقي"
                                value={data.remainingLoanAmount}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === '' || /^\d*\.?\d*$/.test(value)) {
                                        onChange('remainingLoanAmount', value);
                                    }
                                }}
                                onKeyDown={(e) => {
                                    if (!/[0-9.]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                                className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400"
                            />
                        </div>
                    )}

                    {/* Contact Person */}
                    <div className="space-y-2">
                        <Label htmlFor="guarantorContactPerson" className="block text-gray-600 font-medium">
                            اسم شخص آخر يمكن الاتصال به
                        </Label>
                        <Input
                            id="guarantorContactPerson"
                            type="text"
                            placeholder="فاطمة محمد السعيد"
                            value={data.backupName}
                            onChange={(e) => onChange('backupName', e.target.value)}
                            className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400"
                        />
                    </div>

                    {/* Mobile Number (Another) */}
                    <div className="space-y-2">
                        <Label htmlFor="guarantorContactMobile" className="block text-gray-600 font-medium">
                            رقم جوال شخص آخر يمكن الاتصال به
                        </Label>
                        <Input
                            id="guarantorContactMobile"
                            type="tel"
                            placeholder="+966506666666"
                            value={data.backupPhone}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === '' || /^[0-9+\-\s()]*$/.test(value)) {
                                    onChange('backupPhone', value);
                                }
                            }}
                            onKeyDown={(e) => {
                                if (!/[0-9+\-\s()]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400"
                        />
                    </div>

                    {/* Signature Upload */}
                    <FileUploadField
                        id="guarantorSignature"
                        label="التوقيع"
                        selectedFile={data.signatureFile}
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            onChange('signatureFile', file || null);
                        }}
                    />
                </div>

                {/* Important Attachments Section */}
                <div>
                    <div className="pb-4 mt-10">
                        <h2 className="text-[#919499] text-2xl font-bold text-right border-b border-gray-200 pb-4 mb-10">
                            مرفقات هامة
                        </h2>
                    </div>
                    <div className="space-y-8 mb-10">
                        {/* Row 1: National Address and Valid ID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FileUploadField
                                id="guarantorNationalAddress"
                                label="إرفاق صورة العنوان الوطني"
                                selectedFile={data.nationalAddressFile}
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    onChange('nationalAddressFile', file || null);
                                }}
                            />
                            <FileUploadField
                                id="guarantorValidId"
                                label="هوية سارية الصلاحية"
                                selectedFile={data.validIdFile}
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    onChange('validIdFile', file || null);
                                }}
                            />
                        </div>

                        {/* Row 2: Income Proof and Credit Report */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FileUploadField
                                id="guarantorIncomeProof"
                                label="إرفاق تعريف حديث للراتب للكفيل"
                                selectedFile={data.incomeProofFile}
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    onChange('incomeProofFile', file || null);
                                }}
                            />
                            <FileUploadField
                                id="guarantorCreditReport"
                                label="تقرير حديث من (سمة) للكفيل"
                                selectedFile={data.creditReportFile}
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    onChange('creditReportFile', file || null);
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Checkbox */}
                <div className="flex items-start gap-3 pt-4">
                    <input
                        type="checkbox"
                        id="guarantorTerms"
                        checked={guarantorTermsChecked}
                        onChange={onGuarantorTermsChange}
                        className="mt-1 w-4 h-4 text-green-600 border-2 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                    />
                    <Label htmlFor="guarantorTerms" className="text-sm text-gray-600 leading-relaxed cursor-pointer">
                    أقر انا الكفيل الغارم بصحة كامل البيانات المكتوبة اعلاه واحتمل كامل المسؤولية في حال ثبوت خلاف ذلك.                    </Label>
                </div>
            </CardContent>
        </Card>
    );
}
