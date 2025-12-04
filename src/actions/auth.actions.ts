"use server";
import axios from "axios";
import { cookies } from "next/headers";

interface LoginFormData {
  login: string;
  password: string;
}

interface OtpVerificationData {
  email: string;
  otp: string;
  type: string;
}

interface RegisterFormData {
  name: string;
  email: string;
  phone: string;
  national_id: string;
  id_expiry_date: string;
  password: string;
  confirmPassword: string;
}

interface ResetPasswordData {
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
}

export async function checkAuth() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session_id");
    return !!sessionCookie;
  } catch (error) {
    console.error("Auth check error:", error);
    return false;
  }
}

export async function userLogin(userData: LoginFormData) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
      {
        login: userData.login,
        password: userData.password,
      }
    );
    console.log(response.data);

    // Store email in cookie for OTP verification
    if (response.data.email) {
      const cookieStore = await cookies();
      cookieStore.set({
        name: "otp_email",
        value: response.data.email,
        httpOnly: false, // Allow client-side access
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 10, // 10 minutes
      });
      cookieStore.set({
        name: "otp_type",
        value: "login",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 10, // 10 minutes
      });
    }

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export async function userOtpVerification(userData: OtpVerificationData) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/verify-otp`,
      {
        email: userData.email,
        otp: userData.otp,
        type: userData.type,
      },
      { withCredentials: true }
    );

    console.log(response,"xx");
    // Grab all set-cookie headers
    const setCookies = response.headers["set-cookie"];
    if (setCookies) {
      const cookieStore = await cookies();
      setCookies.forEach((cookieString: string) => {
        const [pair] = cookieString.split(";");
        const [name, value] = pair.split("=");
        cookieStore.set({
          name,
          value,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
        });
      });
    }

    // Store user_id and user_partner_id from the response
    const cookieStore = await cookies();
    if (response.data.user_id) {
      cookieStore.set({
        name: "user_id",
        value: response.data.user_id.toString(),
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }
    if (response.data.user_partner_id) {
      cookieStore.set({
        name: "user_partner_id",
        value: response.data.user_partner_id.toString(),
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }
    if (response.data.user) {
      cookieStore.set({
        name: "user_name",
        value: response.data.user,
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    // Clear OTP cookies after successful verification EXCEPT for forgot_password flow
    // Reset-password page depends on these cookies to proceed
    if (userData.type !== "forgot_password") {
      cookieStore.delete("otp_email");
      cookieStore.delete("otp_type");
    }

    return response.data;
  } catch (error) {
    console.error("OTP verification error:", error);
    throw error;
  }
}

export async function userLogout() {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/logout`,
      {},
      {
        withCredentials: true,
      }
    );

    // Clear cookies after logout
    const cookieStore = await cookies();
    cookieStore.delete("session_id");
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");
    cookieStore.delete("user_id");
    cookieStore.delete("user_partner_id");
    cookieStore.delete("user_name");

    return response.data;
  } catch (error) {
    console.error("Logout error:", error);
    // Clear cookies if the API call fails
    try {
      const cookieStore = await cookies();
      cookieStore.delete("session_id");
      cookieStore.delete("access_token");
      cookieStore.delete("refresh_token");
      cookieStore.delete("user_id");
      cookieStore.delete("user_partner_id");
      cookieStore.delete("user_name");
    } catch (cookieError) {
      console.error("Error clearing cookies:", cookieError);
    }
    throw error;
  }
}

export async function userRegister(userData: RegisterFormData) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/signup`,
      {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        national_id: userData.national_id,
        id_expiry_date: userData.id_expiry_date,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
      }
    );
    return response.data;
  } catch (error: unknown) {
    console.error("Register error:", error);
    if (axios.isAxiosError(error) && error.response?.data) {
      return error.response.data;
    }
    throw error;
  }
}

export async function resendOtp(email: string) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/resend-otp`,
      {
        email: email,
        type: "forgot_password",
      }
    );
    return response.data;
  } catch (error) {
    console.error("Resend OTP error:", error);
    throw error;
  }
}

export async function forgotPassword(email: string) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/forgot-password`,
      {
        email: email,
      }
    );
    const cookieStore = await cookies();
    cookieStore.set({
      name: "otp_email",
      value: email,
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 10, // 10 minutes
    });
    cookieStore.set({
      name: "otp_type",
      value: "forgot_password",
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 10, // 10 minutes
    });
    return response.data;
  } catch (error) {
    console.error("Forgot password error:", error);
    throw error;
  }
}

export async function resetPassword(userData: ResetPasswordData) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/reset-password`,
      {
        email: userData.email,
        otp: userData.otp,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Reset password error:", error);
    throw error;
  }
}
