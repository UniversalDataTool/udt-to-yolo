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
  await mkdirp(path.join(outputDir, `sample_${sampleIndex}`))

  if (!sample?.annotation?.keyframes)
    throw new Error("No annotation/keyframes in sample!")

  const { videoPath, deleteVideo } = await downloadVideo(sample.videoUrl)

  const frames = await convertVideoToFrames(videoPath)

  for (const frame of frames) {
    console.log(`Computing sample ${sampleIndex} frame ${frameIndex}`)
    const regions = getImpliedVideoRegions(
      sample.annotation.keyframes,
      frame.time
    )
    const yoloTxt = await getYOLOBoundingBoxesFromUDTRegions(regions, labels)
    fs.writeFileSync(frame.framePath.replace(/\.(png|jpg)$/, ".txt"), yoloTxt)
  }

  await deleteVideo()
}

export default convertUDTVideoSampleToYOLO
