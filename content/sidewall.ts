export const loadRatings = [
  [88, 560], [89, 580], [90, 600], [91, 615], [92, 630], [93, 650], [94, 670],
  [95, 690], [96, 710], [97, 730], [98, 750], [99, 775], [100, 800], [101, 825],
  [102, 850], [103, 875], [104, 900],
] as const;

export const speedRatings = [
  ['Q', 160], ['R', 170], ['S', 180], ['T', 190], ['H', 210], ['V', 240], ['W', 270], ['Y', 300],
] as const;

interface Segment {
  id: string;
  text: string;
  /** Typographic separator preceding the value in the complete size code. */
  prefix: string;
  label: string;
  explanation: string;
}

export const sidewall: Segment[] = [
  { id: 'width', text: '225', prefix: '', label: 'Section width', explanation: '225 mm across the tyre at its widest point, measured from sidewall to sidewall.' },
  { id: 'aspect', text: '45', prefix: '/', label: 'Aspect ratio', explanation: 'The sidewall height is 45% of the section width.' },
  { id: 'construction', text: 'R', prefix: ' ', label: 'Construction', explanation: 'R stands for radial. The cords run across the tyre from bead to bead.' },
  { id: 'diameter', text: '17', prefix: '', label: 'Rim diameter', explanation: 'This tyre fits a wheel with a 17-inch bead-seat diameter.' },
  { id: 'load', text: '94', prefix: ' ', label: 'Load index', explanation: 'Index 94 is rated for up to 670 kg per tyre at the specified pressure.' },
  { id: 'speed', text: 'W', prefix: '', label: 'Speed rating', explanation: 'W is rated to 270 km/h under test conditions. Match the vehicle placard and obey posted limits.' },
];

export const exampleSize = sidewall.map(({ prefix, text }) => prefix + text).join('');
