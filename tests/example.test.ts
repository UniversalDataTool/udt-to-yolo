import test from "ava"
import path from "path"
import tmp from "tmp"
import exampleUDTFile from "./example.udt"
import convertUDTFileToYOLODirectory from "../src/index"
import { Dataset } from "../src/types"
import rimraf from "rimraf"
import { readdir } from "fs/promises"

test("convert to yolo in temporary directory", async (t) => {
  const tmpDir = tmp.dirSync()
  t.teardown(() => rimraf.sync(tmpDir.name))

  await convertUDTFileToYOLODirectory(exampleUDTFile as Dataset, tmpDir.name)

  const files = await readdir(path.join(tmpDir.name, "sample_0"))

  console.log("files:", files)

  t.assert(files.includes("obj.data"))
  t.assert(files.includes("obj.names"))
  t.assert(files.includes("train.txt"))
  t.assert(files.includes("obj_train_data"))

  const trainDataFiles = await readdir(
    path.join(tmpDir.name, "sample_0", "obj_train_data")
  )

  console.log("train data files length:", trainDataFiles.length)
  t.assert(trainDataFiles.length === 264)

  t.assert(
    trainDataFiles.map((f) => f.endsWith(".txt")).length ==
      trainDataFiles.map((f) => f.endsWith(".jpg")).length
  )
})
