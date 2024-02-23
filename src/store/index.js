import { useStorage } from "@vueuse/core";
import { reactive } from "vue";

export const store = reactive({
  state: useStorage('vueuse', {
    language: null,
    theme: null,
  })
});