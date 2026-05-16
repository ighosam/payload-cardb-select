import { fieldBaseClass } from "@payloadcms/ui"
import { Payload,Collection,NumberField } from "payload"

export const seedYears = async (payload:Payload,collectionSlug:string)=>{

  const collection:Collection = payload.collections['car-years']
  const fld = collection.config.fields

 /////////////////////////////

let min = 0
let max = 0

for (const fd of fld) {
  // make sure the field is a number field
  if (fd.type === 'number') {
    const numberField = fd as NumberField

    if (typeof numberField.min === 'number') {
      min = numberField.min
    }

    if (typeof numberField.max === 'number') {
      max = numberField.max
    }
  }
}

console.log({ min, max })

 //////////////////////////////////
 
  for (let year = min; year <= max; year++) {
  await payload.create({
    collection: collectionSlug,
    data: {
      year,
    },
  })
}

}