import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Col from 'react-bootstrap/Col';
import { IMAGES_URL } from '../../../config';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { displayTime } from '../../../utils/displayTime';
import { NavLink } from 'react-router-dom';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './PostCard.module.scss';

const Component = (post, { className }) => (
  <Col xs={12} md={6} lg={4} key={post._id}>
    <div {...post} className={clsx(className, styles.root)}>
      <NavLink exact to={`/post/${post._id}`}>
        <Card>
          <CardMedia
            component="img"
            image={post.image ? `${IMAGES_URL}/${post.image}` : `${IMAGES_URL}/photo_null.jpeg`}
            title={post.title}
          />
          <CardContent>
            <Typography component="h3">
              {post.title}
            </Typography>
            <Typography component="p">
              Published {displayTime(post.published)}
            </Typography>
          </CardContent>
        </Card>
      </NavLink>
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
