import React from 'react';
import PropTypes from 'prop-types';

import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Homepage.module.scss';
const myads = [
  {
    id: 1,
    title: 'TIDAL Premium 1 year',
    location: 'Łódź',
    publishedDate: 'today',
    image: 'https://tidal.com/_nuxt/img/620975c.png',
  },
  {
    id: 2,
    title: 'Check new Spotify',
    location: null,
    publishedDate: 'today',
    image: 'https://static.wirtualnemedia.pl/media/top/Spotify_nowyekran655.png',
  },
];
const Component = ({ className }) => (
  <div className={clsx(className, styles.root)}>

    <h3>My ads</h3>
    <CardGroup>
      {myads.map(ad => (
        <Card className={styles.ad} key={ad.id}>
          <Card.Img className={styles.cardImage} variant="top" src={ad.image} />
          <Card.Body>
            <Card.Title><a href={`/post/edit/:${ad.id}`}>{ad.title}</a></Card.Title>
            <Card.Text>
              {ad.location}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Published {ad.publishedDate}</small>
          </Card.Footer>
        </Card>
      ))}
    </CardGroup>
    <Button href="/post/add" variant="dark">Add new post</Button>
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
  Component as Homepage,
  // Container as Homepage,
  Component as HomepageComponent,
};