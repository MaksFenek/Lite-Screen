// React
import React from 'react';

// Styles and material ui
import '../../Styles/User/Sidebar.scss';
import { ListItem, ListItemIcon, ListItemText, List } from '@material-ui/core';
import QuestionAnswerRoundedIcon from '@material-ui/icons/QuestionAnswerRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import LibraryBooksRoundedIcon from '@material-ui/icons/LibraryBooksRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  // Get window width
  const width: number = window.innerWidth;

  return (
    <div>
      {
        // If window width is more than 1080px then render sidebar
        width >= 1080 ? (
          <div className='sidebar'>
            <List component='nav'>
              <Link to='/'>
                <ListItem button divider>
                  <ListItemIcon>
                    <LibraryBooksRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary='News' />
                </ListItem>
              </Link>
              <ListItem button divider>
                <ListItemIcon>
                  <QuestionAnswerRoundedIcon />
                </ListItemIcon>
                <ListItemText primary='Messages' />
              </ListItem>
              <ListItem button divider>
                <ListItemIcon>
                  <PeopleAltRoundedIcon />
                </ListItemIcon>
                <ListItemText primary='Friends' />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <SettingsRoundedIcon />
                </ListItemIcon>
                <ListItemText primary='Setting' />
              </ListItem>
            </List>
          </div>
        ) : (
          // If width is less than 1080 we render menu list
          <List className='open-list' component='nav'>
            <Link to='/'>
              <ListItem button divider>
                <ListItemIcon>
                  <LibraryBooksRoundedIcon />
                </ListItemIcon>
                <ListItemText primary='News' />
              </ListItem>
            </Link>
            <ListItem button divider>
              <ListItemIcon>
                <QuestionAnswerRoundedIcon />
              </ListItemIcon>
              <ListItemText primary='Messages' />
            </ListItem>
            <ListItem button divider>
              <ListItemIcon>
                <PeopleAltRoundedIcon />
              </ListItemIcon>
              <ListItemText primary='Friends' />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <SettingsRoundedIcon />
              </ListItemIcon>
              <ListItemText primary='Setting' />
            </ListItem>
          </List>
        )
      }
    </div>
  );
}
