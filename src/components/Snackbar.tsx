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
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "#222",
        color: "#fff",
        padding: "14px 20px",
        borderRadius: "14px",
        display: "flex",
        gap: "14px",
        alignItems: "center",
        zIndex: 9999,
        boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
      }}
    >
      <span style={{ fontWeight: 500 }}>{message}</span>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          style={{
            background: "transparent",
            border: "none",
            color: "#4caf50",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {actionLabel}
        </button>
      )}

      <button
        onClick={onClose}
        style={{
          background: "none",
          border: "none",
          color: "#aaa",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        ✕
      </button>
    </motion.div>
  );
};

export default Snackbar;
