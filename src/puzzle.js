// puzzle.js - Lock and Key Puzzle

export function setupLockAndKey(onUnlock) {
  const app = document.getElementById('app');
  const puzzleContainer = document.createElement('div');
  puzzleContainer.id = 'puzzle-container';
  app.appendChild(puzzleContainer);

  const lock = document.createElement('div');
  lock.id = 'lock';
  lock.classList.add('lock');
  puzzleContainer.appendChild(lock);

  const key = document.createElement('div');
  key.id = 'key';
  key.classList.add('key');
  puzzleContainer.appendChild(key);

  let isDragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;

  key.addEventListener('mousedown', startDrag);
  key.addEventListener('touchstart', startDrag, { passive: true });

  document.addEventListener('mousemove', doDrag);
  document.addEventListener('touchmove', doDrag, { passive: true });

  document.addEventListener('mouseup', endDrag);
  document.addEventListener('touchend', endDrag, { passive: true });


  function startDrag(event) {
    isDragging = true;
    const clientX = event.clientX || event.touches[0].clientX;
    const clientY = event.clientY || event.touches[0].clientY;

    const keyRect = key.getBoundingClientRect();
    dragOffsetX = clientX - keyRect.left;
    dragOffsetY = clientY - keyRect.top;

    key.style.zIndex = '1000'; // Bring key to front
    key.classList.add('dragging');
  }

  function doDrag(event) {
    if (!isDragging) return;

    const clientX = event.clientX || (event.touches ? event.touches[0].clientX : 0);
    const clientY = event.clientY || (event.touches ? event.touches[0].clientY : 0);

    const newX = clientX - dragOffsetX;
    const newY = clientY - dragOffsetY;

    key.style.left = `${newX}px`;
    key.style.top = `${newY}px`;
  }

  function endDrag(event) {
    if (!isDragging) return;
    isDragging = false;

    key.style.zIndex = ''; // Reset z-index
    key.classList.remove('dragging');

    const keyRect = key.getBoundingClientRect();
    const lockRect = lock.getBoundingClientRect();

    // Check if the key is within the lock's bounds
    if (
      keyRect.left + keyRect.width / 2 > lockRect.left &&
      keyRect.right - keyRect.width / 2 < lockRect.right &&
      keyRect.top + keyRect.height / 2 > lockRect.top &&
      keyRect.bottom - keyRect.height/ 2 < lockRect.bottom
    ) {
      // "Snap" the key into place
      key.style.transition = 'left 0.2s ease-out, top 0.2s ease-out'; // Smoother transition
      key.style.left = `${lockRect.left + lockRect.width / 2 - keyRect.width / 2}px`;
      key.style.top = `${lockRect.top + lockRect.height / 2 - keyRect.height / 2 - 25}px`; // -25 for key handle

      // Disable further dragging
      key.removeEventListener('mousedown', startDrag);
      key.removeEventListener('touchstart', startDrag);
      document.removeEventListener('mousemove', doDrag);
      document.removeEventListener('touchmove', doDrag);
      document.removeEventListener('mouseup', endDrag);
      document.removeEventListener('touchend', endDrag);

      // Trigger unlock after a short delay (for the animation)
      setTimeout(() => {
        puzzleContainer.remove();
        onUnlock();
      }, 200); // Match transition duration
    } else {
        key.style.transition = 'left 0.3s ease-out, top 0.3s ease-out';
        key.style.left = `calc(50% + 80px)`;
        key.style.top = `calc(50% - 20px)`;
    }
    setTimeout(() => {
        key.style.transition = '';
    }, 300)
  }
    // Initial key position
    key.style.left = `calc(50% + 80px)`; // Example: to the right of the lock
    key.style.top = `calc(50% - 20px)`;
}
