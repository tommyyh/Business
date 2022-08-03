import { get } from '../lib/axios';

export const getFriendsList = async () => {
  const res = await get('/user/friends-list/');
  const { data, status, username } = res.data;

  if (status !== 200) return; // ERROR

  const array1 = [];
  const array2 = [];
  const array3 = [];

  data.forEach((x) => {
    array1.push(x.user);
  });
  array1.forEach((y) => {
    array2.push(y);
  });
  array2.forEach((q) =>
    array3.push(q.filter((f) => f.username !== username)[0])
  );

  return array3;
};
