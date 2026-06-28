import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOGO_URL = "https://media.base44.com/images/public/6a134b6458d2e6b9f072a09d/0bb1905de_Screenshot2026-03-07at205149.png";

export default function SplashScreen({ onDone }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-4"
          >
            <img
              src={LOGO_URL}
              alt="Gloura"
              className="w-64 md:w-80 object-contain select-none"
            />
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.45, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-xs tracking-[0.3em] uppercase text-white font-body"
            >
              Gloura Analytics
            </motion.p>
          </motion.div>

          {/* Bottom fade line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: "easeInOut" }}
            className="absolute bottom-12 w-24 h-px bg-white/20 origin-center"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}