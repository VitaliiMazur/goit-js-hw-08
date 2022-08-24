import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const iframePlayer = new Player(iframe);

iframePlayer.on('timeupdate', throttle(onTimeUpdate, 1000));

function onTimeUpdate(params) {
  localStorage.setItem('videoplayer-current-time', params.seconds);
}

const saveTime = localStorage.getItem('videoplayer-current-time');
console.log(saveTime);

iframePlayer
  .setCurrentTime(saveTime)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
