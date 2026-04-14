import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    id: "faq-1",
    q: "会員費の決済方法はどのようなものがありますか？",
    a: "クレジットカード決済（Visa, MasterCard, JCB, AMEX, Diners）に対応しております。現在のところ銀行振込等はご対応しておりません。"
  },
  {
    id: "faq-2",
    q: "会員限定のシークレットライブはアーカイブ配信されますか？",
    a: "はい、配信後約1ヶ月間は「限定コンテンツ」ページの「Live Archive」カテゴリよりご視聴いただけます。一部特別企画などアーカイブが残らない場合は事前にお知らせいたします。"
  },
  {
    id: "faq-3",
    q: "退会手続きはどこから行えますか？",
    a: "マイページのアカウント設定より、いつでも退会手続きが可能です。退会された場合、その月までのコンテンツへのアクセス権は月末まで有効となります。"
  },
  {
    id: "faq-4",
    q: "Appleログインでアカウント作成後、メールアドレスでログインできますか？",
    a: "セキュリティ上の仕様により、Appleでご登録いただいた場合は、引き続きAppleログインボタンからサインインしていただく必要があります。"
  }
];

export function QA() {
  return (
    <div className="p-8 md:p-12 max-w-3xl mx-auto">
      <div className="flex flex-col items-center mb-16 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gold-500/10 blur-[30px] rounded-full z-0"></div>
        <HelpCircle className="text-gold-400 mb-6 relative z-10 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" size={48} strokeWidth={1} />
        <h1 className="text-3xl md:text-4xl font-serif text-gold-gradient tracking-widest font-medium mb-3 relative z-10">
          コンシェルジュ Q&A
        </h1>
        <p className="text-gold-200/50 tracking-widest text-sm relative z-10 font-serif">よくあるご質問</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-black/40 backdrop-blur-md border border-gold-900/30 rounded-2xl p-8 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,175,55,0.08)_0%,_transparent_70%)] pointer-events-none"></div>

        <Accordion type="single" collapsible className="w-full relative z-10">
          {FAQS.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id} className="border-b border-gold-900/20 py-2">
              <AccordionTrigger className="text-left hover:text-gold-300 hover:no-underline transition-colors px-2">
                <div className="flex gap-5">
                  <span className="text-gold-600 font-bold font-heading italic text-lg drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">Q.</span>
                  <span className="font-medium text-gold-50 font-serif leading-relaxed text-sm md:text-base">{faq.q}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gold-100/60 px-2 pb-6 pt-2 flex gap-5 leading-loose">
                <span className="text-gold-600/50 font-bold font-heading italic shrink-0 text-lg">A.</span>
                <p className="font-sans text-sm">{faq.a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
      
      <div className="mt-16 text-center bg-black/60 border border-gold-900/30 rounded-3xl p-10 backdrop-blur-md shadow-lg relative overflow-hidden group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(212,175,55,0.05)_0%,_transparent_50%)] group-hover:bg-[radial-gradient(circle_at_bottom,_rgba(212,175,55,0.1)_0%,_transparent_60%)] transition-colors duration-700"></div>
        <h3 className="text-xl font-serif text-gold-200 mb-3 relative z-10 tracking-widest">その他のお問い合わせ</h3>
        <p className="text-gold-100/40 mb-8 text-sm font-sans relative z-10 tracking-wide">解決しない場合はコンシェルジュデスクまで直接お問い合わせください。</p>
        <button className="relative z-10 bg-gold-gradient text-black font-semibold px-10 py-4 rounded-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:-translate-y-0.5 active:scale-95 font-serif tracking-widest text-sm">
          コンシェルジュに相談する
        </button>
      </div>
    </div>
  );
}
