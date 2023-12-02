const fs = require('fs')
const path = require('path')
const input = fs.readFileSync(path.join(__dirname, "/input.txt")).toString()

function getGameResults (game) {
  const results = []

  game.split('; ').forEach(turn => {
    const totals = { red: 0, blue: 0, green: 0 }
    turn.split(', ').forEach(result => {
      const [count, color] = result.split(' ')
      totals[color] += +count
    })
    results.push(totals)
  })

  return results
}

function partOne (input, contains) {
  return input
    .trim()
    .split("\n")
    .map(game => game.slice(5).split(': '))
    .map(([id, game]) => ({
      id: +id,
      results: getGameResults(game)
    }))
    .filter(game => game.results.every(result => (
      contains.red >= result.red &&
      contains.green >= result.green &&
      contains.blue >= result.blue
    )))
    .reduce((sum, game) => sum += game.id, 0)
}

function partTwo (input) {
  return input
    .trim()
    .split("\n")
    .map(game => game.slice(5).split(': '))
    .map(([, game]) => getGameResults(game))
    .map(results => [
      Math.max(...results.map(game => game.red)),
      Math.max(...results.map(game => game.blue)),
      Math.max(...results.map(game => game.green)),
    ])
    .reduce((sum, max) => sum + max[0] * max[1] * max[2], 0)
}

console.log(partOne(input, { red: 12, green: 13, blue: 14 }))
console.log(partTwo(input))
