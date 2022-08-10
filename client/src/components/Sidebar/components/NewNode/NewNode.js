import React, { useState, useEffect } from 'react';
import css from './n.module.scss';
import { post } from '../../../../lib/axios';
import Loading from '../../../Loading/Loading';
import { useSelector } from 'react-redux';
import { v4 } from 'uuid';

const NewNode = ({ closeNewNode, setNodes, nodes }) => {
  const [newNode, setNewNode] = useState({
    name: '',
    node_pic: '',
  });
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    // Show preview of an image when the image state changes
    if (newNode.node_pic) {
      const image = newNode.node_pic;

      if (image) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(image);
      } else {
        setPreview('');
      }
    }
  }, [newNode.node_pic]);

  const createNode = async () => {
    setMsg('');

    if (!newNode.name) {
      return setMsg('Please enter a name');
    }

    if (!newNode.node_pic) {
      return setMsg('Please enter an image');
    }

    const data = new FormData();
    const nodePic = newNode.node_pic;
    const newFile = renameFile(nodePic, v4());

    data.append('node_pic', newFile);
    data.append('name', newNode.name);

    const res = await post(`/node/new/`, data);

    if (res.data.status === 400) {
      setMsg(res.data.msg);

      return;
    }

    setNodes([...nodes, res.data.data]);
  };

  const renameFile = (originalFile, newName) => {
    // NEEDS REFACTORING
    if (newNode.node_pic && newNode.node_pic.name !== 'default_pic.png') {
      const extension = originalFile.name.slice(
        ((originalFile.name.lastIndexOf('.') - 1) >>> 0) + 2
      );

      return new File([originalFile], `${newName}.${extension}`, {
        type: originalFile.type,
        lastModified: originalFile.lastModified,
      });
    } else if (
      newNode.node_pic &&
      newNode.node_pic.name === 'default_pic.png'
    ) {
      return originalFile;
    } else {
      return;
    }
  };

  if (loading)
    return (
      <div className={css.new_node}>
        <div className={css.new_node}>
          <Loading />
        </div>
      </div>
    );

  return (
    <div className={css.new_node}>
      <div className={css.new_node_inner}>
        <h4 onClick={closeNewNode}>Close</h4>
        <img
          src={preview && preview}
          className={css.preview}
          alt='User profile'
        />
        <input
          type='file'
          accept='image/*'
          onChange={(e) => {
            const file = e.target.files[0];

            if (file && file.type.split('/')[0] === 'image') {
              setNewNode({
                ...newNode,
                node_pic: file,
              });
            } else {
              setNewNode({ ...newNode, node_pic: '' });
            }
          }}
        />
        <div>
          <label>Node Name</label>
          <input
            type='text'
            placeholder={`${user.name.payload}'s node`}
            onChange={(e) => setNewNode({ ...newNode, name: e.target.value })}
            value={newNode.name}
          />
        </div>

        <button onClick={createNode}>Create Node</button>

        {msg && <p>{msg}</p>}
      </div>
    </div>
  );
};

export default NewNode;
