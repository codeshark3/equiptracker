"use client";

import { useEffect } from "react";
import { useSessionStore } from "~/store/sessionStore";
import { betterFetch } from "@better-fetch/fetch";

export function SessionInitializer() {
  const setUser = useSessionStore((state) => state.setUser);

  useEffect(() => {
    const initializeSession = async () => {
      try {
        const response = await betterFetch("/api/auth/get-session", {
          baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
        });

        if (response?.data?.user) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("Failed to initialize session:", error);
      }
    };

    initializeSession();
  }, [setUser]);

  return null;
}
