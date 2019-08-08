import * as React from 'react';
import './App.css';

const { useState, useCallback } = React;

function App() {
  const clickSet = new Set();
  const changeSet = new Set();
  const [name, setName] = useState('Tom');
  const handleClick = useCallback(e => {
    console.log(e);
  }, []);

  clickSet.add(handleClick);
  const handleChange = useCallback(e => {
    console.log(e.target.value);
    setName(e.target.value);
  }, [name]);
  changeSet.add(handleChange);

  return (
    <div className="App">
      <input value={ name } onChange={ handleChange }/>
      <button onClick={ handleClick }>点击没有变化</button>
      <div>{ clickSet.size }</div>
      <div>{ changeSet.size }</div>
    </div>
  );
}

export default App;
