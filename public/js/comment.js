/* eslint-disable */
import axios from 'axios';

export const postComment = async (comment, postId) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/comments',
      data: {
        text: comment,
        blog: postId,
      },
    });
    if (res.data.status === 'success') {
      location.reload(true);
    }
  } catch (error) {
    alert('something went wrong please try agian!');
  }
};
