const example = `
Time:      7  15   30
Distance:  9  40  200
`.trim()

const input = `
Time:        53     83     72     88
Distance:   333   1635   1289   1532
`.trim()


function run (input) {
  const zip = (a, b) => a.map((k, i) => [k, b[i]])
  const rows = input.split("\n").map(line => line.split(/\s+/g).slice(1).map(Number)) // Part 1
  // const rows = input.split("\n").map(line => [+line.split(/\s+/g).slice(1).join('')]) // Part 2

  const recordBreakers = (time, record) => {
    let wins = 0
    for (let hold = 0; hold < time; hold++) {
      const distance = (time - hold) * hold
      if (distance > record) {
        wins++
      }
    }
    return wins
  }

  return zip(rows[0], rows[1])
    .map(([time, record]) => recordBreakers(time, record))
    .reduce((acc, n) => acc * n)
}

console.log(run(example)) // 288
console.log(run(input)) // 140220
