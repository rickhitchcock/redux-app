import {configureStore, createSlice} from '@reduxjs/toolkit';

const initialState = {
  name: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  privacy: false,
  age: undefined,
  $price: undefined,
  crops: [],
  gender: '',
};

const sets = {};
const gets = {};

Object.keys(initialState).forEach(key => {
  initialState['_changed' + key] = false;
  initialState['_focus'   + key] = false;
});

Object.keys(initialState).forEach(key => {
  const isArray = Array.isArray(initialState[key]);
  const isObject = !isArray && initialState[key] !== null && typeof initialState[key] === 'object';

  sets[key] = (state, action) => {
    if (isArray) {
      const value = action.payload.value;
      const index = action.payload.index;

      if (state[key][index] === value ||
          (state[key][index] === undefined && value === '')
         ) {
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
      const value = action.payload.value;
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
          ['_changed' + key]: true
        }
      }
    }
  }

  sets.focus = (state, action) => {
    // alert('_focus' + action.payload);
    return {
      ...state,
      ['_focus' + action.payload]: true
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
    if (!(key in state.reducer)) {
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
