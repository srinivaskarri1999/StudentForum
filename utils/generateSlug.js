module.exports = () => {
  let slug = '';
  let chars = 'abcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 5; i++) {
    slug += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return slug;
};
