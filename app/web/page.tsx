"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  MoreVertical,
  Plus,
  Phone,
  Video,
  Users,
  Settings,
  X,
  CheckCheck,
  Mic,
  Smile,
  Paperclip,
  ChevronDown,
  ArrowLeft,
  MessageSquare,
  Star,
  BellOff,
} from "lucide-react";
import { ChatAvatar } from "@/components/ui/whatsapp/chat-avatar";
import { cn } from "@/components/ui/whatsapp/cn";

// ─── Data ────────────────────────────────────────────────────────────────────

type Label = { text: string; textColor: string; bg: string };

type Chat = {
  id: string;
  name: string;
  avatarColor: string;
  lastMessage: string;
  timestamp: string;
  unread?: number;
  isVoiceNote?: boolean;
  isOutgoing?: boolean;
  isGroup?: boolean;
  isFavorite?: boolean;
  labels?: Label[];
  isAI?: boolean;
};

const conversations: Chat[] = [
  {
    id: "1",
    name: "Business assistant",
    avatarColor: "#00a884",
    lastMessage: "As a Sales Manager for a chocolates brand, your objectives...",
    timestamp: "2:16 AM",
    isAI: true,
  },
  {
    id: "2",
    name: "Pournami Pottekat",
    avatarColor: "#9e9e9e",
    lastMessage: "0:01",
    timestamp: "Yesterday",
    unread: 1,
    isVoiceNote: true,
    isOutgoing: true,
    labels: [{ text: "NEW CUSTOMER", textColor: "#c0392b", bg: "#fce8e8" }],
  },
  {
    id: "3",
    name: "Jasper's Market",
    avatarColor: "#4caf50",
    lastMessage: "Welcome to Jasper's Market! What can we help y...",
    timestamp: "Yesterday",
    isFavorite: true,
  },
  {
    id: "4",
    name: "Internal",
    avatarColor: "#00a884",
    lastMessage: "You created group \"Internal\"",
    timestamp: "Yesterday",
    isGroup: true,
  },
  {
    id: "5",
    name: "Emma Wilson",
    avatarColor: "#9c27b0",
    lastMessage: "Thank you for reaching out! I'll check and get back.",
    timestamp: "Mon",
    isFavorite: true,
    isOutgoing: true,
  },
  {
    id: "6",
    name: "Tech Support Team",
    avatarColor: "#1976d2",
    lastMessage: "Your ticket #4821 has been received.",
    timestamp: "Sun",
    isGroup: true,
  },
  {
    id: "7",
    name: "John Davis",
    avatarColor: "#e64a19",
    lastMessage: "When will my order arrive? I ordered last week.",
    timestamp: "Sat",
    unread: 3,
    labels: [{ text: "SUPPORT", textColor: "#1565c0", bg: "#e3f2fd" }],
  },
  {
    id: "8",
    name: "Sara Thompson",
    avatarColor: "#c2185b",
    lastMessage: "Could you send me the invoice again please?",
    timestamp: "10/11",
    isFavorite: true,
  },
];

type FilterTab = "all" | "unread" | "new-customer";

// ─── SidebarIcon ──────────────────────────────────────────────────────────────

function SidebarIcon({
  children,
  active,
  badge,
  label,
  onClick,
  className,
}: {
  children: React.ReactNode;
  active?: boolean;
  badge?: number;
  label?: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={cn(
        "relative flex items-center justify-center w-10 h-10 rounded-xl transition-colors hover:bg-black/5",
        className
      )}
      style={{ color: active ? "#00a884" : "#54656f" }}
    >
      {children}
      {badge ? (
        <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 bg-[#00a884] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-0.5 leading-none">
          {badge}
        </span>
      ) : null}
    </button>
  );
}

// ─── IconSidebar ──────────────────────────────────────────────────────────────

function IconSidebar({
  activeSidebarTab,
  setActiveSidebarTab,
  className,
}: {
  activeSidebarTab: string;
  setActiveSidebarTab: (t: string) => void;
  className?: string;
}) {
  return (
    <aside
      className={cn("flex flex-col items-center py-3 gap-1 shrink-0", className)}
      style={{
        width: 63,
        backgroundColor: "#f0f2f5",
        borderRight: "1px solid rgba(17,27,33,0.08)",
      }}
    >
      {/* WA logo */}
      <div className="mb-2">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="#00a884">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.188 8.188 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24zM8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28c-.25-.12-1.47-.72-1.69-.8-.23-.08-.37-.12-.56.12-.16.19-.62.8-.76.96-.11.17-.23.19-.42.1-.19-.09-.81-.3-1.54-.95-.57-.5-.95-1.12-1.06-1.31-.11-.19-.01-.29.08-.39.08-.09.19-.23.28-.35.09-.12.12-.21.19-.35.06-.13.03-.25-.02-.35-.06-.09-.56-1.35-.77-1.84-.2-.48-.41-.42-.56-.43-.14 0-.3-.01-.47-.01z" />
        </svg>
      </div>

      <SidebarIcon
        active={activeSidebarTab === "chats"}
        badge={1}
        label="Chats"
        onClick={() => setActiveSidebarTab("chats")}
      >
        <MessageSquare size={20} />
      </SidebarIcon>

      <SidebarIcon
        active={activeSidebarTab === "status"}
        label="Status"
        onClick={() => setActiveSidebarTab("status")}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.8" strokeDasharray="3 2" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      </SidebarIcon>

      <SidebarIcon
        active={activeSidebarTab === "channels"}
        label="Channels"
        onClick={() => setActiveSidebarTab("channels")}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
          <line x1="4" y1="22" x2="4" y2="15" />
        </svg>
      </SidebarIcon>

      <SidebarIcon
        active={activeSidebarTab === "communities"}
        label="Communities"
        onClick={() => setActiveSidebarTab("communities")}
      >
        <Users size={20} />
      </SidebarIcon>

      <SidebarIcon
        active={activeSidebarTab === "starred"}
        label="Starred messages"
        onClick={() => setActiveSidebarTab("starred")}
      >
        <Star size={20} />
      </SidebarIcon>

      <div className="flex-1" />

      <SidebarIcon label="Meta AI">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
        </svg>
      </SidebarIcon>

      <SidebarIcon label="Settings">
        <Settings size={20} />
      </SidebarIcon>

      <div className="mt-1">
        <ChatAvatar name="Pournami Pottekat" size={34} style={{ backgroundColor: "#9e9e9e" }} />
      </div>
    </aside>
  );
}

// ─── ChatListItem ─────────────────────────────────────────────────────────────

function ChatListItem({
  chat,
  isActive,
  onSelect,
  className,
}: {
  chat: Chat;
  isActive: boolean;
  onSelect: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-3 text-left transition-colors",
        className
      )}
      style={{ backgroundColor: isActive ? "#f0f2f5" : "transparent" }}
      onMouseEnter={(e) => {
        if (!isActive) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#f9fafb";
      }}
      onMouseLeave={(e) => {
        if (!isActive) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
      }}
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <ChatAvatar
          name={chat.name}
          size={48}
          style={{ backgroundColor: chat.avatarColor }}
        />
        {chat.isGroup && (
          <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#00a884] rounded-full flex items-center justify-center">
            <Users size={9} className="text-white" />
          </span>
        )}
        {chat.isAI && (
          <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#00a884] rounded-full flex items-center justify-center text-white text-[8px] font-bold">
            AI
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 border-b border-[rgba(17,27,33,0.06)] pb-3 -mb-3">
        <div className="flex items-center justify-between mb-0.5">
          <span className="font-semibold text-[14.5px] text-[#111b21] truncate pr-2 leading-tight">
            {chat.name}
          </span>
          <span
            className="text-[11px] shrink-0"
            style={{ color: (chat.unread ?? 0) > 0 ? "#00a884" : "#667781" }}
          >
            {chat.timestamp}
          </span>
        </div>

        <div className="flex items-start justify-between gap-2">
          <span className="flex items-center gap-1 text-[13px] text-[#667781] truncate leading-snug">
            {chat.isOutgoing && <CheckCheck size={13} className="shrink-0 text-[#53bdeb]" />}
            {chat.isVoiceNote && <Mic size={12} className="shrink-0 text-[#667781]" />}
            {chat.lastMessage}
          </span>
          {(chat.unread ?? 0) > 0 && (
            <span className="shrink-0 min-w-[18px] h-[18px] bg-[#00a884] text-white text-[10px] font-semibold rounded-full flex items-center justify-center px-1 leading-none">
              {chat.unread}
            </span>
          )}
        </div>

        {chat.labels && chat.labels.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {chat.labels.map((l) => (
              <span
                key={l.text}
                className="text-[9px] font-bold tracking-wide px-1.5 py-0.5 rounded-full uppercase"
                style={{ color: l.textColor, backgroundColor: l.bg }}
              >
                {l.text}
              </span>
            ))}
          </div>
        )}
      </div>
    </button>
  );
}

// ─── ChatListPanel ────────────────────────────────────────────────────────────

function ChatListPanel({
  selected,
  onSelect,
  className,
}: {
  selected: string;
  onSelect: (id: string) => void;
  className?: string;
}) {
  const [filterTab, setFilterTab] = useState<FilterTab>("all");
  const [showBanner, setShowBanner] = useState(true);

  const filtered = conversations.filter((c) => {
    if (filterTab === "unread") return (c.unread ?? 0) > 0;
    if (filterTab === "new-customer")
      return c.labels?.some((l) => l.text === "NEW CUSTOMER");
    return true;
  });

  return (
    <div
      className={cn("flex flex-col shrink-0 overflow-hidden", className)}
      style={{
        width: 350,
        borderRight: "1px solid rgba(17,27,33,0.08)",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Panel header */}
      <div
        className="flex items-center justify-between px-4 py-3 shrink-0"
        style={{ backgroundColor: "#f0f2f5" }}
      >
        <span className="text-[#111b21] text-xl font-bold">WhatsApp</span>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors">
            <Plus size={18} className="text-[#54656f]" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors">
            <MoreVertical size={18} className="text-[#54656f]" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="px-3 py-2 shrink-0" style={{ backgroundColor: "#f0f2f5" }}>
        <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2">
          <Search size={15} className="text-[#54656f] shrink-0" />
          <input
            type="text"
            placeholder="Search or start a new chat"
            className="flex-1 text-[13.5px] text-[#111b21] placeholder-[#8696a0] outline-none bg-transparent border-none"
          />
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex items-center gap-2 px-3 py-2 shrink-0 bg-white">
        {(
          [
            { id: "all", label: "All" },
            { id: "unread", label: "Unread" },
            { id: "new-customer", label: "New customer", dot: "#e53935" },
          ] as { id: FilterTab; label: string; dot?: string }[]
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterTab(tab.id)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-medium transition-colors shrink-0"
            style={
              filterTab === tab.id
                ? { backgroundColor: "#d9fdd3", color: "#1a5c38" }
                : { backgroundColor: "#f0f2f5", color: "#111b21" }
            }
          >
            {tab.dot && (
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: tab.dot }}
              />
            )}
            {tab.label}
          </button>
        ))}
        <button className="w-6 h-6 flex items-center justify-center shrink-0 ml-auto">
          <ChevronDown size={14} className="text-[#54656f]" />
        </button>
      </div>

      {/* Notification banner */}
      {showBanner && (
        <div
          className="flex items-center gap-3 px-4 py-3 shrink-0"
          style={{ backgroundColor: "#fff8e1", borderBottom: "1px solid rgba(17,27,33,0.06)" }}
        >
          <BellOff size={18} className="text-[#54656f] shrink-0" />
          <div className="flex-1 min-w-0">
            <span className="text-[12.5px] text-[#54656f]">
              Message and call notifications are off.{" "}
            </span>
            <button className="text-[12.5px] font-semibold text-[#00a884]">Turn on</button>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="shrink-0 w-6 h-6 flex items-center justify-center hover:bg-black/5 rounded-full"
          >
            <X size={14} className="text-[#54656f]" />
          </button>
        </div>
      )}

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-[#667781] text-sm gap-2">
            <MessageSquare size={28} className="opacity-30" />
            <p className="text-[13px]">No conversations</p>
          </div>
        ) : (
          filtered.map((chat) => (
            <ChatListItem
              key={chat.id}
              chat={chat}
              isActive={selected === chat.id}
              onSelect={() => onSelect(chat.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

// ─── ChatArea ─────────────────────────────────────────────────────────────────

function ChatArea({
  chat,
  className,
}: {
  chat: Chat | undefined;
  className?: string;
}) {
  if (!chat) {
    return (
      <div
        className={cn(
          "flex-1 flex flex-col items-center justify-center gap-3",
          className
        )}
        style={{ backgroundColor: "#f0f2f5" }}
      >
        <div className="w-16 h-16 rounded-full bg-[#dfe5e7] flex items-center justify-center">
          <MessageSquare size={28} className="text-[#8696a0]" />
        </div>
        <p className="text-[16px] text-[#54656f] font-light">
          Select a chat to start messaging
        </p>
        <p className="text-[13px] text-[#8696a0]">
          Your messages are end-to-end encrypted
        </p>
      </div>
    );
  }

  return (
    <div className={cn("flex-1 flex flex-col overflow-hidden", className)}>
      {/* Chat header */}
      <div
        className="flex items-center justify-between px-4 py-2.5 shrink-0"
        style={{ backgroundColor: "#f0f2f5", borderBottom: "1px solid rgba(17,27,33,0.06)" }}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <ChatAvatar
              name={chat.name}
              size={40}
              style={{ backgroundColor: chat.avatarColor }}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-semibold text-[#111b21] leading-tight">
                {chat.name}
              </span>
              {chat.labels?.map((l) => (
                <span
                  key={l.text}
                  className="text-[9px] font-bold tracking-wide px-1.5 py-0.5 rounded-full uppercase"
                  style={{ color: l.textColor, backgroundColor: l.bg }}
                >
                  {l.text}
                </span>
              ))}
            </div>
            <span className="text-[12px] text-[#667781]">
              {chat.isGroup ? "Group" : "click here for contact info"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors">
            <Video size={18} className="text-[#54656f]" />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors">
            <Phone size={18} className="text-[#54656f]" />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors">
            <Search size={18} className="text-[#54656f]" />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors">
            <MoreVertical size={18} className="text-[#54656f]" />
          </button>
        </div>
      </div>

      {/* Message area */}
      <div
        className="flex-1 relative overflow-hidden"
        style={{ backgroundColor: "#efeae2" }}
      >
        <div className="absolute inset-0 wa-doodle opacity-40 pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-2 p-4 h-full overflow-y-auto">
          {/* Encryption notice */}
          <div className="flex justify-center my-2">
            <div
              className="text-center text-[11.5px] text-[#54656f] px-4 py-2 rounded-lg max-w-xs"
              style={{ backgroundColor: "#fffde7" }}
            >
              🔒 Messages and calls are end-to-end encrypted. Only people in this chat can read or listen to them.{" "}
              <span className="text-[#027eb5] cursor-pointer">Click to learn more</span>
            </div>
          </div>

          {/* Date divider */}
          <div className="flex items-center justify-center">
            <span
              className="text-[11.5px] text-[#54656f] px-3 py-1 rounded-full"
              style={{ backgroundColor: "#fffde7" }}
            >
              Yesterday
            </span>
          </div>

          {/* Incoming message */}
          <div className="flex justify-start">
            <div
              className="max-w-xs rounded-lg rounded-tl-none px-3 py-2 text-[14px] text-[#111b21]"
              style={{ backgroundColor: "#ffffff", boxShadow: "0 1px 0.5px rgba(11,20,26,0.13)" }}
            >
              <span>Hello</span>
              <span className="ml-2 text-[11px] text-[#667781]">11:10 PM</span>
            </div>
          </div>

          {/* Outgoing voice note */}
          <div className="flex justify-end">
            <div
              className="flex items-center gap-2 rounded-lg rounded-tr-none px-3 py-2"
              style={{
                backgroundColor: "#d9fdd3",
                boxShadow: "0 1px 0.5px rgba(11,20,26,0.13)",
                minWidth: 180,
              }}
            >
              <button className="w-8 h-8 rounded-full bg-[#00a884] flex items-center justify-center shrink-0">
                <svg width="12" height="14" viewBox="0 0 12 14" fill="white">
                  <path d="M0 0l12 7L0 14z" />
                </svg>
              </button>
              <div className="flex-1">
                <div className="flex items-center gap-0.5 mb-1">
                  {[4,6,10,14,8,12,16,6,10,14,8,5,12,16,10,8,14,6,10,8,12,6,8,4].map((h, i) => (
                    <div
                      key={i}
                      className="w-0.5 rounded-full bg-[#00a884]"
                      style={{ height: h }}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#667781]">3:02</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] text-[#667781]">11:11 PM</span>
                    <CheckCheck size={12} className="text-[#53bdeb]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Outgoing message */}
          <div className="flex justify-end">
            <div
              className="max-w-xs rounded-lg rounded-tr-none px-3 py-2 text-[14px] text-[#111b21]"
              style={{ backgroundColor: "#d9fdd3", boxShadow: "0 1px 0.5px rgba(11,20,26,0.13)" }}
            >
              <span>Hello</span>
              <span className="inline-flex items-center gap-1 ml-2">
                <span className="text-[11px] text-[#667781]">11:09 PM</span>
                <CheckCheck size={12} className="text-[#53bdeb]" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Input bar */}
      <div
        className="flex items-center gap-2 px-3 py-2.5 shrink-0"
        style={{ backgroundColor: "#f0f2f5" }}
      >
        <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors">
          <Smile size={22} className="text-[#54656f]" />
        </button>
        <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors">
          <Paperclip size={20} className="text-[#54656f]" />
        </button>
        <div className="flex-1 bg-white rounded-lg px-4 py-2.5 text-[14px] text-[#8696a0] cursor-text">
          Type a message
        </div>
        <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors">
          <Mic size={22} className="text-[#54656f]" />
        </button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WebPage() {
  const [selectedId, setSelectedId] = useState<string>("2");
  const [activeSidebarTab, setActiveSidebarTab] = useState("chats");

  const selectedChat = conversations.find((c) => c.id === selectedId);

  return (
    <div className="h-screen flex flex-col bg-[#111b21] overflow-hidden">
      {/* Back link bar */}
      <div className="shrink-0 px-4 py-2 flex items-center gap-3" style={{ backgroundColor: "#1a2a33" }}>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 transition-colors"
        >
          <ArrowLeft size={13} />
          Playground
        </Link>
        <span className="text-white/20 text-xs">·</span>
        <span className="text-white/40 text-xs font-medium">WhatsApp Web Prototype · Light Mode</span>
      </div>

      {/* Main 3-panel layout */}
      <div className="flex flex-1 overflow-hidden">
        <IconSidebar
          activeSidebarTab={activeSidebarTab}
          setActiveSidebarTab={setActiveSidebarTab}
        />
        <ChatListPanel selected={selectedId} onSelect={setSelectedId} />
        <ChatArea chat={selectedChat} />
      </div>
    </div>
  );
}
