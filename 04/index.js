const fs = require('fs')
const path = require('path')
const input = fs.readFileSync(path.join(__dirname, "/input.txt")).toString().trim().split("\n")
const { inspect } = require('util')
const log = args => console.log(inspect(args, { colors: false, depth: 2, maxArrayLength: 300 }))

function splitOnSpaces (s) {
  return s.trim().split(/\s+/).map(Number)
}

function getGameDetailsByCard (game) {
  const parts = game.split(/[:|\|]/g)
  const id = parts[0].slice(5).trim()
  const winningNumbers = splitOnSpaces(parts[1])
  const gameNumbers = splitOnSpaces(parts[2])

  return { id, winningNumbers, gameNumbers }
}

function getMatchingNumbers ({ winningNumbers, gameNumbers }) {
  return winningNumbers.filter(
    winningNumber => gameNumbers.includes(winningNumber)
  )
}

function partOne (input) {
  return input
    .map(getGameDetailsByCard)
    .map(getMatchingNumbers)
    .map(matchingNumbers => matchingNumbers.length > 0 ? 2 ** (matchingNumbers.length - 1) : 0)
    .reduce((sum, points) => sum + points, 0)
}

function partTwo (input) {
  const games = input.map(getGameDetailsByCard)
  const totals = new Array(games.length).fill(1)

  for (let gameIndex = 0; gameIndex < games.length; gameIndex++) {
    const matchingNumberCount = getMatchingNumbers(games[gameIndex]).length

    if (matchingNumberCount > 0) {
      for (let nextIndex = gameIndex + 1; nextIndex < gameIndex + 1 + matchingNumberCount; nextIndex++) {
        if (totals[nextIndex]) {
          totals[nextIndex] += totals[gameIndex]
        }
      }
    }
  }

  return totals.reduce((sum, n) => sum + n, 0)
}

log(partOne(input)) // example: 13, input: 21558
log(partTwo(input)) // example: 30, input: 10425665
