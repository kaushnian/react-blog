import React, { Component } from 'react';
import Comments from './comments';
import PostContent from './post-content';
import PostEditForm from './post-edit-form';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showComments: false,
      editMode: false,
      post: this.props.post,
      commentsButtonText: ''
    };

    this.currentPost = { ...this.state.post };
  }

  componentDidMount = () => {
    this.uptateCommentsButton();
  };

  toggleComments = () => {
    const showComments = this.state.showComments;

    this.setState(prevState => ({
      showComments: !prevState.showComments
    }));

    // Update comments button text only when closing the comments section.
    showComments && this.uptateCommentsButton();
  };

  uptateCommentsButton = () => {
    this.setState(prevState => {
      const text = prevState.showComments ? 'Hide' : 'Show';

      return {
        commentsButtonText: text + ' Comments'
      };
    });
  };

  toggleMode = () => {
    this.setState({ editMode: true });
  };

  onChange = e => {
    let post = { ...this.state.post };
    post[e.target.name] = e.target.value;

    this.setState({ post });
  };

  onSubmit = e => {
    e.preventDefault();

    const id = this.state.post.id;
    const data = this.state.post;

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'aplication/json'
      }
    })
      .then(res => res.json())
      .then(() => {
        this.setState({ editMode: false });
        this.currentPost = { ...this.state.post };
      });
  };

  onDelete = () => {
    /* fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "content-type": "aplication/json"
      }
    })
      .then(res => res.json())
      .then(() => this.setState({ editMode: false })); */
  };

  onCancel = () => {
    this.setState({
      editMode: false,
      post: this.currentPost
    });
  };

  render() {
    return (
      <article className="post-article">
        {!this.state.editMode ? (
          <PostContent post={this.state.post} />
        ) : (
          <PostEditForm post={this.state.post} onSubmit={this.onSubmit} />
        )}

        {!this.state.editMode && (
          <div className="post-controls">
            <button onClick={this.toggleMode} className="post-button">
              Edit
            </button>
            <button
              onClick={this.onDelete}
              className="post-button post-button-danger"
            >
              Delete
            </button>
            <button
              onClick={this.toggleComments}
              className="post-button post-button-comments"
            >
              {this.state.commentsButtonText}
            </button>
          </div>
        )}

        {this.state.showComments && (
          <Comments
            postId={this.state.post.id}
            commentsDidMount={this.uptateCommentsButton}
          />
        )}
      </article>
    );
  }
}

export default Post;
