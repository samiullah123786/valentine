import './style.css';
import { setupLockAndKey } from './puzzle.js';
import { showFlowers } from './flowers.js';
import { showMessage } from './message.js';
import { playUnlockSound } from './sound.js';

document.addEventListener('DOMContentLoaded', () => {
  setupLockAndKey(() => {
    showFlowers();
    showMessage("Happy Valentine's Day, No body Wishesd you So i did");
    playUnlockSound();
  });
});
