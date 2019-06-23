"use strict";

let CSP = function () {
    this.imageHosts = [];
    this.scriptHosts = [];
    this.iframeHosts = [];
    this.stylesheetHosts = [];
    this.connectionHosts = [];
};

CSP.prototype.addImage = function (url) {
    return this._addHostTo(url, this.imageHosts);
};

CSP.prototype.addScript = function (url) {
    return this._addHostTo(url, this.scriptHosts);
};

CSP.prototype.addIframe = function (url) {
    return this._addHostTo(url, this.iframeHosts);
}

CSP.prototype.addStylesheet = function (url) {
    return this._addHostTo(url, this.stylesheetHosts);
}

CSP.prototype.addConnection = function (url) {
    return this._addHostTo(url, this.connectionHosts);
}

CSP.prototype._addHostTo = function (url, list) {
    let urlObj = new URL(url);

    let protocol = urlObj.protocol;
    let host = urlObj.host;
    let port = urlObj.port;

    var pattern = host;

    if (protocol) {
        pattern = protocol + '//' + host;
    }

    if (port) {
        pattern = ":" + port;
    }

    if (!list.includes(pattern)) {
        list.push(pattern);
    }
}

CSP.prototype._generateRule = function (directive, defaults = [], hosts = []) {
    return [
        directive, defaults.join(' '), hosts.join(' ')
    ].join(' ').trim();
}

CSP.prototype.render = function () {
    return [
        this._generateRule('default-src', ["'self'"]),
        this._generateRule('image-src', ["'self'"], this.imageHosts),        
        this._generateRule('script-src', ["'self'"], this.scriptHosts),
        this._generateRule('frame-src', ["'self'"], this.iframeHosts),
        this._generateRule('style-src', ["'self'", "'unsafe-inline'"], this.stylesheetHosts),
        this._generateRule('connect-src', ["'self'"], this.connectionHosts)
    ].join('; ').trim();
};

exports.CSP = CSP;