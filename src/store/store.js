import {configureStore, createSlice} from '@reduxjs/toolkit';

const initialState = {
  focus: '',
  changed: {},
  name: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  crops: [],
};

const sets = {};
const gets = {};

Object.keys(initialState).forEach(key => {
  const isArray = Array.isArray(initialState[key]);
  const isObject = !isArray && initialState[key] !== null && typeof initialState[key] === 'object';

  sets[key] = (state, action) => {
    const value = action.payload.value;
    if (isArray) {
      const index = action.payload.index;
      if (state[key][index] === value) {
        return state;
      } else {
        const a = [...state[key]];
        a[index] = value;
        return {
          ...state,
          [key]: a
        }
      }
    } else if (isObject) {
      if (state[key][action.payload.key] === value) {
        return state;
      } else {
        const o = {...state[key]};
        o[action.payload.key] = value;

        return {
          ...state,
          [key]: o
        }
      }
    } else {
      if (state[key] === action.payload) {
        return state;
      } else {
        return {
          ...state,
          [key]: action.payload,
          changed: {...state.changed, [key]: true}
        }
      }
    }
  }

  if (isArray) {
    sets['remove' + key] = (state, action) => {
      console.log(key);
      console.log(action);
      const a = [...state[key]];
      a.splice(action.payload, 1);
      return {
        ...state,
        [key]: a
      }
    }
  }

  gets[key] = (state) => {
    if (state.reducer[key] === undefined) {
      console.log('Unknown key: ' + key);
      console.log(JSON.stringify(state.reducer, null, 2));
      alert('Unknown key: ' + key);
    } else {
      return state.reducer[key];
    }
  }
});

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    ...sets,
  },
});

const mystore = configureStore({
  reducer: {
    reducer: slice.reducer
  },
});

export const store = mystore;
export const set = slice.actions;
export const get = gets;
