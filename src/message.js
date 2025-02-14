// message.js - Enhanced Message Display with Azka

export function showMessage(text) {
  const messageContainer = document.createElement('div');
  messageContainer.id = 'message-container';

  const message = document.createElement('h1');
  message.id = 'message';
  message.textContent = text;
  message.style.fontFamily = "'Tangerine', cursive";
  messageContainer.appendChild(message);

  // Add Azka's name
  const azkaName = document.createElement('h2');
  azkaName.id = 'azka-name';
  azkaName.textContent = 'Azka';
  messageContainer.appendChild(azkaName);

  document.getElementById('app').appendChild(messageContainer);

  // Animate the main message
  message.animate([
    { opacity: 0, transform: 'translateY(-50px) scale(0.5)', textShadow: '0 0 0px #e91e63' },
    { opacity: 1, transform: 'translateY(0) scale(1.1)', textShadow: '0 0 25px #e91e63' },
    { opacity: 1, transform: 'translateY(0) scale(1)', textShadow: '0 0 12px #e91e63' }
  ], {
    duration: 1500,
    easing: 'ease-out'
  }).onfinish = () => {
      message.animate([
        {transform: 'scale(1)'},
        {transform: 'scale(1.03)'},
        {transform: 'scale(1)'}
      ], {
        duration: 4000,
        iterations: Infinity,
        easing: 'ease-in-out'
      })
  };

  // Animate Azka's name - slightly different animation
  azkaName.animate([
    { opacity: 0, transform: 'translateY(-20px) scale(0.8)' },
    { opacity: 1, transform: 'translateY(0) scale(1.1)' },
    { opacity: 1, transform: 'translateY(0) scale(1)' }
  ], {
    duration: 1200, // Slightly faster
    easing: 'ease-out',
    delay: 500 // Start after the main message starts
  });
}
