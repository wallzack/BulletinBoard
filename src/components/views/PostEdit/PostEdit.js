import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import { connect } from 'react-redux';
import { getPostById } from '../../../redux/postsRedux.js';
import { getUser } from '../../../redux/userRedux.js';

import styles from './PostEdit.module.scss';

const Component = ({ className, post, user }) => (
  <div className={clsx(className, styles.root)}>
    <h2>Edit post</h2>
    <Form>
      <Form.Row>
        <Col lg={8}>
          <Form.Group controlId="postTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control defaultValue={post.title} required type="text" />
            <Form.Text className="text-muted">
              Use catching keywords
            </Form.Text>
          </Form.Group>
        </Col>
        <Col lg={4}>
          <Form.Group controlId="epostEmail">
            <Form.Label>E-mail</Form.Label>
            <Form.Control defaultValue={post.email} required type="email" />
            <Form.Text className="text-muted">
              Enter your e-mail address to let people contact you easily
            </Form.Text>
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Group controlId="postContent">
        <Form.Label>Describe the object or matter of your post</Form.Label>
        <Form.Control defaultValue={post.content} required as="textarea" rows="3" />
        <Form.Text className="text-muted">
          Describe the object or matter of your post
        </Form.Text>
      </Form.Group>
      <Form.Row>
        <Col sm={12} md={4}>
          <Form.Group controlId="postLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control defaultValue={post.location} required type="text" />
          </Form.Group>
        </Col>
        <Col sm={12} md={4}>
          <Form.Group controlId="postPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control defaultValue={post.price} required type="text" />
          </Form.Group>
        </Col>
        <Col sm={12} md={4}>
          <Form.Group controlId="postPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control defaultValue={post.phone} required type="text" />
          </Form.Group>
        </Col>
      </Form.Row>
      <Button variant="dark" type="submit">
        Update Post
      </Button>
    </Form>
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
  // Component as PostEdit,
  Container as PostEdit,
  Component as PostEditComponent,
};