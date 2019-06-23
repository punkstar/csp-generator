# CSP Generator

This tool will generate a valid CSP header based on the resources currently being loaded when visiting a URL. The tool uses [puppeteer](https://pptr.dev) to load a headless Chrome instance, wait for the page to load and all Javascript to execute, then analyse the results.

## Requirements

* Node 12.4.0

## Installation

    yarn install

## Usage

To identify the resources that one or urls are serving then run the following. You may enter as many url arguments as you like, space separated.

    node ./bin/identify_resources.js https://www.nicksays.co.uk

To build a CSP based on a resources JSON file (generate by `identify_resources.js`) pass to `build_csp.js` via `stdin`, for example:

    node ./bin/identify_resources.js https://www.nicksays.co.uk > resources.json
    node ./bin/build_csp < resources.json

## Example

    $ node ./bin/identify_resources.js \
        https://www.coxandcox.co.uk \
        https://www.coxandcox.co.uk/lighting/ \
        https://www.coxandcox.co.uk/oversized-grey-gold-dome-pendant \
      | node ./bin/build_csp.js

    Content-Security-Policy:
      default-src 'self'; 
      image-src 'self' https://www.coxandcox.co.uk https://trk.ometria.com https://thumbs.nosto.com https://js.klevu.com https://ct.pinterest.com https://coxandcox.view.reporting.creator-prod.zmags.com https://www.facebook.com https://webservices.sub2tech.com https://ib.adnxs.com https://www.google-analytics.com; 
      script-src 'self' https://www.coxandcox.co.uk https://connect.nosto.com https://webservices.sub2tech.com https://www.googletagmanager.com https://cdn.ometria.com https://js.klevu.com https://cdn.sub2tech.com https://s.pinimg.com https://connect.facebook.net https://coxandcox.view.reporting.creator-prod.zmags.com https://coxan11112.pcapredict.com https://loadeu.exelator.com https://js-agent.newrelic.com https://www.google-analytics.com https://www.dwin1.com https://static.trackedweb.net https://r1-t.trackedlink.net https://config1.veinteractive.com; 
      frame-src 'self' https://webservices.sub2tech.com https://loadeu.exelator.com https://secure.img-cdn.mediaplex.com https://4405841.fls.doubleclick.net https://login.dotomi.com; 
      style-src 'self' 'unsafe-inline' https://fast.fonts.net https://www.coxandcox.co.uk https://js.klevu.com; 
      connect-src 'self' https://connect.nosto.com https://ct.pinterest.com https://www.coxandcox.co.uk