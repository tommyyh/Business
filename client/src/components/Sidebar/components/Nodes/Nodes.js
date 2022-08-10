import React, { useEffect, useState } from 'react';
import css from './n.module.scss';
import defaultPic from '../../../../assets/img/user.png';
import { v4 } from 'uuid';
import { get } from '../../../../lib/axios';
import Loading from '../../../Loading/Loading';

const Nodes = ({ nodesOpen, setNewNodeOpen, setNodes, nodes }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await get('/node/my-nodes/');
      const { status, data } = res.data;

      if (status !== 200) return;

      setNodes(data);
    })();

    setLoading(false);
  }, []);

  if (loading)
    return (
      <div
        className={
          nodesOpen
            ? `${css.nodes_list} ${css.nodes_list_open}`
            : css.nodes_list
        }
      >
        <Loading />
      </div>
    );

  return (
    <div
      className={
        nodesOpen ? `${css.nodes_list} ${css.nodes_list_open}` : css.nodes_list
      }
    >
      <div onClick={setNewNodeOpen}>
        <p>Add</p>
      </div>

      {nodes.map((node) => (
        <Node key={v4()} node={node} />
      ))}
    </div>
  );
};

export default Nodes;

const Node = ({ node }) => {
  return (
    <div>
      <img src={node.node_pic} alt='user profile' className={css.node} />
      <p>{node.name}</p>
    </div>
  );
};
