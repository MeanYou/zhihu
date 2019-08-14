import * as React from 'react';
import { Button } from 'antd';
import { RouteProps } from 'react-router-dom';

const { useState, useCallback, useRef, useEffect, useMemo } = React;

export interface NameProps {
  firstName: string;
  lastName: string;
}
const UseCallback = (props:RouteProps) => {
  const fullName:NameProps = { firstName: 'Taylor', lastName: 'Swift' };
  const [name, setName] = useState(fullName);

  const set = new Set();
  const cbRef = useRef(set);

  useEffect(() => {
    // console.log(props);
  }, []);
  useEffect(() => {
    setCbCount(cbRef.current.size);
    console.log(cbRef.current);
  }, [name.firstName, name.lastName]);

  const [cbCount, setCbCount] = useState(0);
  const handleFirstChange = useCallback((e) => {
    setName({firstName: e.target.value, lastName: name.lastName});
  }, [name.lastName]);
  cbRef.current.add(handleFirstChange);

  const handleLastChange = useCallback((e) => {
    setName({firstName: name.firstName, lastName: e.target.value});
  }, [name.firstName]);
  cbRef.current.add(handleLastChange);

  const getExpensiveName = (lastName:string) => {
    for(let i = 0; i < 1000; i++) {
      console.log(1);
    }
    return lastName;
  };
  const expensiveName = useMemo(() => getExpensiveName(name.lastName), [name.lastName]);

  return (
    <div>
      <div>更新的callback数量{ cbCount }</div>
      <input value={ name.firstName } onChange={ handleFirstChange } placeholder="请输入姓氏"/>
      <input value={ name.lastName } onChange={ handleLastChange } placeholder="请输入名字"/>
      <div>{ expensiveName }</div>
      <Button type="primary">123</Button>
    </div>
  );
}

export default UseCallback;
