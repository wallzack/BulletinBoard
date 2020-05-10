import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import { displayTime } from '../../../utils/displayTime';
import { connect } from 'react-redux';
import { getPostById } from '../../../redux/postsRedux.js';
import { getUser } from '../../../redux/userRedux.js';
import { IMAGES_URL } from '../../../config';
import styles from './Post.module.scss';
import { NavLink } from 'react-router-dom';
import { NotFound } from '../../views/NotFound/NotFound';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Component = ({ className, post, user }) => (
  <div className={clsx(className, styles.root)}>

    {post._id ? (
      <Card>
        <CardMedia
          component="img"
          image={post.image ? `${IMAGES_URL}/${post.image}` : `${IMAGES_URL}/photo_null.jpeg`}
        />
        <CardContent className={styles.head}>
          <div>
            <h3>
              {post.title}
            </h3>
            <small>Status: {post.status}</small>
          </div>
          <div>
            {user.id === post.user ? (
              <Fab
                aria-label="update"
                size="medium"
              >
                <NavLink exact to={`/post/${post._id}/edit`}>
                  <EditIcon />
                </NavLink>
              </Fab>
            ) : ''}
          </div>
        </CardContent>
        <CardContent >
          <Row className={styles.postBody}>
            <Col xs={12} sm={7}>
              <p>{post.content}</p>
            </Col>
            <Col xs={12} sm={5} className={styles.details}>
              <small>Location</small>
              <p>&nbsp;{post.location}</p>
              <small>E-mail</small>
              <p>{post.email}</p>
              <small>Phone</small>
              <p>&nbsp;{post.phone}</p>
              <small>Price</small>
              <p>&nbsp;{post.price} zł</p>
            </Col>
          </Row>
        </CardContent>
        <CardContent className={styles.footer}>
          <small>Last update {displayTime(post.updated)}</small>
          <small>Published {displayTime(post.published)}</small>
        </CardContent>
      </Card>
    ) :
      (
        <NotFound />
      )
    }
  </div >
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
