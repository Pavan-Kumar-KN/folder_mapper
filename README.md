# folder_mapper

To install dependencies:

```bash
bun install
```

## Usage 

```
folder_mapper <source_path> <output_structure>
```

Output: 
```
├── node_modules
│   ├── .bin
│   │   ├── tsc.bunx
│   │   ├── tsc.exe
│   │   ├── tsserver.bunx
│   │   └── tsserver.exe
│   └── @types
│       └── bun
│           ├── LICENSE
│           ├── README.md
│           ├── index.d.ts
│           └── package.json
├── .gitignore
├── bun.lock
├── index.ts
└── temp.ts
```

### Notice
Still in the development phase. Please report any issues or suggestions.
