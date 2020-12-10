/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
// eslint-disable-next-line
import React from 'react';
import {
  Button,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {
  Link,
} from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import r from '../assets/RV3.png';
// eslint-disable-next-line import/no-unresolved
import useStyles from './UseStyles';

interface SidedrawerProps {
  windowWidth: number,
  user: string|null,
  logout: () => void,
  handleMobileOpen: ((open: any) => void),
}

const Sidedrawer = (props: SidedrawerProps) => {
  const {
    windowWidth,
    user,
    logout,
    handleMobileOpen,
  } = props;
  const classes = useStyles();
  // const classes: any = useStyles();

  // const { toolbar, menuButton } = useStyles();

  return (
    <div style={{ width: windowWidth, tableLayout: 'auto' }}>
      <div className={classes.toolbar} />
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={() => handleMobileOpen(false)}
        className={classes.menuButton}
      >
        &nbsp;
        <img alt="R" src={r} height="50" width="50" />
        &nbsp;
        &nbsp;
        &nbsp;
        <CloseIcon />
        &nbsp;
        Close
      </IconButton>
      {user && (
      <div>
        <em>
          &nbsp;
          &nbsp;
          {user}
        </em>
        <br />
        <Button color="inherit" onClick={logout}>
          &nbsp;
          logout
        </Button>
      </div>
      )}
      <Divider />
      {user ? (
        <List onClick={() => handleMobileOpen(false)}>
          {['Home', 'Races', 'Add', 'Chat'].map((text) => (
            <ListItem key={text} component={Link} to={`/${text}`}>
              <ListItemText
                disableTypography
                primary={text}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <List onClick={() => handleMobileOpen(false)}>
          {['Home', 'Races', 'Add', 'Login', 'Chat'].map((text) => (
            <ListItem key={text} component={Link} to={`/${text}`}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};
export default Sidedrawer;
