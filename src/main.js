import {Component, render} from 'preact';
import {html} from 'htm/preact';
import getReport from './getReport.js';
import {styleSheet} from './StylesUtils.js';
import {download} from './FileSaver';
import {Recorder} from './Recorder.m';
import {createElement, ROOT_SELECTOR, $, URL} from './utils.js';

const recorder = new Recorder();
class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoadingReport: false,
      isLoadingScreenshot: false,
      isRecording: false,
    };
  }

  async showReport() {
    this.setState({isLoadingReport: true});
    try {
      const {options} = this.props;
      const file = await getReport(options.extra);
      const url = URL.createObjectURL(file);
      download({url});
      this.setState({isLoadingReport: false});
    } catch (err) {
      this.setState({isLoadingReport: false});
    }
  }

  async takeScreenShot() {
    try {
      this.setState({isLoadingScreenshot: true});
      const imageUrl = await screenShooter.take();
      download({imageUrl, name: 'image', ext: 'png'});
      this.setState({isLoadingScreenshot: false});
    } catch (e) {
      this.setState({isLoadingScreenshot: false});
    }
  }

  async record() {
    try {
      await recorder.start();
      this.setState({isRecording: true});
    } catch (e) {
      console.log({e});
    }
  }

  async stopRecord() {
    await recorder.stop();
    this.setState({isRecording: false});
    await recorder.save();
  }

  render(props, {isLoadingReport, isLoadingScreenshot, isRecording}) {
    return html`
    <button
        class="btn"
        disabled="${isLoadingReport}"
        onClick=${() => this.showReport()}>          
          ${isLoadingReport ? 'Loading...' : 'Generate the report' }
    </button>
    <button
        class="btn"
        disabled="${isLoadingScreenshot}"
        onClick=${() => this.takeScreenShot()}>          
          ${isLoadingScreenshot ? 'Loading...' : 'TakeScreenshot' }
    </button>
    <button class="btn ${isRecording ? 'red' : ''}"
        onClick=${() => {
    if (isRecording) {
      this.stopRecord();
    } else {
      this.record();
    }
  }} 
    disabled="${!Recorder.isRecordingSupported()}">
    <span>${isRecording ? 'Stop' : 'Record' }</span>
  </button>`;
  }
}

/**
 *
 * render the Error Reporting tool UI
 * @export
 * @param {Object} [options={}] - configurations
 */
export default function main(options = {}) {
  let root = null;
  if (!$(ROOT_SELECTOR)) {
    const styleTag = styleSheet(`
      ${ROOT_SELECTOR} {
        position: fixed;
        bottom: 0px;
        right: 1px;
        z-index: 9998;
      }
      ${ROOT_SELECTOR} .btn {
        padding: 0;
        border: none;
        font: inherit;
        cursor: pointer;
        
        display: inline-block;
        text-align: center;
        text-decoration: none;
        margin: 2px 0;
        border: solid 1px transparent;        
        padding: 0.5em 1em;
        color: #FFFFFF;
        background-image: linear-gradient(#1E44D5, #1E44D5);
        font-family: system-ui, sans-serif;
        margin-right: 1px;        
      }
      ${ROOT_SELECTOR} .btn:hover, ${ROOT_SELECTOR} .btn:active {        
        background-image: linear-gradient(#039, #039);
      }
      ${ROOT_SELECTOR} .btn:disabled {
        background-image: linear-gradient(gray, gray);
      }
      ${ROOT_SELECTOR} .btn.red{
        background-image: linear-gradient(red, red);
      }
      ${ROOT_SELECTOR} .btn.red > span {
        animation: blink 1s linear infinite;
      }
      @keyframes blink {
        0% { opacity: 0; }
        50% { opacity: 1; }
        100% { opacity: 0; }
      }
    `);
    root = createElement('div');
    root.id = ROOT_SELECTOR.slice(1, ROOT_SELECTOR.length);
    document.querySelector('head').appendChild(styleTag);
    document.querySelector('body').appendChild(root);
  }
  render(html`<${App} options="${options}" />`, root);
}
