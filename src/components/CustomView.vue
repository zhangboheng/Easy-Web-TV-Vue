<script setup lang="ts">
defineProps<{
  imgUrl: string,
  hrefTarget: string,
  dataRevealId: string,
  msg: string,
  info: string
}>()
</script>

<template>
  <li>
    <img :src="imgUrl" />
    <dd>
      <a :href="hrefTarget" :data-reveal-id="dataRevealId"><button class="stylebtn"> {{ msg }} </button></a>
    </dd>
    <p>{{ info }}</p>
  </li>
</template>

<style scoped>

</style>
