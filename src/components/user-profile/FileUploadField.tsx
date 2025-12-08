import React from 'react';
import { Label } from '@/components/ui/label';
import { SlCloudUpload } from 'react-icons/sl';
import { useTranslations } from 'next-intl';

type FileUploadFieldProps = {
    id: string;
    label: string;
    selectedFile: File | null;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FileUploadField({ id, label, selectedFile, onChange }: FileUploadFieldProps) {
    const t = useTranslations('loanRequestForm.financialStatus');

    return (
        <div className="space-y-2">
            <Label className="block text-gray-600 font-bold text-right">
                {label}
            </Label>
            <div className="relative">
                <input
                    type="file"
                    id={id}
                    accept="image/*,.pdf"
                    onChange={onChange}
                    className="hidden"
                />
                <label
                    htmlFor={id}
                    className="w-full h-10 sm:h-12 border-2 border-dashed border-gray-300 rounded-lg bg-white flex items-center justify-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                    <SlCloudUpload className="w-6 h-6 text-green-500" />
                    <span className="text-gray-400 text-sm">
                        {selectedFile ? selectedFile.name : t('uploadFile')}
                    </span>
                </label>
            </div>
        </div>
    );
}


