import { signalStore, withState, withMethods, patchState, getState } from '@ngrx/signals';

export interface ChatMessage {
  role: 'user' | 'assistant' | string;
  text: string;
  timestamp: string;
}

export const ChatStore = signalStore(
  { providedIn: 'root' },
  withState({ sessions: {} as Record<string, ChatMessage[]> }),
  withMethods((store) => ({
    getSessions() {
      return getState(store).sessions;
    },

    getMessages(docId: string | null) {
      if (!docId) return [] as ChatMessage[];
      const s = getState(store).sessions;
      return s[docId] ?? [];
    },

    addMessage(docId: string, msg: ChatMessage) {
      const current = getState(store).sessions;
      const updated = { ...current, [docId]: [...(current[docId] ?? []), msg] };
      patchState(store, { sessions: updated });
    },

    clear(docId: string) {
      const current = getState(store).sessions;
      const copy = { ...current };
      delete copy[docId];
      patchState(store, { sessions: copy });
    },
  }))
);
