document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  const modalIframe = document.getElementById('modalIframe');
  const closeModal = document.getElementById('closeModal');
  const videoThumbnails = document.querySelectorAll('.video-thumbnail');
  const vimeoThumbnails = document.querySelectorAll('.vimeo-thumbnail');

  let touchStartTime = 0;
  let touchStartX = 0;
  let touchStartY = 0;

  // Load Vimeo thumbnails from API
  vimeoThumbnails.forEach(async (thumbnail) => {
    const id = thumbnail.getAttribute('data-vimeo-id');
    const img = thumbnail.querySelector('.vimeo-thumb');
    if (!img) return;
    try {
      const res = await fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${id}&width=1280`);
      const data = await res.json();
      img.src = data.thumbnail_url;
    } catch (e) {}
  });

  function addTouchClick(el, handler) {
    el.addEventListener('touchstart', (e) => {
      touchStartTime = Date.now();
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    });
    el.addEventListener('touchend', (e) => {
      const touchDuration = Date.now() - touchStartTime;
      const dx = Math.abs(e.changedTouches[0].clientX - touchStartX);
      const dy = Math.abs(e.changedTouches[0].clientY - touchStartY);
      if (touchDuration < 200 && dx < 10 && dy < 10) handler();
    });
    el.addEventListener('click', handler);
  }

  videoThumbnails.forEach(thumbnail => {
    addTouchClick(thumbnail, () => openVideoModal(thumbnail.getAttribute('data-video-src')));
  });

  vimeoThumbnails.forEach(thumbnail => {
    addTouchClick(thumbnail, () => openVimeoModal(thumbnail.getAttribute('data-vimeo-id')));
  });

  function openVideoModal(src) {
    modalIframe.classList.add('hidden');
    modalIframe.src = '';
    modalVideo.src = src;
    modalVideo.classList.remove('hidden');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  function openVimeoModal(id) {
    modalVideo.classList.add('hidden');
    modalVideo.pause();
    modalVideo.src = '';
    modalIframe.src = `https://player.vimeo.com/video/${id}?autoplay=1&badge=0`;
    modalIframe.classList.remove('hidden');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  function closeModalHandler() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    modalVideo.pause();
    modalVideo.src = '';
    modalVideo.classList.add('hidden');
    modalIframe.src = '';
    modalIframe.classList.add('hidden');
  }

  closeModal.addEventListener('click', closeModalHandler);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModalHandler();
  });
});
