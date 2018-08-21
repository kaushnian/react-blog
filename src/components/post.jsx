import React, { Component } from "react";
import Comments from "./comments";

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showComments: true,
      editMode: false,
      post: this.props.post,
      commentsButtonText: "Show Comments"
    };
  }

  toggleComments = () => {
    this.setState(prevState => ({
      showComments: !prevState.showComments
    }));
    this.uptateCommentsButton();
  };

  uptateCommentsButton = () => {
    this.setState(prevState => {
      const text = prevState.showComments ? "Show" : "Hide";
      return {
        commentsButtonText: text + " Comments"
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
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "content-type": "aplication/json"
      }
    })
      .then(res => res.json())
      .then(() => this.setState({ editMode: false }));
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

  render() {
    return (
      <article className="post-article">
        {!this.state.editMode ? (
          <React.Fragment>
            <header>
              <h2 className="post-title">{this.state.post.title}</h2>
            </header>
            <p>{this.state.post.body}</p>
          </React.Fragment>
        ) : (
          <form action="" onSubmit={this.onSubmit}>
            <input
              type="text"
              name="title"
              value={this.state.post.title}
              onChange={this.onChange}
            />
            <textarea
              name="body"
              cols="30"
              rows="10"
              value={this.state.post.body}
              onChange={this.onChange}
            />
            <button type="submit">Save</button>
          </form>
        )}

        <div className="post-controls">
          {!this.state.editMode && (
            <React.Fragment>
              <button onClick={this.toggleMode} className="post-button">
                Edit
              </button>
              <button
                onClick={this.onDelete}
                className="post-button post-button-delete"
              >
                Delete
              </button>
            </React.Fragment>
          )}
          <button
            onClick={this.toggleComments}
            className="post-button post-button-comments"
          >
            {this.state.commentsButtonText}
          </button>
        </div>

        {!this.state.showComments && (
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
