// import { create } from "zustand";

// interface UserInfoStore {
//   id: number;
//   name: string;
//   email: string;
//   avatarUrl: string;
// }

// interface UserStore {
//   userInfo: UserInfoStore | null;
//   setUserInfo: (userInfo: UserInfoStore) => void;
//   clearUserInfo: () => void;
// }
// export const useUserStore = create<UserStore>((set) => ({
//   userInfo: {
//     id: 1,
//     name: "Jane Doe",
//     email: "jane.doe@example.com",
//     avatarUrl:
//       "https://i.pinimg.com/736x/8a/c9/6d/8ac96d4672cfee827ed69e63e4b00b9f.jpg",
//     role: "admin",
//   },
//   // setUserIndo is used for updating the user info in the store
//   setUserInfo: (userInfo) => set({ userInfo }),
//   clearUserInfo: () => set({ userInfo: null }),
// }));

// src/store/userStore.js
// import { create } from "zustand";

// export const useUserStore = create((set) => ({
//   userInfo: null, // your user profile object
//   token: null, // access token
//   refreshToken: null,

//   setAuth: ({ userInfo, token, refreshToken }) =>
//     set({ userInfo, token, refreshToken }),
//   clearAuth: () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("refresh_token");
//     set({ userInfo: null, token: null, refreshToken: null });
//   },

// }));

// src/stores/userStore/userInfoStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the shape of your user info
export interface UserInfo {
  id: number;
  first_name: string;
  last_name: string;
  email?: string;
  avatar?: string;
  role?: string;
}

// Define the store state and actions
interface AuthState {
  userInfo: UserInfo | null;
  token: string | null;
  refresh_token: string | null;

  setAuth: (payload: {
    userInfo: UserInfo;
    token: string;
    refreshToken: string;
  }) => void;
  clearAuth: () => void;
}

export const useUserStore = create<AuthState>()(
  persist(
    (set) => ({
      userInfo: null,
      token: null,
      refresh_token: null,

      setAuth: ({ userInfo, token, refreshToken }) =>
        set({ userInfo, token, refresh_token: refreshToken }),

      clearAuth: () =>
        set({ userInfo: null, token: null, refresh_token: null }),
    }),
    {
      name: "auth-storage", // localStorage key
      partialize: (state) => ({
        userInfo: state.userInfo,
        token: state.token,
        refresh_token: state.refresh_token,
      }),
    }
  )
);
