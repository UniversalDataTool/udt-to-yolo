import { VideoSample } from "./types"
import mkdirp from "mkdirp"
import path from "path"
import downloadVideo from "./download-video"
import convertVideoToFrames from "./convert-video-to-frames"
import getImpliedVideoRegions from "./get-implied-video-regions"
import getYOLOBoundingBoxesFromUDTRegions from "./get-yolo-bounding-boxes-from-udt-regions"
import fs from "fs"

interface Params {
  sample: VideoSample
  index: number
  outputDir: string
  labels: Array<string>
}

export async function convertUDTVideoSampleToYOLO({
  sample,
  index: sampleIndex,
  outputDir,
  labels,
}: Params) {
  const sampleDir = path.join(outputDir, `sample_${sampleIndex}`)
  await mkdirp(sampleDir)

  const framesDir = path.join(sampleDir, "obj_train_data")
  await mkdirp(framesDir)

  if (!sample?.annotation?.keyframes)
    throw new Error("No annotation/keyframes in sample!")

  const { videoPath, deleteVideo } = await downloadVideo(sample.videoUrl)

  // --------------------------------
  // GENERATE FRAME IMAGES + TXT FILES WITH BOUNDING BOXES
  // --------------------------------

  const frames = await convertVideoToFrames({ videoPath, framesDir })

  for (const frame of frames) {
    console.log(`Computing sample ${sampleIndex}, frame ${frame.frameIndex}`)
    const regions = getImpliedVideoRegions(
      sample.annotation.keyframes,
      frame.time
    )
    const yoloTxt = await getYOLOBoundingBoxesFromUDTRegions(regions, labels)
    fs.writeFileSync(frame.framePath.replace(/\.(png|jpg)$/, ".txt"), yoloTxt)
  }

  // --------------------------------
  // GENERATE TOP LEVEL FILES
  // --------------------------------

  fs.writeFileSync(
    path.join(sampleDir, "obj.data"),
    `
classes = ${labels.length}
train = data/train.txt
names = data/obj.names
backup = backup/
`.trim()
  )
  fs.writeFileSync(path.join(sampleDir, "obj.names"), labels.join("\n"))
  fs.writeFileSync(
    path.join(sampleDir, "train.txt"),
    frames.map((f) => f.framePath).join("\n")
  )

  // --------------------------------
  // CLEAN UP
  // --------------------------------

  await deleteVideo()
}

export default convertUDTVideoSampleToYOLO
