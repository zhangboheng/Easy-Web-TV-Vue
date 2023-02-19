<script setup lang="ts">
import '../assets/css/main.css';
import { ref, onMounted, watch } from 'vue';
import axios from "axios";
import { XMLParser } from "fast-xml-parser"
var toggleRule = ref(true);
const myDivWidth = ref<HTMLElement | null>(null);
var toRight = ref();
const proxyLinks = ref({
  0: 'https://cors.luckydesigner.workers.dev/?',
});
const selectBoxPre = ref([
  ["http://zmcj88.com/sapi/json?ac=list", "字幕网资源站"],
  ["http://f2dcj6.com/sapi/json?ac=list", "富二代资源网"],
  ["http://mygzycj.com/sapi.php?ac=jsonvideolist", "JAV名优资源站"],
  ["http://wmcj8.com/inc/jsonsapi.php?ac=videolist", "环亚资源站"],
  ["http://secj8.com/inc/jsonsapi.php?ac=videolist", "色色资源网"],
  ["http://99zywcj.com/inc/jsonsapi.php?ac=videolist", "玖玖资源站"],
  ["http://cjmygzy.com/inc/jsonsapi.php?ac=videolist", "狼少年资源站"],
  ["http://bttcj.com/inc/jsonsapi.php?ac=videolist", "博天堂资源站"]
]);
const selectValue = ref('');
var checkSeen = ref(true);
var inputMessage = ref("");
// Category Collection
const categoryArr = ref();
// Videos Collection
var arrayObj: any[] = [];
var videosArr4: any[] = [];
var videosArr3: any[] = [];
var videosArr2: any[] = [];
var videosArr: any[] = [];
// Stream Box Type
/*Over 1024 = 1; Over 640 = 2; Lower 640 = 3*/
const typeDifineRule = ref();
// ItemContainer Show and Hide
const thridContent = ref(true);
const fourthContent = ref(true);
// Set A Category Unity
const cateCover = ref();
// Set A Default Count Number
const countNm = ref(1);
// Set A Default Type
const scrollType = ref('homepage');
onMounted(() => {
  toRight.value = myDivWidth.value?.getBoundingClientRect().width;
  if (window.innerWidth >= 1024) {
    typeDifineRule.value = 1
  } else if (window.innerWidth < 1024 && window.innerWidth > 640) {
    typeDifineRule.value = 2
  } else {
    typeDifineRule.value = 3
  };
  //Get Select Source
  try {
    let ms = window.localStorage.getItem('porn')?.split(",");
    let arr = ["zmwzy", "fedzy", "javmy", "hyzy", "sszy", "jjzy", "lsnzy", "bttzy", "llzy"];
    let lst = arr.filter(x => ms?.includes(x)).map(x => arr.indexOf(x));
    selectBoxPre.value.filter((x, y) => lst.includes(y));
    selectValue.value = selectBoxPre.value[0][0]
  } catch (e) {
    selectBoxPre.value = selectBoxPre.value
    selectValue.value = selectBoxPre.value[0][0]
  }
});

function hover() {
  document.getElementById('prevbox')!.style.opacity = "1";
}
function goToPage() {
  window.location.href = "/"
}
function leave() {
  document.getElementById('prevbox')!.style.opacity = "0.5";
}
// Get Data Default from Websites
function getMenuAndList(_link: string, _num: number) {
  checkSeen.value = true;
  scrollType.value = 'homepage';
  axios.all([
    axios.get(proxyLinks.value[0] + `${_link.replace('videolist', 'list')}`),
    axios.get(proxyLinks.value[0] + `${_link}&t=0&pg=${_num}`)
  ]).then(axios.spread((response1, response2) => {
    checkSeen.value = false;
    // GET Left Category
    categoryArr.value = response1.data.class;
    // GET Videos List
    arrayObj.push(...response2.data.data)
    if (typeDifineRule.value == 1) {
      videosArr = arrayObj.filter((x: {}, y: number) => y % 4 == 0);
      videosArr2 = arrayObj.filter((x: {}, y: number) => y % 4 == 1);
      videosArr3 = arrayObj.filter((x: {}, y: number) => y % 4 == 2);
      videosArr4 = arrayObj.filter((x: {}, y: number) => y % 4 == 3);
    } else if (typeDifineRule.value == 2) {
      fourthContent.value = false;
      videosArr = arrayObj.filter((x: {}, y: number) => y % 3 == 0);
      videosArr2 = arrayObj.filter((x: {}, y: number) => y % 3 == 1);
      videosArr3 = arrayObj.filter((x: {}, y: number) => y % 3 == 2);
    } else if (typeDifineRule.value == 3) {
      thridContent.value = false;
      fourthContent.value = false;
      videosArr = arrayObj.filter((x: {}, y: number) => y % 2 == 0);
      videosArr2 = arrayObj.filter((x: {}, y: number) => y % 2 == 1);
    }
  }));
}
// Get Category Item
function getCategory(_cate: number, _num: number) {
  checkSeen.value = true;
  scrollType.value = 'cateTarget';
  cateCover.value = _cate;
  axios.all([
    axios.get(proxyLinks.value[0] + `${selectValue.value}&t=${_cate}&pg=${_num}`),
  ]).then(axios.spread((response2) => {
    checkSeen.value = false;
    // GET Videos List
    arrayObj.push(...response2.data.data)
    if (typeDifineRule.value == 1) {
      videosArr = arrayObj.filter((x: {}, y: number) => y % 4 == 0);
      videosArr2 = arrayObj.filter((x: {}, y: number) => y % 4 == 1);
      videosArr3 = arrayObj.filter((x: {}, y: number) => y % 4 == 2);
      videosArr4 = arrayObj.filter((x: {}, y: number) => y % 4 == 3);
    } else if (typeDifineRule.value == 2) {
      fourthContent.value = false;
      videosArr = arrayObj.filter((x: {}, y: number) => y % 3 == 0);
      videosArr2 = arrayObj.filter((x: {}, y: number) => y % 3 == 1);
      videosArr3 = arrayObj.filter((x: {}, y: number) => y % 3 == 2);
    } else if (typeDifineRule.value == 3) {
      thridContent.value = false;
      fourthContent.value = false;
      videosArr = arrayObj.filter((x: {}, y: number) => y % 2 == 0);
      videosArr2 = arrayObj.filter((x: {}, y: number) => y % 2 == 1);
    }
  }));
}
// Search Video
function searchVideos(_num: number) {
  let alterLink: string = "";
  checkSeen.value = true;
  scrollType.value = 'searchTarget';
  if (selectValue.value == 'http://secj8.com/inc/jsonsapi.php?ac=videolist') {
    checkSeen.value = false;
    alert('色色资源网 not support search');
  } else if (selectValue.value == 'http://99zywcj.com/inc/jsonsapi.php?ac=videolist') {
    checkSeen.value = false;
    alert('玖玖资源站 not support search');
  } else if (selectValue.value == 'http://cjmygzy.com/inc/jsonsapi.php?ac=videolist') {
    checkSeen.value = false;
    alert('狼少年资源站 not support search');
  } else if (selectValue.value == 'http://wmcj8.com/inc/jsonsapi.php?ac=videolist') {
    checkSeen.value = false;
    alert('环亚资源站 not support search');
  } else if (selectValue.value == 'http://bttcj.com/inc/jsonsapi.php?ac=videolist') {
    checkSeen.value = false;
    alert('博天堂资源站 not support search');
  } else {
    alterLink = proxyLinks.value[0] + `${selectValue.value}&wd=${inputMessage.value}&pg=${_num}`;
  }
  axios.all([
    axios.get(alterLink),
  ]).then(axios.spread((response2) => {
    checkSeen.value = false;
    // GET Videos List
    arrayObj.push(...response2.data.data)
    if (typeDifineRule.value == 1) {
      videosArr = arrayObj.filter((x: {}, y: number) => y % 4 == 0);
      videosArr2 = arrayObj.filter((x: {}, y: number) => y % 4 == 1);
      videosArr3 = arrayObj.filter((x: {}, y: number) => y % 4 == 2);
      videosArr4 = arrayObj.filter((x: {}, y: number) => y % 4 == 3);
    } else if (typeDifineRule.value == 2) {
      fourthContent.value = false;
      videosArr = arrayObj.filter((x: {}, y: number) => y % 3 == 0);
      videosArr2 = arrayObj.filter((x: {}, y: number) => y % 3 == 1);
      videosArr3 = arrayObj.filter((x: {}, y: number) => y % 3 == 2);
    } else if (typeDifineRule.value == 3) {
      thridContent.value = false;
      fourthContent.value = false;
      videosArr = arrayObj.filter((x: {}, y: number) => y % 2 == 0);
      videosArr2 = arrayObj.filter((x: {}, y: number) => y % 2 == 1);
    }
  }));
}

// Detect selectValue Change
watch(selectValue, (newselectValue) => {
  getMenuAndList(newselectValue, 1);
  arrayObj = [];
  countNm.value = 1;
  let mybutton = document.getElementById("root");
  mybutton!.scrollTop = 0;
})

// Detect Scroll
function handleScroll(e: any) {
  var clientHeight = e.target.clientHeight
  var scrollHeight = e.target.scrollHeight
  var scrollTop = e.target.scrollTop
  var positionValue = (scrollTop + clientHeight) - scrollHeight;
  toggleRule.value = false;
  if (positionValue <= 0 && positionValue >= -20) {
    checkSeen.value = true;
    countNm.value = countNm.value + 1
    if (scrollType.value == 'homepage') {
      getMenuAndList(selectValue.value, countNm.value);
    } else if (scrollType.value == 'cateTarget') {
      getCategory(cateCover.value, countNm.value)
    } else {
      searchVideos(countNm.value);
    }
  }
}
</script>
<template>
  <div id="left" ref="myDivWidth" v-show="toggleRule">
    <h3>Select Category</h3>
    <ul id="menu">
      <li v-show="checkSeen">
        <p>Category list is loading...</p>
      </li>
      <li v-show="!checkSeen" style="background-color:#fff"><input id="search" type="text" placeholder="Search..."
          v-model="inputMessage" @keyup.enter="searchVideos(1); arrayObj = []" /></li>
      <li v-for="item in categoryArr" @click="getCategory(item.cid, 1); countNm = 1; arrayObj = []">
        <p><span :class="item.cid">{{ item.title }}</span></p>
      </li>
    </ul>
  </div>
  <div class="toggle" :style="{ left: toggleRule ? toRight - 50 + 'px' : '5px' }" @click="toggleRule = !toggleRule"></div>
  <div id="root" @scroll="handleScroll">
    <div class="itemContainer">
      <a v-for="cols in videosArr"
        :href="`../catalogues/counplay?web=${selectValue}&tab=${cols.vod_id}&title=${cols.vod_title}&typev=6`">
        <div class="item"><img class="itemImg" :src="cols.vod_pic" :alt="cols.vod_title" />
          <div class="userInfo"><img class="avatar" src="../assets/images/player.jpg" alt="" /><span class="username">{{
            `[${cols.category}]${cols.vod_title}` }}</span></div>
        </div>
      </a>
    </div>
    <div class="itemContainer">
      <a v-for="cols in videosArr2"
        :href="`../catalogues/counplay?web=${selectValue}&tab=${cols.vod_id}&title=${cols.vod_title}&typev=6`">
        <div class="item"><img class="itemImg" :src="cols.vod_pic" :alt="cols.vod_title" />
          <div class="userInfo"><img class="avatar" src="../assets/images/player.jpg" alt="" /><span class="username">{{
            `[${cols.category}]${cols.vod_title}` }}</span></div>
        </div>
      </a>
    </div>
    <div class="itemContainer" v-show="thridContent">
      <a v-for="cols in videosArr3"
        :href="`../catalogues/counplay?web=${selectValue}&tab=${cols.vod_id}&title=${cols.vod_title}&typev=6`">
        <div class="item"><img class="itemImg" :src="cols.vod_pic" :alt="cols.vod_title" />
          <div class="userInfo"><img class="avatar" src="../assets/images/player.jpg" alt="" /><span class="username">{{
            `[${cols.category}]${cols.vod_title}` }}</span></div>
        </div>
      </a>
    </div>
    <div class="itemContainer" v-show="fourthContent">
      <a v-for="cols in videosArr4"
        :href="`../catalogues/counplay?web=${selectValue}&tab=${cols.vod_id}&title=${cols.vod_title}&typev=6`">
        <div class="item"><img class="itemImg" :src="cols.vod_pic" :alt="cols.vod_title" />
          <div class="userInfo"><img class="avatar" src="../assets/images/player.jpg" alt="" /><span class="username">{{
            `[${cols.category}]${cols.vod_title}` }}</span></div>
        </div>
      </a>
      <div class="loadingimg" v-show="checkSeen"><img src="../assets/images/loading.gif" tag="Easy Web TV Loading"></div>
    </div>
  </div>
  <div id="prevbox" title="Back to previous page" @mouseenter="hover()" @click="goToPage()" @mouseleave="leave()"></div>
  <select id="selectapi" v-model="selectValue">
    <option v-for="item in selectBoxPre" :value="item[0]">{{ item[1] }}</option>
  </select>
  <div class="hiddens" style="display: none;">
    <p>{{ countNm }}</p>
  </div>
</template>

<style scoped>
#menu {
  overflow-y: scroll !important;
}

#root {
  height: 100vh;
  overflow-y: auto;
}

.loadingimg {
  position: fixed;
  bottom: 10px;
  z-index: 998;
  width: 100vw;
  text-align: center;
}

.loadingimg img {
  width: 8%;
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
}</style>