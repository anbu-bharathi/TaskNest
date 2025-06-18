function showTab(tabId) {
      const contents = document.querySelectorAll('.tab-content');
      const tabs = document.querySelectorAll('.tab');
      contents.forEach(section => section.classList.remove('active'));
      tabs.forEach(button => button.classList.remove('active'));
      document.getElementById(tabId).classList.add('active');
      event.currentTarget.classList.add('active');
}

const featureItems = document.querySelectorAll('.feature-item');
const featureImages = document.querySelectorAll('.feature-image');

featureItems.forEach(item => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      const selectedFeature = item.getAttribute('data-feature');

      // Remove active class from all images
      featureImages.forEach(img => {
        img.classList.remove('active');
        if (img.dataset.img === selectedFeature) {
          img.classList.add('active');
        }
      });

      // Close all other details except the one just opened
      featureItems.forEach(other => {
        if (other !== item) {
          other.open = false;
        }
      });
    }
  });
});
