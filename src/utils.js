export const delay = (ms) => (content) =>
  new Promise((res, rej) => setTimeout(() => res(content), ms));
