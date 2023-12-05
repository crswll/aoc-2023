const fs = require('fs')
const path = require('path')
const input = fs.readFileSync(path.join(__dirname, "/input.txt")).toString()
const { inspect } = require('util')
const log = args => console.log(inspect(args, { colors: false, depth: 2, maxArrayLength: 50 }))

function getRegexMatches (input, regex) {
  const REGEX = new RegExp(regex, 'g')
  const matches = []
  let match

  while((match = REGEX.exec(input)) !== null) {
    matches.push(match)
  }
  return matches
}

const getMatches = line => {
  return [
    ...getRegexMatches(line, /\d+/).map(match => ({
      type: 'number',
      match: match[0],
      start: match.index,
      end: match.index + match[0].length,
    })),
    ...getRegexMatches(line, /[^\d|.]/).map(match => ({
      type: 'symbol',
      match: match[0],
      start: match.index,
      end: match.index + match[0].length,
    }))
  ]
}

function partOne (input) {
  const lineMatches = input
    .trim()
    .split("\n")
    .map(getMatches)

  const results = []

  for (let i = 0; i < lineMatches.length; i++) {
    const numbers = lineMatches[i].filter(m => m.type === 'number')

    results.push(
        numbers
          .filter(number => {
            const neighborLineSymbols = [
              ...(lineMatches[i - 1] ?? []),
              ...(lineMatches[i + 1] ?? []),
            ].filter(m => m.type === 'symbol')

            const hasNeighborMatches = neighborLineSymbols
              .some(symbol => symbol.start >= number.start - 1 && symbol.start <= number.end)

            const hasSameLineMatches = lineMatches[i]
              .filter(match => match.type === 'symbol')
              .some(symbol => symbol.start === number.end || symbol.end === number.start)

            return hasNeighborMatches || hasSameLineMatches
          })
    )
  }

  log(results)
  return results.flat().reduce((sum, n) => sum + +n.match, 0)
}

log(partOne(input))
// eh, will try partTwo when I feel like it.

