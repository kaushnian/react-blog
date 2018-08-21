import React, { Component } from 'react';

class Comment extends Component {
  render() {
    return (
      <article className="comment-box">
        <header>
          <h3>{this.props.comment.name}</h3>
        </header>
        <p>{this.props.comment.body}</p>
      </article>
    );
  }
}

export default Comment;
