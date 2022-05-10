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
      <form style={{width: '25rem'}}>
        <Input id="name"     label="Name"    fullWidth immediate autoFocus/>
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
      </form>
      <hr/>
      <Summary/>
    </>
  );
}

export default App;
