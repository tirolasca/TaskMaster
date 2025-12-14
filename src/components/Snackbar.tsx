import { motion } from "framer-motion";

type Props = {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  onClose: () => void;
};

const Snackbar: React.FC<Props> = ({
  message,
  actionLabel,
  onAction,
  onClose,
}) => {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 80, opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "linear-gradient(135deg, #333, #444)",
        color: "#fff",
        padding: "14px 20px",
        borderRadius: "14px",
        display: "flex",
        gap: "14px",
        alignItems: "center",
        zIndex: 9999,
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        minWidth: "280px",
        maxWidth: "90vw",
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
            transition: "color 0.3s",
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
    </motion.div>
  );
};

export default Snackbar;
