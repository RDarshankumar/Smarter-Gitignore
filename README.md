# Smart GitIgnore

**Automatically scan your workspace, detect technologies, and generate or update `.gitignore` files — instantly.**

No more manual editing. No more duplicate entries. No more forgotten secrets accidentally pushed to GitHub.

---

## What Does This Extension Do?

Smart GitIgnore scans your open project, figures out what technologies you are using, and generates a clean, grouped, sorted `.gitignore` file tailored specifically to your project.

It works for **13+ technologies** out of the box, detects secrets, logs, databases, large media files, and generated folders — all automatically.

---

## Supported Technologies

| Technology | Detected By | What Gets Ignored |
|---|---|---|
| **Node.js** | `package.json`, `package-lock.json`, `.nvmrc` | `node_modules/`, `dist/`, `build/`, `.npm`, `.yarn` |
| **React** | `react` in `package.json` dependencies | `build/`, `coverage/`, `.nyc_output/` |
| **Next.js** | `next.config.js`, `next` in dependencies | `.next/`, `out/`, `.vercel`, `next-env.d.ts` |
| **Angular** | `angular.json`, `@angular/core` in deps | `.angular/`, `dist/`, `out-tsc/`, `coverage/` |
| **Vue.js** | `vue.config.js`, `vue` in dependencies | `.nuxt/`, `.output/`, `dist/`, `.vuepress/dist` |
| **Flutter / Dart** | `pubspec.yaml` | `.dart_tool/`, `.pub/`, `build/`, `*.g.dart`, `*.freezed.dart` |
| **Python** | `requirements.txt`, `setup.py`, `pyproject.toml`, `Pipfile` | `__pycache__/`, `*.pyc`, `venv/`, `.venv/`, `.mypy_cache/`, `.pytest_cache/` |
| **Java / Maven / Gradle** | `pom.xml`, `build.gradle`, `gradlew` | `target/`, `.gradle/`, `*.class`, `*.jar`, `bin/`, `out/` |
| **Laravel / PHP** | `composer.json` + `artisan` | `vendor/`, `storage/logs`, `bootstrap/cache`, `.phpunit.result.cache` |
| **Go** | `go.mod` | `vendor/`, `bin/`, `*.exe`, `*.out` |
| **Rust** | `Cargo.toml` | `target/`, `*.rs.bk`, `Cargo.lock` |
| **.NET / C#** | `*.csproj`, `*.sln`, `global.json` | `bin/`, `obj/`, `.vs/`, `packages/`, `*.nupkg` |
| **Docker** | `Dockerfile`, `docker-compose.yml` | `docker-compose.override.yml` |

---

## Auto-Detected File Categories

Even if no specific technology is detected, Smart GitIgnore automatically handles these categories:

### Secrets & Credentials
Files that should **never** be committed to any repository:

```
.env                      .env.local
.env.development          .env.production
.env.test                 .env.staging
*.pem                     *.key
*.crt                     *.p12
*.jks                     firebase-admin.json
google-services.json      GoogleService-Info.plist
serviceAccount.json       auth.json
*secret*                  *credential*
```

### Log Files
```
*.log       logs/        log/
npm-debug.log*           yarn-debug.log*
yarn-error.log*          pnpm-debug.log*
lerna-debug.log*
```

### Database Files
```
*.sqlite     *.sqlite3     *.db
*.db3        *.s3db        *.sl3
```

### Cache Directories
```
.cache/      .parcel-cache/    .turbo/
.vercel/     .firebase/        .netlify/
```

### IDE & Editor Files
```
.idea/       .vscode/      *.swp     *.swo
.project     .classpath    .settings/
*.suo        *.user        .vs/
```

### OS Generated Files
```
.DS_Store    .DS_Store?    ._*
Thumbs.db    desktop.ini   ehthumbs.db
```

### Large Media Files (50MB+)
If files larger than 50MB are detected, Smart GitIgnore suggests ignoring:
```
*.zip    *.rar    *.7z    *.mp4
*.mov    *.avi    *.iso   *.tar.gz
```

---

## Commands

Open the **Command Palette** (`Ctrl+Shift+P` on Windows/Linux, `Cmd+Shift+P` on Mac) and type **Smart GitIgnore**:

| Command | What It Does |
|---|---|
| `Smart GitIgnore: Generate .gitignore` | Scans workspace and creates a fresh `.gitignore` from scratch. Shows a confirm dialog before writing. |
| `Smart GitIgnore: Update .gitignore` | Scans workspace and **only adds missing rules** to your existing `.gitignore`. Never removes your custom rules. |
| `Smart GitIgnore: Preview Generated .gitignore` | Opens a read-only preview of what will be generated — without writing anything to disk. |
| `Smart GitIgnore: Remove Duplicate Entries` | Cleans up duplicate lines in your existing `.gitignore` while preserving all comments and custom sections. |
| `Smart GitIgnore: Analyze Workspace` | Shows a detailed report of detected technologies, generated folders, and large files in your project. |

---

## Status Bar

A status indicator is always visible in the bottom-left of VS Code:

| Status | Meaning |
|---|---|
| `✓ GitIgnore Ready` | Extension is active and ready |
| `⟳ GitIgnore Scanning...` | Scanning workspace files |
| `⟳ GitIgnore Generating...` | Writing rules to disk |
| `✗ GitIgnore Error` | Something went wrong — click to retry |

Clicking the status bar item runs **Update .gitignore** instantly.

---

## Extension Settings

Go to **File → Preferences → Settings** and search for `smartGitIgnore`:

| Setting | Default | Description |
|---|---|---|
| `smartGitIgnore.autoGenerate` | `false` | Auto-generate `.gitignore` every time a workspace opens |
| `smartGitIgnore.autoUpdate` | `false` | Auto-update `.gitignore` every time a workspace opens |
| `smartGitIgnore.detectSecrets` | `true` | Detect and add rules for secret/credential files |
| `smartGitIgnore.detectLargeFiles` | `true` | Detect files larger than 50MB and suggest ignoring them |
| `smartGitIgnore.detectDatabaseFiles` | `true` | Detect and ignore local SQLite/database files |
| `smartGitIgnore.detectLogs` | `true` | Detect and ignore log files |
| `smartGitIgnore.sortRules` | `true` | Sort rules alphabetically within each category group |
| `smartGitIgnore.groupRules` | `true` | Group rules by category with section comments |

### Example settings.json

```json
{
  "smartGitIgnore.autoUpdate": true,
  "smartGitIgnore.detectSecrets": true,
  "smartGitIgnore.detectLargeFiles": true,
  "smartGitIgnore.groupRules": true,
  "smartGitIgnore.sortRules": true
}
```

---

## How It Works — Step by Step

```
1. You open a workspace (or run a command)
         ↓
2. WorkspaceScanner scans root directory and subdirectories (up to 4 levels deep)
         ↓
3. 13 Technology Detectors run in parallel
   Each checks for marker files (package.json, pubspec.yaml, pom.xml, etc.)
         ↓
4. RuleBuilder maps each detected technology to its template rules
   Common rules (secrets, logs, IDE, OS) are always included
         ↓
5. GitignoreUpdater merges new rules with existing .gitignore
   Existing custom rules and comments are preserved
   Only missing rules are appended
         ↓
6. DuplicateCleaner runs a final dedup pass
         ↓
7. You confirm → file is written to disk
```

---

## Generated .gitignore Example

For a **Next.js + TypeScript + Docker** project, Smart GitIgnore generates:

```gitignore
# Generated by Smart GitIgnore

# OS generated files
.DS_Store
.DS_Store?
Thumbs.db
desktop.ini

# IDE and Editor files
.idea/
.vscode/
*.swp
*.swo

# Secrets and credentials
.env
.env.local
.env.development
.env.production
.env.test
*.pem
*.key
firebase-admin.json
google-services.json

# Logs
*.log
logs/
npm-debug.log*
yarn-error.log*

# Database files
*.db
*.sqlite
*.sqlite3

# Cache directories
.cache/
.turbo/
.vercel/

# Node.js
node_modules/
.npm
.yarn-integrity

# Build output
dist/
build/
out/
*.tsbuildinfo

# Next.js
.next/
next-env.d.ts

# Docker
docker-compose.override.yml
```

---

## Smart Merge — Existing .gitignore is Safe

If you already have a `.gitignore` with custom rules:

```gitignore
# My custom rules
my-secret-config.json
uploads/
```

Smart GitIgnore will **keep** your custom rules and only **append** the missing ones at the bottom. It will never delete or overwrite anything.

---

## Keyboard Shortcuts (Optional)

You can bind commands to keyboard shortcuts via **File → Preferences → Keyboard Shortcuts**:

```json
[
  {
    "key": "ctrl+shift+g ctrl+shift+i",
    "command": "smartGitIgnore.generate"
  },
  {
    "key": "ctrl+shift+g ctrl+shift+u",
    "command": "smartGitIgnore.update"
  }
]
```

---

## Requirements

- **VS Code** version `1.85.0` or higher
- No other dependencies — everything runs locally, no internet required

---

## Privacy

Smart GitIgnore works **100% offline**. It never sends any data anywhere. All scanning and file generation happens locally on your machine.

---

## Troubleshooting

**Extension not detecting my technology?**
Make sure the marker file (e.g., `package.json`, `pubspec.yaml`) is in the **root** of your workspace folder, not in a subfolder.

**My custom rules were removed?**
This should not happen. If it does, please [open an issue](https://github.com/smart-gitignore/smart-gitignore/issues). Always use **Update** (not **Generate**) if you have existing custom rules.

**I want to ignore a file type that's not listed?**
Use **Update .gitignore** and manually add your custom rule. Smart GitIgnore will preserve it on all future updates.

**The status bar shows an error?**
Open the **Output** panel (`View → Output`) and select **Smart GitIgnore** from the dropdown for detailed error logs.

---

## Changelog

### v1.0.0
- Initial release
- Support for 13 technologies: Node, React, Next.js, Angular, Vue, Flutter, Python, Java, Laravel, Go, Rust, .NET, Docker
- Auto-detection of secrets, logs, databases, cache, IDE files, OS files
- Smart merge — never overwrites existing custom rules
- Duplicate cleaner
- Status bar indicator
- 8 configurable settings
- Preview before write
- Workspace analysis command

---

## License

MIT License — free to use, modify, and distribute.
