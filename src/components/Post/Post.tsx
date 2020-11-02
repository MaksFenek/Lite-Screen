import React from 'react';

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
import { commentPost, deletePost } from '../../api/postsAPI';

export interface IPost {
  photo: string;
  authorPhoto: string;
  name: string;
  content: any;
  likes: string[];
  comments: any[];
  author: string;
  date: string[];
  likePost?: any
  id: string;
  userId?:string
}

const Post: React.FC<IPost> = ({
  photo,
  name,
  comments,
  content,
  likes,
  author,
  likePost,
  authorPhoto,
  date,
  id,
  userId
}) => {

  const [liked, setLiked] = React.useState(false)

  const [openComments, setOpenComments] = React.useState(false)

  const inputRef = React.useRef<HTMLInputElement>(null);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    deletePost(id)
    handleClose()
  }

  const handleLike =()=> {
    likePost(id, userId)
    setLiked(true)
  }

  const handleOpenComments =()=> {
    setOpenComments(value => !value)
  }

  const handleClick = () => {

    if (inputRef.current!.value !== '') {
      commentPost(userId!, id, inputRef.current!.value)
      inputRef.current!.value = '';
    }
  };

  const handlePress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleClick();
    }
  };

  return (<>
    <Card className='user-post'>
      <CardHeader
        avatar={
          <Link to={`/users/${author}`}>
            <Avatar src={authorPhoto} />
          </Link>
        }
        action={
          <><IconButton
          aria-controls='simple-menu'
          aria-haspopup='true'
          onClick={handleMenu}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          keepMounted
          id='simple-menu'
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {author === userId && <>
          <MenuItem onClick={handleDelete}>Delete</MenuItem></>}

          {author !== userId && <MenuItem onClick={handleClose}>Report</MenuItem>}
            
          
          
        </Menu></>
          
        }
        title={name}
        subheader={`${date[3]} ${date[0]} ${date[1]}, ${date[2]}`}
      />
      {photo && (
        <CardMedia image={photo} component='img' className='user-post-photo' />
      )}

      <CardContent>
        <Typography variant='h5' color='textPrimary' component='p'>
          {content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {likes.length}
        <IconButton
        color={likes.find(like=> like === userId) || liked ? 'secondary' : 'inherit'}
          onClick={handleLike}
          aria-label='add to favorites'
          style={{ marginRight: '20px' }}
        >
          <FavoriteIcon />
        </IconButton>
        {comments.length}
        
        <IconButton aria-label='comments' onClick={handleOpenComments}>
          <CommentIcon />
        </IconButton>
      </CardActions>
      
    </Card>
    {openComments && 
    <Paper elevation={2} className='comments'>
      {comments.length === 0 ? <p>  There is no comments</p> : comments.map(comment => <div className='comment'>
        <Link to={`/users/${comment.author}`}><Avatar src={comment.authorPhoto}/></Link>
        <p>{comment.text}</p><span>{comment.date}</span>

      </div>)}<div className='comments-input' >
        <InputBase
              autoFocus
              onKeyPress={handlePress}
              multiline
              rowsMax='2'
              inputRef={inputRef}
              className='comments-input-field'
              placeholder='Write a comment'
              inputProps={{ 'aria-label': 'write' }}
            />
            
              <SendIcon className='comments-input-icon' onClick={handleClick}/>
            </div>
      </Paper>
    }
    
       </>
  );
};

export default Post;
