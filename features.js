
const featureItems = document.querySelectorAll('.feature-heading');
const featureImages = document.querySelectorAll('.feature-image');

featureItems.forEach(item => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      const selectedFeature = item.getAttribute('data-feature');

      featureImages.forEach(img => {
        img.classList.remove('active');
        if (img.dataset.img === selectedFeature) {
          img.classList.add('active');
        }
      });

      featureItems.forEach(other => {
        if (other !== item) {
          other.open = false;
        }
      });
    }
  });
});
