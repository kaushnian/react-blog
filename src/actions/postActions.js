import { FETCH_POSTS, EDIT_POST } from './types';
import config from '../config';

const maxPosts = 20;

export const fetchPosts = () => dispatch => {
  fetch(`${config.apiHost}/posts`)
    .then(res => res.json())
    .then(posts =>
      dispatch({
        type: FETCH_POSTS,
        payload: posts.slice(0, maxPosts)
      })
    );
};
