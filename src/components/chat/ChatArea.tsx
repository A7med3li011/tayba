"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Send, Paperclip, MessageSquare, X } from "lucide-react";
import logo from "@/assets/images/logo.png";
import userAvatar from "@/assets/images/userProfileImg.jpg";
import { db, storage } from "@/lib/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useUser } from "@/contexts/UserContext";

interface Message {
  id: string;
  text: string;
  userId: number;
  userPartnerId: number;
  userName: string;
  userLogin: string;
  createdAt: Date;
  fileName?: string;
  fileUrl?: string;
}

interface ChatAreaProps {
  ticketNumber: string;
  chatRoomId: string;
  initialMessage: string;
  status: string;
}

const STATUS_CONFIG = {
  new: { label: "جديد", color: "bg-blue-100 text-blue-600" },
  in_progress: { label: "جاري العمل", color: "bg-amber-100 text-amber-600" },
  resolved: { label: "تم الحل", color: "bg-green-100 text-green-600" },
  closed: { label: "مغلق", color: "bg-gray-200 text-gray-600" },
};

export function ChatArea({
  ticketNumber,
  chatRoomId,
  initialMessage,
  status,
}: ChatAreaProps) {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useUser();

 
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!chatRoomId) {
      setIsLoading(false);
      return;
    }

    const messagesRef = collection(db, "chatRooms", chatRoomId, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const msgs: Message[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            text: data.text || "",
            userId: data.userId || 0,
            userPartnerId: data.userPartnerId || 0,
            userName: data.userName || "",
            userLogin: data.userLogin || "",
            createdAt: data.timestamp?.toDate?.() || new Date(),
            fileName: data.fileName,
            fileUrl: data.fileUrl,
          };
        });

        setMessages(msgs);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching messages:", error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [chatRoomId]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadFile = async (
    file: File
  ): Promise<{ fileName: string; fileUrl: string }> => {
    const timestamp = Date.now();
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const storagePath = `chats/${chatRoomId}/${timestamp}_${sanitizedFileName}`;
    const storageRef = ref(storage, storagePath);

    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);

    return { fileName: file.name, fileUrl: downloadURL };
  };

  console.log(
    user?.user_id,
    user?.user_partner_id,
    "zxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  );
  const handleSend = async () => {
    if (status === "closed") {
      alert("لا يمكن إرسال رسائل في تذكرة مغلقة");
      return;
    }

    if (!chatRoomId) {
      alert("خطأ: لا يوجد معرف غرفة الدردشة");
      return;
    }

    if (!user?.user_id || !user?.user_partner_id) {
      alert("خطأ: بيانات المستخدم غير مكتملة. يرجى تسجيل الدخول مرة أخرى.");
      return;
    }

    const trimmedMessage = messageText.trim();
    if (!trimmedMessage && !selectedFile) return;

    try {
      setIsUploading(true);
      let fileData = {};

      if (selectedFile) {
        const { fileName, fileUrl } = await uploadFile(selectedFile);
        fileData = { fileName, fileUrl };
      }

      const messageData = {
        text:
          selectedFile && !trimmedMessage
            ? `📎 تم مشاركة ملف: ${selectedFile.name}`
            : trimmedMessage,
        userId: user.user_id,
        userPartnerId: user.user_partner_id,
        userName: user.name,
        userLogin: user.email || "user",
        timestamp: serverTimestamp(),
        ...fileData,
      };

      const messagesRef = collection(db, "chatRooms", chatRoomId, "messages");
      await addDoc(messagesRef, messageData);

      setMessageText("");
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsUploading(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleString("ar-EG", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const statusConfig =
    STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.new;

  return (
    <div className="flex-1  flex flex-col bg-gradient-to-b from-gray-50 to-white h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 text-right">
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              {ticketNumber}
            </h2>
            <p className="text-sm text-gray-500 line-clamp-1">
              {initialMessage}
            </p>
          </div>
          <span
            className={`px-4 py-1.5 rounded-full text-sm font-medium ${statusConfig.color} shrink-0`}
          >
            {statusConfig.label}
          </span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6 bg-gradient-to-b from-gray-50/50 to-white">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-14 h-14 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-500 font-medium">
                جاري تحميل المحادثة...
              </p>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-start justify-center h-full">
            <div className="text-center max-w-md px-6">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5">
                <MessageSquare className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                ابدأ المحادثة
              </h3>
              <p className="text-gray-500 leading-relaxed">
                لم يتم إرسال أي رسائل بعد. اكتب رسالتك أدناه للتواصل مع فريق
                الدعم.
              </p>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((message) => {
              const isCurrentUser = user?.user_id === message.userId;

              return isCurrentUser ? (
                <div key={message.id} className="flex gap-3 items-start">
                  <div className="size-11 rounded-full overflow-hidden bg-gray-200 shrink-0 ring-2 ring-primary/10 shadow-sm">
                    <Image
                      src={userAvatar}
                      alt="User"
                      width={100}
                      height={100}
                      className="object-cover size-full"
                    />
                  </div>
                  <div className="flex-1 flex flex-col items-start gap-2">
                    <div className="bg-gradient-to-br from-primary to-primary/90 text-white px-5 py-3 rounded-2xl rounded-tr-sm shadow-md hover:shadow-lg transition-all max-w-lg">
                      {message.fileUrl ? (
                        <div className="space-y-2">
                          <p className="text-right leading-relaxed">
                            {message.text}
                          </p>
                          <a
                            href={message.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-xs underline hover:opacity-80 text-right bg-white/10 px-3 py-1 rounded-lg"
                          >
                            📎 عرض الملف
                          </a>
                        </div>
                      ) : (
                        <p className="text-right leading-relaxed">
                          {message.text}
                        </p>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 px-1">
                      {formatTime(message.createdAt)}
                    </span>
                  </div>
                </div>
              ) : (
                <div
                  key={message.id}
                  className="flex gap-3 justify-end items-start"
                >
                  <div className="flex-1 flex flex-col items-end gap-2">
                    <div className="bg-white px-5 py-2 rounded-2xl rounded-tl-sm shadow-md hover:shadow-lg transition-all max-w-lg border border-gray-200">
                      {message.fileUrl ? (
                        <div className="space-y-2">
                          <p className="text-right text-gray-800 leading-relaxed">
                            {message.text}
                          </p>
                          <a
                            href={message.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-xs text-primary underline hover:opacity-80 text-right bg-primary/5 px-3 py-1 rounded-lg"
                          >
                            📎 عرض الملف
                          </a>
                        </div>
                      ) : (
                        <p className="text-right text-gray-800 leading-relaxed">
                          {message.text}
                        </p>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 px-1">
                      {formatTime(message.createdAt)}
                    </span>
                  </div>
                  <div className="size-11 rounded-full overflow-hidden bg-white border-2 border-green-500/30 flex items-center justify-center shrink-0 shadow-sm">
                    <Image
                      src={logo}
                      alt="Support"
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-6 py-5 shadow-lg">
        <div className="max-w-4xl mx-auto">
          {/* Closed Ticket Message */}
          {status === "closed" && (
            <div className="mb-4 flex items-center justify-center gap-2 bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl">
              <span className="text-sm font-medium">
                ⚠️ هذه التذكرة مغلقة ولا يمكن إرسال رسائل جديدة
              </span>
            </div>
          )}

          {/* File Preview */}
          {selectedFile && (
            <div className="mb-3 flex items-center gap-3 bg-blue-50 border border-blue-200 p-3 rounded-xl">
              <Paperclip className="w-5 h-5 text-primary shrink-0" />
              <span className="text-sm text-gray-700 flex-1 text-right font-medium truncate">
                {selectedFile.name}
              </span>
              <button
                onClick={handleRemoveFile}
                className="text-red-500 hover:text-red-700 hover:bg-red-100 p-1.5 rounded-lg transition-all"
                title="إزالة الملف"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="flex items-center gap-3">
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              className="hidden"
              accept="image/*,.pdf,.doc,.docx"
              disabled={status === "closed"}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-3 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200 hover:border-primary shrink-0"
              title={status === "closed" ? "التذكرة مغلقة" : "إرفاق ملف"}
              disabled={isUploading || status === "closed"}
            >
              <Paperclip className="w-5 h-5" />
            </button>

            <div className="flex-1 relative">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" &&
                  !isUploading &&
                  status !== "closed" &&
                  handleSend()
                }
                placeholder={
                  status === "closed" ? "التذكرة مغلقة" : "اكتب رسالتك هنا..."
                }
                disabled={isUploading || status === "closed"}
                className="w-full text-right bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 pr-5 pl-16 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary focus:bg-white transition-all placeholder:text-gray-400 disabled:opacity-50 disabled:bg-gray-100 text-base"
              />
              <button
                onClick={handleSend}
                disabled={
                  (!messageText.trim() && !selectedFile) ||
                  isUploading ||
                  status === "closed"
                }
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-primary text-white rounded-xl w-11 h-11 flex items-center justify-center hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg active:scale-95"
                title={status === "closed" ? "التذكرة مغلقة" : "إرسال"}
              >
                {isUploading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
