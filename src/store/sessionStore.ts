// src/store/sessionStore.ts
import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  role: string | null | undefined;
}

interface SessionState {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}
// store/counterStore.ts

export const useSessionStore = create<SessionState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
