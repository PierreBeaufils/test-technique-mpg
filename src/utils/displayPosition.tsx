interface PositionType {
  [id: number]: string
}

const positions: PositionType = {
  10: "G",
  20: "D",
  21: "L",
  30: "MD",
  31: "MO",
  40: "A",
}

//Display correct string position depending on ultraPositionId
const displayPosition = (ultraPosition: number): string => {
  return positions[ultraPosition]
}

export default displayPosition
