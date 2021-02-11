import test from "ava"
import exampleUDTFile from "./example.udt.json"
import convertUDTFileToYOLO from "../src/index"

test("convert to yolo in temporary directory", async (t) => {
  // TODO create temporary directory
  // await convertUDTFileToYOLO(exampleUDTFile, tmpOutputDir)
  // TODO read tmpOutputDir and make sure it has all the files it should have
})
