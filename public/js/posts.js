/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

export const createPost = async (title, text, tags, blogType, url) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/blog',
      data: {
        title,
        text,
        tags,
        blogType,
      },
    });

    if (res.data.status === 'success') {
      location.assign(`/${url}`);
    }
  } catch (err) {
    showAlert(err.response.data.message);
  }
};
