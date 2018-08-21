import React, { Component } from 'react';

import config from '../config';
import Comment from './comment';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }

  componentDidMount() {
    const id = this.props.postId;

    fetch(`${config.apiHost}/posts/${id}/comments`)
      .then(res => res.json())
      .then(data => {
        this.setState({ comments: data.slice(0, config.maxComments) });
        this.props.commentsDidMount();
      });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.comments.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </React.Fragment>
    );
  }
}

export default Comments;
