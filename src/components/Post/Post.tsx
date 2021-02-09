import React, { useCallback, useEffect } from 'react';

// Styles and material ui
import Avatar from '@material-ui/core/Avatar';
import './Post.scss';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SendIcon from '@material-ui/icons/Send';
import { Link } from 'react-router-dom';
import { InputBase, Menu, MenuItem, Paper } from '@material-ui/core';
import moment from 'moment';
export interface IPost {
  photo: string;
  authorPhoto: string;
  name: string;
  content: any;
  likes: string[];
  comments: any[];
  author: string;
  date: number;
  likePost?: any;
  unlikePost?: any;
  id: string;
  userId?: string;
  commentPost?: any;
  deletePost?: any;
}

const Post: React.FC<IPost> = ({
  photo,
  name,
  comments,
  content,
  likes,
  author,
  likePost,
  unlikePost,
  authorPhoto,
  date,
  id,
  userId,
  commentPost,
  deletePost,
}) => {
  const [liked, setLiked] = React.useState(false);

  const [likesList, setLikesList] = React.useState<string[]>([]);

  const [openComments, setOpenComments] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  useEffect(() => {
    if (likesList?.find((like) => like === userId)) {
      setLiked(true);
    }
  }, [likesList, setLiked, userId]);

  useEffect(() => {
    setLikesList(likes);
  }, [likes, setLikesList]);

  const handleMenu = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      setAnchorEl(e.currentTarget);
    },
    []
  );

  const handleClose = useCallback((): void => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const handleDelete = useCallback((): void => {
    deletePost(id);
    handleClose();
  }, [id, deletePost, handleClose]);

  const handleLike = useCallback((): void => {
    if (!liked || !likes.find((like) => like === userId)) {
      likePost(id, userId);
      setLiked(true);
      likesList?.push(userId!);
    } else {
      unlikePost(id, userId);
      setLiked(false);
      setLikesList((prev) => prev?.filter((like) => like !== userId));
    }
  }, [id, userId, likePost, setLiked, unlikePost, liked, likes, likesList]);

  const handleOpenComments = useCallback((): void => {
    setOpenComments((value) => !value);
  }, []);

  const handleClick = useCallback((): void => {
    if (inputRef.current!.value) {
      commentPost(userId!, id, inputRef.current!.value);
      inputRef.current!.value = '';
    }
  }, [inputRef.current?.value, id, commentPost, userId]);

  const handlePress = useCallback(
    (e: React.KeyboardEvent): void => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleClick();
      }
    },
    [handleClick]
  );

  return (
    <>
      <Card className='user-post'>
        <CardHeader
          avatar={
            <Link to={`/users/${author}`}>
              <Avatar src={authorPhoto} imgProps={{ 'aria-label': 'avatar' }} />
            </Link>
          }
          action={
            <>
              <IconButton
                aria-controls='simple-menu'
                aria-haspopup='true'
                aria-label='menu'
                onClick={handleMenu}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                keepMounted
                id='simple-menu'
                aria-label='menu-window'
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                {author === userId && (
                  <MenuItem onClick={handleDelete} aria-label='menu-delete'>
                    Delete
                  </MenuItem>
                )}
              </Menu>
            </>
          }
          title={name}
          titleTypographyProps={{ 'aria-label': 'title' }}
          subheader={moment(date).format('DD MMM hh:mm:ss YYYY')}
          subheaderTypographyProps={{ 'aria-label': 'date' }}
        />
        {photo && (
          <CardMedia
            image={photo}
            component='img'
            className='user-post-photo'
          />
        )}

        <CardContent>
          <Typography
            variant='h5'
            color='textPrimary'
            component='p'
            aria-label='content'>
            {content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <p aria-label='likes'>{likesList?.length || 0}</p>

          <IconButton
            color={liked ? 'secondary' : 'inherit'}
            onClick={handleLike}
            aria-label='addToFavorites'
            style={{ marginRight: '20px' }}>
            <FavoriteIcon />
          </IconButton>
          <p aria-label='comments'>{comments.length}</p>

          <IconButton aria-label='btn-comments' onClick={handleOpenComments}>
            <CommentIcon />
          </IconButton>
        </CardActions>
      </Card>
      {openComments && (
        <Paper elevation={2} className='comments' aria-label='comments-paper'>
          {comments.length === 0 ? (
            <p> There is no comments</p>
          ) : (
            comments.map((comment, index) => (
              <div key={index} className='comment' aria-label='comment-item'>
                <Link to={`/users/${comment.author}`}>
                  <Avatar
                    src={comment.authorPhoto}
                    imgProps={{ 'aria-label': 'comment-avatar' }}
                  />
                </Link>
                <p aria-label='comment-text'>{comment.text}</p>
                <span aria-label='comment-date'>{comment.date}</span>
              </div>
            ))
          )}
          <div className='comments-input'>
            <InputBase
              inputComponent='input'
              autoFocus
              onKeyPress={handlePress}
              multiline
              rowsMax='2'
              inputRef={inputRef}
              className='comments-input-field'
              placeholder='Write a comment'
              inputProps={{ 'aria-label': 'input' }}
            />

            <SendIcon
              className='comments-input-icon'
              onClick={handleClick}
              aria-label='btn-send'
            />
          </div>
        </Paper>
      )}
    </>
  );
};

export default React.memo(Post);
