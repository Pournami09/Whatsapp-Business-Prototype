"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Briefcase,
  Check,
  CheckCheck,
  ChevronDown,
  History,
  MapPin,
  MessageCircle,
  MessageSquare,
  Mic,
  Moon,
  MoreVertical,
  Paperclip,
  Phone,
  Plus,
  Search,
  Settings,
  Smile,
  Star,
  Store,
  Users,
  Video,
  VolumeX,
  X,
} from "lucide-react";
import { cn } from "@/components/ui/whatsapp/cn";
import "./web.css";

// ─── Types ────────────────────────────────────────────────────────────────────

type UrgencyLevel = "critical" | "high";
type ContextTabId = "customers" | "team" | "ops";
type FilterChipId =
  | "all"
  | "priority"
  | "beat"
  | "orders"
  | "delivery"
  | "payments"
  | "complaints";

// ─── Data ────────────────────────────────────────────────────────────────────

type ApprovalCardData = {
  id: string;
  urgency: UrgencyLevel;
  dealer: string;
  dueLabel: string;
  dueColor: string;
  title: string;
  detail: string;
  context: string;
  contextType: "history" | "message";
};

const approvalCards: ApprovalCardData[] = [
  {
    id: "1",
    urgency: "critical",
    dealer: "Shah Distributors · Dadar",
    dueLabel: "Due 5 pm",
    dueColor: "#b91c1c",
    title: "12% scheme on 40 ctns hampers",
    detail: "\u20b94.6L order \u00b7 margin \u22123.1%",
    context: "Got 10% in Oct \u00b7 paid on time",
    contextType: "history",
  },
  {
    id: "2",
    urgency: "high",
    dealer: "Ankit Rao \u00b7 Field rep",
    dueLabel: "Today",
    dueColor: "#92400e",
    title: "+8% margin for Shoppers Stop",
    detail: "6 stores \u00b7 ~\u20b92.1L",
    context: "From chat only \u00b7 no order history",
    contextType: "message",
  },
];

type Chat = {
  id: string;
  name: string;
  avatarBg?: string;
  avatarInitials?: string;
  avatarInitialsColor?: string;
  avatarImg?: string;
  isGroup?: boolean;
  lastMessage: string;
  timestamp?: string;
  urgency?: UrgencyLevel;
  urgencyLabel?: string;
  unread?: number;
  isMuted?: boolean;
  isVoiceNote?: boolean;
  scheduledVisit?: string;
};

const conversations: Chat[] = [
  {
    id: "1",
    name: "Gupta Kirana \u00b7 Matunga",
    avatarBg: "#ffedd5",
    avatarInitials: "GK",
    avatarInitialsColor: "#9a3412",
    urgency: "critical",
    urgencyLabel: "Waiting 40m",
    lastMessage:
      "\u201cBhaiya 6 dabbe toote aaye, replacement kab?\u201d",
    isVoiceNote: true,
    unread: 1,
  },
  {
    id: "2",
    name: "Sameer Khan \u00b7 Rep",
    avatarImg:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200",
    urgency: "critical",
    urgencyLabel: "At store now",
    lastMessage:
      "Star Bazaar manager asking our return policy on expiry",
    unread: 2,
  },
  {
    id: "3",
    name: "Reliance Smart \u00b7 Andheri W",
    avatarBg: "#e0e7ff",
    avatarInitials: "RS",
    avatarInitialsColor: "#3730a3",
    urgency: "high",
    timestamp: "10:15",
    lastMessage: "PO \u20b93.8L sent \u2014 confirm delivery by Thu?",
    unread: 2,
  },
  {
    id: "4",
    name: "Vikram Iyer \u00b7 Regional Head",
    avatarImg:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200",
    urgency: "high",
    timestamp: "10:05",
    lastMessage: "Need Mumbai Q4 numbers before 6 pm call",
    unread: 1,
  },
  {
    id: "5",
    name: "Taj Lands End \u00b7 Bandra",
    avatarBg: "#ede9fe",
    avatarInitials: "TL",
    avatarInitialsColor: "#5b21b6",
    scheduledVisit: "Ankit, 4 pm",
    lastMessage:
      "Samples loved \u2014 let\u2019s talk Christmas order",
  },
  {
    id: "6",
    name: "Mumbai Sales Team",
    isGroup: true,
    avatarBg: "#dcefe9",
    timestamp: "10:58",
    lastMessage:
      "Sameer: Thane beat done \u2014 32 outlets, 4 new",
    isMuted: true,
    unread: 24,
  },
];

const filterChips: { id: FilterChipId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "priority", label: "Priority \u00b7 4" },
  { id: "beat", label: "Today\u2019s beat \u00b7 3" },
  { id: "orders", label: "Orders \u00b7 2" },
  { id: "delivery", label: "Delivery \u00b7 1" },
  { id: "payments", label: "Payments \u00b7 1" },
  { id: "complaints", label: "Complaints \u00b7 1" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function ChatAvatarEl({ chat, size }: { chat: Chat; size: number }) {
  if (chat.avatarImg) {
    return (
      <img
        src={chat.avatarImg}
        alt={chat.name}
        className="wa-chat-avatar__img"
        style={{ width: size, height: size }}
      />
    );
  }
  if (chat.isGroup) {
    return (
      <div
        className="wa-chat-avatar__initials"
        style={{
          width: size,
          height: size,
          backgroundColor: chat.avatarBg ?? "#dcefe9",
        }}
      >
        <Users size={size * 0.42} style={{ color: "#54656f" }} />
      </div>
    );
  }
  return (
    <div
      className="wa-chat-avatar__initials"
      style={{
        width: size,
        height: size,
        backgroundColor: chat.avatarBg,
        fontSize: size * 0.32,
      }}
    >
      <span style={{ color: chat.avatarInitialsColor }}>
        {chat.avatarInitials}
      </span>
    </div>
  );
}

// ─── SidebarIcon ──────────────────────────────────────────────────────────────

function SidebarIcon({
  children,
  active,
  badge,
  label,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  badge?: number;
  label?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={cn(
        "wa-sidebar-icon",
        active && "wa-sidebar-icon--active"
      )}
    >
      <span className="wa-sidebar-icon__glyph">{children}</span>
      {badge ? (
        <span className="wa-sidebar-icon__badge">{badge}</span>
      ) : null}
    </button>
  );
}

// ─── IconSidebar ──────────────────────────────────────────────────────────────

function IconSidebar({
  activeSidebarTab,
  setActiveSidebarTab,
}: {
  activeSidebarTab: string;
  setActiveSidebarTab: (t: string) => void;
}) {
  return (
    <aside className="wa-icon-sidebar">
      <div className="wa-icon-sidebar__logo">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="#008069">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.188 8.188 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24zM8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28c-.25-.12-1.47-.72-1.69-.8-.23-.08-.37-.12-.56.12-.16.19-.62.8-.76.96-.11.17-.23.19-.42.1-.19-.09-.81-.3-1.54-.95-.57-.5-.95-1.12-1.06-1.31-.11-.19-.01-.29.08-.39.08-.09.19-.23.28-.35.09-.12.12-.21.19-.35.06-.13.03-.25-.02-.35-.06-.09-.56-1.35-.77-1.84-.2-.48-.41-.42-.56-.43-.14 0-.3-.01-.47-.01z" />
        </svg>
      </div>

      <nav className="wa-icon-sidebar__nav">
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
      </nav>

      <div className="wa-icon-sidebar__spacer" />

      <div className="wa-icon-sidebar__bottom">
        <SidebarIcon label="Settings">
          <Settings size={20} />
        </SidebarIcon>

        <div className="wa-icon-sidebar__avatar">
          <div className="wa-icon-sidebar__avatar-circle">R</div>
        </div>
      </div>
    </aside>
  );
}

// ─── ApprovalCard ─────────────────────────────────────────────────────────────

function ApprovalCard({ card }: { card: ApprovalCardData }) {
  return (
    <div
      className={cn(
        "wa-approval-card",
        `wa-approval-card--${card.urgency}`
      )}
    >
      <div className="wa-approval-card__header">
        <div
          className={`wa-approval-card__urgency-dot wa-approval-card__urgency-dot--${card.urgency}`}
        />
        <span className="wa-approval-card__dealer">{card.dealer}</span>
        <span
          className="wa-approval-card__due"
          style={{ color: card.dueColor }}
        >
          {card.dueLabel}
        </span>
      </div>
      <div className="wa-approval-card__body">
        <span className="wa-approval-card__title">{card.title}</span>
        <span className="wa-approval-card__detail">{card.detail}</span>
      </div>
      <div className="wa-approval-card__context">
        {card.contextType === "history" ? (
          <History
            size={11}
            className="wa-approval-card__context-icon"
          />
        ) : (
          <MessageCircle
            size={11}
            className="wa-approval-card__context-icon wa-approval-card__context-icon--muted"
          />
        )}
        <span className="wa-approval-card__context-text">
          {card.context}
        </span>
      </div>
      {card.urgency === "critical" && (
        <div className="wa-approval-card__actions">
          <button className="wa-approval-card__btn-approve">
            <Check size={13} />
            <span>Approve</span>
          </button>
          <button className="wa-approval-card__btn-discuss">Discuss</button>
        </div>
      )}
    </div>
  );
}

// ─── ApprovalsSection ─────────────────────────────────────────────────────────

function ApprovalsSection() {
  return (
    <div className="wa-approvals">
      <div className="wa-approvals__header">
        <div className="wa-approvals__header-left">
          <span className="wa-approvals__title">Approvals Needed</span>
          <span className="wa-approvals__count">4</span>
        </div>
        <button className="wa-approvals__see-all">See all</button>
      </div>
      <div className="wa-approvals__cards">
        {approvalCards.map((card) => (
          <ApprovalCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}

// ─── ContextTabs ──────────────────────────────────────────────────────────────

function ContextTabs({
  active,
  onChange,
}: {
  active: ContextTabId;
  onChange: (t: ContextTabId) => void;
}) {
  const tabs: {
    id: ContextTabId;
    label: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    count: number;
  }[] = [
    { id: "customers", label: "Customers", icon: Store, count: 6 },
    { id: "team", label: "Team", icon: Users, count: 3 },
    { id: "ops", label: "Ops & Fin", icon: Briefcase, count: 4 },
  ];

  return (
    <div className="wa-context-tabs">
      {tabs.map(({ id, label, icon: Icon, count }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={cn(
            "wa-context-tabs__tab",
            active === id && "wa-context-tabs__tab--active"
          )}
        >
          <Icon size={13} className="wa-context-tabs__tab-icon" />
          <span className="wa-context-tabs__tab-label">{label}</span>
          <span
            className={cn(
              "wa-context-tabs__tab-count",
              active === id && "wa-context-tabs__tab-count--active"
            )}
          >
            {count}
          </span>
        </button>
      ))}
    </div>
  );
}

// ─── AiQuietedBanner ─────────────────────────────────────────────────────────

function AiQuietedBanner() {
  return (
    <div className="wa-ai-banner">
      <Moon size={12} className="wa-ai-banner__icon" />
      <span className="wa-ai-banner__text">
        14 quieted by AI \u00b7 Porter, Bluedart, Amazon\u2026
      </span>
      <button className="wa-ai-banner__review">Review</button>
    </div>
  );
}

// ─── ChatListItem ─────────────────────────────────────────────────────────────

function ChatListItem({
  chat,
  isActive,
  onSelect,
}: {
  chat: Chat;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "wa-chat-list-item",
        isActive && "wa-chat-list-item--active"
      )}
    >
      {/* Avatar with optional urgency ring */}
      <div
        className={cn(
          "wa-chat-list-item__avatar-wrap",
          chat.urgency &&
            `wa-chat-list-item__avatar-wrap--${chat.urgency}`
        )}
      >
        <ChatAvatarEl chat={chat} size={46} />
        {chat.urgency && (
          <div
            className={`wa-chat-list-item__urgency-dot wa-chat-list-item__urgency-dot--${chat.urgency}`}
          />
        )}
      </div>

      {/* Content */}
      <div className="wa-chat-list-item__content">
        <div className="wa-chat-list-item__row wa-chat-list-item__row--top">
          <span className="wa-chat-list-item__name">{chat.name}</span>
          {chat.urgencyLabel ? (
            <span
              className={`wa-chat-list-item__urgency-label wa-chat-list-item__urgency-label--${chat.urgency}`}
            >
              {chat.urgencyLabel}
            </span>
          ) : chat.scheduledVisit ? (
            <div className="wa-chat-list-item__visit">
              <MapPin size={10} className="wa-chat-list-item__visit-icon" />
              <span className="wa-chat-list-item__visit-label">
                {chat.scheduledVisit}
              </span>
            </div>
          ) : (
            <span
              className={cn(
                "wa-chat-list-item__timestamp",
                (chat.unread ?? 0) > 0 &&
                  !chat.isMuted &&
                  "wa-chat-list-item__timestamp--unread"
              )}
            >
              {chat.timestamp}
            </span>
          )}
        </div>

        <div className="wa-chat-list-item__row wa-chat-list-item__row--bottom">
          <span className="wa-chat-list-item__preview">
            {chat.isVoiceNote && (
              <Mic size={13} className="wa-chat-list-item__voice-icon" />
            )}
            {chat.lastMessage}
          </span>
          <div className="wa-chat-list-item__meta">
            {chat.isMuted && (
              <VolumeX
                size={13}
                className="wa-chat-list-item__muted-icon"
              />
            )}
            {(chat.unread ?? 0) > 0 && (
              <span
                className={cn(
                  "wa-chat-list-item__unread-badge",
                  chat.isMuted &&
                    "wa-chat-list-item__unread-badge--muted"
                )}
              >
                {chat.unread}
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}

// ─── ChatListPanel ────────────────────────────────────────────────────────────

function ChatListPanel({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  const [contextTab, setContextTab] = useState<ContextTabId>("customers");
  const [filterChip, setFilterChip] = useState<FilterChipId>("priority");

  return (
    <div className="wa-chat-list-panel">
      {/* Header */}
      <div className="wa-chat-list-panel__header">
        <span className="wa-chat-list-panel__header-title">
          WhatsApp Business
        </span>
        <div className="wa-chat-list-panel__header-actions">
          <button className="wa-chat-list-panel__header-btn">
            <Plus size={18} />
          </button>
          <button className="wa-chat-list-panel__header-btn">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="wa-chat-list-panel__search-wrap">
        <div className="wa-chat-list-panel__search">
          <Search size={14} className="wa-chat-list-panel__search-icon" />
          <input
            type="text"
            placeholder="Search chats, POs, amounts"
            className="wa-chat-list-panel__search-input"
          />
        </div>
      </div>

      {/* Approvals section */}
      <ApprovalsSection />

      {/* Context tabs */}
      <ContextTabs active={contextTab} onChange={setContextTab} />

      {/* Filter chips */}
      <div className="wa-chat-list-panel__filters">
        {filterChips.map((chip) => (
          <button
            key={chip.id}
            onClick={() => setFilterChip(chip.id)}
            className={cn(
              "wa-chat-list-panel__filter-chip",
              filterChip === chip.id &&
                "wa-chat-list-panel__filter-chip--active"
            )}
          >
            {chip.label}
          </button>
        ))}
        <button className="wa-chat-list-panel__filters-more">
          <ChevronDown size={13} />
        </button>
      </div>

      {/* Chat list */}
      <div className="wa-chat-list-panel__list">
        <AiQuietedBanner />
        {conversations.map((chat) => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            isActive={selected === chat.id}
            onSelect={() => onSelect(chat.id)}
          />
        ))}
      </div>
    </div>
  );
}

// ─── ChatArea ─────────────────────────────────────────────────────────────────

function ChatArea({ chat }: { chat: Chat | undefined }) {
  if (!chat) {
    return (
      <div className="wa-chat-area wa-chat-area--empty">
        <div className="wa-chat-area__empty-icon">
          <MessageSquare size={28} />
        </div>
        <p className="wa-chat-area__empty-title">
          Select a chat to start messaging
        </p>
        <p className="wa-chat-area__empty-subtitle">
          Your messages are end-to-end encrypted
        </p>
      </div>
    );
  }

  return (
    <div className="wa-chat-area">
      {/* Header */}
      <div className="wa-chat-area__header">
        <div className="wa-chat-area__header-contact">
          <div
            className={cn(
              "wa-chat-area__header-avatar-wrap",
              chat.urgency &&
                `wa-chat-area__header-avatar-wrap--${chat.urgency}`
            )}
          >
            <ChatAvatarEl chat={chat} size={38} />
          </div>
          <div className="wa-chat-area__header-info">
            <div className="wa-chat-area__header-name-row">
              <span className="wa-chat-area__header-name">{chat.name}</span>
              {chat.urgencyLabel && (
                <span
                  className={`wa-chat-area__header-urgency wa-chat-area__header-urgency--${chat.urgency}`}
                >
                  {chat.urgencyLabel}
                </span>
              )}
            </div>
            <span className="wa-chat-area__header-subtitle">
              {chat.isGroup ? "Group" : "click here for contact info"}
            </span>
          </div>
        </div>
        <div className="wa-chat-area__header-actions">
          <button className="wa-chat-area__header-btn">
            <Video size={18} />
          </button>
          <button className="wa-chat-area__header-btn">
            <Phone size={18} />
          </button>
          <button className="wa-chat-area__header-btn">
            <Search size={18} />
          </button>
          <button className="wa-chat-area__header-btn">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="wa-chat-area__messages">
        <div className="wa-chat-area__messages-bg wa-doodle" />
        <div className="wa-chat-area__messages-scroll">
          <div className="wa-chat-area__encryption-notice">
            <div className="wa-chat-area__encryption-notice-bubble">
              🔒 Messages and calls are end-to-end encrypted. Only people
              in this chat can read or listen to them.{" "}
              <span className="wa-chat-area__encryption-notice-link">
                Click to learn more
              </span>
            </div>
          </div>

          <div className="wa-chat-area__date-divider">
            <span className="wa-chat-area__date-divider-label">Today</span>
          </div>

          {/* Incoming voice note */}
          <div className="wa-chat-area__message wa-chat-area__message--incoming">
            <div className="wa-chat-area__voice-note">
              <button className="wa-chat-area__voice-note-play">
                <svg width="12" height="14" viewBox="0 0 12 14" fill="white">
                  <path d="M0 0l12 7L0 14z" />
                </svg>
              </button>
              <div className="wa-chat-area__voice-note-body">
                <div className="wa-chat-area__voice-note-waveform">
                  {[4, 7, 11, 15, 9, 13, 17, 7, 11, 15, 9, 6, 13, 17, 11, 9, 15, 7, 11, 9].map(
                    (h, i) => (
                      <div
                        key={i}
                        className="wa-chat-area__voice-note-bar"
                        style={{ height: h }}
                      />
                    )
                  )}
                </div>
                <div className="wa-chat-area__voice-note-footer">
                  <span className="wa-chat-area__voice-note-duration">
                    0:08
                  </span>
                  <span className="wa-chat-area__message-meta">
                    9:41 AM
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Incoming text */}
          <div className="wa-chat-area__message wa-chat-area__message--incoming">
            <div className="wa-chat-area__message-bubble">
              <span className="wa-chat-area__message-text">
                Bhaiya 6 dabbe toote aaye, replacement kab?
              </span>
              <span className="wa-chat-area__message-meta">9:41 AM</span>
            </div>
          </div>

          {/* Outgoing */}
          <div className="wa-chat-area__message wa-chat-area__message--outgoing">
            <div className="wa-chat-area__message-bubble">
              <span className="wa-chat-area__message-text">
                Dekh rahe hain, aaj shaam tak update denge.
              </span>
              <span className="wa-chat-area__message-meta">
                9:44 AM
                <CheckCheck
                  size={12}
                  className="wa-chat-area__message-read-tick"
                />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Input bar */}
      <div className="wa-chat-area__input-bar">
        <button className="wa-chat-area__input-btn">
          <Smile size={22} />
        </button>
        <button className="wa-chat-area__input-btn">
          <Paperclip size={20} />
        </button>
        <div className="wa-chat-area__input-field">Type a message</div>
        <button className="wa-chat-area__input-btn">
          <Mic size={22} />
        </button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WebPage() {
  const [selectedId, setSelectedId] = useState<string>("1");
  const [activeSidebarTab, setActiveSidebarTab] = useState("chats");

  const selectedChat = conversations.find((c) => c.id === selectedId);

  return (
    <div className="wa-web-playground">
      <div className="wa-web-playground__topbar">
        <Link href="/" className="wa-web-playground__back-link">
          <ArrowLeft size={13} />
          Playground
        </Link>
        <span className="wa-web-playground__topbar-sep">\u00b7</span>
        <span className="wa-web-playground__topbar-label">
          WhatsApp Web Prototype \u00b7 Light Mode
        </span>
      </div>

      <div className="wa-web-layout">
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
