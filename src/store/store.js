import {createStore} from './redux-autosetters'; //

const initialState = {
  focus: null,
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  deeply: {
    nested: {
      property: '',
      fullName: (state) => state.firstName + ' ' + state.lastName,
    }
  },
  privacy: false,
  age: undefined,
  $price: undefined,
  crops: [],
  number: '',
};

const afterChange = {
  firstName: (state, action) => {
    document.title = `Welcome ${state.firstName}`;
  },
  'deeply.nested.property': (state, action) => {
    console.log('Whoo hoo!');
  },
};

const reducers = {
  exampleName: (state, action) => {
    return {
      ...state,
      firstName: 'John',
      lastName: 'Doe',
    }
  },
  exampleAddress: (state, action) => {
    state.address = '123 Main Street';
    state.city = 'Springfield';
  }
};

export const store = createStore(initialState, {afterChange, reducers});

export {set, get} from './redux-autosetters';
