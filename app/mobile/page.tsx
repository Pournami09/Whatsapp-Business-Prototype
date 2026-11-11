"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  MoreVertical,
  MessageSquare,
  Phone,
  Users,
  ArrowLeft,
  CheckCheck,
  Mic,
  Camera,
} from "lucide-react";
import { ChatAvatar } from "@/components/ui/whatsapp/chat-avatar";

// ─── Data ───────────────────────────────────────────────────────────────────

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
  {
    id: "9",
    name: "Marketing Team",
    avatarColor: "#f57c00",
    lastMessage: "New campaign materials are ready for review",
    timestamp: "9/11",
    unread: 2,
    isGroup: true,
  },
];

type NavTab = "chats" | "updates" | "communities" | "calls";
type FilterTab = "all" | "unread" | "favorites" | "groups";

// ─── Chat list item ──────────────────────────────────────────────────────────

function ChatListItem({
  chat,
  isSelected,
  onSelect,
}: {
  chat: Chat;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors"
      style={{ backgroundColor: isSelected ? "#f0f2f5" : "transparent" }}
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <ChatAvatar
          name={chat.name}
          size={50}
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
      <div className="flex-1 min-w-0 border-b border-[rgba(17,27,33,0.08)] pb-3 -mb-3">
        {/* Row 1: name + timestamp */}
        <div className="flex items-center justify-between mb-0.5">
          <span className="font-semibold text-[15px] text-[#111b21] truncate pr-2 leading-tight">
            {chat.name}
          </span>
          <span
            className="text-[11px] shrink-0"
            style={{ color: (chat.unread ?? 0) > 0 ? "#00a884" : "#667781" }}
          >
            {chat.timestamp}
          </span>
        </div>

        {/* Row 2: preview + unread badge */}
        <div className="flex items-start justify-between gap-2">
          <span className="flex items-center gap-1 text-[13px] text-[#667781] truncate leading-snug">
            {chat.isOutgoing && (
              <CheckCheck size={14} className="shrink-0 text-[#53bdeb]" />
            )}
            {chat.isVoiceNote && (
              <Mic size={13} className="shrink-0 text-[#667781]" />
            )}
            {chat.lastMessage}
          </span>
          {(chat.unread ?? 0) > 0 && (
            <span className="shrink-0 min-w-[18px] h-[18px] bg-[#00a884] text-white text-[11px] font-semibold rounded-full flex items-center justify-center px-1 leading-none">
              {chat.unread}
            </span>
          )}
        </div>

        {/* Row 3: labels */}
        {chat.labels && chat.labels.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
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

// ─── Status bar simulation ───────────────────────────────────────────────────

function StatusBar() {
  return (
    <div className="h-10 bg-white flex items-center justify-between px-6 text-[12px] font-semibold text-[#111b21] shrink-0">
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        <svg width="16" height="12" viewBox="0 0 16 12" fill="#111b21">
          <rect x="0" y="4" width="2.5" height="8" rx="0.5" />
          <rect x="4" y="2.5" width="2.5" height="9.5" rx="0.5" />
          <rect x="8" y="1" width="2.5" height="11" rx="0.5" />
          <rect x="12" y="0" width="2.5" height="12" rx="0.5" />
        </svg>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="#111b21">
          <path d="M7.5 2.2C5.1 2.2 2.9 3.1 1.2 4.7L0 3.5C2.0 1.6 4.6.5 7.5.5s5.5 1.1 7.5 3L13.8 4.7C12.1 3.1 9.9 2.2 7.5 2.2z" />
          <path d="M7.5 5.5C6.0 5.5 4.6 6.1 3.5 7.1L2.3 5.9C3.7 4.6 5.5 3.8 7.5 3.8s3.8.8 5.2 2.1L11.5 7.1C10.4 6.1 9.0 5.5 7.5 5.5z" />
          <circle cx="7.5" cy="10" r="1.5" />
        </svg>
        <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="#111b21" strokeOpacity="0.35" />
          <rect x="1.5" y="1.5" width="17" height="9" rx="1.5" fill="#111b21" />
          <path d="M22.5 4.5v3c.8-.4 1.3-1.1 1.3-1.5s-.5-1.1-1.3-1.5z" fill="#111b21" fillOpacity="0.4" />
        </svg>
      </div>
    </div>
  );
}

// ─── Top app bar ─────────────────────────────────────────────────────────────

function TopAppBar() {
  return (
    <div className="bg-white px-4 pt-1 pb-2 shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="#00a884">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.188 8.188 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24zM8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28c-.25-.12-1.47-.72-1.69-.8-.23-.08-.37-.12-.56.12-.16.19-.62.8-.76.96-.11.17-.23.19-.42.1-.19-.09-.81-.3-1.54-.95-.57-.5-.95-1.12-1.06-1.31-.11-.19-.01-.29.08-.39.08-.09.19-.23.28-.35.09-.12.12-.21.19-.35.06-.13.03-.25-.02-.35-.06-.09-.56-1.35-.77-1.84-.2-.48-.41-.42-.56-.43-.14 0-.3-.01-.47-.01z" />
          </svg>
          <span className="text-[#111b21] text-xl font-bold tracking-tight">WhatsApp</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#f0f2f5] transition-colors">
            <Camera size={20} className="text-[#54656f]" />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#f0f2f5] transition-colors">
            <Search size={20} className="text-[#54656f]" />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#f0f2f5] transition-colors">
            <MoreVertical size={20} className="text-[#54656f]" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Filter tabs ─────────────────────────────────────────────────────────────

function FilterTabs({
  active,
  onChange,
}: {
  active: FilterTab;
  onChange: (t: FilterTab) => void;
}) {
  const tabs: { id: FilterTab; label: string }[] = [
    { id: "all", label: "All" },
    { id: "unread", label: "Unread" },
    { id: "favorites", label: "Favorites" },
    { id: "groups", label: "Groups" },
  ];

  return (
    <div className="flex border-b border-[rgba(17,27,33,0.08)] bg-white px-2 shrink-0">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className="relative flex-1 py-3 text-[13px] font-semibold transition-colors"
          style={{ color: active === tab.id ? "#00a884" : "#667781" }}
        >
          {tab.label}
          {active === tab.id && (
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-10 rounded-full bg-[#00a884]" />
          )}
        </button>
      ))}
    </div>
  );
}

// ─── Bottom nav ───────────────────────────────────────────────────────────────

function BottomNav({
  active,
  onChange,
}: {
  active: NavTab;
  onChange: (t: NavTab) => void;
}) {
  const tabs: { id: NavTab; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
    { id: "chats", label: "Chats", icon: MessageSquare },
    {
      id: "updates",
      label: "Updates",
      icon: ({ size, className }) => (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      ),
    },
    { id: "communities", label: "Communities", icon: Users },
    { id: "calls", label: "Calls", icon: Phone },
  ];

  return (
    <nav className="bg-white border-t border-[rgba(17,27,33,0.08)] flex pb-safe shrink-0">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className="flex-1 flex flex-col items-center gap-0.5 py-2.5 transition-colors"
        >
          <Icon
            size={22}
            className={active === id ? "text-[#00a884]" : "text-[#54656f]"}
          />
          <span
            className="text-[10px] font-medium"
            style={{ color: active === id ? "#00a884" : "#54656f" }}
          >
            {label}
          </span>
        </button>
      ))}
    </nav>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MobilePage() {
  const [filterTab, setFilterTab] = useState<FilterTab>("all");
  const [navTab, setNavTab] = useState<NavTab>("chats");
  const [selectedId, setSelectedId] = useState<string>("2");

  const filtered = conversations.filter((c) => {
    if (filterTab === "unread") return (c.unread ?? 0) > 0;
    if (filterTab === "favorites") return c.isFavorite;
    if (filterTab === "groups") return c.isGroup;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#e5ddd5] flex flex-col items-center justify-center p-6">
      {/* Back link */}
      <div className="mb-6 self-start">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          Playground
        </Link>
      </div>

      <p className="text-xs text-white/50 mb-4 font-medium tracking-wide uppercase">
        Mobile Prototype
      </p>

      {/* Phone frame */}
      <div
        className="relative bg-white overflow-hidden flex flex-col"
        style={{
          width: 390,
          height: 844,
          borderRadius: 44,
          border: "10px solid #1a1a1a",
          boxShadow:
            "0 70px 140px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.15)",
        }}
      >
        {/* Notch */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 z-10 bg-[#1a1a1a]"
          style={{ width: 120, height: 32, borderRadius: "0 0 20px 20px" }}
        />

        {/* Screen content */}
        <div className="flex flex-col h-full pt-10 overflow-hidden">
          <StatusBar />
          <TopAppBar />
          <FilterTabs active={filterTab} onChange={setFilterTab} />

          {/* Chat list */}
          <div className="flex-1 overflow-y-auto bg-white">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-[#667781] text-sm gap-2">
                <MessageSquare size={40} className="opacity-30" />
                <p>No conversations</p>
              </div>
            ) : (
              filtered.map((chat) => (
                <ChatListItem
                  key={chat.id}
                  chat={chat}
                  isSelected={selectedId === chat.id}
                  onSelect={() => setSelectedId(chat.id)}
                />
              ))
            )}
          </div>

          <BottomNav active={navTab} onChange={setNavTab} />
        </div>
      </div>
    </div>
  );
}
