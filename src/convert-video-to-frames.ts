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
  // TODO convert video into frames
  return []
}

export default convertVideoToFrames
