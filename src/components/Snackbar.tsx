import { motion } from "framer-motion";
import { useEffect } from "react";

type Props = {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  onClose: () => void;
};

const AUTO_CLOSE_TIME = 5000; // ⏱️ 5 segundos

const Snackbar: React.FC<Props> = ({
  message,
  actionLabel,
  onAction,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, AUTO_CLOSE_TIME);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      className="snackbar-container"
      initial={{ y: 80, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 40, opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "linear-gradient(135deg, #333, #444)",
        color: "#fff",
        padding: "14px 20px 18px", // ⬅️ espaço extra pra barra
        borderRadius: "14px",
        display: "flex",
        gap: "14px",
        alignItems: "center",
        zIndex: 9999,
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        minWidth: "280px",
        maxWidth: "90vw",
        overflow: "hidden", // 🔥 garante corte da barra
      }}
    >
      <span style={{ fontWeight: 500, flex: 1 }}>{message}</span>

      {actionLabel && onAction && (
        <motion.button
          whileHover={{ scale: 1.05, color: "#81c784" }}
          whileTap={{ scale: 0.95 }}
          onClick={onAction}
          style={{
            background: "transparent",
            border: "none",
            color: "#4caf50",
            fontWeight: "bold",
            cursor: "pointer",
            padding: "4px 8px",
            borderRadius: "8px",
          }}
        >
          {actionLabel}
        </motion.button>
      )}

      <motion.button
        whileHover={{ scale: 1.2, color: "#fff" }}
        whileTap={{ scale: 0.9 }}
        onClick={onClose}
        style={{
          background: "transparent",
          border: "none",
          color: "#aaa",
          cursor: "pointer",
          fontSize: "16px",
          padding: "4px",
          borderRadius: "50%",
        }}
        aria-label="Close notification"
      >
        ✕
      </motion.button>

      {/* 🔥 BARRA DE PROGRESSO */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{
          duration: AUTO_CLOSE_TIME / 1000,
          ease: "linear",
        }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "4px",
          width: "100%",
          background: "linear-gradient(90deg, #4caf50, #81c784)",
          transformOrigin: "left",

          /* 🌟 GLOW */
          boxShadow: `
      0 0 6px rgba(129, 199, 132, 0.9),
      0 0 12px rgba(76, 175, 80, 0.8),
      0 0 24px rgba(76, 175, 80, 0.6)
    `,

          /* 💨 BLUR SUAVE */
          filter: "blur(0.2px)",
        }}
      />
    </motion.div>
  );
};

export default Snackbar;
