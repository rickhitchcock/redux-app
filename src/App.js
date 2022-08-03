import {useSelector, useDispatch} from 'react-redux';

import {get, set} from './store/store';

import {Input} from './components/Inputs';

import './App.css';

const Summary = () => {
  console.log('Render: Summary');
  const state = useSelector(state => state);

  return (
    <div id="Summary">
      <h3>state</h3>
      {JSON.stringify(state, null, 2)}
    </div>
  )
}

const Crops = () => {
  console.log('Render: Crops');
  const crops = useSelector(get.crops);

  return (
    <form>
      <h3>Crops</h3>
      {crops.map((_, i) => {
        return (
          <Input
            id="crops"
            index={i}
            key={i}
            autoFocus={i === crops.length - 1}
            fullWidth
          />
        )
      })}
      <Input
        id="crops"
        index={crops.length}
        key={crops.length}
        style={{background: '#eee'}}
        fullWidth
      />
    </form>
  )
}

const App = () => {
  console.log('Render: App');

  const dispatch = useDispatch();

  return (
    <>
      <button
        onClick={() => {
          dispatch(set.firstName('John'));
          dispatch(set.lastName('Doe'));
          dispatch(set.address('123 Main Street'));
          dispatch(set.city('Athens'));
          dispatch(set.age(30));
          dispatch(set.deeply.nested.property('Gotcha'));
        }}
      >
        Fill
      </button>

      <button
        onClick={() => dispatch(set.focus('address'))}
      >
        Focus address
      </button>
      <hr/>
      <form options="immediate" style={{width: '25rem'}}>
        <Input id="firstName"               label="firstName"               fullWidth autoFocus />
        <Input id="lastName"                label="lastName"                fullWidth />
        <Input id="deeply.nested.fullName"  label="deeply.nested.fullName"  fullWidth />
        <Input id="address"                 label="address"                 fullWidth />
        <Input id="city"                    label="city"                    fullWidth />
        <Input id="age"                     label="age"                     fullWidth />
        <Input id="$price"                  label="$price"                  fullWidth />
        <Input id="deeply.nested.property"  label="deeply.nested.property"  fullWidth />
        <hr/>
        <label>
          Privacy:
          <Input id="privacy" />
        </label>
        <hr/>

        <Input
          id="number"
          label="Pick a number"
          options={[1, 2, 3]}
          labels={['One', 'Two', 'Three']}
          type="radio"
        />
        <hr/>
      </form>
      <Crops />
      <hr/>
      <Summary/>
    </>
  );
}

export default App;
