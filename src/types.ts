export interface BaseSample {
  annotation?: any
}
export interface ImageSample extends BaseSample {
  imageUrl: string
}
export interface VideoSample extends BaseSample {
  videoUrl: string
}

export type Sample = ImageSample | VideoSample

export type DatasetInterfaceType =
  | "image_segmentation"
  | "image_classification"
  | "video_segmentation"

export type Dataset = {
  interface: {
    labels: Array<string | { id: string }>
    type: DatasetInterfaceType
  }
  samples: Array<Sample>
}

export interface BaseRegion {
  id: string | number
  classification?: string
  locked?: boolean
  visible?: boolean
  color: string
  editingLabels?: boolean
  highlighted?: boolean
  tags?: Array<string>
}

export interface Box extends BaseRegion {
  regionType: "bounding-box"
  centerX: number
  centerY: number
  width: number
  height: number
}

export type Region = Box
