/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

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
    showAlert('You can not vote more then once!');
  }
};
