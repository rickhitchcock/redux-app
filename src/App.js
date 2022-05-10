import {useSelector, useDispatch} from 'react-redux';

import {get, set} from './store/store';

import {Input} from './components/Inputs';

import './App.css';

const Summary = () => {
  console.log('Render: Summary');
 
  const name      = useSelector(get.name);
  const address   = useSelector(get.address);
  const city      = useSelector(get.city);
  const age       = useSelector(get.age);
  const number    = useSelector(get.number);
  const privacy   = useSelector(get.privacy);
  const $price    = useSelector(get.$price);
  const crops     = useSelector(get.crops);
  const client    = useSelector(get.client);

  return (
    <div id="Summary">
      <h3>Summary</h3>
      {name}<br/>
      {address}<br/>
      {city}<br/>
      {age}<br/>
      {number}<br/>
      {$price}<br/>
      {privacy ? 'Private' : ''}<br/>
      {crops.map(crop => crop).join(', ')}
      {Object.entries(client).map(([key, value]) => <div key={key} >{key}: {value}</div>)}
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
            immediate
            autoFocus={i === crops.length - 1}
          />
        )
      })}
      <Input
        id="crops"
        index={crops.length}
        key={crops.length}
        immediate
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
      <Input id="client" property="name" />
      <Input id="client" property="address" />
      <Input id="client" property="city" />
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
          dispatch(set.name('John Doe'));
          dispatch(set.address('123 Main Street'));
          dispatch(set.city('Athens'));
          dispatch(set.age(30));
        }}
      >
        Fill
      </button>

      <button
        onClick={() => dispatch(set.focus('address'))}
      >
        Go to address
      </button>
      <hr/>
      <form options="immediate" style={{width: '25rem'}}>
        <Input id="name"     label="Name"    fullWidth autoFocus/>
        <Input id="address"  label="Address" fullWidth />
        <Input id="city"     label="City"    fullWidth />
        <Input id="age"      label="Age"     fullWidth />
        <Input id="$price"   label="Price"   fullWidth />
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
