import { create } from "zustand";

interface PropagationStoreState {
  // Maps a product line -> the new CAPA eventId created for it, so the UI
  // can show "Preventive Action created" instead of the convert button again.
  propagated: Record<string, string>;
  markPropagated: (line: string, eventId: string) => void;
}

export const usePropagationStore = create<PropagationStoreState>((set) => ({
  propagated: {},
  markPropagated: (line, eventId) =>
    set((state) => ({ propagated: { ...state.propagated, [line]: eventId } })),
}));
