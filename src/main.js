import {h, Component, render} from 'preact';
import htm from 'htm';
import html2canvas from 'html2canvas';
import getReport from './getReport.js';
import {styleSheet} from './StylesUtils.js';
import {download} from './FileSaver';

import {createElement, ROOT_SELECTOR, $} from './utils.js';
const html = htm.bind(h);

class App extends Component {
  async showReport() {
    this.setState({isLoadingReport: true});
    try {
      const urlObject = await getReport();
      download({url: urlObject});
      this.setState({isLoadingReport: false});
    } catch (err) {
      this.setState({isLoadingReport: false});
    }
  }

  async takeScreenShot() {
    try {
      this.setState({isLoadingScreenshot: true});
      const canvasElement = await html2canvas(document.body, {useCORS: true, allowTaint: true, imageTimeout: 5000});
      const imageUrlFile = canvasElement.toDataURL('image/png', 1.0)
          .replace('image/png', 'image/octet-stream');
      download({url: imageUrlFile, name: 'image', ext: 'png'});
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
 * render the Error Reporting tool
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
        background-color: #039;
        font-family: system-ui, sans-serif;
        margin-right: 1px;        
      }
      ${ROOT_SELECTOR} .btn:disabled {
        background-color: gray;
      }
    `);
    root = createElement('div');
    root.id = ROOT_SELECTOR.slice(1, ROOT_SELECTOR.length);
    document.body.appendChild(root);
    document.head.appendChild(styleTag);
  }
  render(html`<${App} options="${options}" />`, root);
}
