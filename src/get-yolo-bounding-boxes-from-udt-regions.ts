import { Region } from "./types"

export async function getYOLOBoundingBoxesFromUDTRegions(
  regions: Array<Region>,
  labels: Array<string>
) {
  return regions
    .filter((r) => r.regionType === "bounding-box")
    .filter((r) => r.classification)
    .filter((r) => labels.includes(r.classification as string))
    .map((r) =>
      [
        labels.indexOf(r.classification as string),
        r.centerX - r.width / 2,
        r.centerY - r.height / 2,
        r.width,
        r.height,
      ].join(" ")
    )
    .join("\n")
}

export default getYOLOBoundingBoxesFromUDTRegions
