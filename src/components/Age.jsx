import { createSignal } from 'solid-js';

export default function Age({ init }) {
  const BIRTHDAY = new Date('January 5, 2005').getTime();
  const [age, setAge] = createSignal(init);
  const [currInterval, setCurrInterval] = createSignal(null);
  const createInterval = () => {
    return setInterval(() => {
      const diff = new Date().getTime() - BIRTHDAY;
      setAge((diff / 1000 / 60 / 60 / 24 / 365).toFixed(9));
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
