export const parseTransmission = (label: string) => {
  if (label.includes(' MT')) return 'manual';
  if (label.includes(' AT')) return 'automatic';
  if (label.includes(' CVT')) return 'cvt';
  if (label.includes(' DCT')) return 'dct';
  return undefined;
}

export const parseDrivetrain = (label: string) => {
  if (label.includes('4WD')) return '4wd';
  if (label.includes('AWD')) return 'awd';
  if (label.includes('FWD')) return 'fwd';
  if (label.includes('RWD')) return 'rwd';
  return undefined;
}

export const parseEngine = (label: string) => {
  // matches: 1.4, 2.0, 3.5 etc
  const displacement = label.match(/(\d\.\d)\s*(?:L)?/i);
  const hp = label.match(/\((\d+)\s*Hp\)/i);

  if (!displacement) return undefined;

  return hp
    ? `${displacement[1]}L (${hp[1]} HP)`
    : `${displacement[1]}L`;
}
