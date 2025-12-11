"use client";
import axios from "axios";

interface LoanRequestResponse {
  success: boolean;
  message?: string;
  data?: unknown;
  errors?: Record<string, string[]>;
}

// Client-side loan request function - bypasses Server Action body size limit
export async function requestLoan(
  formData: FormData
): Promise<LoanRequestResponse> {
  // Log FormData contents for debugging
  console.log("=== LOAN REQUEST START ===");
  console.log("Endpoint:", `${process.env.NEXT_PUBLIC_API_URL}/api/loan/create`);
  console.log("FormData entries:");
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(`  ${key}: [File] ${value.name} (${value.size} bytes)`);
    } else {
      console.log(`  ${key}:`, value);
    }
  }

  try {
    // Direct API call from client - cookies are sent automatically
    const response = await axios.post<LoanRequestResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/loan/create`,
      formData,
      {
        timeout: 600000,
        withCredentials: true,
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      }
    );

    console.log("=== LOAN REQUEST SUCCESS ===");
    console.log("Response status:", response.status);
    console.log("Response data:", response.data);

    return {
      success: true,
      message: response.data.message || "تم إرسال طلب القرض بنجاح",
      data: response.data,
    };
  } catch (error: unknown) {
    console.error("=== LOAN REQUEST ERROR ===");
    console.error("Loan request error:", error);

    if (axios.isAxiosError(error)) {
      console.error("Error response status:", error.response?.status);
      console.error(
        "Error response data:",
        JSON.stringify(error.response?.data, null, 2)
      );
      console.error("Error response headers:", error.response?.headers);

      if (error.response?.data) {
        return {
          success: false,
          message:
            error.response.data.message || "حدث خطأ أثناء إرسال طلب القرض",
          errors: error.response.data.errors,
        };
      }

      return {
        success: false,
        message: error.message || "فشل الاتصال بالخادم",
      };
    }

    return {
      success: false,
      message: "حدث خطأ غير متوقع",
    };
  }
}
