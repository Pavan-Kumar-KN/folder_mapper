import yargs from "yargs";
import { hideBin } from 'yargs/helpers';
import { scan_dir_build_tree } from "../handlers/handler";
import { printHelp } from "../../utils/helper";


yargs(hideBin(process.argv))
  .command(
    "run <path> <output_path>",
    "Print the basic structure of the current directory",
    (yargs) => {
      return yargs.positional("path", {
        description: "The current directory structure",
        type: "string"
      }).positional("output_path", {
        description: "The output path",
        type: "string"
      })
    },
    (argv) => {        
      scan_dir_build_tree(argv.path as string, argv.output_path as string, argv.ignore as string)
    }
  )
  .option('help', {
    alias: 'h',
    describe: 'Show help',
    type: 'boolean',
    default: false
  })
  .version('1.0.0')
  .alias('version', 'v')
  .help(false)
  .middleware((argv) =>{
    if(argv.help){
      printHelp();
      process.exit(0);
    }
  })
    .parse(); 