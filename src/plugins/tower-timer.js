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

const baseFloors = [35, 30, 25, 20, 50]
const baseDate = new Date(Date.UTC(2023, 11, 7, 0));
// const baseDate = new Date(Date.UTC(2024, 0, 11, 0));

/**
 * 计算塔层数
 * @param { Date } time
 * @param { Array<T> } floors
 */
export function getTowerFloors(time) {
    let minutes = Math.abs(time - baseDate) / (1000 * 60);
    const reverseFlag = (time - baseDate) < 0

    let day = Math.floor(minutes / (60 * 24));
    let hour = Math.floor((minutes - day * 60 * 24) / 60);
    let minute = Math.floor(minutes - day * 60 * 24 - hour * 60);

    const prometheus_15 = day % 35 == 0 && (hour < 1);

    if (reverseFlag) {
        day = (35 - day) % 35;
        minute = (60 - minute) % 60;
        hour = (24 - hour) - (minute>0?1:0);
    }

    let dayFloor = reverseFlag?-6:0;
    if (hour > 0) {dayFloor++};
    if (hour > 4) {dayFloor++};
    if (hour > 9) {dayFloor++};
    if (hour > 14) {dayFloor = dayFloor + 2};
    if (hour == 15 && minute <= 35) {dayFloor--};
    if (hour > 19) {dayFloor++};

    const floors = kinds.map((elem, index) => {
        let towerFloor = (Math.abs(baseFloors[index] - 15 + day * 6) + dayFloor) % 35 + 15;
        towerFloor = towerFloor>15?towerFloor:50;
        if (prometheus_15 && elem == 'prometheus') {
            return {
                'kind': elem,
                'floor': 15,
            }
        }
        return {
            'kind': elem,
            'floor': towerFloor<48?towerFloor:50,
        }
    });

    return floors;
}

const checkpoints = [[0,0], [1,0],[5,0],[10,0],[15,0],[15,36],[20,0]];

export function getTowerFloorsInNextTwoDays(time) {
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

    const DayOne = new Date(time);
    DayOne.setUTCSeconds(0);
    DayOne.setUTCMilliseconds(0);
    const DayTwo = new Date(DayOne);
    DayTwo.setUTCDate(DayTwo.getUTCDate()+1);
    const DayThree = new Date(DayTwo);
    DayThree.setUTCDate(DayThree.getUTCDate()+1);
    return checkpoints.slice(point+1, 7).map((timeTuple) => {
        DayOne.setUTCHours(timeTuple[0]);
        DayOne.setUTCMinutes(timeTuple[1]);
        return {
            'time': new Date(DayOne),
            'floors': getTowerFloors(DayOne),
        }
    }).concat(checkpoints.map((timeTuple) => {
        if (timeTuple[0] == 0) {
            if ((day+1) % 35 != 0) {
                return false
            }
        }
        DayTwo.setUTCHours(timeTuple[0]);
        DayTwo.setUTCMinutes(timeTuple[1]);
        return {
            'time': new Date(DayTwo),
            'floors': getTowerFloors(DayTwo),
        }
    }), checkpoints.slice(0, point+1).map((timeTuple) => {
        DayThree.setUTCHours(timeTuple[0]);
        DayThree.setUTCMinutes(timeTuple[1]);
        if (timeTuple[0] == 0) {
            if ((day+2) % 35 != 0) {
                return false
            }
        }
        return {
            'time': new Date(DayThree),
            'floors': getTowerFloors(DayThree),
        }
    })).filter((e) => e != false)
}