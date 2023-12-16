import { writable } from 'svelte/store';

export const voteJokeId = writable(0);
export const voteJokeTrackPastIDs = writable({});
export const fetchedJokes = writable([]);

