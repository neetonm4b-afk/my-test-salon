import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, getRedirectResult } from "firebase/auth";
import { auth, googleProvider, appleProvider } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Login() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check for redirect result on mount
    const checkRedirect = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          navigate("/");
        }
      } catch (err: any) {
        console.error("Redirect auth error:", err);
        if (err.code === "auth/internal-error" || err.message?.includes("missing initial state")) {
          setError("ブラウザの制限により認証状態が失われました。別のブラウザでお試しいただくか、再度ログインを行ってください。");
        } else {
          setError("ログイン処理中にエラーが発生しました。");
        }
      }
    };

    checkRedirect();

    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isLoginMode) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate("/");
    } catch (err: any) {
      setError("認証に失敗しました。ご入力内容をご確認ください。");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError("");
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err: any) {
      setError("Googleログインに失敗しました。");
    }
  };

  const handleAppleLogin = async () => {
    try {
      setError("");
      await signInWithPopup(auth, appleProvider);
      navigate("/");
    } catch (err: any) {
      setError("Appleログインに失敗しました。");
    }
  };

  // Generate random particles
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 relative overflow-hidden bg-[#050505]">
      {/* Background radial gradient for premium deep black & gold */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-yellow-700/10 via-[#050505] to-[#010101] -z-20"></div>
      
      {/* Dynamic luxury particles */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, x: `${p.x}vw`, y: `${p.y + 10}vh` }}
            animate={{ 
              opacity: [0, 0.8, 0], 
              y: `${p.y - 10}vh`,
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
            className="absolute rounded-full bg-gold-400 blur-[1px]"
            style={{ width: p.size, height: p.size, boxShadow: "0 0 10px 2px rgba(212,175,55,0.4)" }}
          />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-black/60 backdrop-blur-2xl border-t border-b border-t-gold-500/30 border-b-black/50 p-10 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(212,175,55,0.1),inset_0_1px_0_rgba(212,175,55,0.2)] text-center relative z-10"
      >
        <h1 className="text-5xl font-heading text-gold-gradient tracking-widest uppercase mb-3 font-medium">Lumiere</h1>
        <p className="text-gold-200/60 mb-10 text-sm tracking-[0.2em] font-serif">プレミアム会員専用サロン</p>

        {error && (
          <div className="bg-destructive/10 border border-destructive/30 text-destructive-foreground p-3 rounded-xl mb-6 text-sm text-left">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailAuth} className="space-y-5 mb-8">
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500/50 group-focus-within:text-gold-400 transition-colors pointer-events-none" size={18} />
            <Input 
              type="email" 
              placeholder="メールアドレス" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-12 pb-6 pt-6 rounded-2xl bg-white/5 border-gold-900/40 text-gold-100 placeholder:text-gold-100/30 focus-visible:ring-1 focus-visible:ring-gold-500/50 focus-visible:border-gold-500/50 transition-all font-serif"
              required
            />
          </div>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500/50 group-focus-within:text-gold-400 transition-colors pointer-events-none" size={18} />
            <Input 
              type="password" 
              placeholder="パスワード"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-12 pb-6 pt-6 rounded-2xl bg-white/5 border-gold-900/40 text-gold-100 placeholder:text-gold-100/30 focus-visible:ring-1 focus-visible:ring-gold-500/50 focus-visible:border-gold-500/50 transition-all font-serif"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gold-gradient text-black font-semibold text-base py-6 rounded-2xl transition-all hover:brightness-110 active:scale-[0.98] flex justify-center items-center gap-2 mt-2 tracking-wide"
          >
            {isLoginMode ? <LogIn size={18} /> : <UserPlus size={18} />}
            {isLoginMode ? "サロンへ入室する" : "プレミアム会員に登録する"}
          </Button>
        </form>

        <div className="flex items-center gap-4 mb-8 opacity-60">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gold-600/50 to-transparent flex-1"></div>
          <span className="text-gold-200/50 text-[10px] tracking-widest font-serif">その他のログイン方法</span>
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gold-600/50 to-transparent flex-1"></div>
        </div>

        <div className="space-y-4">
          <Button 
            variant="outline"
            onClick={handleGoogleLogin}
            type="button"
            className="w-full py-6 rounded-2xl border-gold-900/30 bg-black hover:bg-gold-900/10 hover:border-gold-500/30 transition-all flex items-center justify-center gap-3 text-gold-100/80 hover:text-gold-300 font-serif"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Googleでログイン
          </Button>
          
          <Button 
            variant="outline"
            onClick={handleAppleLogin}
            type="button"
            className="w-full py-6 rounded-2xl border-gold-900/30 bg-black hover:bg-gold-900/10 hover:border-gold-500/30 transition-all flex items-center justify-center gap-3 text-gold-100/80 hover:text-gold-300 font-serif"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
              <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.641-.026 2.669-1.48 3.665-2.94 1.16-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.56-1.701z" />
            </svg>
            Appleでログイン
          </Button>
        </div>

        <div className="mt-10">
          <button 
            type="button"
            onClick={() => setIsLoginMode(!isLoginMode)}
            className="text-gold-600 hover:text-gold-300 text-xs tracking-wider transition-colors font-serif underline underline-offset-8 decoration-gold-900/50 hover:decoration-gold-500/50"
          >
            {isLoginMode ? "アカウントをお持ちでない方はこちら（新規登録）" : "既にアカウントをお持ちの方はこちら（ログイン）"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
