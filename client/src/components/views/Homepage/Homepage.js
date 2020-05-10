import React from 'react';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { connect } from 'react-redux';
import { getUser } from '../../../redux/userRedux.js';
import { getAll } from '../../../redux/postsRedux.js';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Homepage.module.scss';

const Component = ({ className, user, posts }) => (
  <div className={clsx(className, styles.root)}>
    {user.authenticated ? (
      <Button href="/post/add" className="m-3" variant="dark">Add new post</Button>
    ) : ''}
    <Row>
      {posts.map(ad => (
        <Col xs={12} md={6} lg={4} key={ad.id}>
          <Card {...ad} className={styles.ad}>
            <Card.Img className={styles.cardImage} variant="top" src={ad.image} />
            <Card.Body>
              <Card.Title><a href={`/post/${ad.id}`}>{ad.title}</a></Card.Title>
              <Card.Text>
                {ad.location}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Published {ad.published}</small>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
  posts: PropTypes.array,
};

const mapStateToProps = state => ({
  user: getUser(state),
  posts: getAll(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};