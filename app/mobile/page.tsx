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
import { cn } from "@/components/ui/whatsapp/cn";
import "./mobile.css";

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

// ─── ChatListItem ─────────────────────────────────────────────────────────────

function ChatListItem({
  chat,
  isSelected,
  onSelect,
  className,
}: {
  chat: Chat;
  isSelected: boolean;
  onSelect: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "wa-chat-list-item",
        isSelected && "wa-chat-list-item--active",
        className
      )}
    >
      {/* Avatar */}
      <div className="wa-chat-list-item__avatar">
        <ChatAvatar
          name={chat.name}
          size={50}
          className="wa-chat-list-item__avatar-img"
          style={{ backgroundColor: chat.avatarColor }}
        />
        {chat.isGroup && (
          <span className="wa-chat-list-item__avatar-badge wa-chat-list-item__avatar-badge--group">
            <Users size={9} />
          </span>
        )}
        {chat.isAI && (
          <span className="wa-chat-list-item__avatar-badge wa-chat-list-item__avatar-badge--ai">
            AI
          </span>
        )}
      </div>

      {/* Content */}
      <div className="wa-chat-list-item__content">
        {/* Row 1: name + timestamp */}
        <div className="wa-chat-list-item__row wa-chat-list-item__row--top">
          <span className="wa-chat-list-item__name">{chat.name}</span>
          <span
            className={cn(
              "wa-chat-list-item__timestamp",
              (chat.unread ?? 0) > 0 && "wa-chat-list-item__timestamp--unread"
            )}
          >
            {chat.timestamp}
          </span>
        </div>

        {/* Row 2: preview + unread badge */}
        <div className="wa-chat-list-item__row wa-chat-list-item__row--bottom">
          <span className="wa-chat-list-item__preview">
            {chat.isOutgoing && (
              <CheckCheck size={14} className="wa-chat-list-item__read-tick" />
            )}
            {chat.isVoiceNote && (
              <Mic size={13} className="wa-chat-list-item__voice-icon" />
            )}
            {chat.lastMessage}
          </span>
          {(chat.unread ?? 0) > 0 && (
            <span className="wa-chat-list-item__unread-badge">{chat.unread}</span>
          )}
        </div>

        {/* Row 3: labels */}
        {chat.labels && chat.labels.length > 0 && (
          <div className="wa-chat-list-item__labels">
            {chat.labels.map((l) => (
              <span
                key={l.text}
                className="wa-chat-list-item__label"
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

// ─── StatusBar ────────────────────────────────────────────────────────────────

function StatusBar({ className }: { className?: string }) {
  return (
    <div className={cn("wa-status-bar", className)}>
      <span className="wa-status-bar__time">9:41</span>
      <div className="wa-status-bar__indicators">
        <svg className="wa-status-bar__signal" width="16" height="12" viewBox="0 0 16 12" fill="#111b21">
          <rect x="0" y="4" width="2.5" height="8" rx="0.5" />
          <rect x="4" y="2.5" width="2.5" height="9.5" rx="0.5" />
          <rect x="8" y="1" width="2.5" height="11" rx="0.5" />
          <rect x="12" y="0" width="2.5" height="12" rx="0.5" />
        </svg>
        <svg className="wa-status-bar__wifi" width="15" height="11" viewBox="0 0 15 11" fill="#111b21">
          <path d="M7.5 2.2C5.1 2.2 2.9 3.1 1.2 4.7L0 3.5C2.0 1.6 4.6.5 7.5.5s5.5 1.1 7.5 3L13.8 4.7C12.1 3.1 9.9 2.2 7.5 2.2z" />
          <path d="M7.5 5.5C6.0 5.5 4.6 6.1 3.5 7.1L2.3 5.9C3.7 4.6 5.5 3.8 7.5 3.8s3.8.8 5.2 2.1L11.5 7.1C10.4 6.1 9.0 5.5 7.5 5.5z" />
          <circle cx="7.5" cy="10" r="1.5" />
        </svg>
        <svg className="wa-status-bar__battery" width="24" height="12" viewBox="0 0 24 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="#111b21" strokeOpacity="0.35" />
          <rect x="1.5" y="1.5" width="17" height="9" rx="1.5" fill="#111b21" />
          <path d="M22.5 4.5v3c.8-.4 1.3-1.1 1.3-1.5s-.5-1.1-1.3-1.5z" fill="#111b21" fillOpacity="0.4" />
        </svg>
      </div>
    </div>
  );
}

// ─── TopAppBar ────────────────────────────────────────────────────────────────

function TopAppBar({ className }: { className?: string }) {
  return (
    <div className={cn("wa-top-app-bar", className)}>
      <div className="wa-top-app-bar__inner">
        <div className="wa-top-app-bar__brand">
          <svg className="wa-top-app-bar__logo" viewBox="0 0 24 24" width="28" height="28" fill="#00a884">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.188 8.188 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24zM8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28c-.25-.12-1.47-.72-1.69-.8-.23-.08-.37-.12-.56.12-.16.19-.62.8-.76.96-.11.17-.23.19-.42.1-.19-.09-.81-.3-1.54-.95-.57-.5-.95-1.12-1.06-1.31-.11-.19-.01-.29.08-.39.08-.09.19-.23.28-.35.09-.12.12-.21.19-.35.06-.13.03-.25-.02-.35-.06-.09-.56-1.35-.77-1.84-.2-.48-.41-.42-.56-.43-.14 0-.3-.01-.47-.01z" />
          </svg>
          <span className="wa-top-app-bar__title">WhatsApp</span>
        </div>
        <div className="wa-top-app-bar__actions">
          <button className="wa-top-app-bar__action-btn wa-top-app-bar__action-btn--camera">
            <Camera size={20} />
          </button>
          <button className="wa-top-app-bar__action-btn wa-top-app-bar__action-btn--search">
            <Search size={20} />
          </button>
          <button className="wa-top-app-bar__action-btn wa-top-app-bar__action-btn--menu">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── FilterTabs ───────────────────────────────────────────────────────────────

function FilterTabs({
  active,
  onChange,
  className,
}: {
  active: FilterTab;
  onChange: (t: FilterTab) => void;
  className?: string;
}) {
  const tabs: { id: FilterTab; label: string }[] = [
    { id: "all", label: "All" },
    { id: "unread", label: "Unread" },
    { id: "favorites", label: "Favorites" },
    { id: "groups", label: "Groups" },
  ];

  return (
    <div className={cn("wa-filter-tabs", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "wa-filter-tabs__tab",
            active === tab.id && "wa-filter-tabs__tab--active"
          )}
        >
          {tab.label}
          {active === tab.id && (
            <span className="wa-filter-tabs__indicator" />
          )}
        </button>
      ))}
    </div>
  );
}

// ─── BottomNav ────────────────────────────────────────────────────────────────

function BottomNav({
  active,
  onChange,
  className,
}: {
  active: NavTab;
  onChange: (t: NavTab) => void;
  className?: string;
}) {
  const tabs: {
    id: NavTab;
    label: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
  }[] = [
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
    <nav className={cn("wa-bottom-nav", className)}>
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={cn("wa-bottom-nav__tab", active === id && "wa-bottom-nav__tab--active")}
        >
          <Icon size={22} className="wa-bottom-nav__tab-icon" />
          <span className="wa-bottom-nav__tab-label">{label}</span>
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
    <div className="wa-mobile-playground">
      {/* Back link */}
      <div className="wa-mobile-playground__back">
        <Link href="/" className="wa-mobile-playground__back-link">
          <ArrowLeft size={16} />
          Playground
        </Link>
      </div>

      <p className="wa-mobile-playground__label">Mobile Prototype</p>

      {/* Phone frame */}
      <div className="wa-phone-frame">
        {/* Notch */}
        <div className="wa-phone-frame__notch" />

        {/* Screen content */}
        <div className="wa-phone-frame__screen">
          <StatusBar />
          <TopAppBar />
          <FilterTabs active={filterTab} onChange={setFilterTab} />

          {/* Chat list */}
          <div className="wa-mobile-chat-list">
            {filtered.length === 0 ? (
              <div className="wa-mobile-chat-list__empty">
                <MessageSquare size={40} className="wa-mobile-chat-list__empty-icon" />
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
