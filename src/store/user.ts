import { atom } from "jotai";

// TODO: jotai-tanstack-query로 변경
export const userProfileAtom = atom<UserProfile | null>(null);
