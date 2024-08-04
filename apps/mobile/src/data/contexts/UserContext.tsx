"use client";
import { createContext, useCallback, useEffect, useState } from "react";
import { User } from "@barba/core";
import useLocalStorage from "../hooks/useLocalStorage";

export interface UserContextProps {
  loading: boolean;
  user: User | null;
  signIn: (user: User) => Promise<void>;
  signOut: () => void;
}

const UserContext = createContext<UserContextProps>({} as any);

export function UserProvider({ children }: any) {
  const { get, set } = useLocalStorage();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const loadUser = useCallback(
    async function () {
      try {
        const localUser = await get("user");
        if (localUser) {
          setUser(localUser);
        }
      } finally {
        setLoading(false);
      }
    },
    [get]
  );

  async function signIn(user: User) {
    setUser(user);
    await set("user", user);
  }

  function signOut() {
    setUser(null);
    set("user", null);
  }

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <UserContext.Provider
      value={{
        loading,
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
