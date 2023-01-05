import create from "zustand/vanilla";

interface State {
  activeSection: string;
}

const store = create<State>(() => ({
  activeSection: "",
}));

const { getState, setState, subscribe } = store;

export { getState, setState, subscribe };