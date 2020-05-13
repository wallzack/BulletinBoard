import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from '@material-ui/core/Button';
import Col from 'react-bootstrap/Col';
import clsx from 'clsx';
import { NotFound } from '../../views/NotFound/NotFound';
import { connect } from 'react-redux';
import { addPostRequest } from '../../../redux/postsRedux.js';
import { getUser } from '../../../redux/userRedux.js';
import AddIcon from '@material-ui/icons/Add';
import { withRouter } from 'react-router-dom';

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
      image: null,
    },
    isError: false,
  }

  static propTypes = {
    className: PropTypes.string,
    addPost: PropTypes.func,
    user: PropTypes.object,
    history: PropTypes.object,
  }

  updateInputValue = ({ target }) => {
    const { postData } = this.state;
    const { value, name } = target;

    this.setState({ postData: { ...postData, [name]: value } });
  }

  setImage = ({ target }) => {
    const { postData } = this.state;
    const files = target.files;

    if (files) this.setState({ postData: { ...postData, image: files[0] } });
  }

  submitPost = async (e) => {
    const { postData } = this.state;
    const { addPost, user } = this.props;

    e.preventDefault();

    if (postData.title && postData.content && postData.email) {

      const formData = new FormData();
      const time = new Date();
      for (let key of ['email', 'content', 'title', 'location', 'price', 'phone']) {
        formData.append(key, postData[key]);
      }

      formData.append('image', postData.image);
      formData.append('published', time);
      formData.append('updated', time);
      formData.append('status', 'Published');
      formData.append('user', user.id);

      addPost(formData);
      this.props.history.push('/my-posts');
    } else this.setState({ isError: true });
  };

  render() {
    const { updateInputValue, submitPost, setImage } = this;
    const { postData } = this.state;
    const { className, user } = this.props;

    return (
      user.authenticated ? (
        <div className={clsx(className, styles.root)}>
          <h2>Add New Post</h2>
          <Form onSubmit={submitPost}>
            <Form.Row>
              <Col md={8}>
                <Form.Group controlId="postTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    name="title"
                    onChange={updateInputValue}
                    value={postData.title}
                    minLength="10" required
                    type="text"
                    placeholder="Enter title"
                  />
                  <Form.Text className="text-muted">
                    Use catching keywords
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="postStatus">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    name="status"
                    defaultValue="Draft"
                    readOnly
                    type="text" />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col md={6}>
                <Form.Group controlId="epostEmail">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    name="email"
                    onChange={updateInputValue}
                    value={postData.email}
                    required
                    type="email"
                    placeholder="name@example.com" />
                  <Form.Text className="text-muted">
                    Enter your e-mail address to let people contact you easily
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="postPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    name="phone"
                    onChange={updateInputValue}
                    value={postData.phone}
                    type="text"
                    placeholder="Enter telephone number"
                  />
                  <Form.Text className="text-muted">
                    Entering phone is optional, but makes reaching you easy
                  </Form.Text>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Group controlId="postContent">
              <Form.Label>Post description</Form.Label>
              <Form.Control
                name="content"
                onChange={updateInputValue}
                value={postData.content}
                minLength="20"
                required
                as="textarea"
                rows="5"
              />
              <Form.Text className="text-muted">
                Describe the object or matter of your post
              </Form.Text>
            </Form.Group>
            <Form.Row>
              <Col sm={12} md={4}>
                <Form.Group controlId="postLocation">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    name="location"
                    onChange={updateInputValue}
                    value={postData.location}
                    type="text"
                    placeholder="Enter your location"
                  />
                </Form.Group>
              </Col>
              <Col sm={12} md={4}>
                <Form.Group controlId="postPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    name="price"
                    onChange={updateInputValue}
                    value={postData.price}
                    type="text"
                    placeholder="Enter price"
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col md={6}>
                <input
                  name="image"
                  onChange={setImage}
                  type="file"
                />
              </Col>
              <Col md={6}>
                <Button
                  type="submit"
                  startIcon={<AddIcon />}
                >
                  Add Post
                </Button>
              </Col>
            </Form.Row>
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
  addPost: post => dispatch(addPostRequest(post)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(withRouter(Component));

export {
  // Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
