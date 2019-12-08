export function isValidDirection(direction) {
  return !Object.values(DIRECTIONS).includes(direction);
}

const DIRECTIONS = {
  NORTH: 'N',
  SOUTH: 'S'
}

export default DIRECTIONS;