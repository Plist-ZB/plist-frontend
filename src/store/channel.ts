import { atom } from "jotai";

export const channelAtom = atom<IChannel | null>(null);

export const isChannelHostAtom = atom<boolean | null>(null);

export const channelVideoListAtom = atom<IVideo[] | null>(null);
