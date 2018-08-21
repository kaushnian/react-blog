import React, { Component } from 'react';
import Comment from './comment';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }

  componentDidMount() {
    fetch(
      `https://jsonplaceholder.typicode.com/posts/${this.props.postId}/comments`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ comments: data });
        this.props.commentsDidMount();
      });
  }

  render() {
    const maxComments = 10;
    return (
      <React.Fragment>
        {this.state.comments.slice(0, maxComments).map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </React.Fragment>
    );
  }
}

export default Comments;
