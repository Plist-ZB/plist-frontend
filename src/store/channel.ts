import { atom } from "jotai";

export const channelAtom = atom<IChannel | null>(null);

export const ischannelHostNameAtom = atom<boolean | null>(null);

export const channelVideoListAtom = atom<IVideo[] | null>(null);

export const initVideoIdAtom = atom<string | undefined>(undefined);

export const currentVideoIdAtom = atom<string | null>(null);

export const currentTimeAtom = atom<number>(0);
