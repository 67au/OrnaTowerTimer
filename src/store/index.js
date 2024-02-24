import { useStorage } from "@vueuse/core";
import { reactive } from "vue";

export const store = reactive({
  state: useStorage('fqegg.top', {
    language: null,
    theme: null,
  })
});