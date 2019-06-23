# CSP Generator

This tool will generate a valid CSP header based on the resources currently being loaded when visiting a URL. The tool uses [puppeteer](https://pptr.dev) to load a headless Chrome instance, wait for the page to load and all Javascript to execute, then analyse the results.

## Requirements

* Node 12.4.0

## Installation

    yarn install

## Usage

To identify the resources that one or urls are serving then run the following. You may enter as many url arguments as you like, space separated.

    node ./bin/identify_resources.js https://www.nicksays.co.uk