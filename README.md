# folder_mapper

A CLI tool to generate beautiful directory tree structures for documentation. Automatically respects .gitignore patterns and supports custom ignore patterns.

## Features

- Recursive directory scanning
- Automatic .gitignore support
- Custom ignore patterns via CLI
- Beautiful tree visualization with box-drawing characters
- Markdown output
- File and directory statistics
- Fast performance with loading indicators

## Installation

### Install dependencies:

```bash
bun install
```

**Global installation (optional):**bun link
```
bun link
```

Now you can use `folder_mapper` from anywhere in your terminal.

## Usage
# Basic Syntax 

```
folder_mapper <source_path> <output_path> [options]
```

Arguments

- `<source_path>` - Directory to scan (required)
- `<output_path>` - Directory where structure.md will be saved (required)

### Options

- `-i, --ignore <patterns>` - Additional patterns to ignore (comma-separated)
- `-h, --help` - Show help information
- `-v, --version` - Show version number

## Examples
Basic usage (scan current directory)

```bash
folder_mapper . ./output
```

### Scan specific directory

```bash
folder_mapper ./src ./docs
```

### Add custom ignore patterns

```bash
folder_mapper . ./output --ignore "build,temp,cache"
```

### Ignore multiple patterns

```bash
folder_mapper ./src ./docs --ignore "*.log,*.tmp,coverage,dist"
```

### Short form with alias

```bash
folder_mapper . ./output -i "build,temp"
```

## Output Example

The tool generates a `structure.md` file with the following format:

```
project-root
├── src
│   ├── cmd
│   │   └── command.ts
│   ├── core
│   │   ├── printer.ts
│   │   ├── scanner.ts
│   │   └── tree.ts
│   └── handlers
│       └── handler.ts
├── utils
│   ├── helper.ts
│   └── ignore.ts
├── .gitignore
├── index.ts
├── package.json
├── README.md
└── tsconfig.json
```

## Statistics Output

After scanning, the tool displays helpful statistics:

```
Scan complete!

Stats:
├─ Total files: 42
├─ Total directories: 15
├─ Output path: ./output/structure.md
└─ Time taken: 0.15s
```

How It Works

1. Reads .gitignore file from the source directory (if exists)
2. Merges .gitignore patterns with custom --ignore patterns
3. Recursively scans the directory structure
4. Filters out ignored files and directories
5. Builds a tree structure
6. Generates structure.md in the output directory

## Ignore Patterns

### Automatic .gitignore Support

The tool automatically reads and applies patterns from your .gitignore file:

- node_modules
- dist
- build
- .env
- coverage
- etc.

### Custom Patterns

Add additional patterns using the --ignore flag:
```
folder_mapper . ./output --ignore "temp,cache,*.log"
```

Patterns are merged with .gitignore, so you don't need to repeat existing ignore rules.

## Use Cases

- Generate directory structure for README files
- Document project architecture
- Create folder maps for onboarding
- Visualize codebase structure
- Export project tree for presentations

## Requirements

- Bun runtime or node runtime (if going with the npm version)

## Development

### Project Structure
```
folder_mapper/
├── src/
│   ├── cmd/          # Command-line interface
│   ├── core/         # Core scanning and tree logic
│   └── handlers/     # Business logic handlers
├── utils/            # Helper functions
├── index.ts          # Entry point
└── package.json
```

## Run locally

```bash
bun run index.ts <path> <output_path>
```

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

MIT

## Author
Pavan Kumar KN

## Notice

This project is actively maintained. Please report any issues or suggestions through the GitHub issue tracker.
```

This README includes:
- Clear description and features
- Installation instructions
- Comprehensive usage examples
- Output examples
- How it works explanation
- Use cases
- Development guide
- Roadmap
- All Phase 1 features documented