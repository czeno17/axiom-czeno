// src/stores/eventStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { QualityEvent } from "@/types";
import { SEED_EVENTS } from "@/services/data/seedData";

interface EventStoreState {
  events: QualityEvent[];
  isLoading: boolean;
  error: string | null;

  // CRUD Operations
  addEvent: (event: QualityEvent) => void;
  updateEvent: (id: string, updates: Partial<QualityEvent>) => void;
  deleteEvent: (id: string) => void;
  getEvent: (id: string) => QualityEvent | undefined;
  getEventsByStatus: (status: string) => QualityEvent[];
  getEventsByLine: (line: string) => QualityEvent[];
  getEventsByType: (type: string) => QualityEvent[];

  // Status Management
  updateEventStatus: (id: string, newStatus: string) => void;
  closeCAPA: (id: string, closedBy: string) => void;
  reopenCAPA: (id: string) => void;
  startCAPA: (id: string) => void;

  // RCA Management
  addRootCause: (id: string, rootCause: string) => void;
  addResolution: (id: string, resolution: string) => void;
  addLessonsLearned: (id: string, lessons: string) => void;

  // Bulk Operations
  setEvents: (events: QualityEvent[]) => void;
  resetEvents: () => void;
}

export const useEventStore = create<EventStoreState>()(
  persist(
    (set, get) => ({
      events: SEED_EVENTS || [],
      isLoading: false,
      error: null,

      // Add new event
      addEvent: (event) =>
        set((state) => ({
          events: [event, ...state.events],
        })),

      // Update event
      updateEvent: (id, updates) =>
        set((state) => ({
          events: state.events.map((e) =>
            e.id === id ? { ...e, ...updates, updatedAt: new Date().toISOString() } : e
          ),
        })),

      // Delete event
      deleteEvent: (id) =>
        set((state) => ({
          events: state.events.filter((e) => e.id !== id),
        })),

      // Get single event
      getEvent: (id) => {
        return get().events.find((e) => e.id === id);
      },

      // Get events by status
      getEventsByStatus: (status) => {
        return get().events.filter((e) => e.status === status);
      },

      // Get events by line
      getEventsByLine: (line) => {
        return get().events.filter((e) => e.line === line);
      },

      // Get events by type
      getEventsByType: (type) => {
        return get().events.filter((e) => e.type === type);
      },

      // Update event status
      updateEventStatus: (id, newStatus) =>
        set((state) => ({
          events: state.events.map((e) =>
            e.id === id
              ? {
                  ...e,
                  status: newStatus,
                  updatedAt: new Date().toISOString(),
                  ...(newStatus === "Closed" && !e.closedDate
                    ? { closedDate: new Date().toISOString().split("T")[0] }
                    : {}),
                }
              : e
          ),
        })),

      // Close CAPA with verification
      closeCAPA: (id, closedBy) =>
        set((state) => ({
          events: state.events.map((e) =>
            e.id === id && e.type === "CAPA"
              ? {
                  ...e,
                  status: "Closed",
                  closedDate: new Date().toISOString().split("T")[0],
                  closedBy: closedBy,
                  updatedAt: new Date().toISOString(),
                }
              : e
          ),
        })),

      // Reopen CAPA
      reopenCAPA: (id) =>
        set((state) => ({
          events: state.events.map((e) =>
            e.id === id
              ? {
                  ...e,
                  status: "In Progress",
                  closedDate: null,
                  closedBy: null,
                  updatedAt: new Date().toISOString(),
                }
              : e
          ),
        })),

      // Start CAPA (Open → In Progress)
      startCAPA: (id) =>
        set((state) => ({
          events: state.events.map((e) =>
            e.id === id && e.type === "CAPA"
              ? {
                  ...e,
                  status: "In Progress",
                  startedAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                }
              : e
          ),
        })),

      // Add root cause
      addRootCause: (id, rootCause) =>
        set((state) => ({
          events: state.events.map((e) =>
            e.id === id
              ? {
                  ...e,
                  rootCauseDescription: rootCause,
                  updatedAt: new Date().toISOString(),
                }
              : e
          ),
        })),

      // Add resolution
      addResolution: (id, resolution) =>
        set((state) => ({
          events: state.events.map((e) =>
            e.id === id
              ? {
                  ...e,
                  resolutionDetails: resolution,
                  updatedAt: new Date().toISOString(),
                }
              : e
          ),
        })),

      // Add lessons learned
      addLessonsLearned: (id, lessons) =>
        set((state) => ({
          events: state.events.map((e) =>
            e.id === id
              ? {
                  ...e,
                  lessonsLearned: lessons,
                  updatedAt: new Date().toISOString(),
                }
              : e
          ),
        })),

      // Bulk set events
      setEvents: (events) => set({ events }),

      // Reset to initial state
      resetEvents: () => set({ events: SEED_EVENTS || [] }),
    }),
    {
      name: "event-store", // persists to localStorage
    }
  )
);
