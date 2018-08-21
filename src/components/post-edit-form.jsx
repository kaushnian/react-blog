import React from 'react';

const PostEditForm = ({ post, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="post-edit-form">
      <input
        type="text"
        name="title"
        className="post-edit-form-title"
        value={post.title}
        onChange={this.onChange}
      />
      <textarea
        name="body"
        cols="30"
        rows="10"
        className="post-edit-form-body"
        value={post.body}
        onChange={this.onChange}
      />
      <div className="post-controls">
        <button className="post-button" type="submit">
          Save
        </button>
        <button
          onClick={this.onCancel}
          className="post-button post-button-danger"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PostEditForm;
