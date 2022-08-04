import React, { useState } from 'react';

const Layout = ({ socket, user, id }) => {
  const [messageContent, setMessageContent] = useState('');

  // useEffect(() => {
  //   const keyEnter = (event) => {
  //     if (event.key === 'Enter') {
  //       event.preventDefault();
  //       sendMessage();
  //     }
  //   };

  //   document.addEventListener('keydown', keyEnter);

  //   return () => {
  //     document.removeEventListener('keydown', keyEnter);
  //   };
  // }, []);

  const sendMessage = () => {
    if (socket.readyState === 1) {
      socket.send(
        JSON.stringify({
          message: messageContent,
          profilePic: user.profilePic.payload,
          name: user.name.payload,
          surname: user.surname.payload,
          username: user.username.payload,
          sentAt: new Date(),
          roomId: id,
        })
      );

      setMessageContent('');
    }
  };

  return (
    <div>
      <textarea
        cols='30'
        rows='10'
        placeholder='Your Message'
        onChange={(e) => setMessageContent(e.target.value)}
        value={messageContent}
      ></textarea>
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Layout;
