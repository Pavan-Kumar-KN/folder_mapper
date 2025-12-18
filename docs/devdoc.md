```
├── docs
│   └── features
│       ├── features.md
│       └── roadmap.md
├── example
│   ├── devtest.ts
│   └── example.ts
├── scripts
│   └── build.js -> custom script for building the project and generating compiled code
├── src
│   ├── cmd
│   │   └── command.ts
│   ├── core
│   │   ├── printer.ts
│   │   ├── scanner.ts
│   │   └── tree.ts
│   └── handlers
│       └── handler.ts
├── tests
│   ├── helpers
│   │   ├── fixture.ts
│   │   └── renamefiles.ts
│   ├── helper.test.ts
│   ├── ignore.test.ts
│   ├── printer.test.ts
│   ├── scanner.test.ts
│   └── tree.test.ts
├── utils
│   ├── helper.ts
│   └── ignore.ts
├── .gitignore
├── .npmignore
├── bun.lock
├── bunfig.toml  -> configured the /tests folder for testing purposes
├── dev.ts     -> Developement Entry run typescript with bun
├── index.ts   -> this file will be compiled to index.js
├── LICENSE
├── package.json
├── README.md
├── tsconfig.build.json  -> custom build configuration file
├── tsconfig.json
└── types.d.ts

```