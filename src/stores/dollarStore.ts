import { atom } from 'nanostores';

export const refreshTrigger = atom(0);

export function triggerRefresh() {
    refreshTrigger.set(refreshTrigger.get() + 1);
}
