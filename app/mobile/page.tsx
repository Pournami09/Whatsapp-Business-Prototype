"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Battery,
  Briefcase,
  Camera,
  Check,
  ChevronUp,
  CircleDashed,
  History,
  MapPin,
  MessageCircle,
  Mic,
  Moon,
  MoreVertical,
  Phone,
  Search,
  Signal,
  Store,
  Users,
  VolumeX,
  Wifi,
} from "lucide-react";
import { cn } from "@/components/ui/whatsapp/cn";
import "./mobile.css";

// ─── Types ────────────────────────────────────────────────────────────────────

type UrgencyLevel = "critical" | "high";
type ContextTabId = "customers" | "team" | "ops";
type FilterChipId = "all" | "priority" | "beat" | "orders" | "delivery" | "payments" | "complaints";
type NavTabId = "chats" | "updates" | "calls" | "tools";

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
    detail: "₹4.6L order · margin −3.1%",
    context: "Got 10% in Oct · paid on time",
    contextType: "history",
  },
  {
    id: "2",
    urgency: "high",
    dealer: "Ankit Rao · Field rep",
    dueLabel: "Today",
    dueColor: "#92400e",
    title: "+8% margin for Shoppers Stop",
    detail: "6 stores · ~₹2.1L",
    context: "From chat only · no order history",
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
    name: "Gupta Kirana · Matunga",
    avatarBg: "#ffedd5",
    avatarInitials: "GK",
    avatarInitialsColor: "#9a3412",
    urgency: "critical",
    urgencyLabel: "Waiting 40m",
    lastMessage: "\u201cBhaiya 6 dabbe toote aaye, replacement kab?\u201d",
    isVoiceNote: true,
    unread: 1,
  },
  {
    id: "2",
    name: "Sameer Khan · Rep",
    avatarImg: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200",
    urgency: "critical",
    urgencyLabel: "At store now",
    lastMessage: "Star Bazaar manager asking our return policy on expiry",
    unread: 2,
  },
  {
    id: "3",
    name: "Reliance Smart · Andheri W",
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
    name: "Vikram Iyer · Regional Head",
    avatarImg: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200",
    urgency: "high",
    timestamp: "10:05",
    lastMessage: "Need Mumbai Q4 numbers before 6 pm call",
    unread: 1,
  },
  {
    id: "5",
    name: "Taj Lands End · Bandra",
    avatarBg: "#ede9fe",
    avatarInitials: "TL",
    avatarInitialsColor: "#5b21b6",
    scheduledVisit: "Ankit, 4 pm",
    lastMessage: "Samples loved \u2014 let\u2019s talk Christmas order",
  },
  {
    id: "6",
    name: "Mumbai Sales Team",
    isGroup: true,
    avatarBg: "#dcefe9",
    timestamp: "10:58",
    lastMessage: "Sameer: Thane beat done \u2014 32 outlets, 4 new",
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

// ─── StatusBar ────────────────────────────────────────────────────────────────

function StatusBar() {
  return (
    <div className="wa-status-bar">
      <span className="wa-status-bar__time">9:41</span>
      <div className="wa-status-bar__indicators">
        <Signal size={15} className="wa-status-bar__icon" />
        <Wifi size={15} className="wa-status-bar__icon" />
        <Battery size={15} className="wa-status-bar__icon" />
      </div>
    </div>
  );
}

// ─── TopBar ───────────────────────────────────────────────────────────────────

function TopBar() {
  return (
    <div className="wa-top-bar">
      <div className="wa-top-bar__header">
        <span className="wa-top-bar__title">WhatsApp Business</span>
        <div className="wa-top-bar__actions">
          <Camera size={22} className="wa-top-bar__action-icon" />
          <MoreVertical size={22} className="wa-top-bar__action-icon" />
        </div>
      </div>
      <div className="wa-top-bar__search">
        <Search size={15} className="wa-top-bar__search-icon" />
        <span className="wa-top-bar__search-placeholder">Search chats, POs, amounts</span>
      </div>
    </div>
  );
}

// ─── ApprovalCard ─────────────────────────────────────────────────────────────

function ApprovalCard({ card }: { card: ApprovalCardData }) {
  return (
    <div className={cn("wa-approval-card", `wa-approval-card--${card.urgency}`)}>
      <div className="wa-approval-card__header">
        <div className={`wa-approval-card__urgency-dot wa-approval-card__urgency-dot--${card.urgency}`} />
        <span className="wa-approval-card__dealer">{card.dealer}</span>
        <span className="wa-approval-card__due" style={{ color: card.dueColor }}>{card.dueLabel}</span>
      </div>
      <div className="wa-approval-card__body">
        <span className="wa-approval-card__title">{card.title}</span>
        <span className="wa-approval-card__detail">{card.detail}</span>
      </div>
      <div className="wa-approval-card__context">
        {card.contextType === "history" ? (
          <History size={12} className="wa-approval-card__context-icon" />
        ) : (
          <MessageCircle size={12} className="wa-approval-card__context-icon wa-approval-card__context-icon--muted" />
        )}
        <span className="wa-approval-card__context-text">{card.context}</span>
      </div>
      {card.urgency === "critical" && (
        <div className="wa-approval-card__actions">
          <button className="wa-approval-card__btn-approve">
            <Check size={15} />
            <span>Approve</span>
          </button>
          <button className="wa-approval-card__btn-discuss">Discuss</button>
          <button className="wa-approval-card__btn-chat">
            <MessageCircle size={16} />
          </button>
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
          className={cn("wa-context-tabs__tab", active === id && "wa-context-tabs__tab--active")}
        >
          <Icon size={15} className="wa-context-tabs__tab-icon" />
          <span className="wa-context-tabs__tab-label">{label}</span>
          <span className={cn("wa-context-tabs__tab-count", active === id && "wa-context-tabs__tab-count--active")}>
            {count}
          </span>
        </button>
      ))}
    </div>
  );
}

// ─── FilterChips ──────────────────────────────────────────────────────────────

function FilterChips({
  active,
  onChange,
}: {
  active: FilterChipId;
  onChange: (c: FilterChipId) => void;
}) {
  return (
    <div className="wa-filter-chips">
      {filterChips.map((chip) => (
        <button
          key={chip.id}
          onClick={() => onChange(chip.id)}
          className={cn("wa-filter-chips__chip", active === chip.id && "wa-filter-chips__chip--active")}
        >
          {chip.label}
        </button>
      ))}
    </div>
  );
}

// ─── AiQuietedBanner ─────────────────────────────────────────────────────────

function AiQuietedBanner() {
  return (
    <div className="wa-ai-banner">
      <Moon size={13} className="wa-ai-banner__icon" />
      <span className="wa-ai-banner__text">14 quieted by AI · Porter, Bluedart, Amazon…</span>
      <button className="wa-ai-banner__review">Review</button>
    </div>
  );
}

// ─── ChatListItem ─────────────────────────────────────────────────────────────

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
      className={cn("wa-chat-list-item", isSelected && "wa-chat-list-item--active")}
    >
      {/* Avatar with optional urgency ring */}
      <div className={cn("wa-chat-list-item__avatar-wrap", chat.urgency && `wa-chat-list-item__avatar-wrap--${chat.urgency}`)}>
        {chat.isGroup ? (
          <div className="wa-chat-list-item__avatar-inner">
            <Users size={20} className="wa-chat-list-item__group-icon" />
          </div>
        ) : chat.avatarImg ? (
          <img src={chat.avatarImg} alt={chat.name} className="wa-chat-list-item__avatar-img" />
        ) : (
          <div className="wa-chat-list-item__avatar-initials" style={{ backgroundColor: chat.avatarBg }}>
            <span style={{ color: chat.avatarInitialsColor }}>{chat.avatarInitials}</span>
          </div>
        )}
        {chat.urgency && (
          <div className={`wa-chat-list-item__urgency-dot wa-chat-list-item__urgency-dot--${chat.urgency}`} />
        )}
      </div>

      {/* Content */}
      <div className="wa-chat-list-item__content">
        <div className="wa-chat-list-item__row wa-chat-list-item__row--top">
          <span className="wa-chat-list-item__name">{chat.name}</span>
          {chat.urgencyLabel ? (
            <span className={`wa-chat-list-item__urgency-label wa-chat-list-item__urgency-label--${chat.urgency}`}>
              {chat.urgencyLabel}
            </span>
          ) : chat.scheduledVisit ? (
            <div className="wa-chat-list-item__visit">
              <MapPin size={11} className="wa-chat-list-item__visit-icon" />
              <span className="wa-chat-list-item__visit-label">{chat.scheduledVisit}</span>
            </div>
          ) : (
            <span className={cn("wa-chat-list-item__timestamp", (chat.unread ?? 0) > 0 && !chat.isMuted && "wa-chat-list-item__timestamp--unread")}>
              {chat.timestamp}
            </span>
          )}
        </div>
        <div className="wa-chat-list-item__row wa-chat-list-item__row--bottom">
          <span className="wa-chat-list-item__preview">
            {chat.isVoiceNote && <Mic size={14} className="wa-chat-list-item__voice-icon" />}
            {chat.lastMessage}
          </span>
          <div className="wa-chat-list-item__meta">
            {chat.isMuted && <VolumeX size={14} className="wa-chat-list-item__muted-icon" />}
            {(chat.unread ?? 0) > 0 && (
              <span className={cn("wa-chat-list-item__unread-badge", chat.isMuted && "wa-chat-list-item__unread-badge--muted")}>
                {chat.unread}
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}

// ─── AllChatsDrawer ───────────────────────────────────────────────────────────

function AllChatsDrawer() {
  const teamAvatars = [
    { initials: "RS", bg: "#0ea5e9" },
    { initials: "NB", bg: "#ec4899" },
    { initials: "+10", bg: "#64748b" },
  ];

  return (
    <div className="wa-all-chats-drawer">
      <div className="wa-all-chats-drawer__handle" />
      <div className="wa-all-chats-drawer__row">
        <div className="wa-all-chats-drawer__avatars">
          {teamAvatars.map((a, i) => (
            <div
              key={i}
              className={cn("wa-all-chats-drawer__avatar", i > 0 && "wa-all-chats-drawer__avatar--overlap")}
              style={{ backgroundColor: a.bg }}
            >
              {a.initials}
            </div>
          ))}
        </div>
        <span className="wa-all-chats-drawer__label">All chats (13)</span>
        <span className="wa-all-chats-drawer__swipe-hint">Swipe up</span>
        <ChevronUp size={16} className="wa-all-chats-drawer__chevron" />
      </div>
    </div>
  );
}

// ─── BottomNav ────────────────────────────────────────────────────────────────

function BottomNav({
  active,
  onChange,
}: {
  active: NavTabId;
  onChange: (t: NavTabId) => void;
}) {
  const tabs: {
    id: NavTabId;
    label: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
  }[] = [
    { id: "chats", label: "Chats", icon: MessageCircle },
    { id: "updates", label: "Updates", icon: CircleDashed },
    { id: "calls", label: "Calls", icon: Phone },
    { id: "tools", label: "Tools", icon: Store },
  ];

  return (
    <nav className="wa-bottom-nav">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={cn("wa-bottom-nav__tab", active === id && "wa-bottom-nav__tab--active")}
        >
          {active === id ? (
            <div className="wa-bottom-nav__tab-pill">
              <Icon size={20} className="wa-bottom-nav__tab-icon" />
            </div>
          ) : (
            <Icon size={20} className="wa-bottom-nav__tab-icon" />
          )}
          <span className="wa-bottom-nav__tab-label">{label}</span>
        </button>
      ))}
    </nav>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MobilePage() {
  const [contextTab, setContextTab] = useState<ContextTabId>("customers");
  const [filterChip, setFilterChip] = useState<FilterChipId>("priority");
  const [navTab, setNavTab] = useState<NavTabId>("chats");
  const [selectedId, setSelectedId] = useState<string>("1");

  return (
    <div className="wa-mobile-playground">
      <div className="wa-mobile-playground__back">
        <Link href="/" className="wa-mobile-playground__back-link">
          <ArrowLeft size={16} />
          Playground
        </Link>
      </div>
      <p className="wa-mobile-playground__label">Mobile Prototype</p>

      <div className="wa-phone-frame">
        <div className="wa-phone-frame__screen">
          <StatusBar />
          <TopBar />

          <div className="wa-phone-content">
            <ApprovalsSection />
            <ContextTabs active={contextTab} onChange={setContextTab} />
            <FilterChips active={filterChip} onChange={setFilterChip} />
            <div className="wa-chat-list">
              <AiQuietedBanner />
              {conversations.map((chat) => (
                <ChatListItem
                  key={chat.id}
                  chat={chat}
                  isSelected={selectedId === chat.id}
                  onSelect={() => setSelectedId(chat.id)}
                />
              ))}
            </div>
          </div>

          <AllChatsDrawer />
          <BottomNav active={navTab} onChange={setNavTab} />
        </div>
      </div>
    </div>
  );
}
