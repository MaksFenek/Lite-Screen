// React
import React, { useState } from 'react';
import { IReply } from '../../../containers/MessagesList/Chat/Chat';

// Components
import './Message.scss';
import { Menu, MenuItem } from '@material-ui/core';

// API
import { auth } from '../../../api/firebaseAPI';
import { deleteMessage } from '../../../api/messagesAPI';

// ==== TypeScript ====
interface IMessage {
  text: string;
  date: string;
  author: string;
  userId:string
  answerId: number;
  reply?: IReply;
  name: string;
  setReply: any
  deleteMessage: any
}

const Message: React.FC<IMessage> = ({ text, date, author, answerId,userId, reply,name, setReply }) => {

  // Create state for menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    deleteMessage(answerId, userId!, author, date, text, reply)
    handleClose()
  }

  const handleReply = ():void => {
    currentUserId === author ? setReply({text, answerId, date, author:'you'}) : setReply({text, answerId, date, author:'friend'})
    
    handleClose()
  }
  const currentUserId = auth.currentUser?.uid;
  return (<>
    <div data-testid='message' className={currentUserId === author ? 'message own' : 'message'} onClick={handleClick}>
      {reply && 
        <div className='reply'>
          {reply.author === 'you' ? <h3>You:</h3> : <h3>{name}:</h3>}
          <p data-testid='message-text'>{reply?.text.substring(0,60)}{reply?.text.length > 60 && '....'}</p>
      </div>
      }
      <p data-testid='message-text'>{text}</p>
      <span data-testid='message-date'>{date}</span>
    </div>
    <Menu
      keepMounted
      id='simple-menu'
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleReply}> Reply </MenuItem>      
      <MenuItem onClick={handleDelete}> Delete </MenuItem>
    </Menu>
    </>
  );
};

export default React.memo(Message);
