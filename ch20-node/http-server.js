// CREATE SERVER
const {createServer} = require('http');

const methods = Object.create(null);

createServer((req, res) => {
    let handler = methods[req.method] || notAllowed;
    handler(req)
        .catch(err => {
            if (err !== null) return err;
            return {body: String(err), status: 500};
        })
        .then(({ body, status = 200, type = 'text/plain'}) => {
            res.writeHead(status, {'Content-Type': type});
            if (body && body.pipe) body.pipe(res);
            else res.end(body);
        });
}).listen(8000);

async function notAllowed(req) {
    return {
        status: 405,
        body: `Method ${req.method} not allowed.`
    };
}


// HANDLE URL REQUEST
const {parse} = require('url');
const {resolve, sep} = require('path');

const baseDirectory = process.cwd();

function urlPath(url) {
    let {pathname} = parse(url);
    let path = resolve(decodeURIComponent(pathname).slice(1));
    if (path !== baseDirectory && !path.startsWith(baseDirectory + sep)) {
        throw {status: 403, body: 'Forbidden'};
    }
    return path;
}


// GET
const {createReadStream} = require('fs');
const {stat, readdir} = require('fs').promises;
const mime = require('mime');

methods.GET = async function(req) {
    let path = urlPath(req.url);
    let stats;
    try {
        stats = await stat(path);
    } catch (err) {
        if (err.code !== 'ENOENT') throw err;
        else return {status: 404, body: 'File not found'};
    }
    if (stats.isDirectory()) {
        return {body: (await readdir(path)).join('\n')};
    } else {
        return {body: createReadStream(path),
        type: mime.getType(path)};
    }
};


// DELETE
const {rmdir, unlink} = require('fs').promises;

methods.DELETE = async function(req) {
    let path = urlPath(req.url);
    let stats;
    try {
        stats = await stat(path);
    } catch (err) {
        if (err.code !== 'ENOENT') throw err;
        else return {status: 204};
    }
    if (stats.isDirectory()) await remdir(path);
    else await unlink(path);
    return {status: 204};
};


// PUT
const {createWriteStream} = require('fs');

function pipeStream(from, to) {
    return new Promise((resolve, reject) => {
        from.on('error', reject);
        to.on('error', reject);
        to.on('finish', resolve);
        from.pipe(to);
    });
}

methods.PUT = async function(req) {
    let path = urlPath(req.url);
    await pipeStream(req, createWriteStream(path));
    return {status: 204};
};