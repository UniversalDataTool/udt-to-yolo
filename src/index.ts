import mkdirp from "mkdirp"
import path from "path"
import { DatasetInterfaceType, Dataset } from "./types"
import fs from "fs"
import convertUDTSampleToYOLO from "./convert-udt-video-sample-to-yolo"

export async function udtToYOLODirectory(udtJSON: Dataset, outputDir: string) {
  await mkdirp(outputDir)

  const datasetType: DatasetInterfaceType = udtJSON?.interface?.type

  if (datasetType !== "video_segmentation")
    throw new Error("Currently only video segmentation is supported")

  const labels = udtJSON.interface.labels
    .map((l) => (typeof l === "string" ? l : l.id))
    .join("\n")

  for (let i = 0; i < udtJSON.samples.length; i++) {
    const sample = udtJSON.samples[i]
    await convertUDTSampleToYOLO({ sample, index: i, outputDir })
  }

  // TODO output top-level labels directory
  fs.writeFileSync(path.join(outputDir, "labels.txt"), labels.join("\n"))
}
