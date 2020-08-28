//Scan and install all dependencies
let fs = require('fs');
let path = require('path');
const lib = require('./lib').modules;
let { execSync } = require('child_process');
async function main() {
  const dirroot = getNextJsLibRoot();
  let modules = await lib.getModules(dirroot);

  const nextjslib_manifest_filepath = path.join(dirroot, '/nexttslib.json');
  if (!fs.existsSync(nextjslib_manifest_filepath)) {
    fs.writeFileSync(
      nextjslib_manifest_filepath,
      JSON.stringify({
        dependencies: {},
      })
    );
  }
  let nextjslib_manifest_content_raw = fs
    .readFileSync(nextjslib_manifest_filepath)
    .toString();
  const nextjslib_manifest_content = JSON.parse(nextjslib_manifest_content_raw);
  const nextjslib_dependencies = nextjslib_manifest_content.dependencies;

  let modules_versioned = [];
  for (let module_name of modules) {
    const target_version = nextjslib_dependencies[module_name];
    if (target_version) {
      const module_versioned = `${module_name}@${target_version}`;
      modules_versioned.push(module_versioned);
    } else {
      modules_versioned.push(module_name);
    }
  }
  //Check if module management is done with yarn or npm
  let moduleCmdPfx = '';
  let yarnLockPath = `${dirroot}/../yarn.lock`;
  if (fs.existsSync(path.resolve(yarnLockPath))) {
    moduleCmdPfx = 'yarn add';
  } else {
    moduleCmdPfx = 'npm install';
  }

  let command = `${moduleCmdPfx} ${modules_versioned.join(' ')}`;
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
function getNextJsLibRoot() {
  let dirroot = path.resolve(__dirname, '../');
  return dirroot;
}
