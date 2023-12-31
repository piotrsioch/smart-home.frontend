export const roomTypes = [
  'Living Room',
  'Kitchen',
  'Bedroom',
  'Bathroom',
  'Dining Room',
  'Home Office',
  'Garage',
  'Basement',
  'Attic',
  'Hallway',
  'Laundry Room',
  'Play Room',
  'Storage Room',
  'Gym',
  'Garden',
  'Balcony',
  'Other'
];

export const roomIcons = [
  'living-room',
  'kitchen',
  'bedroom',
  'bathroom',
  'kitchen',
  'home-office',
  'garage',
  'basement',
  'attic',
  'hallway',
  'laundry-room',
  'play-room',
  'storage-room',
  'gym',
  'garden',
  'balcony',
  'home-office',
  'home'
];

export const roomTypeIconMap = roomTypes.reduce((acc, roomType, index) => {
  acc[roomType] = roomIcons[index];
  return acc;
}, {} as { [key: string]: string });
