// React
import React, { useCallback, useState } from 'react';
import { IReply } from '../../../containers/MessagesList/Chat/Chat';

// Components
import './Message.scss';
import { Menu, MenuItem } from '@material-ui/core';
import moment from 'moment';

// ==== TypeScript ====
interface IMessage {
  currentUserId: string;
  text: string;
  date: string;
  author: string;
  userId: string;
  answerId: number;
  reply?: IReply;
  name: string;
  setReply: any;
  deleteMessage: any;
}

const Message: React.FC<IMessage> = ({
  text,
  date,
  author,
  answerId,
  userId,
  reply,
  name,
  setReply,
  currentUserId,
  deleteMessage,
}) => {
  // Create state for menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>): void => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl]
  );
  const handleClose = useCallback((): void => {
    setAnchorEl(null);
  }, [setAnchorEl]);
  const handleDelete = useCallback((): void => {
    deleteMessage(answerId, userId!, author, date, text, reply);
    handleClose();
  }, [deleteMessage, answerId, userId, author, date, text, reply, handleClose]);

  const handleReply = useCallback((): void => {
    currentUserId === author
      ? setReply({ text, answerId, date, author: 'you' })
      : setReply({ text, answerId, date, author: 'friend' });
    handleClose();
  }, [currentUserId, author, setReply, text, answerId, date, handleClose]);

  return (
    <>
      <div
        aria-label='message'
        className={currentUserId === author ? 'message own' : 'message'}
        onClick={handleClick}>
        {reply && (
          <div className='reply'>
            {reply.author === 'you' ? (
              <h3 aria-label='reply-author'>You:</h3>
            ) : (
              <h3 aria-label='reply-author'>{name}:</h3>
            )}
            <p aria-label='reply-text'>
              {reply?.text.substring(0, 60)}
              {reply?.text.length > 60 && '....'}
            </p>
          </div>
        )}
        <p aria-label='message-text'>{text}</p>
        <span aria-label='message-date'>{moment(date).format('hh:mm')}</span>
      </div>
      <Menu
        aria-label='menu'
        keepMounted
        id='simple-menu'
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <MenuItem onClick={handleReply} aria-label='reply'>
          {' '}
          Reply{' '}
        </MenuItem>
        <MenuItem onClick={handleDelete} aria-label='delete'>
          {' '}
          Delete{' '}
        </MenuItem>
      </Menu>
    </>
  );
};

export default React.memo(Message);
