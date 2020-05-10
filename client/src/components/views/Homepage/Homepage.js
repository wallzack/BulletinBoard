import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';
import { getAll } from '../../../redux/postsRedux.js';
import { PostCard } from '../../features/PostCard/PostCard';
import clsx from 'clsx';

import styles from './Homepage.module.scss';

const Component = ({ posts, className }) => (
  <div className={clsx(className, styles.root)}>
    <Row>
      {posts.map(post => (
        <PostCard key={post._id} {...post} />
      ))}
    </Row>
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
  posts: PropTypes.array,
};

const mapStateToProps = state => ({
  posts: getAll(state),
});

const Container = connect(mapStateToProps, null)(Component);

export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};