<template>
  <div id="main" class="w-full min-h-screen mx-auto my-0 py-16 px-2 hack-card">
    <slot></slot>
  </div>
</template>

<style>
/* Hack Card */
.hack-card > .var-card {
  break-inside: avoid;
  margin: 0 auto 6px;
}

@media screen and (min-width: 768px) {
  .hack-card {
    columns: 0 2;
    column-gap: 0;
    max-width: 768px;
  }
}
</style>
