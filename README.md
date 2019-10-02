# odigeo-error-reporting

Error reporting module

## Purpose
Standalone package to retrieve session information about Odigeo products
The package is release in format output: 
- standalone umd build
- esm modern package
If you use webpack the new esm package will be loaded and you should transpile it

## Install
```javascript
npm install odigeo-error-reporting --save
```

## Develop
```javascript
git clone git@bitbucket.org:pmangialavori/odigeo-error-reporting.git && cd odigeo-error-reporting
npm install
npm run dev
```

## Implementation example (see index.html)
```javascript
(async function() {
    const { default: myModule } = await import('odigeo-error-reporting');
    myModule.main(options);
})()
```