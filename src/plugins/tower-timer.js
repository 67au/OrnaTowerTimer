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
const baseFloors = [45, 40, 35, 30, 25]
const baseDate = new Date(Date.UTC(2023, 9, 23, 0));

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

    if (reverseFlag) {
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
        return {
            'kind': elem,
            'floor': towerFloor<48?towerFloor:50,
        }
    });

    return floors;
}
