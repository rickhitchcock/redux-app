import {useSelector, useDispatch} from 'react-redux';

import {get, set} from './store/store';

import {Input} from './components/Inputs';

import './App.css';

const Summary = () => {
  console.log('Render: Summary');
 
  const name    = useSelector(get.name);
  const address = useSelector(get.address);
  const city    = useSelector(get.city);
  const crops   = useSelector(get.crops);
  return (
    <div>
      <h3>Summary</h3>
      {name}<br/>
      {address}<br/>
      {city}<br/>
      {crops.map(crop => crop).join(', ')}
    </div>
  )
}

const App = () => {
  console.log('Render: App');

  const dispatch = useDispatch();
  const crops = useSelector(get.crops);

  return (
    <>
      <button
        onClick={() => {
          dispatch(set.name('John Doe'));
          dispatch(set.address('123 Main Street'));
          dispatch(set.city('Athens'));
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
      <form>
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
          </tbody>            
        </table>
        
        <hr/>
        <h3>Crops</h3>
        {
          crops.map((_, i) => {
            return (
              <div key={i}>
                <Input id="crops" index={i} />
              </div>
            )
          })
        }
        <div key={crops.length}>
          <Input id="crops" index={crops.length} />
        </div>
      </form>
      <hr/>
      <Summary/>
    </>
  );
}

export default App;
