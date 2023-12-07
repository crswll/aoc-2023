const example = `
Time:      7  15   30
Distance:  9  40  200
`.trim()

const input = `
Time:        53     83     72     88
Distance:   333   1635   1289   1532
`.trim()


function run (input) {
  const getRace = (rows, raceNumber) => rows.map(row => row[raceNumber])
  // const rows = input.split("\n").map(line => line.split(/\s+/g).slice(1).map(Number)) // Part 1
  const rows = input.split("\n").map(line => [+line.split(/\s+/g).slice(1).join('')]) // Part 2

  const recordBreaks = []


  for (let i = 0; i < rows[0].length; i++) {
    const [time, record] = getRace(rows, i)
    let wins = 0

    for (let hold = time - 1; hold > 0; hold--) {
      const distance = (time - hold) * (time - (time - hold))
      if (distance > record) {
        wins++
      }
    }
    recordBreaks.push(wins)
  }

  return recordBreaks.reduce((acc, n) => acc * n)
}

console.log(run(input)) // 288, 140220
