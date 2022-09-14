const core = require('@actions/core');

try {
  const sourceBranch = core.getInput('branch_name');
  const stripPrefix = core.getInput('strip_prefix');
  const safePrefix = core.getInput('safe_prefix');
  let branch = sourceBranch;

  // Strip out any configured prefix.
  if (stripPrefix && branch.indexOf(stripPrefix) === 0) {
   branch = branch.substring(stripPrefix.length)
  }

  // The first character must be a letter. If it isn't, add our safe prefix.
  if (!branch.match(/^[a-zA-Z]/)) {
    branch = safePrefix + branch;
  }

  // Branch names can only be 11 characters long and must be lowercase.
  branch = branch.substring(0, 11).toLowerCase();

  core.setOutput('branch_name', branch);
  console.log(`Multi-dev safe branch name ${branch} [from ${sourceBranch}]`);
} catch (error) {
  core.setFailed(error.message);
}
