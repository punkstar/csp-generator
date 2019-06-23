const puppeteer = require('puppeteer');

exports.identifyResourcesForUrl = async function (urls) {
    if (!Array.isArray(urls)) {
        urls = [urls];
    }

    const browser = await puppeteer.launch();

    let requestPromises = urls.map(url => {
        return (async () => {
            const page = await browser.newPage();

            await page.goto(url, { waitUntil: 'networkidle2' });
    
            return await page.evaluateHandle(() => {
                let resourcesResult = {};
                let resources = window.performance.getEntriesByType('resource')
    
                resources.forEach(item => {
                    let type = item['initiatorType'];
                    let url  = item['name'];
    
                    if (!(type in resourcesResult)) {
                        resourcesResult[type] = [];
                    }
    
                    resourcesResult[type].push(url);
                });
    
                return resourcesResult;
            }).then(result => result.jsonValue());
        })();
    });

    let result = (await Promise.all(requestPromises)).reduce((previous, current) => {
        return Object.assign(current, previous);
    }, {});

    browser.close();

    return result;
}