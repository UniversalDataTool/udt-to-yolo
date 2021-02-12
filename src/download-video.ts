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

  const fileName = path.basename(new URL(videoUrl).pathname)

  if (!fs.existsSync(path.join(targetDir, fileName))) {
    console.log(`Downloading ${videoUrl}...`)
    await download(videoUrl, targetDir)
  } else {
    console.log(`Using cached ${videoUrl}...`)
  }

  return {
    videoPath: path.join(targetDir, fileName),
    deleteVideo: async () => {
      if (tmpObj) {
        await (rimraf as any)(targetDir as any)
      }
    },
  }
}

export default downloadVideo
