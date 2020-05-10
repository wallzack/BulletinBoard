import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './NotFound.module.scss';

const Component = ({ className }) => (
  <div className={clsx(className, styles.root)}>
    <Fab>
      <NavLink exact to={`/`}>
        <ArrowBackIcon />
      </NavLink>
    </Fab>
    <img
      alt="ooops"
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTqN1XZSBIbUjDqodj2ez8ouyD5YfnUsJgjk8d4FMLKRdb9ld5W"
    />
    <p>Page has not been found</p>
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as NotFound,
  // Container as NotFound,
  Component as NotFoundComponent,
};
