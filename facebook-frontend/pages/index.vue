<template>
  <HomeTemplate />
</template>

<script lang="ts">
import Vue from 'vue'
import { userProfile, postFeed } from '@/store'
export default Vue.extend({
  middleware: 'auth',
  async asyncData() {
    await userProfile.show()
    await postFeed.index()
  }
})
</script>
