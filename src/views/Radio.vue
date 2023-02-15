<script setup lang="ts">
import '../assets/css/main.css';
import { ref } from 'vue';
import axios from 'axios';

const radiosource = ref(['https://de1.api.radio-browser.info/', 'https://fr1.api.radio-browser.info/', 'https://nl1.api.radio-browser.info/']);
//Set a random integer
var rand = Math.floor(Math.random() * radiosource.value.length);
//Get next page number
const urlParams = new URLSearchParams(window.location.search);
const keyWord = urlParams.get('t');
//Set next page array
var radiory = ['', 'json/countries', 'json/languages', 'json/tags'];
//Set Page Title
var word = ['', 'Countries', 'Languages', 'Category'];
var radioStations:string[][] = [];
var checkSeen = ref(true);
document.title = word[Number(keyWord)] + ' Channels';
axios.get(radiosource.value[rand] + radiory[Number(keyWord)])
    .then(response => {
        checkSeen.value = false;
        for(let i in response.data){
          radioStations.push([response.data[i].name == "Taiwan Province Of China" ? 'Taiwan' : response.data[i].name, response.data[i].stationcount])
        }
}).catch(err => {
  alert('Can\' t load list now, Please refresh the page to change source links');
});;
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
    <h3>{{ word[Number(keyWord)] + ' Channels' }}</h3>
    <ul id="menu">
      <li v-show="checkSeen">
                <p>Channels list is loading...</p>
            </li>
      <li v-for='item in radioStations'>
        <p><a :href="'/catalogues/counplay?tab=' + keyWord + '&title=' + item[0] + '&typev=4'">{{ item[0] + `(${item[1]})` }}</a></p>
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