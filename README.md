# Redux, simplified

**store.js** contains the global state.  For example:

```
const initialState = {
  name: '',
  address: '',
  city: '',
  client: {
    name: '',
    address: '',
    city: '',
  },
  privacy: false,
  age: undefined,
  $price: undefined,
  crops: [],
  number: '',
};
```

To read from the store:
```
const name = useSelector(get.name);
```

To write to the store:
```
const dispatch = useDispatch();
dispatch(set.name('John Doe'));
dispatch(set.age(30));
dispatch(set.$price(25));
dispatch(set.crops({index: 0, value: 'Crimson Clover'}));
dispatch(set.crops({index: 1, value: 'Ryegrass'}));
dispatch(set.client({property: 'name', value: 'Henry Higgins'});
```

Note that `dispatch` should be called only within an event handler or within `useEffect()`.

## `<Input>` components ##

`<Input>` components interact with the store.  The type of the store's variable usually determines the `<Input>` type.

For example, this code creates text inputs for `name` and `address`, a checkbox for `privacy`, and a numeric type for `price` with a prepended dollar sign:
```
<Input id="name" />
<Input id="address" />
<Input id="privacy" />
<Input id="$price" />
```

If the store's variable is numeric or `undefined`, the type will be numeric:
```
<Input id="age" />
```

The default type can be overwritten using the `type` property:
```
<Input id="age" type="text" />
```

### Arrays ###
If the store's variable is an array, include an `index` property:
```
<Input id="crops" index={0} />
<Input id="crops" index={1} />
<Input id="crops" index={2} />
```

### Objects ###
If the store's variable is an object (but not an array), include a `property` prop:
```
<Input id="client" property="name" />
```

By default, changes to an `<Input>` are not committed to the store unless **Enter** is pressed or the `<Input>` component is blurred.  (This is in keeping with the Redux recommendation to [Avoid Putting Form State In Redux](https://redux.js.org/style-guide/#avoid-putting-form-state-in-redux).)

If changes should be committed immediately, include `immediate` as a property:
```
<Input id="name" immediate />
```

If you want all `<Input>` elements to be committed to the store immediately, include `options="immediate"` on the form itself:
```
<form options="immediate">
```

### Focusing `<Input>` ###
An `<Input>` can be focused like this:
```
dispatch(set.focus('address'));
```

### Radio groups ###
A radio group can be created like this:
```
<Input
  id="number"
  label="Pick a number"
  options={[1, 2, 3]}
  type="radio"
/>
```
![Output](https://raw.githubusercontent.com/rickhitchcock/redux-app/master/images/RadioButton1.png)

If the radio buttons' labels should be different from their values, do this:
```
<Input
  id="number"
  label="Pick a number"
  options={[1, 2, 3]}
  labels={['One', 'Two', 'Three']}
  type="radio"
/>
```
![Output](https://raw.githubusercontent.com/rickhitchcock/redux-app/master/images/RadioButton2.png)