import {useEffect, useState, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {get, set} from '../store/store';

import {
  Autocomplete as MUIAutocomplete,
  TextField,
  Radio,
  Checkbox
} from '@mui/material';

import NumberFormat from 'react-number-format';
import React from 'react';

const keyPress = (event) => {
  if (event.key === 'Enter') {  // focus next field
    const form = event.target.form;

    if (form) {
      let index = Array.prototype.indexOf.call(form, event.target) + 1;
      while (
        index < form.elements.length &&
        form.elements[index].tagName !== 'INPUT') {  // skip over dropdown button elements
        index++;
      }
      if (form.elements[index]) {
        form.elements[index].focus();
      }
      event.preventDefault();
    }
  }
} // keyPress

const Input = ({type, id, index, value, onInput, style, context, immediate, ...props}) => {
  console.log(`Render: Input ${id}`);
  const dispatch = useDispatch();
  const focus = useSelector(get.focus);
  const changed = useSelector(get.changed)[id];
  const focusRef = useRef(null);

  const sel = context ? get[context] : get[id];
  if (!sel) {
    alert('Unknown Input: ' + id);
  }
  
  let sel2 = useSelector(sel);
  const isArray = Array.isArray(sel2);

  let val;

  if (context) {
    val = sel2[id];
  } else if (isArray) {
    val = sel2[index] || '';
  } else {
    val = sel2;
  }

  let [v, setValue] = useState(value || val);

  useEffect(() => {
    if (focus === id) {
      const input = focusRef.current.querySelector('input');
      input.focus();
      input.select();
      dispatch(set.focus(''));
    }
  }, [focus, id, dispatch]);

  useEffect(() => {
    if (changed) {
      setValue(val);
      dispatch(set.changed({key: id, value: false}));
    }
  }, [dispatch, changed, val, id]);

  // console.log(context, id, val, v);

  useEffect(() => {
    setValue(value);
  }, [value])

  const change = (value) => {
    setValue(value);
    if (immediate) {
      update(value);
    }
  } // change

  const update = (value) => {
    if (isArray) {
      if (sel2[index] !== value) {
        dispatch(set[id]({value, index}));
      }
    } else if (context) {
      dispatch(set[context]({key: id, value}));
    } else {
      dispatch(set[id](value.description || value));
    }
  } // update

  value = value !== undefined ? value : val;

  if (type === 'checkbox') {
    if (value === '') {
      value = false;
    } else if (value === 'on') {
      value = true;
    } else if (value !== true && value !== false) {
      alert(`Bad Boolean value for ${id}: ${value}`);
    }
  }

  return (
    type === 'radio' ? 
      <Radio
        {...props}
        id={id}
        checked={val === value}
        value={v}
        style={{padding: 0}}
        onChange={(e) => {
          change(e.target.value);
          update(e.target.value);
          if (onInput) {
            onInput(e);
          }
        }}
      />    
      :
    type === 'checkbox' ? 
      <Checkbox
        id={id}
        checked={v}
        style={{padding: 0}}
        onChange={(e) => {
          change(e.target.checked);
          update(e.target.checked);
          if (onInput) {
            onInput(e);
          }
        }}
      />    
      :
    type === 'dollar' ?
      <NumberFormat
        {...props}
        id={id}
        autoComplete="off"

        onKeyPress={keyPress}
        
        value={v}

        style={style}

        onChange={(e) => {
          const value = e.target.value || '';
          change(value.replace('$', ''));
          if (onInput) {
            onInput(e);
          }
        }}

        onBlur={(event) => {
          if (!immediate) {
            update(event.target.value);
          }
        }}

        decimalScale={2}
        fixedDecimalScale={true}
        prefix={'$'}
    
        type="text"
      />
      :
      <TextField
        {...props}
        id={id}
        // variant={props.variant || (props.label ? 'outlined' : 'standard')}
        variant={props.variant || 'outlined'}

        inputProps={{
          role: 'presentation',
          autoComplete: 'off',
          style: {
            padding: 5,
            background: 'white'
          },
        }}

        ref={focus === id ? focusRef : null}

        onKeyPress={keyPress}

        onWheel={e => e.target.blur()} // https://github.com/mui/material-ui/issues/7960#issuecomment-760367956

        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.nativeEvent.preventDefault();  // for number type
          } else if (e.key === 'Enter') {
            update(e.target.value);
          }
        }}
        
        value={v}

        onChange={(event) => {
          change(event.target.value);
          if (onInput) {
            onInput(event);
          }
        }}

        onBlur={(e) => {
          if (!immediate) {
            update(e.target.value);
          }
        }}

        type={type || 'text'}
      />
  )
} // Input

const Autocomplete = ({id, index, options, value, onInput, isOptionEqualToValue, onInputChange, groupBy, renderInput, getOptionLabel, autoComplete, includeInputInList, filterSelectedOptions, onChange, context, ...props}) => {
  const dispatch = useDispatch();
  let val = useSelector(context ? get[context] : get[id]);
  if (context) {
    val = val[id];
  }

  const isArray = Array.isArray(val);

  if (isArray) {
    val = val[index];
  }

  const update = (value) => {
    value = value === null    ? null :
            value.description ? value.description :
            value;

    if (isArray) {
      dispatch(set[id]({index, value}));
    } else if (context) {
      dispatch(set[context]({key: id, value}));
    } else {
      dispatch(set[id](value || ''));
    }
  } // update

  if (!renderInput) {
    renderInput = (params) => {
      return (
        <TextField
          variant={props.variant || 'outlined'}
          sx={{background: 'white', width: max, padding: 0}}
          {...params}
        />
      )
    }
  }

  if (!isOptionEqualToValue) {
    isOptionEqualToValue = (option, value) => option.value === value.value;
  }

  value = value !== undefined ? value : val;

  // let max = options ? Math.max.apply(Math, options.map(option => option.description ? option.description.length : option.length)) : '100%';
  const max = '100%';

  return (
    <MUIAutocomplete
      {...props}

      onKeyPress={(e) => {
        keyPress(e);
      }}

      sx={{width: max}}

      isOptionEqualToValue={isOptionEqualToValue}   // avoids warning, per https://stackoverflow.com/q/61947941/3903374

      groupBy={groupBy}
      getOptionLabel={getOptionLabel}
      onInputChange={onInputChange}
      // autoComplete="off" // TODO: dang Chrome (Which of the following options best describes your Field?)
      includeInputInList={includeInputInList}
      filterSelectedOptions={filterSelectedOptions}

      renderInput={renderInput}
      
      options={options}

      value={value}

      onChange={(e, value) => {
        // if (value) {
          console.log(value);
          update(value);
          
          if (onInput) {
            onInput(e);
          }
          if (onChange) {
            onChange(e, value);
          }
        // }
      }}
    />
  )
} // Autocomplete

export {
  Autocomplete,
  Input,
}