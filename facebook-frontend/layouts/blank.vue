<template>
  <div class="blank-layout">
    <clientOnly>
      <notifications
        position="bottom center"
        classes="notifications"
        :max="1"
      />
    </clientOnly>
    <Nuxt />
  </div>
</template>

<style lang="scss">
.blank-layout {
  height: 100%;
}
</style>
