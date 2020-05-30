/* eslint-disable */
import axios from 'axios';

export const upvote = async (postId) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/upvotes',
      data: {
        blog: postId,
        vote: 1,
      },
    });
    if (res.data.status === 'success') {
      location.reload(true);
    }
  } catch (error) {
    alert('You can not vote more then once!');
  }
};
