import path from "path"
import fs from "fs"
import probe from "node-ffprobe"
import ffmpeg from "fluent-ffmpeg"

interface FrameDescription {
  framePath: string // path to png/jpg file
  time: number // time in ms since start of video where frame occurred
  frameIndex: number
}

interface Params {
  videoPath: string
  framesDir: string
}

export const convertVideoToFrames = async ({
  videoPath,
  framesDir,
}: Params): Promise<Array<FrameDescription>> => {
  console.log(`Using ffprobe to probe ${videoPath}`)
  const probeData = await probe(videoPath)
  const videoStream = probeData.streams.find(
    (s: any) => s.codec_type === "video"
  )
  if (!videoStream)
    throw new Error("ffprobe was unable to find a video codec to determine fps")
  let fps: number = 1
  try {
    fps = eval(videoStream.avg_frame_rate)
  } catch (e) {
    throw new Error(
      `Error when parsing avg_frame_rate from ffprobe, should be like 25/1 but got: ${videoStream.avg_frame_rate}`
    )
  }
  if (!fps) throw new Error(`Invalid FPS: ${fps}`)

  console.log(`Extracting frames of ${videoPath} to ${framesDir}`)
  await new Promise((resolve) => {
    ffmpeg()
      .input(videoPath)
      .output(path.join(framesDir, `frame-%06d.jpg`))
      .on("end", () => resolve(null))
      .run()
  })

  return fs.readdirSync(framesDir).map((fileName) => {
    const frameIndex = parseInt(fileName.split("-")[1].split(".")[0])
    return {
      framePath: path.join(framesDir, fileName),
      frameIndex,
      time: frameIndex * (1 / fps),
    }
  })
}

export default convertVideoToFrames
