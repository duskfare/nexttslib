//Scan and install all dependencies
let fs = require('fs');
let path = require('path');
const lib = require('./lib').modules;
let { execSync } = require('child_process');
async function main() {
  try {
    const dirroot = getNextJsLibRoot();
    const project_root = getProjectRoot();

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
    const nextjslib_manifest_content = JSON.parse(
      nextjslib_manifest_content_raw
    );
    const nextjslib_dependencies = nextjslib_manifest_content.dependencies;

    const project_manifest_filepath = path.join(project_root, '/package.json');
    let project_manifest_content_raw = fs
      .readFileSync(project_manifest_filepath)
      .toString();
    const project_manifest_content = JSON.parse(project_manifest_content_raw);
    const project_dependencies = project_manifest_content.dependencies;

    let modules = await lib.getModules(dirroot);
    for (let module_name of modules) {
      let project_version = project_dependencies[module_name];
      if (!project_version) {
        console.log(
          `Warning: package.json does not contain the module '${module_name}'. Skipping...`
        );
        continue;
      }
      let nextjslib_version = nextjslib_dependencies[module_name];
      if (!nextjslib_version) {
        let new_version = project_dependencies[module_name];
        nextjslib_dependencies[module_name] = new_version;
        console.log(
          `Added '${module_name}' with version '${new_version}' to nexttslib.json`
        );
      } else {
        //NextJsLib Version is already defined
        const old_version = nextjslib_dependencies[module_name];
        const new_version = project_dependencies[module_name];
        if (old_version === new_version) {
          continue;
        } else {
          nextjslib_dependencies[module_name] = new_version;
        }
        console.log(
          `Updated '${module_name}' from '${old_version}' to  '${new_version}'`
        );
      }
    }

    //Update nextjslib manifest
    nextjslib_manifest_content.dependencies = nextjslib_dependencies;
    fs.writeFileSync(
      nextjslib_manifest_filepath,
      JSON.stringify(nextjslib_manifest_content, null, 4)
    );
    console.log('done!');
  } catch (err) {
    console.error(err.message);
    throw new Error(`commit.js: failed to commit`);
  }
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

function getProjectRoot() {
  let dirroot = path.resolve(__dirname, '../../');
  return dirroot;
}
