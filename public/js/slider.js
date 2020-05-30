/*eslint-disable*/

export const showSlides = (slides, i) => {
  for (var j = 0; j < slides.length; j++) slides[j].style.display = 'none';
  slides[i].style.display = 'block';
  setTimeout(() => {
    showSlides(slides, (i + 1) % slides.length);
  }, 2000);
};
