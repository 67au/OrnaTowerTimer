const kinds = ["selene", "eos", "oceanus", "themis", "prometheus"];
// 15, 45, 40, 35, 20 Mon

function getTowerFloors(time) {
    const week = time.getUTCDay();
    const hour = time.getUTCHours();
    const floors = [];
    const n = Math.floor(hour / 5) + 1;
    for (let i = 0; i < 5; i++) {
        const growth = (7 + week - i) % 7;
        floors.push({
            'kind': kinds[i],
            'floor': 15 + growth * 5 + (hour < 1 ? 0 : n)
        });
    }
    return floors;
}
