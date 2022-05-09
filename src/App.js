import {useSelector, useDispatch} from 'react-redux';

import {get, set} from './store/store';

import {Input} from './components/Inputs';

import './App.css';

const Summary = () => {
  console.log('Render: Summary');
 
  const name    = useSelector(get.name);
  const address = useSelector(get.address);
  const city    = useSelector(get.city);
  const age     = useSelector(get.age);
  const crops   = useSelector(get.crops);

  return (
    <div>
      <h3>Summary</h3>
      {name}<br/>
      {address}<br/>
      {city}<br/>
      {age}<br/>
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
        onClick={() => {
          dispatch(set.focus('address'));
        }}
      >
        Go to address
      </button>
      <hr/>
      <form immediate="true">
        <table>
          <tbody>
            <tr>
              <td>Name:</td>
              <td><Input id="name" immediate autoFocus /></td>
            </tr>
            <tr>
              <td>Address:</td>
              <td><Input id="address" /></td>
            </tr>
            <tr>
              <td>City:</td>
              <td><Input id="city" /></td>
            </tr>
            <tr>
              <td>Age:</td>
              <td><Input id="age" /></td>
            </tr>
            <tr>
              <td>Price:</td>
              <td><Input id="$price" /></td>
            </tr>
            <tr>
              <td>Privacy:</td>
              <td><Input id="privacy" /></td>
            </tr>
          </tbody>            
        </table>
        
        <hr/>
        <Crops />
      </form>
      <hr/>
      <Summary/>
    </>
  );
}

export default App;
