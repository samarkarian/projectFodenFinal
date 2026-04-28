document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  const closeModal = document.getElementById('closeModal');
  const videoThumbnails = document.querySelectorAll('.video-thumbnail');

  let touchStartTime = 0;
  let touchStartX = 0;
  let touchStartY = 0;

  videoThumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('touchstart', (e) => {
      touchStartTime = Date.now();
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    });

    thumbnail.addEventListener('touchend', (e) => {
      const touchDuration = Date.now() - touchStartTime;
      const dx = Math.abs(e.changedTouches[0].clientX - touchStartX);
      const dy = Math.abs(e.changedTouches[0].clientY - touchStartY);
      if (touchDuration < 200 && dx < 10 && dy < 10) {
        openModal(thumbnail.getAttribute('data-video-src'));
      }
    });

    thumbnail.addEventListener('click', () => {
      openModal(thumbnail.getAttribute('data-video-src'));
    });
  });

  function openModal(src) {
    modalVideo.src = src;
    modal.classList.remove('hidden');
  }

  closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
    modalVideo.pause();
    modalVideo.src = '';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal.click();
  });
});
