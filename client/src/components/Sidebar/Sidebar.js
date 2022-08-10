import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import css from './s.module.scss';
import Icons from './components/Icons/Icons';
import FriendsList from './components/FriendsList/FriendsList';
import Nodes from './components/Nodes/Nodes';
import {
  friendsOpen as friendsOpenFn,
  nodesOpen as nodesOpenFn,
} from '../../features/user/userSlice';
import Add from './components/Add/Add';
import Profile from './components/Profile/Profile';
import NewNode from './components/NewNode/NewNode';

const Sidebar = () => {
  const [active, setActive] = useState('');
  const [addMsg, setAddMsg] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [socket, setSocket] = useState(false);
  const [nodes, setNodes] = useState([]);
  const [profileOpen, setProfileOpen] = useState(false);
  const [newNodeOpen, setNewNodeOpen] = useState(false);
  const friendsOpen = useSelector((state) => state.user.value).friendsOpen
    .payload;
  const nodesOpen = useSelector((state) => state.user.value).nodesOpen.payload;
  const dispatch = useDispatch();

  useEffect(() => {
    const path = window.location.pathname.split('/')[2];

    if (!path) return setActive('app');

    setActive(path);
  }, []);

  return (
    <>
      {addOpen && (
        <Add
          setAddOpen={() => setAddOpen(false)}
          socket={socket}
          msg={addMsg}
          setMsg={setAddMsg}
        />
      )}
      {profileOpen && <Profile closeProfile={() => setProfileOpen(false)} />}
      {newNodeOpen && (
        <NewNode
          closeNewNode={() => setNewNodeOpen(false)}
          setNodes={setNodes}
          nodes={nodes}
        />
      )}
      <FriendsList
        friendsOpen={friendsOpen}
        setAddOpen={() => setAddOpen(true)}
        setSocket={setSocket}
        socket={socket}
        setMsg={setAddMsg}
      />
      <Nodes
        nodesOpen={nodesOpen}
        setNewNodeOpen={() => setNewNodeOpen(true)}
        setNodes={setNodes}
        nodes={nodes}
      />
      <div className={css.sidebar}>
        <Icons
          active={active}
          friendsOpen={friendsOpen}
          nodesOpen={nodesOpen}
          setFriendsOpen={() => {
            dispatch(nodesOpenFn(false));
            dispatch(friendsOpenFn(!friendsOpen));
          }}
          setNodesOpen={() => {
            dispatch(friendsOpenFn(false));
            dispatch(nodesOpenFn(!nodesOpen));
          }}
          setProfileOpen={setProfileOpen}
        />
      </div>
    </>
  );
};

export default Sidebar;
