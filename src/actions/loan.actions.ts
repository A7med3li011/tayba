"use server";

import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

interface LoanRequestResponse {
  success: boolean;
  message?: string;
  data?: unknown;
  errors?: Record<string, string[]>;
}

export async function requestLoan(
  formData: FormData
): Promise<LoanRequestResponse> {
  // Log FormData contents for debugging
  console.log("=== LOAN REQUEST START (Server Action) ===");
  console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
  console.log(
    "Endpoint:",
    `${process.env.NEXT_PUBLIC_API_URL}/api/loan/create`
  );
  console.log("FormData entries:");

  try {
    const cookieStore = await cookies();

    const sessionId = cookieStore.get("session_id")?.value;
    const api_session = cookieStore.get("api_session")?.value;

    console.log("Session cookies:", {
      sessionId,
      api_session: api_session ? "present" : "missing",
    });

    // Send FormData directly to the API endpoint
    const response = await axios.post<LoanRequestResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/loan/create`,
      formData,
      {
        headers: {
          Cookie: `api_session=${api_session}; session_id=${sessionId}`,
        },
        timeout: 600000,
        withCredentials: true,
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
export async function talabElsanad(
  formData: FormData
): Promise<LoanRequestResponse> {
  // Log FormData contents for debugging

  try {
    const cookieStore = await cookies();

    const sessionId = cookieStore.get("session_id")?.value;
    const api_session = cookieStore.get("api_session")?.value;

    // Extract loan_id from formData
    const loan_id = formData.get("loan_id") as string;

    // Send FormData directly to the API endpoint
    const response = await axios.post<LoanRequestResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/loan/${loan_id}/promissory-note`,
      formData,
      {
        headers: {
          Cookie: `api_session=${api_session}; session_id=${sessionId}`,
        },
        timeout: 600000,
        withCredentials: true,
      }
    );

    return {
      success: true,
      message: response.data.message || "تم رفع سند الأمر بنجاح",
      data: response.data,
    };
  } catch (error: unknown) {
    console.error("=== PROMISSORY NOTE UPLOAD ERROR ===");
    console.error("Promissory note upload error:", error);

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
            error.response.data.message || "حدث خطأ أثناء رفع سند الأمر",
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

export async function getCountries() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("session_id")?.value;
    const api_session = cookieStore.get("api_session")?.value;
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/countries`,
      {
        headers: {
          Cookie: `api_session=${api_session}; session_id=${sessionId}`,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error getting countries:", error);
    throw error;
  }
}

export async function getLoanReasons() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("session_id")?.value;
    const api_session = cookieStore.get("api_session")?.value;
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/loan/reasons`,
      {
        headers: {
          Cookie: `api_session=${api_session}; session_id=${sessionId}`,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error getting loan reasons:", error);
    throw error;
  }
}

export async function getUserLoansList(
  page: number = 1,
  pageLimit: number = 10
) {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("session_id")?.value;
    const api_session = cookieStore.get("api_session")?.value;
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/loan/list?page=${page}&pageLimit=${pageLimit}`,
      {
        headers: {
          Cookie: `api_session=${api_session}; session_id=${sessionId}`,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error getting user loans:", error);
    throw error;
  }
}

export async function getActiveLoanDetails() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("session_id")?.value;
    const api_session = cookieStore.get("api_session")?.value;
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/loan/active`,
      {
        headers: {
          Cookie: `api_session=${api_session}; session_id=${sessionId}`,
        },
        withCredentials: true,
      }
    );
    return {
      success: true,
      data: response.data,
    };
  } catch (error: unknown) {
    console.error("Error getting active loan details:", error);
    return {
      success: false,
      message:
        (error as AxiosError<{ message?: string; error?: string }>).response
          ?.data?.message ||
        (error as AxiosError<{ message?: string; error?: string }>).response
          ?.data?.error ||
        "حدث خطأ غير متوقع",
    };
  }
}
export async function getLoanDetails(id: string) {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("session_id")?.value;
    const api_session = cookieStore.get("api_session")?.value;
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/loan/${id}/details`,
      {
        headers: {
          Cookie: `api_session=${api_session}; session_id=${sessionId}`,
        },
        withCredentials: true,
      }
    );
    return {
      success: true,
      data: response.data,
    };
  } catch (error: unknown) {
    console.error("Error getting active loan details:", error);
    return {
      success: false,
      message:
        (error as AxiosError<{ message?: string; error?: string }>).response
          ?.data?.message ||
        (error as AxiosError<{ message?: string; error?: string }>).response
          ?.data?.error ||
        "حدث خطأ غير متوقع",
    };
  }
}
