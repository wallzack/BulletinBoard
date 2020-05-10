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

const Component = ({ className, user }) => (
  <nav className={clsx(className, styles.root)} >
    <Link /* className={styles.logo}  */ to="/">
      <h2><DnsIcon /></h2>
    </Link>
    {user.authenticated ? (
      <div>
        <Fab aria-label="add" size="small">
          <NavLink exact to="/post/add">
            <AddIcon />
          </NavLink>
        </Fab>
        <NavLink exact to="/" /* activeClassName={active} */>All posts</NavLink>
        <NavLink exact to="/my-posts" /* activeClassName={active} */>My ads</NavLink>
        <NavLink exact to="/">Logout</NavLink>
      </div>
    ) :
      (
        <Link to="https://google.com"/* className={styles.logo} to={home.path} */>
          Login with Google
        </Link>
      )}
  </nav>
);

Component.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: getUser(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Header,
  Container as Header,
  Component as HeaderComponent,
};