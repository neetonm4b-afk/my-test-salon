import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { Crown, Star, Sparkles, LogOut } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function Dashboard() {
  const { currentUser } = useAuth();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 20 }
    }
  };

  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto flex flex-col items-center justify-center min-h-[80vh] text-center relative z-10 w-full overflow-hidden">
      {/* Top right logout button for quick access */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8 z-50">
        <button
          onClick={() => (window.location.href = "/logout")}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-gold-900/30 text-gold-200 hover:text-white hover:bg-gold-900/20 transition-all duration-300 text-sm font-serif group"
        >
          <LogOut size={16} className="text-gold-500 group-hover:scale-110 transition-transform" />
          <span>ログアウト</span>
        </button>
      </div>
      
      {/* Massive radial entry blast for Dashboard */}
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 1, 0], scale: [0, 2, 4] }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center"
      >
        <div className="w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,_rgba(212,175,55,0.3)_0%,_transparent_70%)] blur-2xl"></div>
      </motion.div>

      <motion.div 
        initial={{ scale: 0.5, opacity: 0, rotate: -15, y: -20 }}
        animate={{ scale: 1, opacity: 1, rotate: 0, y: 0 }}
        transition={{ type: "spring", stiffness: 60, delay: 0.5, duration: 1.5 }}
        className="mb-10 relative z-20"
      >
        <div className="absolute inset-0 bg-gold-400 blur-[60px] opacity-20 rounded-full"></div>
        <Crown size={80} className="text-gold-400 relative z-10 drop-shadow-[0_0_25px_rgba(212,175,55,0.6)]" strokeWidth={1} />
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full relative z-20">
        <motion.h1 variants={itemVariants} className="text-5xl md:text-5xl font-serif mb-6 tracking-tight text-white drop-shadow-2xl font-light">
          ようこそ、 <span className="text-gold-gradient uppercase tracking-widest font-heading block mt-4 text-5xl md:text-7xl font-medium">Lumiereへ</span>
        </motion.h1>
        
        <motion.p variants={itemVariants} className="text-gold-100/70 text-lg md:text-xl mb-16 max-w-2xl mx-auto font-serif tracking-widest text-sm">
          本日のサロンへようこそ。<br />{currentUser?.email || "VIP Guest"} 様
        </motion.p>
        
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-10">
          {[
            { icon: Star, title: "プレミアムコンテンツ", desc: "あなたのためだけにキュレートされた極上の動画や限定コラムをお楽しみください。" },
            { icon: Sparkles, title: "会員限定イベント", desc: "選ばれた方のみが参加できるシークレットライブにご招待いたします。" },
            { icon: Crown, title: "VIPステータス情報", desc: "現在のエリート会員特典はすべて有効です。至福のひとときをご堪能ください。" }
          ].map((item, i) => (
            <Card key={i} className="group overflow-hidden bg-black/40 backdrop-blur-md border border-gold-900/30 hover:border-gold-500/60 transition-all duration-500 relative">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,_transparent_0%,_rgba(212,175,55,0.03)_50%,_transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <CardHeader className="pb-4 pt-8 border-b border-gold-900/20 mx-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-gold-900/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-gold-500/20 transition-all duration-500 shadow-[inset_0_0_10px_rgba(212,175,55,0.1)]">
                  <item.icon size={28} className="text-gold-500" strokeWidth={1.5} />
                </div>
                <CardTitle className="text-xl text-gold-100 font-serif font-medium tracking-wider">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 pb-8">
                <p className="text-gold-200/50 text-sm leading-relaxed font-sans">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </motion.div>
      
    </div>
  );
}
