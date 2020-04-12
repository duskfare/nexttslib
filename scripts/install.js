//Scan and install all dependencies
let fs = require('fs');
let path = require('path');
let { execSync } = require('child_process');
async function main() {
    const dirroot = getRootFolder();
    let src = await getFileFromDir(dirroot);
    let item = (await src.next()).value;
    let modules = {};
    while (item) {
        let file_content = fs.readFileSync(item).toString();
        let cur_mods = getFileImports(file_content);
        for (let mod of cur_mods) {
            modules[mod] = 1;
        }

        //Update state
        item = (await src.next()).value;
    }
    let command = `npm install ${Object.keys(modules).join(' ')}`;
    console.log('Installing...');
    console.log(command);
    execSync(command, { cwd: __dirname, stdio: 'inherit' });
    console.log('Done!');
}
main();

//Functions
/**
 * Get the root folder to be scanned
 */
function getRootFolder() {
    let dirroot = path.resolve(__dirname, '../');
    return dirroot;
}

/**
 * Recursively generate all the files in the directory, depth first
 * @param {string} dirroot
 * @param {ScanOptions} [options]
 */
async function* getFileFromDir(dirroot, options) {
    options = options ? options : getDefaultOptions();
    let ignore = options.ignore ? options.ignore : getDefaultIgnore();
    let items = await new Promise((resolve, reject) => {
        fs.readdir(dirroot, (err, files) => {
            err ? reject(new Error('Failed to get files')) : resolve(files);
        });
    });
    for (let item of items) {
        let fpath = path.join(dirroot, `/${item}`);
        let stat = await new Promise((resolve, reject) => {
            fs.lstat(fpath, (err, stat) => {
                err ? reject(new Error('Failed to get stats')) : resolve(stat);
            });
        });
        if (stat.isDirectory()) {
            let src = await getFileFromDir(fpath, options);
            let curItem = (await src.next()).value;
            while (curItem) {
                yield curItem;
                curItem = (await src.next()).value;
            }
        } else {
            if (ignore[item]) {
                continue;
            }
            yield fpath;
        }
    }
}
/**
 *
 */
function getDefaultOptions() {
    return {
        ignore: getDefaultIgnore(),
    };
}
/**
 * @returns {*}
 */
function getDefaultIgnore() {
    return {
        '.git': true,
        '.': true,
        '..': true,
    };
}

function getFileImports(content) {
    let regex = /(?<=import [^\s]+ from ')([^^()\[\]\{\}';.\s\n]+)(?=')/g;
    let matches = regex.exec(content);
    let imports = [];
    if (matches) {
        for (let match of matches) {
            if (!match) {
                continue; //Prevent empty entries
            }
            if (match[0] === '.') {
                continue;
            }
            let module_name = '';
            let match_components = match.split('/');
            if (match[0] === '@') {
                //Detect organization packages
                module_name = `${match_components[0]}/${match_components[1]}`;
            } else {
                module_name = `${match_components[0]}`;
            }
            if (!module_name) {
                continue;
            }
            if (module_name[0] === '.') {
                continue; //Prevent first chars
            }
            if (module_name.toLowerCase() != module_name) {
                continue; //Prevent upper case characters
            }
            imports.push(module_name);
        }
    }
    return imports;
}

/**
 * @typedef ScanOptions
 * @property {Object<string, boolean>} ignore
 */
