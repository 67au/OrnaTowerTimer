import { localStorage } from "@/plugins/storage";
import { StyleProvider, Themes as ComponentsThemes, type StyleVars } from "@varlet/ui";

interface Themes {
  [Key: string]: StyleVars
}

const suppoertedThemes: Themes = {
	'md2-light': {},
	'md2-dark': ComponentsThemes.dark,
	'md3-light': ComponentsThemes.md3Light,
	'md3-dark': ComponentsThemes.md3Dark,
};

export const currentTheme = ref(localStorage.get('theme'));

export function setTheme(theme: string) {
  currentTheme.value = theme;
  localStorage.set('theme', theme);
  StyleProvider(suppoertedThemes[theme]);
}

export function useDark() {
  const theme = localStorage.get('theme') || 'md2-dark';
	setTheme(theme);
}
