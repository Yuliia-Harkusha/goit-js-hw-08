import Player from '@vimeo/player';
// import throttle from 'lodash.throttle';
const throttle = require('lodash.throttle');

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const LOCALSTORAGE_KEY = "videoplayer-current-time";

player.on('timeupdate', throttle(settleTime, 1000));

function settleTime ({seconds}) {
    localStorage.setItem(LOCALSTORAGE_KEY, seconds);
};

player.setCurrentTime(localStorage.getItem(LOCALSTORAGE_KEY));

try {
  const data = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
} catch (error) {
    console.log(error.name);
};
