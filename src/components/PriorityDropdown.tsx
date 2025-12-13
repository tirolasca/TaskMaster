import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFire,
  faGaugeHigh,
  faArrowDown,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { Theme } from "./theme";
import { Priority } from "./TodoBoard";

type Props = {
  value: Priority;
  onChange: (p: Priority) => void;
  theme: Theme;
};

const options = [
  { key: "high", label: "Alta", icon: faFire, color: "#ff5252" },
  { key: "medium", label: "Média", icon: faGaugeHigh, color: "#ffb300" },
  { key: "low", label: "Baixa", icon: faArrowDown, color: "#4caf50" },
];

const PriorityDropdown: React.FC<Props> = ({
  value,
  onChange,
  theme,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.key === value)!;

  /* ===== FECHAR AO CLICAR FORA ===== */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", minWidth: "140px" }}>
      {/* ===== SELECT ===== */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          padding: "12px 14px",
          borderRadius: "12px",
          border: `2px solid ${selected.color}`,
          background: theme.itemBackground,
          color: selected.color,
          fontWeight: "bold",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FontAwesomeIcon icon={selected.icon} />
          {selected.label}
        </span>

        <FontAwesomeIcon
          icon={faChevronDown}
          style={{
            transition: "0.25s",
            transform: open ? "rotate(180deg)" : "rotate(0)",
          }}
        />
      </button>

      {/* ===== OPTIONS ===== */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "110%",
            left: 0,
            right: 0,
            background: theme.itemBackground,
            borderRadius: "14px",
            padding: "6px",
            boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
            zIndex: 1000,
          }}
        >
          {options.map((opt) => (
            <button
              key={opt.key}
              onClick={() => {
                onChange(opt.key as Priority);
                setOpen(false); // 🔥 fecha ao selecionar
              }}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "10px",
                border: "none",
                background:
                  opt.key === value
                    ? `${opt.color}22`
                    : "transparent",
                color: opt.color,
                fontWeight: "bold",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "4px",
              }}
            >
              <FontAwesomeIcon icon={opt.icon} />
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PriorityDropdown;
