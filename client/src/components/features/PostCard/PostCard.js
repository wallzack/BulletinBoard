import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Col from 'react-bootstrap/Col';
import { IMAGES_URL } from '../../../config';
import Card from 'react-bootstrap/Card';
import { displayTime } from '../../../utils/displayTime';
import { NavLink } from 'react-router-dom';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './PostCard.module.scss';

const Component = (post, { className }) => (
  <Col xs={12} md={6} lg={4} key={post._id}>
    <div className={clsx(className, styles.root)}>
      <Card {...post} className={styles.ad}>
        <Card.Img
          className={styles.cardImage}
          variant="top"
          src={post.image ? `${IMAGES_URL}/${post.image}` : `${IMAGES_URL}/photo_null.jpg`}
        />
        <Card.Body>
          <Card.Title>
            <NavLink exact to={`/post/${post._id}`}>{post.title}</NavLink>
          </Card.Title>
          <Card.Text>
            &nbsp;{post.location}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">
            Published {displayTime(post.published)}
          </small>
        </Card.Footer>
      </Card>
    </div>
  </Col>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  post: PropTypes.object,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as PostCard,
  // Container as NotFound,
  Component as PostCardComponent,
};