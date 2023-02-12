<script setup lang="ts">
import '../assets/css/main.css';
import { ref } from 'vue';
import * as tvLanguages from '../../static/jsons/tvlanguages.json';

const tvContent = ref(tvLanguages.ret);
function hover() {
  document.getElementById('prevbox')!.style.opacity = "1";
}
function goToPage() {
  window.location.href = "/"
}
function leave() {
  document.getElementById('prevbox')!.style.opacity = "0.5";
}
</script>
<template>
  <div id="left">
    <h3>Select Languages</h3>
    <ul id="menu">
      <li v-for='item in tvContent'>
        <p><a :href="item.target">{{ item.text }}</a></p>
      </li>
    </ul>
  </div>
  <div id="right">
    <div id="div1">
      <img src="../assets/images/index.png" />
    </div>
  </div>
  <div id="prevbox" title="Back to previous page" @mouseenter="hover()" @click="goToPage()" @mouseleave="leave()"></div>
</template>

<style scoped>
#menu {
  overflow-y: scroll !important;
}

#prevbox {
  position: fixed;
  width: 50px;
  height: 50px;
  right: 20px;
  top: calc(100% - 60px);
  background: #fff;
  z-index: 999;
  border-radius: 25px;
  background-image: url('../assets/images/previous.jpg');
  opacity: 0.5;
  cursor: pointer;
  color: #000;
}
</style>