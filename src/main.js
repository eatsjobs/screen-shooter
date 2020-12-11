import {Component, render} from 'preact';
import {html} from 'htm/preact';
import getReport from './getReport.js';
import {styleSheet} from './StylesUtils.js';
import {download} from './FileSaver';
import Screenshooter from './Screenshooter';
import {createElement, ROOT_SELECTOR, $} from './utils.js';
const screenShooter = new Screenshooter();

const URL = window.URL || window.webkitURL;

class App extends Component {
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
      const url = imageUrl.replace('image/png', 'image/octet-stream');
      download({url, name: 'image', ext: 'png'});
      this.setState({isLoadingScreenshot: false});
    } catch (e) {
      this.setState({isLoadingScreenshot: false});
    }
  }

  constructor() {
    super();
    this.state = {
      isLoadingReport: false,
      isLoadingScreenshot: false,
    };
  }

  render(props, {isLoadingReport, isLoadingScreenshot}) {
    return html`<button
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
    `);
    root = createElement('div');
    root.id = ROOT_SELECTOR.slice(1, ROOT_SELECTOR.length);
    document.querySelector('head').appendChild(styleTag);
    document.querySelector('body').appendChild(root);
  }
  render(html`<${App} options="${options}" />`, root);
}
