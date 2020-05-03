import React from 'react';
import PropTypes from 'prop-types';
import randomID from '@wallzack/randomid-generator';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import clsx from 'clsx';

import { NotFound } from '../../views/NotFound/NotFound';

import { connect } from 'react-redux';
import { /* addPostRequest,  */addPost } from '../../../redux/postsRedux.js';
import { getUser } from '../../../redux/userRedux.js';

import styles from './PostAdd.module.scss';

class Component extends React.Component {

  state = {
    postData: {
      title: '',
      content: '',
      email: '',
      location: '',
      phone: '',
      price: '',
      image: '',
    },
    isError: false,
  }

  static propTypes = {
    className: PropTypes.string,
    addPost: PropTypes.func,
    user: PropTypes.object,

  }

  updateInputValue = ({ target }) => {
    const { postData } = this.state;
    const { value, name } = target;

    this.setState({ postData: { ...postData, [name]: value } });
  };

  submitPost = async (e) => {
    const { postData } = this.state;
    const { addPost, user } = this.props;

    e.preventDefault();

    if (postData.title && postData.content && postData.email) {
      const time = new Date();
      const displayTime = `${time.getDate()}.${time.getMonth()}.${time.getFullYear()}, ${time.getHours()}:${time.getMinutes()}`;
      const payload = {
        ...postData,
        id: randomID(10),
        published: displayTime,
        updated: displayTime,
        user: {
          id: user.id,
        },
      };
      await addPost(payload);
    } else this.setState({ isError: true });

  };

  render() {
    const { updateInputValue, submitPost } = this;
    const { postData } = this.state;
    const { className, user } = this.props;

    return (
      user.authenticated ? (
        <div className={clsx(className, styles.root)}>
          <h2>PostAdd</h2>
          <Form onSubmit={submitPost}>
            <Form.Row>
              <Col lg={8}>
                <Form.Group controlId="postTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control name="title" onChange={updateInputValue} value={postData.title} minLength="10" required type="text" placeholder="Enter title" />
                  <Form.Text className="text-muted">
                    Use catching keywords
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col lg={4}>
                <Form.Group controlId="epostEmail">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control name="email" onChange={updateInputValue} value={postData.email} required type="email" placeholder="name@example.com" />
                  <Form.Text className="text-muted">
                    Enter your e-mail address to let people contact you easily
                  </Form.Text>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Group controlId="postContent">
              <Form.Label>Describe the object or matter of your post</Form.Label>
              <Form.Control name="content" onChange={updateInputValue} value={postData.content} minLength="20" required as="textarea" rows="3" />
              <Form.Text className="text-muted">
                Describe the object or matter of your post
              </Form.Text>
            </Form.Group>
            <Form.Row>
              <Col sm={12} md={4}>
                <Form.Group controlId="postLocation">
                  <Form.Label>Location</Form.Label>
                  <Form.Control name="location" onChange={updateInputValue} value={postData.location} required type="text" placeholder="Enter your location" />
                </Form.Group>
              </Col>
              <Col sm={12} md={4}>
                <Form.Group controlId="postPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control name="price" onChange={updateInputValue} value={postData.price} required type="text" placeholder="Enter price" />
                </Form.Group>
              </Col>
              <Col sm={12} md={4}>
                <Form.Group controlId="postPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control name="phone" onChange={updateInputValue} value={postData.phone} required type="text" placeholder="Enter telephone number" />
                </Form.Group>
              </Col>
            </Form.Row>
            <Button variant="dark" type="submit">
              Add Post
            </Button>
          </Form>
        </div >
      ) :
        (
          <NotFound />
        )
    );
  }
}

const mapStateToProps = state => ({
  user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
  addPost: post => dispatch(addPost(post)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};