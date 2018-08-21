import React from 'react';

const PostContent = ({ post }) => {
  return (
    <React.Fragment>
      <header>
        <h2 className="post-title">{post.title}</h2>
      </header>
      <p>{post.body}</p>
    </React.Fragment>
  );
};

export default PostContent;
