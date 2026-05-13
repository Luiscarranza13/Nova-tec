"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const WHATSAPP = "51918146783";
const MSG = encodeURIComponent(
  "¡Hola! 👋 Me comunico desde el sitio web de NovaTec. Me interesa conocer más sobre sus servicios de desarrollo de software. ¿Podrían ayudarme?",
);

export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2000);
    const t2 = setTimeout(() => setTooltip(true), 4000);
    const t3 = setTimeout(() => setTooltip(false), 9000);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleClick = () => {
    trackEvent.contactWhatsApp();
  };

  return (
    // OPTIMIZACIÓN CLS: Reservar espacio desde el inicio
    <div className="fixed bottom-6 right-6 z-50 w-16 h-16">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col items-end gap-2"
          >
            {/* Tooltip */}
            <AnimatePresence>
              {tooltip && !dismissed && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="relative bg-white border border-slate-200 rounded-2xl shadow-xl p-4 max-w-[240px] mb-2"
                >
                  <button
                    onClick={() => setDismissed(true)}
                    aria-label="Cerrar tooltip"
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 shadow-sm transition-colors"
                  >
                    <X className="h-3 w-3 text-slate-400" />
                  </button>
                  <p className="text-sm font-bold mb-1 text-slate-900">
                    ¿Necesitas ayuda? 💬
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Escríbenos por WhatsApp. Respondemos en minutos y sin compromiso.
                  </p>
                  {/* Arrow */}
                  <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-slate-200 rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Button */}
            <motion.a
              href={`https://wa.me/${WHATSAPP}?text=${MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-16 h-16 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/40 flex items-center justify-center hover:shadow-xl hover:shadow-[#25D366]/50 transition-shadow group"
              aria-label="Contactar por WhatsApp - Respuesta rápida"
            >
              {/* Icon */}
              <MessageCircle className="h-8 w-8 text-white relative z-10" />
              
              {/* Badge de notificación */}
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">1</span>
              </span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
