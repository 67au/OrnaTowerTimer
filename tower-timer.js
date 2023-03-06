const kinds = ["selene", "eos", "oceanus", "themis", "prometheus"];
// 15, 45, 40, 35, 20 Mon
const base_floor = 15;

/**
 * 计算塔层数
 * @param { Date } time
 * @param { Array<T> } floors
 */
function getTowerFloors(time) {
    const day = time.getUTCDay();
    const hour = time.getUTCHours();
    const n = Math.floor(hour / 5) + 1;
    const base_reset_time = new Date(time);
    base_reset_time.setUTCHours(0, 0, 0, 0);
    const floors = kinds.map((element, index) => {
        const growth = (7 + day - index) % 7;
        return {
            'kind': element,
            'floor': base_floor + growth * 5 + (hour < 1 ? 0 : n),
            'nextReset': new Date(base_reset_time.setUTCDate(time.getUTCDate() - day + (day < index ? 0 : 7) + index)),
        }
    })
    return floors;
}