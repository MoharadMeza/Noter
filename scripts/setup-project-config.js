#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const readline = require('readline')

// Set up readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// Files to copy - grouped by category
const CONFIG_FILES = {
  // Commit convention and husky
  commitAndHusky: [
    { src: 'commitlint.config.js', dest: 'commitlint.config.js' },
    { src: '.gitmessage', dest: '.gitmessage' },
    { src: '.husky/commit-msg', dest: '.husky/commit-msg' },
    { src: '.husky/pre-commit', dest: '.husky/pre-commit' },
    { src: '.husky/pre-push', dest: '.husky/pre-push' },
    { src: 'docs/COMMIT_CONVENTION.md', dest: 'docs/COMMIT_CONVENTION.md' },
    { src: 'scripts/ai-commit.js', dest: 'scripts/ai-commit.js' },
  ],

  // ESLint and code quality
  linting: [
    { src: 'eslint.config.mjs', dest: 'eslint.config.mjs' },
    { src: '.prettierrc', dest: '.prettierrc' },
    { src: '.prettierignore', dest: '.prettierignore' },
  ],

  // TypeScript configuration
  typescript: [
    { src: 'tsconfig.json', dest: 'tsconfig.json' },
    { src: 'next.config.js', dest: 'next.config.js' },
  ],

  // Editor configuration
  editor: [
    { src: '.vscode/settings.json', dest: '.vscode/settings.json' },
    { src: '.vscode/extensions.json', dest: '.vscode/extensions.json' },
  ],

  // Scripts and utilities
  scripts: [{ src: 'scripts/generate-component.js', dest: 'scripts/generate-component.js' }],
}

// Required npm packages by category
const NPM_PACKAGES = {
  commitAndHusky: ['@commitlint/cli', '@commitlint/config-conventional', 'husky'],

  linting: [
    'eslint',
    'prettier',
    'eslint-config-prettier',
    'eslint-plugin-prettier',
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    'eslint-import-resolver-typescript',
    'eslint-plugin-import',
    '@eslint/eslintrc',
  ],

  typescript: ['typescript'],
}

// Scripts to add to package.json
const PACKAGE_SCRIPTS = {
  commit: 'node scripts/ai-commit.js',
  'generate-component': 'node scripts/generate-component.js',
  lint: 'eslint --no-warn-ignored .',
  'lint:fix': 'eslint --fix --no-warn-ignored .',
  format: 'prettier --write .',
  postinstall: 'husky',
}

/**
 * Copy a file with directory creation if needed
 */
function copyFile(src, dest, targetDir) {
  const sourcePath = path.resolve(src)
  const destPath = path.join(targetDir, dest)
  const destDir = path.dirname(destPath)

  if (!fs.existsSync(sourcePath)) {
    console.warn(`⚠️ Source file not found: ${sourcePath}`)
    return false
  }

  // Create destination directory if it doesn't exist
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true })
    console.log(`📁 Created directory: ${destDir}`)
  }

  // Copy the file
  fs.copyFileSync(sourcePath, destPath)
  console.log(`📄 Copied ${path.basename(src)} to ${destPath}`)

  // Make scripts executable
  if (dest.endsWith('.js') || dest.includes('.husky/')) {
    fs.chmodSync(destPath, '755')
    console.log(`🔑 Made executable: ${destPath}`)
  }

  return true
}

/**
 * Update the target project's package.json
 */
function updatePackageJson(targetDir) {
  const packageJsonPath = path.join(targetDir, 'package.json')

  if (!fs.existsSync(packageJsonPath)) {
    console.error(`❌ package.json not found in ${targetDir}`)
    return false
  }

  // Read and parse package.json
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

  // Add scripts
  packageJson.scripts = packageJson.scripts || {}
  for (const [name, command] of Object.entries(PACKAGE_SCRIPTS)) {
    packageJson.scripts[name] = command
  }

  // Write updated package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
  console.log(`📝 Updated package.json in ${targetDir}`)

  return true
}

/**
 * Set up git commit template
 */
function setupGitTemplate(targetDir) {
  try {
    // Change to the target directory
    process.chdir(targetDir)

    // Configure git to use the commit template
    execSync('git config --local commit.template .gitmessage')
    console.log('🔧 Configured git to use .gitmessage template')

    return true
  } catch (error) {
    console.error('❌ Failed to configure git commit template:', error.message)
    return false
  }
}

/**
 * Ask user which configuration groups to copy
 */
function promptConfigGroups() {
  return new Promise((resolve) => {
    console.log('\nWhich configuration groups would you like to copy?')

    const groups = Object.keys(CONFIG_FILES)
    groups.forEach((group, index) => {
      console.log(`${index + 1}. ${group} (${CONFIG_FILES[group].length} files)`)
    })
    console.log(`${groups.length + 1}. All of the above`)

    rl.question('\nEnter your choices (comma-separated numbers, e.g. 1,3,4): ', (answer) => {
      const selectedGroups = []

      // Parse input
      const choices = answer.split(',').map((s) => parseInt(s.trim()))

      // Check if "All" option was selected
      if (choices.includes(groups.length + 1)) {
        resolve(groups)
        return
      }

      // Add selected groups
      choices.forEach((choice) => {
        if (choice >= 1 && choice <= groups.length) {
          selectedGroups.push(groups[choice - 1])
        }
      })

      if (selectedGroups.length === 0) {
        console.log('No valid choices selected. Using all groups as default.')
        resolve(groups)
      } else {
        resolve(selectedGroups)
      }
    })
  })
}

/**
 * Main function
 */
async function main() {
  // Get target directory from command line argument
  const targetDir = process.argv[2]

  if (!targetDir) {
    console.error('❌ Please specify a target directory')
    console.log('Usage: node setup-project-config.js /path/to/target/project')
    rl.close()
    process.exit(1)
  }

  // Ensure target directory exists
  if (!fs.existsSync(targetDir)) {
    console.error(`❌ Target directory does not exist: ${targetDir}`)
    rl.close()
    process.exit(1)
  }

  // Get source directory (current project)
  const sourceDir = process.cwd()

  console.log(`🚀 Setting up project configuration from ${sourceDir} to ${targetDir}`)

  // Prompt for configuration groups
  const selectedGroups = await promptConfigGroups()

  console.log(`\nSelected configuration groups: ${selectedGroups.join(', ')}`)

  // Collect selected npm packages
  const selectedPackages = new Set()
  selectedGroups.forEach((group) => {
    if (NPM_PACKAGES[group]) {
      NPM_PACKAGES[group].forEach((pkg) => selectedPackages.add(pkg))
    }
  })

  // Copy selected config files
  let copiedFiles = 0
  selectedGroups.forEach((group) => {
    console.log(`\n📦 Copying ${group} configuration files:`)

    CONFIG_FILES[group].forEach(({ src, dest }) => {
      if (copyFile(src, dest, targetDir)) {
        copiedFiles++
      }
    })
  })

  if (copiedFiles === 0) {
    console.error('❌ No configuration files were copied.')
    rl.close()
    process.exit(1)
  }

  // Update package.json
  if (updatePackageJson(targetDir)) {
    console.log('')
    console.log('📦 Install required npm packages in the target project:')
    console.log(`npm install --save-dev ${Array.from(selectedPackages).join(' ')}`)
    console.log('')
  }

  // Setup git commit template if commit config was selected
  if (selectedGroups.includes('commitAndHusky')) {
    setupGitTemplate(targetDir)
  }

  console.log('')
  console.log('✅ Project configuration setup complete!')
  console.log('')
  console.log('Next steps:')
  console.log('1. Install the required npm packages in the target project')
  console.log('2. Run "git add ." to stage the new files')
  console.log('3. Commit the changes with "npm run commit"')

  rl.close()
}

main()
