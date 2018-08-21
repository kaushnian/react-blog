import React, { Component } from 'react';

import config from '../config';
import Post from './post';

class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    fetch(`${config.apiHost}/posts`)
      .then(res => res.json())
      .then(posts => this.setState({ posts: posts.slice(0, config.maxPosts) }));
  }

  onDelete = id => {
    this.setState({
      posts: this.state.posts.filter(post => post.id !== id)
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.posts.map(post => (
          <Post key={post.id} post={post} onDelete={this.onDelete} />
        ))}
      </React.Fragment>
    );
  }
}

export default Feed;
