"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Search, SlidersHorizontal, MoreVertical } from "lucide-react";
import mainLogo from "@/assets/images/logo.png";

interface Notification {
  id: string;
  message: string;
  time: string;
  type: "approved" | "reminder";
  isStarred: boolean;
  isRead: boolean;
}

function NotificationsPage() {
  const t = useTranslations("userProfile.notificationsPage");

  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      message: t("loanApproved"),
      time: `8 ${t("minAgo")}`,
      type: "approved",
      isStarred: true,
      isRead: false,
    },
    {
      id: "2",
      message: t("paymentReminder"),
      time: `8 ${t("minAgo")}`,
      type: "reminder",
      isStarred: false,
      isRead: true,
    },
    {
      id: "3",
      message: t("paymentReminder"),
      time: `8 ${t("minAgo")}`,
      type: "reminder",
      isStarred: false,
      isRead: true,
    },
    {
      id: "4",
      message: t("paymentReminder"),
      time: `8 ${t("minAgo")}`,
      type: "reminder",
      isStarred: false,
      isRead: true,
    },
    {
      id: "5",
      message: t("paymentReminder"),
      time: `8 ${t("minAgo")}`,
      type: "reminder",
      isStarred: false,
      isRead: true,
    },
    {
      id: "6",
      message: t("paymentReminder"),
      time: `8 ${t("minAgo")}`,
      type: "reminder",
      isStarred: false,
      isRead: true,
    },
    {
      id: "7",
      message: t("paymentReminder"),
      time: `8 ${t("minAgo")}`,
      type: "reminder",
      isStarred: false,
      isRead: true,
    },
  ]);

  const toggleStar = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isStarred: !notif.isStarred } : notif
      )
    );
  };

  const filteredNotifications = notifications.filter((notif) =>
    notif.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full  mx-auto">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-800 text-right">
            {t("title")}
          </h1>
        </div>
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <SlidersHorizontal className="w-5 h-5 text-[var(--primary)]" />
            </button>
            <div className="flex-1 relative">
              <div className="flex items-center border border-gray-200 rounded-xl px-4 py-2.5 bg-white focus-within:border-[var(--primary)] transition-colors">
                <Search className="w-5 h-5 text-gray-400 ml-2" />
                <input
                  type="text"
                  placeholder={t("search")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 outline-none text-right text-gray-600 placeholder:text-gray-400 bg-transparent"
                  dir="rtl"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {filteredNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onToggleStar={toggleStar}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface NotificationItemProps {
  notification: Notification;
  onToggleStar: (id: string) => void;
}

function NotificationItem({ notification }: NotificationItemProps) {
  const getIndicatorColor = () => {
    return notification.type === "approved" ? "bg-green-500" : "bg-[#d9a645]";
  };

  return (
    <div className="px-6 py-4 hover:bg-gray-50/50 transition-colors">
      <div className="flex flex-row-reverse items-center gap-4">
        {/* Three Dots Menu */}
        <button className="p-1 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0">
          <MoreVertical className="w-5 h-5 text-gray-400" />
        </button>

        {/* Content */}
        <div className="flex-1 text-right">
          <p className="text-sm text-gray-700 leading-relaxed mb-1">
            {notification.message}
          </p>
          <p className="text-xs text-gray-400">{notification.time}</p>
        </div>

        {/* Indicator Bar and Logo */}
        <div className="flex items-center gap-0 flex-shrink-0">
          {/* Logo */}
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#d9a645] flex items-center justify-center bg-white ml-1.5">
            <Image
              src={mainLogo}
              alt="Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div className={`w-1 h-12 rounded-full ${getIndicatorColor()}`} />
        </div>
      </div>
    </div>
  );
}

export default NotificationsPage;
