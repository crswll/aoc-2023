const fs = require('fs')
const path = require('path')
const input = fs.readFileSync(path.join(__dirname, "/input.txt")).toString()

const needles = [
  'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  '1', '2', '3', '4', '5', '6', '7', '8', '9'
]

function run (input) {
  const lines = input.split('\n')
  let sum = 0

  lines.forEach(line => {
    let lowestLineIndex
    let highestLineIndex

    needles.forEach((needle, needleIndex) => {
      const lowIndex = line.indexOf(needle)
      const highIndex = line.lastIndexOf(needle)

      if (lowIndex > -1) {
        if (lowestLineIndex) {
          if (lowIndex < lowestLineIndex[0]) {
            lowestLineIndex = [lowIndex, needleIndex]
          }
        } else {
          lowestLineIndex = [lowIndex, needleIndex]
        }
      }

      if (highIndex > -1) {
        if (highestLineIndex) {
          if (highIndex > highestLineIndex[0]) {
            highestLineIndex = [highIndex, needleIndex]
          }
        } else {
          highestLineIndex = [highIndex, needleIndex]
        }
      }
    })

    if (lowestLineIndex) {
      const stringNumberFirst = needles[lowestLineIndex[1] < 9 ?  lowestLineIndex[1] + 9 : lowestLineIndex[1]]
      const stringNumberLast = needles[highestLineIndex[1] < 9 ?  highestLineIndex[1] + 9 : highestLineIndex[1]]
      sum += Number([stringNumberFirst, stringNumberLast].join(''))
    }
  })

  return sum
}

console.log(run(input), run(input) === 55291)
