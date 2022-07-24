import axios from 'axios';

export const get = async (url) => {
  const res = await axios.get(url);

  return res;
};

export const post = async (url, body) => {
  const res = await axios.post(url, body);

  return res;
};

export const del = async (url) => {
  const res = await axios.delete(url);

  return res;
};

export const put = async (url, body) => {
  const res = await axios.put(url, body);

  return res;
};
