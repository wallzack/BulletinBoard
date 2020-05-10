import React from 'react';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { connect } from 'react-redux';
import { getUser } from '../../../redux/userRedux.js';
import { getAll, loadPostsRequest } from '../../../redux/postsRedux.js';

import { displayTime } from '../../../utils/displayTime';

import clsx from 'clsx';

import styles from './Homepage.module.scss';

class Component extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    user: PropTypes.object,
    posts: PropTypes.array,
    loadPosts: PropTypes.func,
  }

  componentDidMount() {
    this.props.loadPosts();
  }

  render() {
    const { posts, className, user } = this.props;
    return (
      <div className={clsx(className, styles.root)}>
        {user.authenticated ? (
          <Button href="/post/add" className="m-3" variant="dark">
            Add new post
          </Button>
        ) : ''}
        <Row>
          {posts.map(ad => (
            <Col xs={12} md={6} lg={4} key={ad.id}>
              <Card {...ad} className={styles.ad}>
                <Card.Img className={styles.cardImage} variant="top" src={ad.image} />
                <Card.Body>
                  <Card.Title>
                    <a href={`/post/${ad.id}`}>{ad.title}</a>
                  </Card.Title>
                  <Card.Text>
                    {ad.location}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    Published {displayTime(ad.published)}
                  </small>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: getUser(state),
  posts: getAll(state),
});

const mapDispatchToProps = (dispatch, state) => ({
  loadPosts: () => dispatch(loadPostsRequest(state)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};