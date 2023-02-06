<script setup lang="ts">
defineProps<{
  imgUrl: string,
  hrefTarget: string,
  dataRevealId: string,
  msg: string,
  info: string
}>();

function filterPop(_a:string){
  if(_a.endsWith('tv.svg')){
    window.localStorage.setItem('selectPop', 'tv');
  }else if(_a.endsWith('radio.svg')){
    window.localStorage.setItem('selectPop', 'radio');
  }
}

</script>

<template>
  <li>
    <img :src="imgUrl" />
    <dd>
      <a :href="hrefTarget" :data-reveal-id="dataRevealId" @click="filterPop(imgUrl)"><button class="stylebtn"> {{ msg }} </button></a>
    </dd>
    <p>{{ info }}</p>
  </li>
</template>

<style scoped>

</style>
