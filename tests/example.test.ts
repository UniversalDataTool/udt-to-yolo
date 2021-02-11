import test from "ava"
import tmp from "tmp"
import exampleUDTFile from "./example.udt"
import convertUDTFileToYOLODirectory from "../src/index"
import { readdir } from "fs/promises"

test("convert to yolo in temporary directory", async (t) => {
  const tmpDir = tmp.dirSync()
  t.teardown(() => tmpDir.removeCallback())

  await convertUDTFileToYOLODirectory(exampleUDTFile, tmpDir.name)

  const files = await readdir(tmpDir.name)

  // TODO make sure it has all the files it should have
  console.log({ files })
})
