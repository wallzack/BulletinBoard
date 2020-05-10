import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createMuiTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { getUser } from './redux/userRedux.js';
import { getAll, loadPostsRequest } from './redux/postsRedux.js';

import { MainLayout } from './components/layout/MainLayout/MainLayout';
import { Homepage } from './components/views/Homepage/Homepage';
import { MyPosts } from './components/views/MyPosts/MyPosts';
import { Post } from './components/views/Post/Post';
import { PostEdit } from './components/views/PostEdit/PostEdit';
import { PostAdd } from './components/views/PostAdd/PostAdd';
import { NotFound } from './components/views/NotFound/NotFound';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#2B4C6F' },
  },
});

class App extends React.Component {

  static propTypes = {
    loadPosts: PropTypes.func,
    posts: PropTypes.array,
    user: PropTypes.object,
  }

  componentDidMount() {
    this.props.loadPosts();
  }

  render() {
    return (
      <BrowserRouter>
        <StylesProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <MainLayout>
              <Switch>
                <Route exact path='/' component={Homepage} />
                <Route exact path='/my-posts' component={MyPosts} />
                <Route exact path='/post/add' component={PostAdd} />
                <Route exact path='/post/:id' component={Post} />
                <Route exact path='/post/:id/edit' component={PostEdit} />
                <Route path='*' component={NotFound} />
              </Switch>
            </MainLayout>
          </ThemeProvider>
        </StylesProvider>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  user: getUser(state),
  posts: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  loadPosts: () => dispatch(loadPostsRequest()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(App);

export {
  Container as App,
};
