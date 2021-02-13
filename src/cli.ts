import yargs from "yargs"
import fs from "fs"
import path from "path"
import udtToYOLODirectory from "./index"

const { argv } = yargs
  .usage("Usage: $0 path/to/dataset.udt.json -o yolo-output-dir")
  .option("output-dir", {
    alias: "o",
    describe: "Output directory for Yolo files",
  })
  .demandOption(["o"])

const {
  _: [pathToFile],
  outputDir,
} = argv

async function main() {
  const ds = JSON.parse(fs.readFileSync(pathToFile).toString())
  const fileName = path
    .basename(pathToFile as string)
    .split(".")
    .slice(0, -1)
    .join(".")

  await udtToYOLODirectory(ds, outputDir as string)
  console.log("done!")
}

main()
