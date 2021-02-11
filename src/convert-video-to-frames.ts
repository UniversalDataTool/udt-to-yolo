interface FrameDescription {
  framePath: string // path to png/jpg file
  time: number // time in ms since start of video where frame occurred
  frameIndex: number
}

export const convertVideoToFrames = async (
  videoPath: string
): Array<FrameDescription> => {
  // TODO convert video into frames
  return []
}
