import { Payload } from "payload"

export const loadCollection = async (payload:Payload, collection:string) => {
const keyMap = new Map<string, any>()
  let page = 1
  let hasNext = true
     page = 1
  hasNext = true

  while (hasNext) {
    const res = await payload.find({
      collection,
      limit: 100,
      page,
      depth: 0,
    })

    for (const doc of res.docs) {
      if (doc.identityKey) {
        keyMap.set(String(doc.identityKey), doc)
      }
    }

    hasNext = res.hasNextPage
    page++
  }
    return keyMap
}