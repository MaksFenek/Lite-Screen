import React, { useRef, useState } from 'react';
import './PostCreator.scss';
import { Button, TextField } from '@material-ui/core';
import { createPost } from '../../../api/postsAPI';
import { putPostPhoto } from '../../../api/firebaseAPI';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export interface IPostCreator {
  id: string;
  author: string;
}

const PostCreator: React.FC<IPostCreator> = ({ id, author }) => {
  const [postPhoto, setPostPhoto] = useState<string>('');
  const [file, setFile] = useState<any>();

  const descriptionRef = useRef<HTMLInputElement>(null);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get image from input
    const photo = e.currentTarget.files![0];

    setFile(photo);
    let reader = new FileReader();
    reader.onload = function (ev: any) {
      setPostPhoto(ev.target.result);
    };
    reader.readAsDataURL(photo);
  };

  const handleCreate = () => {
    // Get the text from form
    const description = descriptionRef.current!.value;
    // Get current date
    const date = new Date().toString().split(' ').slice(1, 5);
    // Create id for photo through taking a time
    const photoId = new Date().getTime().toString();
    if (postPhoto) {
      // Put image in firebase storage
      return putPostPhoto(id, file, photoId).then((photo) => {
        // Get download url
        photo.ref.getDownloadURL().then((url) => {
          // Create new post
          createPost(id, author, description, date, url);
          // Make form empty
          descriptionRef.current!.value = '';
          setPostPhoto('');
        });
      });
    } else {
      createPost(id, author, description, date);
      descriptionRef.current!.value = '';
      setPostPhoto('');
    }
  };
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography>Create post</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className='post-creator'>
            <div className='post-creator-photo'>
              <div className='image'>
                <img
                  src={
                    postPhoto ||
                    'https://www.exclusivehomedesign.it/wp-content/uploads/2018/07/noPhoto.png'
                  }
                  alt=''
                />
              </div>

              <input
                accept='image/*'
                className='img-input'
                id='button-file'
                type='file'
                onChange={handlePhoto}
              />
              <label htmlFor='button-file'>
                <Button variant='contained' color='primary' component='span'>
                  Upload
                </Button>
              </label>
            </div>

            <div className='post-creator-editor'>
              <TextField
                id='standard-basic'
                label='Content'
                multiline
                rowsMax='7'
                fullWidth
                inputRef={descriptionRef}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <div className='post-creator-btn'>
                <Button
                  variant='contained'
                  color='secondary'
                  component='span'
                  onClick={handleCreate}
                >
                  Create post
                </Button>
              </div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default PostCreator;
