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
  console.log(formData, "formData");
  console.log(
    process.env.NEXT_PUBLIC_API_URL,
    "process.env.NEXT_PUBLIC_API_URL"
  );

  try {
    const cookieStore = await cookies();

    const sessionId = cookieStore.get("session_id")?.value;
    const api_session = cookieStore.get("api_session")?.value;
    // Send FormData directly to the API endpoint
    const response = await axios.post<LoanRequestResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/loan/create`,
      formData,
      {
        headers: {
          Cookie: `api_session=${api_session}; session_id=${sessionId}`,
        },
        withCredentials: true,
      }
    );
    console.log(response.data);
    return {
      success: true,
      message: response.data.message || "تم إرسال طلب القرض بنجاح",
      data: response.data,
    };
  } catch (error: unknown) {
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
