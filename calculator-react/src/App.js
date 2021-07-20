import React, {useState} from 'react';
import './style/Screen.css';
import './style/Button.css';
import './style/Container.css';

export default function App() {
  const [screenValue, setScreenValue] = useState('');
  const [result, setResult] = useState(0);
  const [accumulator, setAccumulator] = useState(0);
  const [operated, setOperated] = useState(false);

  // Components
  const screen = (value, result) => {
    return(
      <div className='bodyScreen'>
        <span className='operationScreen'>{value}</span>
        <span className='valueScreen'>{result.toPrecision(5)}</span>
      </div>
    );
  }  

  const btn = (label, onClick) => {
    return(
      <button className='buttonStyle' onClick={onClick}>{label}</button>
    );
  }

  // Functions
  const addDigit = (d) => {
    if((d == '+' || d == '-' || d == '*' || d == '/') 
        && operated) {
      setOperated(false);
      setScreenValue(result + d);
      return;
    }

    if(operated) {
      setScreenValue(d);
      setOperated(false);
      return;
    }

    const enteredScreenValue = screenValue + d;
    setScreenValue(enteredScreenValue);
  }

  const removeMemory = () => {
    setOperated(false);
    setScreenValue('');
    setResult(0);
    setAccumulator(0);
    return;
  }

  const operation = (oper) => {
    if(oper == 'bs') {
      let vScreen = screenValue;
      vScreen = vScreen.substring(0, (vScreen.length-1));
      setScreenValue(vScreen);
      setOperated(false);
      return;
    }

    try {
      // calculation of everything on the screen.
      const r = eval(screenValue);
      setAccumulator(r);
      setResult(r);
      setOperated(true);
    }catch {
      setResult('! ERRO !');
    }
  }

  return (
    <div className='calcBody'>
      <div className='container'>
        {screen(screenValue, result)}
        <div className='buttonBody'>
          {btn('AC', removeMemory)}
          {btn('(', () => addDigit('('))}
          {btn(')', () => addDigit(')'))}
          {btn('/', () => addDigit('/'))}
          {btn('7', () => addDigit('7'))}
          {btn('8', () => addDigit('8'))}
          {btn('9', () => addDigit('9'))}
          {btn('*', () => addDigit('*'))}
          {btn('4', () => addDigit('4'))}
          {btn('5', () => addDigit('5'))}
          {btn('6', () => addDigit('6'))}
          {btn('-', () => addDigit('-'))}
          {btn('1', () => addDigit('1'))}
          {btn('2', () => addDigit('2'))}
          {btn('3', () => addDigit('3'))}
          {btn('+', () => addDigit('+'))}
          {btn('0', () => addDigit('0'))}
          {btn('.', () => addDigit('.'))}
          {btn('↤', () => operation('bs'))}
          {btn('=', () => operation('='))}
        </div>
      </div>
    </div>
  );
}
