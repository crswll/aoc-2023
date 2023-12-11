const fs = require('fs')
const path = require('path')
const { inspect } = require('util')

const log = value => console.log(inspect(value, { depth: 3, maxArrayLength: 1000 }))
const getInput = file => fs.readFileSync(path.join(__dirname, `${file}.txt`)).toString().trim().split("\n")

const strengths = 'A K Q J T 9 8 7 6 5 4 3 2'.split(' ')

const ranks = [
  groups => groups[0] === 5,
  groups => groups[0] === 4,
  groups => groups[0] === 3 && groups[1] === 2,
  groups => groups[0] === 3 && groups[1] === 1,
  groups => groups[0] === 2 && groups[1] === 2,
  groups => groups[0] === 2 && groups[1] === 1,
  groups => groups[0] === 1,
]

function groupCards (hand) {
  return hand.split('').reduce(
    (group, card) => ({ ...group, [card]: group[card] ? group[card] + 1 : 1 }),
    {}
  )
}

function getGroupedCardCounts (hand) {
  return Object.values(groupCards(hand)).sort((a, b) => b - a)
}

function getRank (hand) {
  return ranks.findIndex(fn => fn(getGroupedCardCounts(hand)))
}

function getHand (line) {
  return line.split(' ')[0]
}

function getBid (line) {
  return +line.split(' ')[1]
}

function sortHandByStrength (hand) {
  return hand
    .split('')
    // This sort makes it rank correctly but it makes my answer wrong for the input.
    // .sort((a, b) => strengths.indexOf(a) - strengths.indexOf(b))
    .join('')
}

function run (input) {
  const ranked = input
    .filter(line => !line.startsWith('#'))
    .sort((a, b) => {
      const handA = sortHandByStrength(getHand(a))
      const handB = sortHandByStrength(getHand(b))

      const rankA = getRank(handA)
      const rankB = getRank(handB)

      if (rankA === rankB) {
        for (let i = 0; i < 5; i++) {
          const strengthA = strengths.indexOf(handA[i])
          const strengthB = strengths.indexOf(handB[i])

          if (strengthA > strengthB) return -1
          if (strengthA < strengthB) return 1
        }
      }

      return rankB - rankA
    })

    console.log(ranked)

    return ranked.reduce((sum, line, i) => sum += getBid(line) * (i + 1), 0)
}

const INPUT_ANSWER = 251029473
const EXAMPLE_ANSWER = 6440

log([ run(getInput('example')), EXAMPLE_ANSWER ])
// log([ run(getInput('input')), INPUT_ANSWER ])
