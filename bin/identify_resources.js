let r = require(__dirname + '/../lib/resources');
let util = require('util');

let urls = process.argv.slice(2);

if (urls.length === 0) {
    process.stderr.write(util.format("[error] expected at least one url argument.\n"));
    process.exit(100);
}

r.identifyResourcesForUrl(urls).then(resourceMap => {
    process.stdout.write(
        util.format(
            JSON.stringify(resourceMap)
        )
    );
});