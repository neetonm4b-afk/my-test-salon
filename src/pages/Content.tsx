import { motion } from "framer-motion";
import { Play, BookOpen, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const DUMMY_CONTENT = [
  { id: 1, type: "video", title: "Monthly Secret Live - Vol. 12", date: "2026.04.10", category: "Live Archive" },
  { id: 2, type: "article", title: "Premium Strategy: The Gold Standard", date: "2026.04.05", category: "Column" },
  { id: 3, type: "video", title: "Q&A Session with the Founder", date: "2026.03.28", category: "Event" },
  { id: 4, type: "article", title: "Early Access: Upcoming Features", date: "2026.03.20", category: "News" },
  { id: 5, type: "video", title: "Masterclass: Networking for VIPs", date: "2026.03.11", category: "Masterclass" },
  { id: 6, type: "article", title: "Lumiere Lifestyle Guide", date: "2026.03.01", category: "Lifestyle" },
];

export function Content() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as any } }
  };

  return (
    <div className="p-8 md:p-14 max-w-7xl mx-auto">
      <div className="flex items-center gap-5 mb-14 border-b border-gold-900/20 pb-6 relative">
        <Crown className="text-gold-500 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]" size={38} strokeWidth={1} />
        <div>
          <h1 className="text-4xl md:text-5xl font-serif text-gold-gradient tracking-widest mb-1 font-medium">
            限定コンテンツ
          </h1>
          <p className="text-gold-200/50 font-serif text-sm tracking-widest uppercase">プレミアムアーカイブ</p>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {DUMMY_CONTENT.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            className="group cursor-pointer h-full"
          >
            <Card className="h-full bg-black/60 backdrop-blur-md border border-gold-900/30 group-hover:border-luxury-gold transition-all duration-500 overflow-hidden flex flex-col shadow-lg hover:shadow-[0_15px_30px_-5px_rgba(212,175,55,0.15)] relative">
              
              <div className="absolute inset-0 bg-[linear-gradient(135deg,_transparent_0%,_rgba(212,175,55,0.05)_50%,_transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative aspect-video bg-[#080808] border-b border-gold-900/30 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center scale-100 group-hover:scale-105 transition-transform duration-700">
                  {item.type === "video" ? (
                    <div className="w-16 h-16 rounded-full bg-black/80 flex items-center justify-center backdrop-blur-md border border-gold-500/20 group-hover:bg-gold-gradient transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                      <Play className="text-gold-500 ml-1 group-hover:text-black transition-colors" size={28} />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.05)_0%,_transparent_70%)]">
                      <BookOpen className="text-gold-800/80 group-hover:text-gold-400 group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all duration-700" size={56} strokeWidth={1} />
                    </div>
                  )}
                </div>
                <div className="absolute top-4 left-4">
                  <Badge variant="outline" className="bg-black/90 text-gold-400 backdrop-blur-xl uppercase tracking-widest font-serif font-medium border-gold-900/50 shadow-sm px-3 py-1 text-[10px]">
                    {item.category}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6 flex-1 flex flex-col justify-between relative z-10 bg-gradient-to-b from-black/20 to-black/80">
                <div>
                  <p className="text-gold-200/40 text-xs font-mono tracking-wider mb-3">{item.date}</p>
                  <h3 className="text-xl font-medium text-gold-50 group-hover:text-gold-300 transition-colors line-clamp-2 font-serif leading-snug">
                    {item.title}
                  </h3>
                </div>
                
                <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-2 group-hover:translate-x-0 transform">
                  <div className="h-[1px] w-8 bg-gold-500"></div>
                  <span className="text-gold-400 text-xs uppercase tracking-widest font-serif">詳細を見る</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
