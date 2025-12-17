import yargs from "yargs";
import { hideBin } from 'yargs/helpers';
import { scan_dir_build_tree } from "../handlers/handler";


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
      (argv) =>{
        scan_dir_build_tree(argv.path as string, argv.output_path as string , argv.ignore as string)
      }
    )
    .parse(); 