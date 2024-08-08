<template>
  <dashboard :AOTP11="AOTP11" />
</template>

<script>
import Vue from 'vue'
import AOTP11 from '@AOTP11/core'
import { Dashboard } from '@AOTP11/vue'

export default {
  name: 'App',
  components: {
    Dashboard,
  },
  computed: {
    AOTP11: () => new AOTP11(),
  },
}
</script>

<style src="@AOTP11/core/dist/style.css"></style>
<style src="@AOTP11/dashboard/dist/style.css"></style>
