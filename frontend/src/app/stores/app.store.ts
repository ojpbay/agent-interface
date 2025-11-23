import { signalStore, withState, withMethods, patchState, getState } from '@ngrx/signals';

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState({ pinned: true }),
  withMethods((store) => ({
    togglePinned(): void {
      const current = getState(store).pinned;
      patchState(store, { pinned: !current });
    },

    setPinned(value: boolean): void {
      patchState(store, { pinned: value });
    },

    isPinned(): boolean {
      return getState(store).pinned;
    },
  }))
);
