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
    <>
      <h3>Crops</h3>
      {crops.map((_, i) => {
        return (
          <Input
            id="crops"
            index={i}
            key={i}
            autoFocus={i === crops.length - 1}
          />
        )
      })}
      <Input
        id="crops"
        index={crops.length}
        key={crops.length}
        style={{background: '#eee'}}
      />
    </>
  )
}

const Client = () => {
  console.log('Render: Client');
  useSelector(get.client);

  return (
    <>
      <Input id="client.firstName" label="client.firstName" immediate fullWidth />
      <Input id="client.lastName"  label="client.lastName"  immediate fullWidth />
      <Input id="client.fullName"  label="client.fullName"  fullWidth />
      <Input id="client.address"   label="client.address"   fullWidth />
      <Input id="client.city"      label="client.city"      fullWidth />
    </>
  )
} // Client

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
          dispatch(set.client.firstName('Mary'));
          dispatch(set.client.lastName('Doe'));
          dispatch(set.client.address('125 Elm Street'));
          dispatch(set.client.city('Metropolis'));
        }}
      >
        Fill
      </button>

      <button
        onClick={() => dispatch(set.focus('client.firstName'))}
      >
        Focus client
      </button>
      <hr/>
      <form style={{width: '25rem'}}>
        <Input id="firstName" label="firstName" fullWidth immediate autoFocus/>
        <Input id="lastName"  label="lastName"  fullWidth immediate />
        <Input id="address"   label="address"   fullWidth />
        <Input id="city"      label="city"      fullWidth />
        <Input id="age"       label="age"       fullWidth />
        <Input id="$price"    label="$price"    fullWidth />
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
        <Crops />
        <hr/>
        <Client />
      </form>
      <hr/>
      <Summary/>
    </>
  );
}

export default App;
