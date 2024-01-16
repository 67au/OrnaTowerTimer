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

const kinds = ["selene", "eos", "oceanus", "themis", "prometheus"];
// 45, 40, 35, 30, 25
// Mon, 23 Oct 2023 00:00:00 GMT

// const baseFloors = [45, 40, 35, 30, 25];
// const baseDate = new Date(Date.UTC(2023, 9, 23, 0));

// 35, 30, 25, 20, 50
// Thu, 07 Dec 2023 00:00:00 GMT

const baseFloors = [35, 30, 25, 20, 15]
const baseDate = new Date(Date.UTC(2023, 11, 7, 0));
// const baseDate = new Date(Date.UTC(2024, 0, 11, 0));

const minutes35day = 35*24*60;

/**
 * 计算塔层数
 * @param { Date } time
 * @param { Array<T> } floors
 */
export function getTowerFloors(time) {
    let minutes = Math.abs(time - baseDate) / (1000 * 60) % minutes35day;

    if ((time - baseDate) < 0) {
        minutes = (minutes35day - minutes);
    }

    let day = Math.floor(minutes / (60 * 24));
    let hour = Math.floor((minutes - day * 60 * 24) / 60);
    let minute = Math.floor(minutes - day * 60 * 24 - hour * 60);
    
    let point = 0;
    if (hour > 0) {point++};
    if (hour > 4) {point++};
    if (hour > 9) {point++};
    if (hour > 14) {point = point + 2};
    if (hour == 15 && minute <= 35) {point--};
    if (hour > 19) {point++};

    return kinds.map((elem, index) => {
        const towerFloor = (Math.abs(baseFloors[index] - 15 + day * 6) + point) % 35 + 15;
        return {
            'kind': elem,
            'floor': (towerFloor>=48 || (towerFloor == 15 && !(day % 35 == 0 && hour == 0)))?50:towerFloor,
        }
    });
}

const checkpoints = [[0,0],[1,0],[5,0],[10,0],[15,0],[15,36],[20,0]];

function* repeat(point, n) {
    for (const _ of Array(n).keys()) {
        yield* checkpoints.slice(point);
        yield* checkpoints.slice(0, point);
    }
}

export function getTowerFloorsInNextDays(time, n=2) {
    const hour = time.getUTCHours();
    const minute = time.getUTCMinutes();

    let day = Math.floor(Math.abs(time - baseDate) / (1000 * 60) / (60 * 24));

    let point = 0;
    if (hour > 0) {point++};
    if (hour > 4) {point++};
    if (hour > 9) {point++};
    if (hour > 14) {point = point + 2};
    if (hour == 15 && minute <= 35) {point--};
    if (hour > 19) {point++};

    point += 1;

    const days = repeat(point, n);

    return Array.from(days).map((timeTuple, index) => {
        const dayDelta = Math.floor((index + point) / 7);
        if (timeTuple[0] == 0 && (35 - (day + dayDelta)) % 35 != 0) {
            return false
        }
        let dayOne = new Date(time);
        dayOne.setUTCSeconds(0);
        dayOne.setUTCMilliseconds(0);
        dayOne.setUTCHours(timeTuple[0] + 24 * dayDelta);
        dayOne.setUTCMinutes(timeTuple[1]);
        return {
            'time': new Date(dayOne),
            'floors': getTowerFloors(dayOne),
        }
    }).filter((e) => e != false)
}