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
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';

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

  const [liked, setLiked] =React.useState(false)

  const handleLike =()=> {
    likePost(id, userId)
    setLiked(true)
  }

  return (
    <Card className='user-post'>
      <CardHeader
        avatar={
          <Link to={`/users/${author}`}>
            <Avatar src={authorPhoto} />
          </Link>
        }
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
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
        <IconButton aria-label='share'>
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Post;
