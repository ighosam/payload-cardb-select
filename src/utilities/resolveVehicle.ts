import { normalizeID } from "./normalize";

export const resolveVehicle = async ({
  payload,
  year,
  trim,
}: {
  payload: any;
  year: number;
  trim?: string;
}) => {
  const yearID = normalizeID(year);
  const trimID = trim ? normalizeID(trim) : null;

  // 1️⃣ Try to reuse existing vehicle
  const existing = await payload.find({
    collection: 'vehicles',
    limit: 1,
    where: {
      and: [
        { year: { equals: yearID } },
        trimID
          ? { trim: { equals: trimID } }
          : { trim: { exists: false } },
      ],
    },
  });

  if (existing.docs.length) {
    //return existing.docs[0].id;
      return {vehicleId:existing.docs[0].id, title: existing.docs[0].title}
  }

  // 2️⃣ Load year with model + make
  const yearDoc = await payload.findByID({
    collection: 'car-years',
    id: yearID, // ✅ always primitive
    depth: 2,
  });

  if (!yearDoc || typeof yearDoc.model !== 'object') {
    throw new Error('Invalid year → model relationship');
  }

  // 3️⃣ Optional trim
  let trimLabel = '';

  if (trimID) {
    const trimDoc = await payload.findByID({
      collection: 'car-trims',
      id: trimID,
      depth: 0,
    });

    if (trimDoc?.label) {
      trimLabel = `-${trimDoc.label}`;
    }
  }

  // 4️⃣ Stable title
  const title = [
    yearDoc.year,
    yearDoc.model.make.make,
    yearDoc.model.model,
    trimLabel.replace('-', ''),
  ]
    .filter(Boolean)
    .join('-');

  // 5️⃣ Create vehicle

  const vehicle = await payload.create({
    collection: 'vehicles',
    data: {
      year: yearID,
      ...(trimID ? { trim: trimID } : {}),
      title,
    },
  });
  
return {vehicleId: vehicle.id,title:title};
};
