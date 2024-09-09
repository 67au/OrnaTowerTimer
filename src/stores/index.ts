export const store = reactive({
  time: new Date(),
  setTime(timestamp: number) {
    store.flag = store.flag > 1 ? store.flag + 1 : 2
    this.time = new Date(timestamp * 1000)
  },
  flag: 1
})
