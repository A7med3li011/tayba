# Loan Request Form Localization Completion Guide

## Summary

I've set up comprehensive localization for the loan request form. Here's what has been completed:

### ✅ Completed:
1. Added all translations to `src/locales/ar.json` (Arabic)
2. Added all translations to `src/locales/en.json` (English)
3. Added `useTranslations` hooks to LoanRequestCard.tsx
4. Updated key sections (titles, error messages, validation)

### 🔧 Remaining Updates Needed in LoanRequestCard.tsx

Replace all hard-coded Arabic text with translation calls. Here's the search-replace pattern:

#### Form Field Labels (Lines ~422-1000):
```tsx
// OLD:
<Label>البريد الالكتروني</Label>
// NEW:
<Label>{t('fields.email')}</Label>

// OLD:
<Label>رقم الهاتف</Label>
// NEW:
<Label>{t('fields.phone')}</Label>

// OLD:
<Label>رقم الهوية الوطنية</Label>
// NEW:
<Label>{t('fields.nationalId')}</Label>

// OLD:
<Label>تاريخ الانتهاء</Label>
// NEW:
<Label>{t('fields.idExpiryDate')}</Label>

// OLD:
<Label>المدينة</Label>
// NEW:
<Label>{t('fields.city')}</Label>

// OLD:
<Label>عنوان السكن</Label>
// NEW:
<Label>{t('fields.address')}</Label>

// OLD:
<Label>عنوان العمل</Label>
// NEW:
<Label>{t('fields.workTitle')}</Label>

// OLD:
<Label>جوال العمل</Label>
// NEW:
<Label>{t('fields.workPhone')}</Label>

// OLD:
<Label>المسمى الوظيفي لطالب القرض</Label>
// NEW:
<Label>{t('fields.jobTitle')}</Label>

// OLD:
<Label>اجمالي الراتب</Label>
// NEW:
<Label>{t('fields.totalSalary')}</Label>

// OLD:
<Label>تاريخ مباشرة الوظيفة</Label>
// NEW:
<Label>{t('fields.jobStartDate')}</Label>

// OLD:
<Label>جهة العمل</Label>
// NEW:
<Label>{t('fields.employer')}</Label>

// OLD:
<Label>عنوان جهة العمل</Label>
// NEW:
<Label>{t('fields.employerAddress')}</Label>

// OLD:
<Label>اسم المدير المباشر</Label>
// NEW:
<Label>{t('fields.directManagerName')}</Label>

// OLD:
<Label>المسمى الوظيفي للمدير المباشر</Label>
// NEW:
<Label>{t('fields.directManagerJobTitle')}</Label>

// OLD:
<Label>اسم شخص آخر يمكن الاتصال به</Label>
// NEW:
<Label>{t('fields.contactPerson')}</Label>

// OLD:
<Label>رقم جوال شخص آخر</Label>
// NEW:
<Label>{t('fields.contactPersonPhone')}</Label>

// OLD:
<Label>الجنسية</Label>
// NEW:
<Label>{t('fields.nationality')}</Label>

// OLD:
<Label>عدد الأقساط</Label>
// NEW:
<Label>{t('fields.installmentCount')}</Label>

// OLD:
<Label>مبلغ القرض</Label>
// NEW:
<Label>{t('fields.loanAmount')}</Label>

// OLD:
<Label>سبب طلب القرض</Label>
// NEW:
<Label>{t('fields.purpose')}</Label>

// OLD:
<Label>من هو (الفرد\الجهة) المستحقة لهذا القرض؟</Label>
// NEW:
<Label>{t('fields.loanBeneficiary')}</Label>
```

#### Placeholders:
```tsx
// OLD:
placeholder="ادخال"
// NEW:
placeholder={t('placeholders.input')}

// OLD:
placeholder="محمد أحمد محمد"
// NEW:
placeholder={t('placeholders.contactPersonName')}

// OLD:
placeholder="966389010"
// NEW:
placeholder={t('placeholders.contactPersonPhone')}

// OLD:
placeholder="ادخال سبب طلب القرض"
// NEW:
placeholder={t('placeholders.loanReasonInput')}

// OLD:
placeholder="ادخال اسم الفرد أو الجهة المستحقة"
// NEW:
placeholder={t('placeholders.beneficiaryInput')}
```

#### Questions (Lines ~664-909):
```tsx
// OLD:
هل سبق ان حصلت علي قرض من الوقف؟
// NEW:
{t('questions.hasPreviousLoan')}

// OLD:
هل تم اكمال سداد القرض؟
// NEW:
{t('questions.isPreviousLoanPaid')}

// OLD:
هل طالب القرض كفيل حاليا في الوقف؟
// NEW:
{t('questions.isCurrentGuarantor')}

// OLD:
ما اسم المقترض؟
// NEW:
{t('questions.guaranteedBorrowerName')}

// OLD:
هل المقترض لديه اقساط شهرية لجهات اخرى؟
// NEW:
{t('questions.hasMonthlyInstallments')}

// OLD:
ما هو اجمالي الاقساط الشهرية؟
// NEW:
{t('questions.totalMonthlyInstallments')}

// OLD:
هل طالب القرض لديه مصادر دخل اضافية؟
// NEW:
{t('questions.hasAdditionalIncome')}

// OLD:
فكم هو الاجمالي الشهري؟
// NEW:
{t('questions.totalAdditionalIncome')}
```

#### Yes/No Labels:
```tsx
// OLD:
نعم
// NEW:
{tc('yes')}

// OLD:
لا
// NEW:
{tc('no')}
```

#### Select Options (Lines ~962-989):
```tsx
// OLD:
<option value="اختيار">اختيار</option>
// NEW:
<option value="اختيار">{tc('select')}</option>

// OLD:
<option value="12">12 شهر</option>
// NEW:
<option value="12">{t('installmentOptions.12months')}</option>

// OLD:
<option value="24">24 شهر</option>
// NEW:
<option value="24">{t('installmentOptions.24months')}</option>

// OLD:
<option value="36">36 شهر</option>
// NEW:
<option value="36">{t('installmentOptions.36months')}</option>
```

#### Placeholders for inputs with borrower/installments names:
```tsx
// OLD:
placeholder="ادخال اسم المقترض"
// NEW:
placeholder={t('placeholders.borrowerNameInput')}

// OLD:
placeholder="ادخال اجمالي الاقساط الشهرية"
// NEW:
placeholder={t('placeholders.monthlyInstallmentsInput')}

// OLD:
placeholder="ادخال الاجمالي الشهري"
// NEW:
placeholder={t('placeholders.monthlyIncomeInput')}
```

#### File Upload Section (Lines ~1056-1125):
```tsx
// OLD:
<h2>مرفقات هامة</h2>
// NEW:
<h2>{t('importantAttachments')}</h2>

// Update FileUploadField labels using t('fileUploads.xxx') for each field
// See the translation keys in ar.json and en.json under fileUploads
```

#### Terms and Conditions (Lines ~1126-1150):
```tsx
// OLD:
أقر انا المقترض بصحة كامل البيانات المكتوبة اعلاه واحتمل كامل المسؤولية في حال ثبوت خلاف ذلك.
// NEW:
{t('terms.borrowerTerms1')}

// OLD:
اوافق علي شروط الاقتراض
// NEW:
{t('terms.borrowerTerms2')}
```

#### Submit Button (Lines ~1190-1199):
```tsx
// OLD:
{isSubmitting ? 'جاري الإرسال...' : 'إرسال الطلب'}
// NEW:
{isSubmitting ? t('messages.submitting') : t('messages.submitLoan')}
```

---

## Child Components to Update

### 1. FinancialStatusForm.tsx
Add `useTranslations` and update all labels:

```tsx
import { useTranslations } from 'next-intl';

export default function FinancialStatusForm({...}) {
    const t = useTranslations('loanRequestForm.financialStatus');
    const tc = useTranslations('common');

    // Replace:
    - "الحال المالي للمقترض" → {t('title')}
    - "الدخل الشهري" → {t('monthlyIncome')}
    - "الإيجار السكني (شهرياً)" → {t('rentAmount')}
    - "تكلفة الكهرباء (شهرياً)" → {t('electricityAvg')}
    - "هل يوجد التزامات أخري..." → {t('hasOtherCommitments')}
    - "في حالة الإجابة بنعم..." → {t('otherCommitmentsDetails')}
    - "إثبات الدخل" → {t('incomeProof')}
    - "نعم" → {tc('yes')}
    - "لا" → {tc('no')}
}
```

### 2. GuarantorInformationForm.tsx
Add `useTranslations` and update all labels:

```tsx
import { useTranslations } from 'next-intl';

export default function GuarantorInformationForm({...}) {
    const t = useTranslations('loanRequestForm.guarantorInfo');
    const tc = useTranslations('common');

    // Replace all Arabic labels with t('xxx')
    // Example:
    - "بيانات الكفيل" → {t('title')}
    - "الاسم" → {t('name')}
    - "رقم الجوال" → {t('phone')}
    // ... and so on for all fields
}
```

### 3. FileUploadField.tsx
This component receives the label as a prop, so no changes needed - just make sure parent components pass translated labels.

```tsx
// In parent components, use:
<FileUploadField
    label={t('fileUploads.nationalIdCopy')}
    // ...
/>
```

Update "رفع ملف" in the component:

```tsx
import { useTranslations } from 'next-intl';

export default function FileUploadField({...}) {
    const t = useTranslations('loanRequestForm.financialStatus');

    // Replace:
    - "رفع ملف" → {t('uploadFile')}
}
```

---

## Testing

1. Start the dev server: `npm run dev`
2. Switch between Arabic (ar) and English (en) locales
3. Verify all text updates correctly
4. Check the loan request form at `/ar/user-profile/loan-request` and `/en/user-profile/loan-request`

---

## All Translation Keys Created

### loanRequestForm namespace:
- `title`, `personalInformation`, `importantAttachments`
- `fields.*` (35+ field labels)
- `placeholders.*` (10+ placeholders)
- `questions.*` (8 questions)
- `installmentOptions.*` (3 options)
- `fileUploads.*` (8 file upload labels)
- `terms.*` (3 terms)
- `validation.allTermsRequired`
- `messages.*` (6 messages)
- `financialStatus.*` (8 keys)
- `guarantorInfo.*` (35+ keys)

### common namespace:
- `select`, `yes`, `no`, `input`

---

## Quick Replace Commands (VS Code)

1. Open Find & Replace (Ctrl+H)
2. Enable regex mode
3. Use these patterns:

```regex
Find: >البريد الالكتروني<
Replace: >{t('fields.email')}<

Find: >رقم الهاتف<
Replace: >{t('fields.phone')}<

Find: placeholder="ادخال"
Replace: placeholder={t('placeholders.input')}

Find: >نعم<
Replace: >{tc('yes')}<

Find: >لا<
Replace: >{tc('no')}<
```

Continue this pattern for all labels found in the guide above.
