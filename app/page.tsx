import Link from "next/link";
import { Monitor, Smartphone } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8" style={{ background: "linear-gradient(135deg, #00a884 0%, #008069 100%)" }}>
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="#00a884">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.188 8.188 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24zM8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28c-.25-.12-1.47-.72-1.69-.8-.23-.08-.37-.12-.56.12-.16.19-.62.8-.76.96-.11.17-.23.19-.42.1-.19-.09-.81-.3-1.54-.95-.57-.5-.95-1.12-1.06-1.31-.11-.19-.01-.29.08-.39.08-.09.19-.23.28-.35.09-.12.12-.21.19-.35.06-.13.03-.25-.02-.35-.06-.09-.56-1.35-.77-1.84-.2-.48-.41-.42-.56-.43-.14 0-.3-.01-.47-.01z" />
              </svg>
            </div>
            <div className="text-left">
              <h1 className="text-white text-2xl font-bold leading-tight">WhatsApp Business</h1>
              <p className="text-green-100 text-sm">Prototype Playground</p>
            </div>
          </div>
          <p className="text-green-100 text-sm max-w-sm mx-auto leading-relaxed">
            Explore and iterate on UI design directions for WhatsApp Business.
            Select a prototype to view.
          </p>
        </div>

        {/* Prototype cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/mobile"
            className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col items-start"
          >
            <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
              <Smartphone size={22} className="text-[#00a884]" />
            </div>
            <h2 className="text-[#111b21] font-semibold text-lg mb-1">Mobile</h2>
            <p className="text-[#667781] text-sm leading-relaxed">
              Chats list with top app bar, filter tabs, conversation items, and bottom navigation.
            </p>
            <div className="mt-4 text-[#00a884] text-sm font-medium flex items-center gap-1">
              View prototype
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link
            href="/web"
            className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col items-start"
          >
            <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
              <Monitor size={22} className="text-[#00a884]" />
            </div>
            <h2 className="text-[#111b21] font-semibold text-lg mb-1">WhatsApp Web</h2>
            <p className="text-[#667781] text-sm leading-relaxed">
              Three-panel interface with icon sidebar, chat list, and conversation area.
            </p>
            <div className="mt-4 text-[#00a884] text-sm font-medium flex items-center gap-1">
              View prototype
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>

        <p className="text-center text-green-100/60 text-xs mt-8">Light mode · Chats list view</p>
      </div>
    </main>
  );
}
