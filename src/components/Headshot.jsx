export default function Headshot({ init, img, show }) {
  if (!show) return null;
  const color = stringToColor(init);
  return img ? (
    <img alt="image" class="headshot" src={img} loading="lazy" decoding="async" />
  ) : (
    <a href="/" class="headshot">
      <div class="headshot" style={{ 'background-color': color }}></div>
    </a>
  );
}

export const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let hex = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    hex += `00${value.toString(16)}`.substr(-2);
  }
  return hex;
};
