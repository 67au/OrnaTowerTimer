<template>
	<header class="app-header" :style="{ zIndex: Context.zIndex-1 }">		
	<var-app-bar :title=title elevation>
		<template #right>
			<var-button color="transparent" text-color="#fff" text @click="toggleTheme" round>
				<var-icon :name="themeIcon" animation-class="fade" :transition="300" @click="toggleIcon" />
			</var-button>
		</template>
	</var-app-bar>
	</header>
</template>

<script>
import { ref, defineComponent } from 'vue'
import { Context } from '@varlet/ui'
import { StyleProvider, Themes } from '@varlet/ui'
import Cookies from 'js-cookie'

export default defineComponent({
    props: ['title'],
	setup() {
		let theme = Cookies.get('theme') == 'dark';
		let currentTheme = theme ? Themes.dark : null;
		StyleProvider(currentTheme);
		let themeIcon = ref(currentTheme ? 'weather-night' : 'white-balance-sunny');
		function toggleTheme() {
			currentTheme = currentTheme ? null : Themes.dark;
			StyleProvider(currentTheme);
			Cookies.set('theme', currentTheme ? 'dark' : null)
		}
		function toggleIcon() {
			themeIcon.value = themeIcon.value === 'white-balance-sunny' ? 'weather-night' : 'white-balance-sunny';
		}
		return {
			Context,
			currentTheme,
			themeIcon,
			toggleTheme,
			toggleIcon,
		}
	},
	methods: {
	}
})
</script>

<style scoped>
.app-header {
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;
}
.fade {
	opacity: 0;
	transition-property: opacity;
}
</style>