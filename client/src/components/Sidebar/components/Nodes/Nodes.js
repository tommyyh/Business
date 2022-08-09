import React from 'react';
import css from './n.module.scss';
import defaultPic from '../../../../assets/img/user.png';
import { v4 } from 'uuid';

const Nodes = ({ nodesOpen }) => {
  return (
    <div
      className={
        nodesOpen ? `${css.nodes_list} ${css.nodes_list_open}` : css.nodes_list
      }
    >
      <div>
        <p>Add</p>
      </div>

      <Node key={v4()} node={{ profile_pic: defaultPic }} />
      <Node key={v4()} node={{ profile_pic: defaultPic }} />
      <Node key={v4()} node={{ profile_pic: defaultPic }} />
    </div>
  );
};

export default Nodes;

const Node = ({ node }) => {
  return <img src={node.profile_pic} alt='user profile' className={css.node} />;
};
