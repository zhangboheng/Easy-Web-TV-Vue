<script setup lang="ts">
import { ref } from 'vue';
const devName = ref([{
    info:'App Will Publish 2022 or later.'
},{
    info:'Developer: Zhang Boheng'
}]);
const devIcon = ref([{
    target:'https://github.com/zhangboheng/',
    img:'src/assets/images/github.svg'
},{
    target:'https://www.youtube.com/c/LuckyDesigner',
    img:'src/assets/images/youtube.svg'
},{
    target:'https://t.me/Luckydesignerspace',
    img:'src/assets/images/telegram.svg'
}]);
const copyRight = ref('Copyright 2019-2023 行运设计师 www.luckydesigner.space All Rights Reserved.');
const toggle = ref(false);
</script>

<template>

<div id="infobox">
    <div id="infoboxitem" class="log-modal">
      <a href="#" class="close-log-modal">×</a>
      <div class="scrollappbar" style="text-align: left;">
        <p v-for="item in devName">{{ item.info }}</p>
        <div class="circlescon" style="display:flex;">
          <li v-for="item in devIcon">
            <a target="_blank" :href="item.target"><img :src="item.img"></a>
          </li>
          <li>
            <img src="src/assets/images/wechat.svg" @click='toggle = !toggle'>
            <div class="qrcode" v-show='toggle'>
              <img src="src/assets/images/wechatpub.jpg" style="width:100%; height:auto" />
            </div>
          </li>
        </div>
        <p>{{ copyRight }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>