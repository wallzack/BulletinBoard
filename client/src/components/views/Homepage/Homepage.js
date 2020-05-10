import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Row from 'react-bootstrap/Row';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../../../redux/userRedux.js';
import { getAll } from '../../../redux/postsRedux.js';
import { PostCard } from '../../features/PostCard/PostCard';
import clsx from 'clsx';

import styles from './Homepage.module.scss';

const Component = ({ posts, className, user }) => {

  return (
    <div className={clsx(className, styles.root)}>
      {user.authenticated ? (
        <Fab color="primary" aria-label="add">
          <NavLink exact to="/post/add">
            <AddIcon />
          </NavLink>
        </Fab>
      ) : ''}
      <Row>
        {posts.map(post => (
          <PostCard key={post._id} {...post} />
        ))}
      </Row>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
  posts: PropTypes.array,
};

const mapStateToProps = state => ({
  user: getUser(state),
  posts: getAll(state),
});

const Container = connect(mapStateToProps, null)(Component);

export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};