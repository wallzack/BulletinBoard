import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser } from '../../../redux/userRedux.js';
import clsx from 'clsx';
import styles from './Header.module.scss';
import { NavLink, Link } from 'react-router-dom';

const Component = ({ className, user }) => (
  <div >
    <nav className={clsx(className, styles.root)} >
      <Link /* className={styles.logo}  */ to="/">
        <h2>Bulletin Board</h2>
      </Link>
      <NavLink exact to="/" /* activeClassName={active} */>All posts</NavLink>
      {user.authenticated ? (
        <div>
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
  </div >
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