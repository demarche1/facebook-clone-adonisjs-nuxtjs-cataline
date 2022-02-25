<template>
  <HomeTemplate />
</template>

<script lang="ts">
import Vue from 'vue'
import { userProfile } from '@/store'
export default Vue.extend({
  middleware: 'auth',
  async asyncData() {
    await userProfile.show()
  }
})
</script>
