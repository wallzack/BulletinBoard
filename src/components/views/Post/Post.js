import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { connect } from 'react-redux';
import { getPostById } from '../../../redux/postsRedux.js';
import { getUser } from '../../../redux/userRedux.js';

import styles from './Post.module.scss';

const Component = ({ className, post, user }) => (
  <div className={clsx(className, styles.root)}>
    {user.id === post.user.id ? (<Button className="m-3" href={`/post/${post.id}/edit`} variant="dark">Edit post</Button>) : ''}
    <Card>
      <Card.Header>{post.title}</Card.Header>
      <Card.Img className={styles.postImage} variant="top" src={post.image} />
      <Card.Subtitle className="mt-2 text-muted">{post.price}</Card.Subtitle>
      <Card.Subtitle className="mt-2">Status: {post.status}</Card.Subtitle>
      <Card.Body>
        <Card.Text>
          {post.content}
        </Card.Text>
        <ul className={styles.postDetailsList}>
          <li className={styles.postDetail}>
            <small>Location</small>
            <p>&nbsp;{post.location}</p>
          </li>
          <li className={styles.postDetail}>
            <small>Phone</small>
            <p>&nbsp;{post.phone}</p>
          </li>
          <li className={styles.postDetail}>
            <small>E-mail</small>
            <p>{post.email}</p>
          </li>
        </ul>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Last update {post.updated}</small>
        <small className="text-muted">Published {post.published}</small>
      </Card.Footer>
    </Card>
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
  post: PropTypes.object,
  user: PropTypes.object,
};

const mapStateToProps = (state, props) => ({
  post: getPostById(state, props.match.params.id),
  user: getUser(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Post,
  Container as Post,
  Component as PostComponent,
};