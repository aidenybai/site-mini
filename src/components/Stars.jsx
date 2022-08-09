import { createResource } from 'solid-js';

const fetchData = async () => {
  return (
    await fetch(`https://api.github.com/repos/aidenybai/million`)
  ).json();
};

const { stargazers_count } = await fetchData();

export default function Stars() {
  const [data] = createResource(fetchData);

  return (
    <em>
      {' '}
      (
      {data.loading || data.error
        ? stargazers_count
        : data()?.stargazers_count}{' '}
      ★)
    </em>
  );
}
