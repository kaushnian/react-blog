import React, { Component } from 'react';

import config from '../config';
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
      commentsButtonText: '',
      isButtonDeleteDisabled: false,
      isButtonSaveDisabled: false,
      isButtonCommentsDisabled: false
    };

    this.currentPost = { ...this.state.post };
  }

  componentDidMount = () => {
    this.updateCommentsButton();
  };

  toggleComments = () => {
    const showComments = this.state.showComments;

    this.setState(prevState => ({
      showComments: !prevState.showComments,
      isButtonCommentsDisabled: true
    }));

    // Update comments button text only when closing the comments section.
    showComments && this.updateCommentsButton();
  };

  updateCommentsButton = () => {
    this.setState(prevState => {
      const text = prevState.showComments ? 'Hide' : 'Show';

      return {
        commentsButtonText: text + ' Comments',
        isButtonCommentsDisabled: false
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

    this.setState({ isButtonSaveDisabled: true });

    const id = this.state.post.id;
    const data = this.state.post;

    fetch(`${config.apiHost}/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'aplication/json'
      }
    })
      .then(res => res.json())
      .then(() => {
        this.setState({
          editMode: false,
          isButtonSaveDisabled: false
        });
        this.currentPost = { ...this.state.post };
      });
  };

  onDelete = () => {
    const id = this.state.post.id;

    this.setState({ isButtonDeleteDisabled: true });

    fetch(`${config.apiHost}/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'aplication/json'
      }
    })
      .then(res => res.json())
      .then(() => {
        this.props.onDelete(id);

        this.setState({
          isButtonDeleteDisabled: false,
          editMode: false
        });
      });
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
          <PostEditForm
            post={this.state.post}
            onSubmit={this.onSubmit}
            onChange={this.onChange}
            onCancel={this.onCancel}
            isButtonSaveDisabled={this.state.isButtonSaveDisabled}
          />
        )}

        {!this.state.editMode && (
          <div className="post-controls">
            <button onClick={this.toggleMode} className="post-button">
              Edit
            </button>
            <button
              disabled={this.state.isButtonDeleteDisabled}
              onClick={this.onDelete}
              className="post-button post-button-danger"
            >
              Delete
            </button>
            <button
              disabled={this.state.isButtonCommentsDisabled}
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
            commentsDidMount={this.updateCommentsButton}
          />
        )}
      </article>
    );
  }
}

export default Post;
