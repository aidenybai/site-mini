import { createSignal } from 'solid-js';

export default function Age() {
  const BIRTHDAY = new Date('January 5, 2005').getTime();
  const calc = () => {
    const diff = new Date().getTime() - BIRTHDAY;
    return (diff / 1000 / 60 / 60 / 24 / 365).toFixed(9);
  };
  const [age, setAge] = createSignal(calc());
  const [currInterval, setCurrInterval] = createSignal(null);
  const createInterval = () => {
    return setInterval(() => {
      setAge(calc());
    }, 10);
  };
  setCurrInterval(createInterval());
  return (
    <strong
      onMouseEnter={() => clearInterval(currInterval())}
      onMouseLeave={() => setCurrInterval(createInterval())}
    >
      <code>{age()}</code>
    </strong>
  );
}
