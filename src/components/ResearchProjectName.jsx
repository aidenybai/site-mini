import { createSignal } from 'solid-js';

export default function ResearchProjectName() {
  const getName = () => {
    const word = [
      'Novel',
      'ML',
      'Cancer',
      'Gynecologic',
      'Lymphomic',
      'Melanomic',
      'Deep Learning',
      'Medical',
      'Depressive',
      'Prostatic',
      'Computational',
      'Approach',
      'Drug',
      'Repositioning',
      'Optimizing',
      'COVID-19',
      'Future',
      'Mutations',
      'Predictions',
      'Genetics',
      'Infant',
      'Mortality',
      'Spacial',
      'Immune',
      'Variants',
      'Genetic',
      'Model',
      'Genome',
      'Diagnostic',
      'Exploring',
      'Machine Learning',
      'SARS-Cov-2',
      'Highly Accurate',
    ];
    const getWord = () =>
      word[Math.floor(Math.random() * word.length)];
    const sentenceArray = [...new Set(new Array(7).fill(0).map(getWord))];
    return `"${sentenceArray.join(' ')}"`;
  };
  const [name, setName] = createSignal(getName());
  return (
    <strong onClick={() => setName(getName())}>{name()}</strong>
  );
}
