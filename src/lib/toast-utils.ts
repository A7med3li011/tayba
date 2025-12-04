import React from "react";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";

interface ToastOptions {
  duration?: number;
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
}

export function showSuccessToast(message: string, options?: ToastOptions) {
  return toast.success(message, {
    duration: options?.duration,
    position: options?.position,
    icon: React.createElement(Icon, {
      icon: "lucide:check-circle",
      className: "w-5 h-5",
    }),
    style: {
      border: "1px solid #10b981",
    },
  });
}

export function showErrorToast(message: string, options?: ToastOptions) {
  return toast.error(message, {
    duration: options?.duration,
    position: options?.position,
    icon: React.createElement(Icon, {
      icon: "lucide:x-circle",
      className: "w-5 h-5",
    }),
    style: {
      border: "1px solid #ef4444",
    },
  });
}

export function showInfoToast(message: string, options?: ToastOptions) {
  return toast(message, {
    duration: options?.duration,
    position: options?.position,
    icon: React.createElement(Icon, {
      icon: "lucide:info",
      className: "w-5 h-5",
    }),
    style: {
      border: "1px solid #3b82f6",
    },
  });
}

export function showWarningToast(message: string, options?: ToastOptions) {
  return toast(message, {
    duration: options?.duration,
    position: options?.position,
    icon: React.createElement(Icon, {
      icon: "lucide:alert-circle",
      className: "w-5 h-5",
    }),
    style: {
      border: "1px solid #f59e0b",
    },
  });
}

export function showSessionExpiredToast(message?: string) {
  const defaultMessage =
    "جلسة غير صالحة أو منتهية الصلاحية - يرجى تسجيل الدخول مرة أخرى";

  return toast.error(message || defaultMessage, {
    duration: 7000,
    position: "top-center",
    icon: React.createElement(Icon, {
      icon: "lucide:lock",
      className: "w-5 h-5",
    }),
    style: {
      border: "2px solid #ef4444",
      padding: "20px",
      fontSize: "15px",
      fontWeight: "600",
      background: "#fef2f2",
      color: "#991b1b",
      boxShadow: "0 10px 40px rgba(239, 68, 68, 0.2)",
    },
  });
}

export function handleApiError(error: {
  success: boolean;
  message?: string;
  status?: number;
}) {
  if (!error.success) {
    if (error.status === 401) {
      const currentPath = window.location.pathname;
      const isAuthPage = currentPath.includes("/auth/");

      if (isAuthPage) {
        return;
      }

      showSessionExpiredToast(error.message);

      // setTimeout(() => {
      //   const currentLocale = window.location.pathname.split("/")[1] || "ar";

      //   window.location.href = `/${currentLocale}/auth/login`;
      // }, 2000);

      return;
    }

    showErrorToast(error.message || "حدث خطأ غير متوقع");
  }
}
