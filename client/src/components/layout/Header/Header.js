import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser } from '../../../redux/userRedux.js';
import clsx from 'clsx';
import styles from './Header.module.scss';
import { NavLink, Link } from 'react-router-dom';
import DnsIcon from '@material-ui/icons/Dns';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

class Component extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    user: PropTypes.object,
  }

  state = {
    viewportMode: '',
    expanded: false,
  }

  checkWidth = () => {
    const mobile = '(max-width: 576px)';

    if (window.matchMedia(`${mobile}`).matches) {
      return 'mobile';
    } else {
      return 'desktop';
    }
  }

  componentDidMount() {
    this.setState({ viewportMode: this.checkWidth() });
  }

  componentDidUpdate() {
    window.addEventListener('resize', () => this.setState({ viewportMode: this.checkWidth() }));
  }
  render() {
    const { viewportMode, expanded } = this.state;
    const { user, className } = this.props;

    return (
      viewportMode === 'desktop' ? (
        <nav className={clsx(className, styles.root)} >
          <Link to="/">
            <h2><DnsIcon /></h2>
          </Link>
          {user.authenticated ? (
            <div>
              <Fab aria-label="add" size="small">
                <NavLink exact to="/post/add">
                  <AddIcon />
                </NavLink>
              </Fab>
              <NavLink exact to="/">All posts</NavLink>
              <NavLink exact to="/my-posts">My ads</NavLink>
              <NavLink exact to="/">Logout</NavLink>
            </div>
          ) :
            (
              <Link to="https://google.com">
                Login with Google
              </Link>
            )}
        </nav>
      ) : (
        <nav className={`${styles.rootMobile} ${expanded ? styles.active : ''}`}>
          <div className={styles.panel}>
            {user.authenticated ? (
              <IconButton
                onClick={() => expanded ? this.setState({ expanded: false }) : this.setState({ expanded: true })}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <a href="https://google.com">
                    Login with Google
              </a>)}
          </div>
          {user.authenticated ? (
            <div className={styles.list}>
              <List >
                <ListItem>
                  <NavLink
                    exact to="/post/add"
                    onClick={() => this.setState({ expanded: false })}
                  >
                      Add New Post
                  </NavLink>
                </ListItem>
                <ListItem>
                  <NavLink
                    exact to="/"
                    onClick={() => this.setState({ expanded: false })}
                  >
                      All posts
                  </NavLink>
                </ListItem>
                <ListItem>
                  <NavLink
                    exact to="/my-posts"
                    onClick={() => this.setState({ expanded: false })}
                  >
                      My ads
                  </NavLink>
                </ListItem>
                <ListItem>
                  <NavLink
                    exact to="/"
                    onClick={() => this.setState({ expanded: false })}
                  >
                      Logout
                  </NavLink>
                </ListItem>
              </List>
            </div>
          ) : ''}
        </nav>
      )
    );
  }
}

const mapStateToProps = state => ({
  user: getUser(state),
});

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Header,
  Container as Header,
  Component as HeaderComponent,
};
