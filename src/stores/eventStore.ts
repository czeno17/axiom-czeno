import { create } from "zustand";
import type { QualityEvent } from "@/types";
import { SEED_EVENTS } from "@/services/data/seedData";

interface EventStoreState {
  events: QualityEvent[];
  addEvent: (event: QualityEvent) => void;
  setEvents: (events: QualityEvent[]) => void;
}

export const useEventStore = create<EventStoreState>((set) => ({
  events: SEED_EVENTS,
  addEvent: (event) => set((state) => ({ events: [event, ...state.events] })),
  setEvents: (events) => set({ events }),
}));
