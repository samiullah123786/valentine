// sound.js - Subtle Sound Effects using Web Audio API

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(frequency, duration, type = 'sine') {
    if (!audioContext) return; // Check if AudioContext is available

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // Low volume

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
}

export function playKeyDragSound() {
    playSound(220, 0.05); // Very short, low-frequency sound
}

export function playUnlockSound() {
    playSound(659.25, 0.2, 'triangle'); // E5 note
    setTimeout(() => playSound(523.25, 0.2, 'triangle'), 200); // C5 note
    setTimeout(() => playSound(783.99, 0.4, 'triangle'), 400); // G5 note
}

// Hook drag sound to key dragging (add to puzzle.js)
document.addEventListener('mousemove', (event) => {
    if (event.target.classList.contains('key') && event.target.classList.contains('dragging')) {
        playKeyDragSound();
    }
});
document.addEventListener('touchmove', (event) => {
    if (event.target.classList.contains('key') && event.target.classList.contains('dragging')) {
        playKeyDragSound();
    }
});
