# Redux, simplified

**store.js** contains the global state.  For example:

```
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
```

To read from the store:
```
const name = useSelector(get.name);
```

To write to the store:
```
const dispatch = useDispatch();
dispatch(set.name('John Doe'));
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


By default, changes to an `<Input>` are not committed to the store unless **Enter** is pressed or the `<Input>` component is blurred.

If changes should be committed immediately, include `immediate` as a property:
```
<Input id="name" immediate />
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
  id="gender"
  label="Gender"
  options={['Male', 'Female', 'Other']}
  type="radio"
/>
```