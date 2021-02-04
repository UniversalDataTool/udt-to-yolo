const yargs = require("yargs")
const fs = require("fs")
const path = require("path")
const mkdirp = require("mkdirp")
const { udtToYolo } = require("./index.js")

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
  console.log("Main function ...")
  const ds = JSON.parse(fs.readFileSync(pathToFile))
  const fileName = path.basename(pathToFile).split(".").slice(0, -1).join(".")
  await mkdirp(outputDir)

  const data = await udtToYolo(ds)
  // const outputPath = `${outputDir}/${fileName}`
  // console.log(`Outputting to: ${outputPath}`)
  // fs.writeFileSync(outputPath, data)

  process.exit(0)
}

main()
