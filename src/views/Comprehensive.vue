<script setup lang="ts">
import '../assets/css/main.css';
import { ref, nextTick, onMounted } from 'vue';
var toggleRule = ref(true);
const myDivWidth = ref<HTMLElement | null>(null);
var toRight = ref();
onMounted(() => {
    toRight.value = myDivWidth.value?.getBoundingClientRect().width;
})
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
  <div id="left" ref="myDivWidth" v-show="toggleRule">
    <h3>Select Category</h3>
    <ul id="menu">
      <li>
        <p>Category list is loading...</p>
      </li>
    </ul>
  </div>
  <div class="toggle" :style="{ left: toggleRule ? toRight - 50 + 'px' : '5px' }" @click="toggleRule = !toggleRule"></div>
  <select id="selectapi">
  </select>
  <div id="root">
    <div class="itemContainer">
    </div>
    <div class="itemContainer">
    </div>
    <div class="itemContainer">
    </div>
    <div class="itemContainer">
    </div>
    <div class="itemContainer">
    </div>
    <div class="hiddens" style="display: none;">
      <p>0</p>
    </div>
  </div>
  <div id="prevbox" title="Back to previous page" @mouseenter="hover()" @click="goToPage()" @mouseleave="leave()"></div>
</template>

<style scoped>
#menu {
  overflow-y: scroll !important;
}

.toggle,
#left {
  position: fixed !important;
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
