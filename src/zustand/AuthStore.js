import {create} from 'zustand';
import {combine} from 'zustand/middleware';
import _ from 'lodash';
const initialState = {
  token: '8U7dPDoiozxF26WNLAdJdo2S9KN7wwg58Dub0v9D',
};

const store = combine(initialState, (set, get) => ({
  setToken: token => set({token}),
}));

export const useAuthStore = create(store);
