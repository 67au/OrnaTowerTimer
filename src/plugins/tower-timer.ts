/*
	Towers grow at: (Times in UTC)
	1:00
	5:00
	10:00
	15:00
	15:35
	20:00
	--
	If a tower would be 48 or 49 floors, it instead acts as a 50 floor tower to players
	If a 50 floor tower would grow, it becomes 16 floors.
	--
	Credit @Knight411
*/

export type TowerKind = 'selene' | 'eos' | 'oceanus' | 'themis' | 'prometheus'

export interface Floor {
  kind: TowerKind
  floor: number
}

export type Floors = Array<Floor>

export interface CheckPointFloors {
	time: Date,
	floors: Floors,
}

const kinds: Array<TowerKind> = ['selene', 'eos', 'oceanus', 'themis', 'prometheus']
// 45, 40, 35, 30, 25
// Mon, 23 Oct 2023 00:00:00 GMT

// const baseFloors = [45, 40, 35, 30, 25];
// const baseDate = new Date(Date.UTC(2023, 9, 23, 0));

// 35, 30, 25, 20, 50
// Thu, 07 Dec 2023 00:00:00 GMT

const baseFloors: Array<number> = [35, 30, 25, 20, 15]
const baseDate: Date = new Date(Date.UTC(2023, 11, 7, 0))
// const baseDate = new Date(Date.UTC(2024, 0, 11, 0));

const minutes35day: number = 35 * 24 * 60

/**
 * 计算塔层数
 * @param { Date } time
 */
export function getTowerFloors(time: Date): Floors {
  let minutes = (Math.abs(time.getTime() - baseDate.getTime()) / (1000 * 60)) % minutes35day

  if (time.getTime() - baseDate.getTime() < 0) {
    minutes = minutes35day - minutes
  }

  const day = Math.floor(minutes / (60 * 24))
  const hour = Math.floor((minutes - day * 60 * 24) / 60)
  const minute = Math.floor(minutes - day * 60 * 24 - hour * 60)

  let point = 0
  if (hour > 0) {
    point++
  }
  if (hour > 4) {
    point++
  }
  if (hour > 9) {
    point++
  }
  if (hour > 14) {
    point = point + 2
  }
  if (hour == 15 && minute <= 35) {
    point--
  }
  if (hour > 19) {
    point++
  }

  return kinds.map((elem: string, index: number) => {
    const towerFloor = ((Math.abs(baseFloors[index] - 15 + day * 6) + point) % 35) + 15
    return {
      kind: elem,
      floor:
        towerFloor >= 48 || (towerFloor == 15 && !(day % 35 == 0 && hour == 0)) ? 50 : towerFloor
    } as Floor
  })
}

const checkpoints: Array<[number, number]> = [
  [0, 0],
  [1, 0],
  [5, 0],
  [10, 0],
  [15, 0],
  [15, 36],
  [20, 0]
]

function* repeat(point: number, n: number) {
  for (let i: number = 0; i < n; i++) {
    yield* checkpoints.slice(point)
    yield* checkpoints.slice(0, point)
  }
}

export function getTowerFloorsInNextDays(time: Date, n: number = 2) {
  const hour = time.getUTCHours()
  const minute = time.getUTCMinutes()

  const day = Math.floor(Math.abs(time.getTime() - baseDate.getTime()) / (1000 * 60) / (60 * 24))

  let point = 0
  if (hour > 0) {
    point++
  }
  if (hour > 4) {
    point++
  }
  if (hour > 9) {
    point++
  }
  if (hour > 14) {
    point = point + 2
  }
  if (hour == 15 && minute <= 35) {
    point--
  }
  if (hour > 19) {
    point++
  }

  point += 1

  const days = repeat(point, n)

  return Array.from(days)
    .map((timeTuple: [number, number], index: number) => {
      const dayDelta = Math.floor((index + point) / 7)
      if (timeTuple[0] == 0 && (35 - (day + dayDelta)) % 35 != 0) {
        return false
      }
      const dayOne = new Date(time)
      dayOne.setUTCSeconds(0)
      dayOne.setUTCMilliseconds(0)
      dayOne.setUTCHours(timeTuple[0] + 24 * dayDelta)
      dayOne.setUTCMinutes(timeTuple[1])
      return {
        time: new Date(dayOne),
        floors: getTowerFloors(dayOne)
      } as CheckPointFloors
    })
    .filter((e) => e != false)
}
