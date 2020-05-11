import React from 'react';
import PropTypes from 'prop-types';
// import Fab from '@material-ui/core/Fab';
// import AddIcon from '@material-ui/icons/Add';
import Row from 'react-bootstrap/Row';
// import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../../../redux/userRedux.js';
import { getPostsByUser } from '../../../redux/postsRedux.js';
import { PostCard } from '../../features/PostCard/PostCard';
import clsx from 'clsx';
import { NotFound } from '../../views/NotFound/NotFound';
import styles from './MyPosts.module.scss';

const Component = ({ myPosts, className, user }) => {

  return (
    user.authenticated ? (
      <div className={clsx(className, styles.root)}>
        <Row>
          {myPosts.map(post => (
            <PostCard key={post._id} {...post} />
          ))}
        </Row>
      </div>
    ) :
      (
        <NotFound />
      )
  );
};

Component.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
  myPosts: PropTypes.array,
};

const mapStateToProps = state => ({
  user: getUser(state),
  myPosts: getPostsByUser(state),
});

const Container = connect(mapStateToProps, null)(Component);

export {
  // Component as MyPosts,
  Container as MyPosts,
  Component as MyPostsComponent,
};
