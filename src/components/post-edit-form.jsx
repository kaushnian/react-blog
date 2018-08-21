import React from 'react';

const PostEditForm = props => {
  return (
    <form onSubmit={props.onSubmit}>
      <input
        type="text"
        name="title"
        className="post-edit-form-title"
        value={props.post.title}
        onChange={props.onChange}
      />
      <textarea
        name="body"
        cols="30"
        rows="10"
        className="post-edit-form-body"
        value={props.post.body}
        onChange={props.onChange}
      />
      <div className="post-controls">
        <button
          disabled={props.isButtonSaveDisabled}
          className="post-button"
          type="submit"
        >
          Save
        </button>
        <button
          onClick={props.onCancel}
          className="post-button post-button-danger"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PostEditForm;
