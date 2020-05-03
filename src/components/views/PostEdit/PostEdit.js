import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import { NotFound } from '../../views/NotFound/NotFound';

import { connect } from 'react-redux';
import { getPostById } from '../../../redux/postsRedux.js';
import { getUser } from '../../../redux/userRedux.js';

import styles from './PostEdit.module.scss';

class Component extends React.Component {

  state = {
    postData: {
      id: this.props.post.id,
      title: this.props.post.title,
      content: this.props.post.content,
      email: this.props.post.email,
      location: this.props.post.location,
      published: this.props.post.published,
      phone: this.props.post.phone,
      price: this.props.post.price,
      image: this.props.post.image,
    },
    isError: false,
  }

  static propTypes = {
    className: PropTypes.string,
    post: PropTypes.object,
    user: PropTypes.object,

  }

  updateInputValue = ({ target }) => {
    const { postData } = this.state;
    const { value, name } = target;

    this.setState({ postData: { ...postData, [name]: value } });
  };

  submitPost = async (e) => {
    const { postData } = this.state;
    // const { updatePost } = this.props;

    e.preventDefault();

    if (postData.title && postData.content && postData.email) {
      const time = new Date();
      const displayTime = `${time.getDate()}.${time.getMonth()}.${time.getFullYear()}, ${time.getHours()}:${time.getMinutes()}`;
      const payload = {
        ...postData,
        updated: displayTime,
      };
      console.log(payload);
      // await updatePost(postData);
    } else this.setState({ isError: true });

  };

  render() {
    const { updateInputValue, submitPost } = this;
    const { post, className, user } = this.props;
    const { postData } = this.state;
    return (
      user.id === post.user.id ? (
        <div className={clsx(className, styles.root)}>
          <h2>Edit post</h2>
          <Form onSubmit={submitPost}>
            <Form.Row>
              <Col lg={8}>
                <Form.Group controlId="postTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control name="title" onChange={updateInputValue} value={postData.title} minLength="10" required type="text" />
                  <Form.Text className="text-muted">
                    Use catching keywords
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col lg={4}>
                <Form.Group controlId="postEmail">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control name="email" onChange={updateInputValue} value={postData.email} required type="email" />
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
                  <Form.Control name="location" onChange={updateInputValue} value={postData.location} required type="text" />
                </Form.Group>
              </Col>
              <Col sm={12} md={4}>
                <Form.Group controlId="postPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control name="price" onChange={updateInputValue} value={postData.price} required type="text" />
                </Form.Group>
              </Col>
              <Col sm={12} md={4}>
                <Form.Group controlId="postPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control name="phone" onChange={updateInputValue} value={postData.phone} required type="text" />
                </Form.Group>
              </Col>
            </Form.Row>
            <Button variant="dark" type="submit">
              Update Post
            </Button>
          </Form>
        </div>
      ) :
        (
          <NotFound />
        )

    );
  }
}

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