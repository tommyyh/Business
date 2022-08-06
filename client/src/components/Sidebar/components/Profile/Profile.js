import React, { useState, useEffect } from 'react';
import css from './p.module.scss';
import { get, post } from '../../../../lib/axios';
import defaultPic from '../../../../assets/img/user.png';
import Loading from '../../../Loading/Loading';
import { useSelector, useDispatch } from 'react-redux';
import { setProfilePic } from '../../../../features/user/userSlice';
import { v4 } from 'uuid';

const Profile = ({ closeProfile }) => {
  const [userInfo, setUserInfo] = useState({
    profilePic: '',
    name: '',
    surname: '',
    username: '',
    email: '',
    dob: '',
    password: '',
    confirmPassword: '',
    livesIn: '',
  });
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [msg, setMsg] = useState('');
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserInfo = async (username) => {
      const res = await get(`/user/user-info/${username}/`);
      const {
        name,
        surname,
        username: fetchedUsername,
        email,
        dob,
        profile_pic,
        lives_in,
      } = res.data.data;

      setUserInfo({
        profilePic: '',
        name,
        surname,
        username: fetchedUsername,
        email,
        dob,
        password: '',
        confirmPassword: '',
        livesIn: lives_in,
      });

      if (profile_pic) {
        setPreview(profile_pic);
      }

      setLoading(false);
    };

    fetchUserInfo(user.username.payload);
  }, []);

  useEffect(() => {
    // Show preview of an image when the image state changes
    if (userInfo.profilePic) {
      const image = userInfo.profilePic;

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
  }, [showPreview]);

  const updateProfile = async () => {
    setMsg('');

    const data = new FormData();
    const profilePic = userInfo.profilePic;
    const newFile = renameFile(profilePic, v4());

    data.append('profileImg', newFile);
    data.append('livesIn', userInfo.livesIn);
    data.append('name', userInfo.name);
    data.append('surname', userInfo.surname);
    data.append('username', userInfo.username);
    data.append('email', userInfo.email);
    data.append('dob', userInfo.dob);
    data.append('password', userInfo.password);
    data.append('confirmPassword', userInfo.confirmPassword);

    const res = await post(`/user/update/${user.username.payload}/`, data);

    if (res.data.status === 400) {
      setMsg(res.data.msg);

      return;
    }

    const { name, surname, username, email, dob, profile_pic } = res.data.data;

    // Update profile info
    setUserInfo({
      ...userInfo,
      profilePic: '',
      name,
      surname,
      username,
      email,
      dob,
    });

    if (profile_pic) {
      setPreview(profile_pic);
      dispatch(setProfilePic(profile_pic));
    }
  };

  const deleteProfilePic = () => {
    // Convert Base64 to file -> send to server as default pic after registering
    const dataURLtoFile = (dataurl, filename) => {
      let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, { type: mime });
    };

    const defaultPicFile = dataURLtoFile(defaultPic, 'default_pic.png');

    setPreview(defaultPic);
    setUserInfo({
      ...userInfo,
      profilePic: defaultPicFile,
    });
  };

  const renameFile = (originalFile, newName) => {
    // NEEDS REFACTORING
    if (userInfo.profilePic && userInfo.profilePic.name !== 'default_pic.png') {
      const extension = originalFile.name.slice(
        ((originalFile.name.lastIndexOf('.') - 1) >>> 0) + 2
      );

      return new File([originalFile], `${newName}.${extension}`, {
        type: originalFile.type,
        lastModified: originalFile.lastModified,
      });
    } else if (
      userInfo.profilePic &&
      userInfo.profilePic.name === 'default_pic.png'
    ) {
      return originalFile;
    } else {
      return;
    }
  };

  if (loading)
    return (
      <div className={css.profile}>
        <div className={css.profile_inner}>
          <Loading />
        </div>
      </div>
    );

  return (
    <div className={css.profile}>
      <div className={css.profile_inner}>
        <h4 onClick={closeProfile}>Close</h4>
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
              setUserInfo({
                ...userInfo,
                profilePic: file,
              });
              setShowPreview(true);
            } else {
              setUserInfo({ ...userInfo, profilePic: '' });
            }
          }}
        />
        <button onClick={deleteProfilePic}>Delete profile picture</button>
        <div>
          <label>First Name</label>
          <input
            type='text'
            placeholder={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            value={userInfo.name}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type='text'
            placeholder={userInfo.surname}
            onChange={(e) =>
              setUserInfo({ ...userInfo, surname: e.target.value })
            }
            value={userInfo.surname}
          />
        </div>
        <div>
          <label>Date of Birth</label>
          <input
            type='date'
            onChange={(e) => setUserInfo({ ...userInfo, dob: e.target.value })}
          />
        </div>
        <div>
          <label>Username</label>
          <input
            type='text'
            placeholder={userInfo.username}
            onKeyPress={(event) => {
              if (!/^[a-zA-Z0-9_]*$/.test(event.key)) {
                event.preventDefault();
              }
            }}
            value={userInfo.username}
            onChange={(e) =>
              setUserInfo({ ...userInfo, username: e.target.value })
            }
          />
        </div>
        <div>
          <label>Email Address</label>
          <input
            type='text'
            placeholder={userInfo.email}
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
            value={userInfo.email}
          />
        </div>
        <div>
          <label>Place of living</label>
          <input
            type='text'
            placeholder={userInfo.livesIn}
            onChange={(e) =>
              setUserInfo({ ...userInfo, livesIn: e.target.value })
            }
            value={userInfo.livesIn}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            placeholder='Password'
            onChange={(e) =>
              setUserInfo({ ...userInfo, password: e.target.value })
            }
            value={userInfo.password}
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type='password'
            placeholder='Confirm Password'
            onChange={(e) =>
              setUserInfo({ ...userInfo, confirm: e.target.value })
            }
            value={userInfo.confirm}
          />
        </div>

        <button onClick={updateProfile}>Save</button>

        {msg && <p>{msg}</p>}
      </div>
    </div>
  );
};

export default Profile;
