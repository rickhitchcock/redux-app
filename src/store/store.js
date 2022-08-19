import {createStore, set, get} from './react-setters';

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
    console.log('Whoo hoo!');
  },
  'deeply.nested.property': (state, action) => {
    console.log('Whoo hoo!');
  },
};

export const store = createStore(initialState, afterChange);
export {set, get} from './react-setters';

console.log({
  set,
  get,
});
