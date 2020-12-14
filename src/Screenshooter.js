import Logger from './Logger';
import {createElement, delay, isDisplayMediaSupported} from './utils.js';
import html2canvas from 'html2canvas';
const logger = Logger.getLogger('Screenshooter');

class Screenshooter {
  async take() {
    if (isDisplayMediaSupported()) {
      const video = createElement('video');
      const canvas = createElement('canvas');
      const context = canvas.getContext('2d');
      const displayMediaOptions = {
        video: {
          cursor: 'never',
        },
        audio: false,
      };
      // get the stream and put it in a video element
      const stream = await navigator
          .mediaDevices
          .getDisplayMedia(displayMediaOptions);
      video.srcObject = stream;
      const [videoTrack] = video.srcObject.getVideoTracks();
      const {height, width} = videoTrack.getSettings();
      canvas.width = width;
      canvas.height = height;
      video.play();
      await delay(1000);
      context.drawImage(video, 0, 0, width, height);
      // draw the video in the canvas
      logger.info('Track settings:',
          JSON.stringify(videoTrack.getSettings(), null, 2));
      logger.info('Track constraints:',
          JSON.stringify(videoTrack.getConstraints(), null, 2));
      videoTrack.stop();
      video.pause();
      // finally take the image as base64 string from canvas
      return canvas.toDataURL('image/png', 1)
          .replace('image/png', 'image/octet-stream');
    } else {
      const canvasElement = await html2canvas(document.documentElement, {
        useCORS: true,
        allowTaint: true,
        imageTimeout: 5000,
        logging: true,
      });
      return canvasElement.toDataURL('image/png', 1)
          .replace('image/png', 'image/octet-stream');
    }
  }
}

export default Screenshooter;
