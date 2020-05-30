/* eslint-disable */
import '@babel/polyfill';
import { showSlides } from './slider';
import { login, logout } from './login';
import { signup } from './signup';
import { forgotPassword } from './forgotPassword';
import { postComment } from './comment';
import { upvote } from './upvote';
import { createPost } from './posts';

// DOM ELEMENTS
const slideContainer = document.getElementsByClassName('mySlides');
const loginForm = document.querySelector('.login-box');
const signupForm = document.querySelector('.signup-box');
const forgotPasswordForm = document.querySelector('.forgot-box');
const logOutBtn = document.getElementById('logout');
const blogdiv = document.getElementById('blogdiv');
const complaintdiv = document.getElementById('complaintdiv');
const modal = document.getElementById('myModal');
const modalBlog = document.getElementById('myModalBlog');
const modalComplaint = document.getElementById('myModalComplaint');
const modal2 = document.getElementById('myModal2');
const closebtn = document.querySelector('.closebtn');
const commentPostBtn = document.querySelector('.commentPostForm');
const upvoteBtn = document.getElementById('upvotebtn');
const postForm = document.querySelector('.post-form-box');
const complaintForm = document.querySelector('.complaint-form');

if (slideContainer.length > 0) showSlides(slideContainer, 0);

if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (signupForm)
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    signup(name, email, password, passwordConfirm);
  });

if (forgotPasswordForm)
  forgotPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    forgotPassword(email);
  });

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (blogdiv) {
  const blog = document.getElementById('showeachblogcard');
  const complaint = document.getElementById('showcomplaintcard');
  blog.style.display = 'none';
  complaint.style.display = 'none';

  window.addEventListener('click', function (e) {
    if (document.getElementById('blogdiv').contains(e.target)) {
      complaint.style.display = 'none';
      blog.style.display = 'block';
      blogdiv.style.boxShadow = '0 8px 16px 0 #FFD800';
      complaintdiv.style.boxShadow = '0 4px 8px 0 #BEA6D4';
    } else if (document.getElementById('complaintdiv').contains(e.target)) {
      complaint.style.display = 'block';
      blog.style.display = 'none';
      complaintdiv.style.boxShadow = '0 8px 16px 0 #FFD800';
      blogdiv.style.boxShadow = '0 4px 8px 0 #BEA6D4';
    } else if (document.querySelector('.complaintcards').contains(e.target)) {
    } else {
      blog.style.display = 'none';
      complaint.style.display = 'none';
      blogdiv.style.boxShadow = '0 4px 8px 0 #BEA6D4';
      complaintdiv.style.boxShadow = '0 4px 8px 0 #BEA6D4';
    }
  });
}

if (modal) {
  modal.style.display = 'block';

  window.onclick = function (event) {
    if (event.target == closebtn) {
      location.assign('/');
    }
    if (event.target == modal) {
      location.assign('/');
    }
  };
}

if (modal2) {
  modal2.style.display = 'block';

  window.onclick = function (event) {
    if (event.target == closebtn) {
      location.assign('/');
    }
    if (event.target == modal2) {
      location.assign('/');
    }
  };
}

if (commentPostBtn)
  commentPostBtn.addEventListener('submit', (e) => {
    e.preventDefault();
    const comment = document.getElementById('comment-text').value;
    const postId = document.getElementById('comment-text').dataset.postid;
    postComment(comment, postId);
  });

if (upvoteBtn)
  upvoteBtn.addEventListener('click', () => {
    const postId = upvoteBtn.dataset.postid;
    upvote(postId);
  });

if (modalBlog) {
  modalBlog.style.display = 'block';

  window.onclick = function (event) {
    if (event.target == closebtn) {
      location.assign('/blog');
    }
    if (event.target == modalBlog) {
      location.assign('/blog');
    }
  };
}

if (modalComplaint) {
  modalComplaint.style.display = 'block';

  window.onclick = function (event) {
    if (event.target == closebtn) {
      location.assign('/complaint');
    }
    if (event.target == modalComplaint) {
      location.assign('/complaint');
    }
  };
}

if (postForm)
  postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('postTitle').value;
    const text = document.getElementById('postText').value;
    createPost(title, text, 'no-tag', 'article', 'blog');
  });

if (complaintForm)
  complaintForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('complaintTitle').value;
    const x = document.getElementById('tagDropdown');
    const tags = x.options[x.selectedIndex].text;
    const text = document.getElementById('complaintText').value;
    createPost(title, text, tags, 'complaint', 'complaint');
  });
