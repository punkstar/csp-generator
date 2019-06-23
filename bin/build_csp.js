let fs = require('fs');
let CSP = require(__dirname + '/../lib/csp').CSP;

let data = fs.readFileSync(0, 'utf-8');
let jsonData = JSON.parse(data);

let csp = new CSP();

jsonData['img'].forEach(item => {
    csp.addImage(item);
})

jsonData['script'].forEach(item => {
    csp.addScript(item);
});

jsonData['iframe'].forEach(item => {
    csp.addIframe(item);
});

jsonData['css'].forEach(item => {
    csp.addStylesheet(item);
});

jsonData['link'].forEach(item => {
    csp.addStylesheet(item);
});

jsonData['xmlhttprequest'].forEach(item => {
    csp.addConnection(item);
})

console.log("Content-Security-Policy: " + csp.render());