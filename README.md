# odigeo-error-reporting

Error reporting module

## Purpose
Standalone package to retrieve session information about Odigeo products
The package is release in two ways: 
- standalone umd build
- esm modern package
If you use webpack the new esm package will be loaded

## Install
npm install odigeo-error-reporting

## Implementation example (see index.html)
```javascript
const $ = document.querySelector.bind(document);
const btn = $('#report-button');

async function load() {
    btn.disabled = true;
    btn.innerText = 'Loading...';
    // Load the module on the fly (webpack should create a standalone chunk)
    const { default: GenerateReport } = await import("/dist/esm.mjs");
    const url = await GenerateReport();
    const a = document.createElement('a');
    a.href = url;
    a.download = `Report.${new Date().toJSON()}.txt`;      
    a.click();
    setTimeout(function() {                    
        window.URL.revokeObjectURL(url);
        btn.disabled = false;
        btn.innerText = 'Generate Report';
    }, 0); 
}
btn.addEventListener('click', load);
```