// React
import React from 'react';

// Styles and material ui
import './MessagesList.scss';

// Components
import UserChatItem from '../../components/UserChatItem/UserChatItem';

export default function Messages() {
  return (
    <section className='main'>
      <div className='container'>
        <UserChatItem
          id={'lJFZuJB1auOwDlHDt93wQoMKqox1'}
          name={'Arthur moore'}
          photo={
            'https://firebasestorage.googleapis.com/v0/b/lite-screen.appspot.com/o/users%2FlJFZuJB1auOwDlHDt93wQoMKqox1%2Fphoto?alt=media&token=7719778c-4b40-4755-bbca-4df7237b4eca'
          }
        />
      </div>
    </section>
  );
}
