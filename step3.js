const fs = require('fs');
const process = require('process');
const axios = require('axios');

function handleOutput(text, out) {
    if (out) {
        fs.writeFile(out, text, "utf8", function(error) {
            if (error) {
                console.error(`Couldn't write ${out} ${error}`);
                process.exit(1);
            }
        });
    } else {
        console.lof(text);
    }
}

async function webCat(url, out) {
    try {
        let res = await axios.get(url);
        handleOutput(res.data, out);
    } catch (error) {
        console.error(`Error ${url} ${error}`);
        process.exit(1);
    }
}

let path;
let out;

if (process.argv[2] === 'out') {
    out = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2];
}

if (path.slice(0,4) === 'http') {
    webCat(path, out);
} else {
    cat(path, out);
}