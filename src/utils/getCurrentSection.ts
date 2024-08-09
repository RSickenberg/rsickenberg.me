import {createStore} from "zustand";

interface State {
  activeSection: string;
}

const store = createStore<State>(() => ({
    activeSection: "",
}));

const {getState, setState, subscribe} = store;

export {getState, setState, subscribe};