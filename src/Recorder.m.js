import {download} from './FileSaver';
import {URL, isDisplayMediaSupported} from './utils';
const displayMediaOptions = {
  video: {
    cursor: 'never',
  },
  audio: false,
};

export class Recorder {
  static isRecordingSupported() {
    return isDisplayMediaSupported();
  }

  constructor() {
    this.recordedChunks = [];
    this.supportedTypes = getSupportedMimeTypes();
  }

  async start() {
    if (this.recorder) return;
    const stream = await navigator
        .mediaDevices
        .getDisplayMedia(displayMediaOptions);
    const options = {mimeType: this.supportedTypes[0]};
    this.recorder = new MediaRecorder(stream, options);
    this.recorder.ondataavailable = this._handleDataAvailable.bind(this);
    this.recordedChunks = [];
    if (this.recorder.state !== 'recording') {
      const asd = new Promise((resolve, reject) => {
        this.recorder.onstart = resolve;
        this.recorder.onerror = reject;
      });
      this.recorder.start();
      return asd;
    }
  }

  /**
   * @return {Promise<Array<Blob>>}
   */
  async stop() {
    if (this.recorder && this.recorder.state === 'recording') {
      const asd = new Promise((resolve, reject) => {
        this.recorder.onstop = resolve;
        this.recorder.onerror = reject;
      });
      this.recorder.stop();
      return asd.then(() => {
        this.recorder = null;
        return this.recordedChunks;
      });
    }
  }

  async save() {
    const [chunk] = this.recordedChunks;
    const url = URL.createObjectURL(chunk);
    download({url, ext: 'webm', name: `${document.title}_video`});
    return url;
  }

  _handleDataAvailable(event) {
    event.data.size > 0 && this.recordedChunks.push(event.data);
  }
}

const VIDEO_TYPES = [
  'webm',
  'ogg',
  'mp4',
  'x-matroska',
];
const VIDEO_CODECS = [
  'vp9',
  'vp9.0',
  'vp8',
  'vp8.0',
  'avc1',
  'av1',
  'h265',
  'h.265',
  'h264',
  'h.264',
  'opus',
];

// eslint-disable-next-line require-jsdoc
function getSupportedMimeTypes() {
  const supportedTypes = [];
  VIDEO_TYPES.forEach((videoType) => {
    const type = `video/${videoType}`;
    VIDEO_CODECS.forEach((codec) => {
      const variations = [
        `${type};codecs=${codec}`,
        `${type};codecs:${codec}`,
        `${type};codecs=${codec.toUpperCase()}`,
        `${type};codecs:${codec.toUpperCase()}`,
      ];
      variations.forEach((variation) => {
        if (MediaRecorder.isTypeSupported(variation)) {
          supportedTypes.push(variation);
        }
      });
    });
    if (MediaRecorder.isTypeSupported(type)) supportedTypes.push(type);
  });
  return supportedTypes;
}
