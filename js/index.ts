const diff = new Date().getTime() - new Date('January 5, 2005').getTime();
const age = (diff / 1000 / 60 / 60 / 24 / 365).toFixed(3);
document.querySelector<HTMLElement>('#age').textContent = String(age);
