import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, PlaySquare, Bell, HelpCircle, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { cn } from "../lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Layout({ children }: { children: ReactNode }) {
  const { logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: "マイページ", href: "/", icon: Home },
    { name: "限定コンテンツ", href: "/content", icon: PlaySquare },
    { name: "最新のお知らせ", href: "/announcements", icon: Bell },
    { name: "コンシェルジュ Q&A", href: "/qa", icon: HelpCircle },
  ];

  return (
    <div className="flex h-screen bg-[#050505] text-gold-50 overflow-hidden font-serif">
      {/* Sidebar with elegant deep black and subtle gold border */}
      <aside className="w-[280px] bg-black border-r border-gold-900/30 flex flex-col justify-between hidden md:flex z-50 relative shadow-[5px_0_30px_rgba(0,0,0,0.8)]">
        {/* Subtle texture/gradient for sidebar */}
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-900/5 to-transparent pointer-events-none"></div>

        <div className="p-8 relative z-10">
          <div className="flex items-center justify-center mb-16 mt-4">
            <h1 className="text-4xl font-heading text-gold-gradient tracking-[0.15em] uppercase font-light">Lumiere</h1>
          </div>
          <nav className="space-y-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-5 px-5 py-4 rounded-xl transition-all duration-500 group relative overflow-hidden",
                    isActive
                      ? "text-black"
                      : "text-gold-100/60 hover:text-gold-300 hover:bg-gold-900/10"
                  )}
                >
                  {/* Glowing background for active state */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gold-gradient shadow-[0_0_20px_rgba(212,175,55,0.3)]"></div>
                  )}
                  
                  <Icon size={22} className={cn("relative z-10", isActive ? "text-black" : "text-gold-600/60 group-hover:text-gold-400")} strokeWidth={isActive ? 2 : 1.5} />
                  <span className={cn("relative z-10 font-medium tracking-wide", isActive ? "font-bold" : "")}>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="p-8 relative z-10">
          <button
            onClick={() => logout()}
            className="flex items-center gap-5 px-5 py-4 w-full text-left text-gold-100/40 hover:text-gold-300 hover:bg-gold-900/10 rounded-xl transition-colors duration-300 group"
          >
            <LogOut size={22} className="text-gold-100/40 group-hover:text-gold-400 transition-colors" strokeWidth={1.5} />
            <span className="tracking-wide">ログアウト</span>
          </button>
          
          <div className="mt-8 text-center text-gold-100/20 text-[10px] tracking-widest uppercase font-sans">
            Lumiere © 2026
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col bg-[#050505] overflow-hidden">
        {/* Deep ambient luxury glow behind content */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_top_right,_rgba(212,175,55,0.08)_0%,_transparent_60%)] pointer-events-none z-0"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_bottom_left,_rgba(212,175,55,0.05)_0%,_transparent_60%)] pointer-events-none z-0"></div>
        
        <ScrollArea className="flex-1 w-full h-full z-10">
          {children}
        </ScrollArea>
      </main>
    </div>
  );
}
