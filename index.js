console.log(132);

const randomString = () => (Math.random() + 1).toString(36).substring(7);

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomLink = (host) => {
  if (host) {
    host = host.replace(/^(https?:\/\/)/, '');
  } else {
    host = randomString();
  }

  const url = new URL(`https://${host}`);
  const path = new Array(randomIntFromInterval(1, 3))
    .fill('')
    .map((el) => randomString())
    .join('/');

  url.pathname = path;

  return url.toString();
};

const replaceRandomLink = (replacer, text, host) => {
  const r = new RegExp(`(${replacer})`, 'i');

  while (r.test(text)) {
    text = text.replace(r, randomLink(host));
  }
  return text;
};

const app = () => {
  document.querySelector('#btn-submit').addEventListener('click', () => {
    const textEl = document.querySelector('#text');
    const template = document.querySelector('#template').value;
    const host = document.querySelector('#host').value;
    const newText = replaceRandomLink(template, textEl.value, host);
    textEl.value = newText;
    navigator.clipboard.writeText(newText);
    alert('Text added into clipboard');
  });
};
app();
