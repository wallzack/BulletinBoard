import React from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';


import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './PostAdd.module.scss';

const Component = ({ className }) => (
  <div className={clsx(className, styles.root)}>
    <h2>PostAdd</h2>
    <Form>
      <Form.Row>
        <Col lg={8}>
          <Form.Group controlId="postTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control required type="text" placeholder="Enter title" />
            <Form.Text className="text-muted">
              Use catching keywords
            </Form.Text>
          </Form.Group>
        </Col>
        <Col lg={4}>
          <Form.Group controlId="epostEmail">
            <Form.Label>E-mail</Form.Label>
            <Form.Control required type="email" placeholder="name@example.com" />
            <Form.Text className="text-muted">
              Enter your e-mail address to let people contact you easily
            </Form.Text>
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Group controlId="postContent">
        <Form.Label>Describe the object or matter of your post</Form.Label>
        <Form.Control required as="textarea" rows="3" />
        <Form.Text className="text-muted">
          Describe the object or matter of your post
        </Form.Text>
      </Form.Group>
      <Form.Row>
        <Col>
          <Form.Group controlId="postLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control required type="text" placeholder="Enter your location" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="postPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control required type="text" placeholder="Enter price" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="postPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control required type="text" placeholder="Enter your telephone number" />

          </Form.Group>
        </Col>
      </Form.Row>
      <Button variant="dark" type="submit">
        Add Post
      </Button>
    </Form>
  </div>
);

Component.propTypes = {
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
  Component as PostAdd,
  // Container as PostAdd,
  Component as PostAddComponent,
};