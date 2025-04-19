import { create } from "zustand";

interface GlobalStoreInterface {
  recordId: string | null;
  defaultValue: string | null;
}

interface Action extends GlobalStoreInterface {
  setRecordId: (value: string | null) => void;
  setDefaultValue: (value: string | null) => void;
}

const INITIAL_STATE: GlobalStoreInterface = {
  recordId: null,
  defaultValue: null,
};

export const useGlobarVar = create<Action>((set) => ({
  ...INITIAL_STATE,
  setRecordId: (value) => set({ recordId: value }),
  setDefaultValue: (value) => set({ defaultValue: value }),
}));
