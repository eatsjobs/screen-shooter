# Odigeo Error Reporting tool

Error reporting module. 
Generate JSON data for Odigeo session and screenshotting the site.
by [@eatsjobs](mailto:pasquale.mangialavor@edreamsodigeo.com)

## Purpose
Retrieve session information about Odigeo products directly in the browser
The package is released in two format output: 
- standalone umd build
- esm modern package
If you use webpack the new esm package SHOULD be loaded (check your configuration)

# What I have used to develop it
- [Preact X](https://preactjs.com/) and [htm](https://github.com/developit/htm)
- [getDisplayMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia) fallback to [html2canvas](https://html2canvas.hertzen.com/) if not supported
- [microbundle](https://github.com/developit/microbundle)

## Install it
```javascript
npm install bitbucket:pmangialavori/odigeo-error-reporting#v1.1.0 --save
```

```javascript
<script type="module">
    import main from './node_modules/odigeo-error-reporting/lib/index.mjs';
    main();
</script>    
<script nomodule src="./node_modules/odigeo-error-reporting/lib/index.umd.js">
    console.log("script type nomodule", {OER});
    odigeoErrorReporting();
</script>
```

## Develop
```javascript
git clone git@bitbucket.org:pmangialavori/odigeo-error-reporting.git && cd odigeo-error-reporting
npm install
npm run dev
```

## Implementation example in webpack/rollup/parcel projects
```javascript
(async function() {
    const { default: myModule } = await import('odigeo-error-reporting');
    myModule.main(options);
})()
```

## Known Issues
- html2canvas cannot render images properly due to CORS policy. See this [issue](https://stackoverflow.com/questions/42263223/how-do-i-handle-cors-with-html2canvas-and-aws-s3-images)
- At the moment the app try to use WebRTC screen capturing if supported by the browser and fallback to html2canvas

## TODO
- make it configurable with options
- ~~explore the possibility to register also a video with WebRTC capabilities~~ (DONE)
- see the amazing [usersnap.com](https://usersnap.com/) 