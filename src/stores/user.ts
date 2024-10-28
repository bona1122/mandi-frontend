import { create } from 'zustand';

// TODO: 임시구조
type User = {
  userId: string | null;
  // nickname: string | null;
  // imgUrl: string | null;
  // avatar: string;
  // role: 'admin' | 'user';
};

type UserStoreType = {
  user: User | null;
  setUser: (user: User) => void;
};

const initialUser: User = {
  userId: null,
  // nickname: null,
  // imgUrl: null,
};

export const useUserStore = create<UserStoreType>(set => ({
  user: initialUser,
  setUser: (user: User) => set({ user }),
}));
