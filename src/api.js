import { Task } from './Task';
import Future, { chain, map, fork } from 'fluture';

// Cancellable fetch using Futures
const futureFetch = (url) =>
  Future((rej, res) => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch(url, {
      method: 'get',
      signal: signal,
    })
      .then(res)
      .catch(rej);
    return () => controller.abort();
  });

const fetchFromApi = (url) =>
  Task((rej, res) =>
    fetch(url)
      .then((x) => x.json())
      .then(res)
      .catch(rej)
  );

const getStuffUsingTask = (url, setResult) =>
  fetchFromApi(url)
    .map((res) => res?.response?.data?.[0] ?? "can't parse")
    .fork(console.error, setResult);

const getCancellableFuture = (url, setResult) =>
  futureFetch(url)
    .pipe(
      chain((x) =>
        Future((rej, res) => {
          x.json().then(res).catch(rej);
          return () => {};
        })
      )
    )
    .pipe(map((res) => res?.origin ?? "can't parse"))
    .pipe(fork(console.error)(setResult));

export { fetchFromApi, futureFetch, getCancellableFuture, getStuffUsingTask };
