import { VideoSample } from "./types"
import mkdirp from "mkdirp"
import path from "path"
import getImpliedVideoRegions from "./get-implied-video-regions"

interface Params {
  sample: VideoSample
  index: number
  outputDir: string
}

export async function convertUDTVideoSampleToYOLO({
  sample,
  index,
  outputDir,
}: Params) {
  await mkdirp(path.join(outputDir, `sample_${index}`))

  if (!sample?.annotation?.keyframes)
    throw new Error("No annotation/keyframes in sample!")

  // TODO create temporary directory
  // TODO download video to temporary directory

  // TODO convert video to frames

  // TODO get fps of video

  // for each frame
  //     interpolatedRegions = getImpliedVideoRegions(sample.annotation.keyframes, t)
  //     yoloTxt  = getYOLOBoundingBoxesFromRegions(interpolatedRegions)
  //     write yolo txt
}

export default convertUDTVideoSampleToYOLO
