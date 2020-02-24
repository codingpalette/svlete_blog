import { writable } from 'svelte/store';

export const items = writable([]);
export const LastPost = writable(null);
export const LastScrollY = writable(0);
