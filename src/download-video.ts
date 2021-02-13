import tmp from "tmp"
import rimraf from "rimraf"
import path from "path"
import fs from "fs"
import download from "download"

const videoCacheDir = process.env.VIDEO_CACHE_DIR

export const downloadVideo = async (videoUrl: string) => {
  let tmpObj: any, targetDir: any
  if (videoCacheDir) {
    targetDir = videoCacheDir
  } else {
    tmpObj = tmp.dirSync()
    targetDir = tmpObj.name
  }

  const videoName = path.basename(new URL(videoUrl).pathname)

  if (!fs.existsSync(path.join(targetDir, videoName))) {
    console.log(`Downloading ${videoUrl}...`)
    await download(videoUrl, targetDir)
  } else {
    console.log(`Using cached ${videoUrl}...`)
  }

  return {
    videoPath: path.join(targetDir, videoName),
    videoName,
    deleteVideo: async () => {
      if (tmpObj) {
        await new Promise((resolve) => rimraf(targetDir, resolve))
      }
    },
  }
}

export default downloadVideo
