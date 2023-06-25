export default function getDefaultTeesSelected(gender) {
  const defaultMensTeesSelected = {
    dc: [
      { label: 'Club', value: 'C' },
      { label: 'Club/Medal', value: 'C/M' },
      { label: 'Medal', value: 'M' },
    ],
    mg: [
      { label: 'Club', value: 'C' },
      { label: 'Club/Medal', value: 'C/M' },
      { label: 'Medal', value: 'M' },
    ],
    mw: [
      { label: 'Club', value: 'C' },
      { label: 'Club/Medal', value: 'C/M' },
      { label: 'Medal', value: 'M' },
    ],
    or: [
      { label: 'Club', value: 'C' },
      { label: 'Club/Medal', value: 'C/M' },
      { label: 'Medal', value: 'M' },
    ],
    pa: [
      { label: 'Club', value: 'C' },
      { label: 'Club/Medal', value: 'C/M' },
      { label: 'Medal', value: 'M' },
    ],
    tp: [
      { label: 'Club', value: 'C' },
      { label: 'Club/Medal', value: 'C/M' },
      { label: 'Medal', value: 'M' },
    ],
  };
  const defaultWomensTeesSelected = {
    dc: [
      { label: 'Course', value: 'CRS' },
      { label: 'Island', value: 'ISL' },
      { label: 'Skidaway', value: 'SK' },
    ],
    mg: [
      { label: 'Course', value: 'CRS' },
      { label: 'Island', value: 'ISL' },
      { label: 'Skidaway', value: 'SK' },
    ],
    mw: [
      { label: 'Course', value: 'CRS' },
      { label: 'Island', value: 'ISL' },
      { label: 'Skidaway', value: 'SK' },
    ],
    or: [
      { label: 'Course', value: 'CRS' },
      { label: 'Island', value: 'ISL' },
      { label: 'Skidaway', value: 'SK' },
    ],
    pa: [
      { label: 'Course', value: 'CRS' },
      { label: 'Island', value: 'ISL' },
      { label: 'Skidaway', value: 'SK' },
    ],
    tp: [
      { label: 'Course', value: 'CRS' },
      { label: 'Island', value: 'ISL' },
      { label: 'Skidaway', value: 'SK' },
    ],
  };
  switch (gender) {
    case 'Male':
    case 'M':
      return defaultMensTeesSelected;
      break;
    case 'Female':
    case 'F':
      return defaultWomensTeesSelected;
      break;
    default:
  }
}
