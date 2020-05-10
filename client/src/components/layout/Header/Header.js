import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser } from '../../../redux/userRedux.js';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import clsx from 'clsx';
import styles from './Header.module.scss';

const Component = ({ className, user }) => (
  <div className={clsx(className, styles.root)}>
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        Bulletin Board
      </Navbar.Brand>
      {user.authenticated ? (
        <Nav className="mr-auto">
          <Nav.Link href={`/my-posts`}>
            My ads
          </Nav.Link>
          <Nav.Link href="/">
            Logout
          </Nav.Link>
        </Nav>
      ) :
        (
          <Nav className="mr-auto">
            <Nav.Link href="https://google.com">
              Login with Google
            </Nav.Link>
          </Nav>
        )}
    </Navbar>
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