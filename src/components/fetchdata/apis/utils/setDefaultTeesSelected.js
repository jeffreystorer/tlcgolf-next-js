import { get, set } from '@/components/common/utils';

export default function setDefaultTeesSelected(gender) {
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

  if (!get('teesSelected'))
    switch (gender) {
      case 'Male':
      case 'M':
        set('teesSelected', defaultMensTeesSelected);
        break;
      case 'Female':
      case 'F':
        set('teesSelected', defaultWomensTeesSelected);
        break;
      default:
    }
}
