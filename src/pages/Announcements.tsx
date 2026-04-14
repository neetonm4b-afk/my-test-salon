import { motion } from "framer-motion";
import { Bell, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ANNOUNCEMENTS = [
  { id: 1, date: "2026.04.14", title: "サロン限定グッズ第3弾の先行予約開始", new: true },
  { id: 2, date: "2026.04.10", title: "【重要】次回シークレットライブの開催時間変更について", new: true },
  { id: 3, date: "2026.04.01", title: "新コンテンツ「Premium Strategy」連載開始", new: false },
  { id: 4, date: "2026.03.25", title: "システムメンテナンス完了のお知らせ", new: false },
  { id: 5, date: "2026.03.15", title: "【VIP】オフライン交流会の抽選結果発表", new: false },
];

export function Announcements() {
  return (
    <div className="p-8 md:p-12 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-10">
        <Bell className="text-gold-500 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]" size={32} />
        <h1 className="text-3xl md:text-4xl font-serif text-gold-gradient tracking-widest font-medium">
          最新のお知らせ
        </h1>
      </div>

      <div className="space-y-4">
        {ANNOUNCEMENTS.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group flex flex-col md:flex-row md:items-center gap-4 p-5 bg-black/60 backdrop-blur-sm border border-gold-900/30 hover:border-luxury-gold hover:shadow-[0_5px_15px_-5px_rgba(212,175,55,0.15)] rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[linear-gradient(90deg,_transparent_0%,_rgba(212,175,55,0.03)_50%,_transparent_100%)] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            
            <div className="flex items-center gap-4 md:w-36 shrink-0 relative z-10">
              <span className="text-sm font-mono text-gold-200/50">{item.date}</span>
              {item.new && (
                <Badge variant="default" className="bg-gold-500 text-black hover:bg-gold-400 tracking-wider font-bold shadow-[0_0_10px_rgba(212,175,55,0.3)] text-[10px]">
                  NEW
                </Badge>
              )}
            </div>
            
            <h3 className="flex-1 text-gold-50 group-hover:text-gold-300 transition-colors font-serif relative z-10">
              {item.title}
            </h3>
            
            <ChevronRight className="text-gold-600/50 group-hover:text-gold-400 transition-colors shrink-0 hidden md:block relative z-10" size={20} />
          </motion.div>
        ))}
      </div>
      
      <div className="mt-14 text-center">
        <button className="text-gold-500 hover:text-gold-300 font-serif text-sm border-b border-gold-600/30 hover:border-gold-500 pb-1 transition-all tracking-widest">
          すべてのお知らせを見る
        </button>
      </div>
    </div>
  );
}
