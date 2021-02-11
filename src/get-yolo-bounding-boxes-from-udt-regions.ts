import { Region } from "./types"

export async function getYOLOBoundingBoxesFromUDTRegions(
  regions: Array<Region>,
  labels: Array<string>
) {
  return regions
    .filter((r) => r.type === "bounding-box")
    .filter((r) => labels.includes(r.classification))
    .map((r) => [labels.indexOf()])
}

export default getYOLOBoundingBoxesFromUDTRegions
