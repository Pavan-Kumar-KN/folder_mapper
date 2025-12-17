import { CompletionInfoFlags } from "typescript";
import yargs from "yargs";
import { hideBin } from 'yargs/helpers';

// const { create_note_handler } = require('./handler');

yargs(hideBin(process.argv))
    .command(
        "run <note>",
        "Print the basic structure of the current directory",
        (yargs) => yargs.positional("note", {
            description: "The current directory structure",
            type: "string"
        }),
        (argv) => console.log(argv.note)
    )
    .parse();