import { createSignal } from 'solid-js';

const BIRTHDAY = new Date('Janurary 5, 2005').getTime();

export default function Age({ init }) {
  const [age, setAge] = createSignal(init);

  setInterval(() => {
    const diff = new Date().getTime() - BIRTHDAY;
    setAge((diff / 1000 / 60 / 60 / 24 / 365).toFixed(9));
  }, 10);

  return (
    <strong>
      <code>{age()}</code>
    </strong>
  );
}
