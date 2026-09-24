"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ConnectContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
};

const ConnectContext = createContext<ConnectContextValue | null>(null);

export function ConnectProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((v) => !v), []);
  const value = useMemo(() => ({ open, setOpen, toggle }), [open, toggle]);

  return (
    <ConnectContext.Provider value={value}>{children}</ConnectContext.Provider>
  );
}

export function useConnect() {
  const ctx = useContext(ConnectContext);
  if (!ctx) throw new Error("useConnect must be used within ConnectProvider");
  return ctx;
}
