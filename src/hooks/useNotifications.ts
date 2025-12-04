import { useEffect, useState } from "react";

import {
  collection,
  onSnapshot,
  query,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Notification {
  id: string;
  message: string;
  title?: string;
  type?: "approved" | "reminder" | "info" | "warning" | "success";
  isRead?: boolean;
  isStarred?: boolean;
  createdAt?: any; // Firestore Timestamp
  time?: string;
  [key: string]: any; // Allow additional properties
}

function useNotifications(
  userEmail: string | null | undefined
): Notification[] {
  const [userNotifications, setUserNotifications] = useState<Notification[]>(
    []
  );
  const [globalNotifications, setGlobalNotifications] = useState<
    Notification[]
  >([]);

  // Listen to user-specific notifications
  useEffect(() => {
    if (!userEmail) return;

    const sanitizedEmail = userEmail
      .split("@")[0]
      .replaceAll(".", "_")
      .toLowerCase();

    console.log(
      "📧 Listening to user notifications:",
      `user_${sanitizedEmail}`
    );

    const userNotifRef = collection(
      db,
      "notifications",
      `user_${sanitizedEmail}`,
      "items"
    );
    const userQuery = query(userNotifRef);
    console.log(userQuery, "vvvvvvvvvvvvvvvvv");

    const unsubscribe = onSnapshot(
      userQuery,
      (snapshot) => {
        const notifs = snapshot.docs.map((doc) => {
          const data = doc.data() as DocumentData;
          console.log(data, "asdasdasdasd");
          return {
            id: doc.id,
            title: data.title,
            message: data.body || data.message, // Map body to message
            type: data.type,
            isRead: data.isRead ?? false,
            isStarred: data.isStarred ?? false,
            createdAt: data.createdAt,
            time: data.time,
            ...data, // Keep any additional fields
          } as Notification;
        });
        console.log("✅ User notifications received:", notifs.length);
        setUserNotifications(notifs);
      },
      (error) => {
        console.error("❌ User notifications error:", error);
        setUserNotifications([]);
      }
    );

    console.log("🎯 User subscription started successfully!");

    return () => {
      console.log("🔴 Unsubscribing from user notifications");
      unsubscribe();
    };
  }, [userEmail]);

  // Listen to global notifications
  useEffect(() => {
    console.log("🌍 Listening to global notifications");

    const globalNotifRef = collection(db, "notifications", "Global", "items");
    console.log(globalNotifRef, "glgogogogogo");
    const globalQuery = query(globalNotifRef);

    const unsubscribe = onSnapshot(
      globalQuery,
      (snapshot) => {
        console.log(snapshot.docs, "zzzzzzzzzzzzzzzzzzzzz");
        const notifs = snapshot.docs.map((doc) => {
          const data = doc.data() as DocumentData;
          return {
            id: doc.id,
            title: data.title,
            message: data.body || data.message, // Map body to message
            type: data.type,
            isRead: data.isRead ?? false,
            isStarred: data.isStarred ?? false,
            createdAt: data.createdAt,
            time: data.time,
            ...data, // Keep any additional fields
          } as Notification;
        });
        console.log("✅ Global notifications received:", notifs.length);
        setGlobalNotifications(notifs);
      },
      (error) => {
        console.error("❌ Global notifications error:", error);
        setGlobalNotifications([]);
      }
    );

    console.log("🎯 Global subscription started successfully!");

    return () => {
      console.log("🔴 Unsubscribing from global notifications");
      unsubscribe();
    };
  }, []);

  // Merge both notification arrays
  const allNotifications = [...globalNotifications, ...userNotifications];

  return allNotifications;
}

export default useNotifications;
