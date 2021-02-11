import mkdirp from "mkdirp"
import path from "path"
import { DatasetInterfaceType, Dataset, VideoSample } from "./types"
import fs from "fs"
import convertUDTSampleToYOLO from "./convert-udt-video-sample-to-yolo"

export async function convertUDTFileToYOLODirectory(
  udtJSON: Dataset,
  outputDir: string
) {
  await mkdirp(outputDir)

  const datasetType: DatasetInterfaceType = udtJSON?.interface?.type

  if (datasetType !== "video_segmentation")
    throw new Error("Currently only video segmentation is supported")

  const labels = udtJSON.interface.labels.map((l) =>
    typeof l === "string" ? l : l.id
  )

  for (let i = 0; i < udtJSON.samples.length; i++) {
    const sample = udtJSON.samples[i] as VideoSample
    await convertUDTSampleToYOLO({ sample, index: i, outputDir, labels })
  }

  // TODO output top-level labels directory
  fs.writeFileSync(path.join(outputDir, "labels.txt"), labels.join("\n"))
}

export default convertUDTFileToYOLODirectory
