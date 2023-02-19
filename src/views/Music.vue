<script setup lang="ts">
import '../assets/css/main.css';
import { ref, onMounted, watch, onUpdated } from 'vue';
import axios from "axios";
import { XMLParser } from "fast-xml-parser"
var toggleRule = ref(true);
const myDivWidth = ref<HTMLElement | null>(null);
var toRight = ref();
const proxyLinks = ref({
  0: 'https://bird.ioliu.cn/v1?url=',
});
const selectBoxPre = ref([
  ["https://api-music.imsyy.top/", "网易云音乐"]
]);
const selectValue = ref('');
var checkSeen = ref(true);
var inputMessage = ref("");
// Category Collection
const categoryArr = ref();
// Music Collection
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
const musicSrc = ref('');
const musicBox = ref(false);
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
    let ms = window.localStorage.getItem('music')?.split(",");
    let arr = ["wymusic"];
    let lst = arr.filter(x => ms?.includes(x)).map(x => arr.indexOf(x));
    selectBoxPre.value.filter((x, y) => lst.includes(y));
    selectValue.value = selectBoxPre.value[0][0]
  } catch (e) {
    selectBoxPre.value = selectBoxPre.value
    selectValue.value = selectBoxPre.value[0][0]
  }
  //Get Category
  categoryArr.value = [
    {
      'type_id': 0, 'type_name': '其他'
    },
    {
      'type_id': 1, 'type_name': '男歌手',
    },
    {
      'type_id': 2, 'type_name': '女歌手',
    },
    {
      'type_id': 3, 'type_name': '乐队',
    },
    {
      'type_id': 7, 'type_name': '华语',
    },
    {
      'type_id': 8, 'type_name': '日本',
    },
    {
      'type_id': 16, 'type_name': '韩国',
    },
    {
      'type_id': 96, 'type_name': '欧美',
    }
  ];
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
  musicBox.value = false;
  scrollType.value = 'homepage';
  axios.all([
    axios.get(proxyLinks.value[0] + `${_link}artist/list?type=-1&area=-1&limit=20&offset=${20 * _num - 20}`)
  ]).then(axios.spread((response2) => {
    checkSeen.value = false;
    if (_link == 'https://api-music.imsyy.top/') {
      // GET Music List
      arrayObj.push(...response2.data.artists)
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
    }
  }));
}
// Get Category Item
function getCategory(_cate: number, _num: number) {
  checkSeen.value = true;
  musicBox.value = false;
  scrollType.value = 'cateTarget';
  cateCover.value = _cate;
  let singleValue = "";
  if (_cate == 1 || _cate == 2 || _cate == 3) {
    singleValue = 'artist/list?type=' + _cate;
  } else {
    singleValue = 'artist/list?area=' + _cate;
  }
  axios.all([
    axios.get(proxyLinks.value[0] + `${selectValue.value + singleValue}&limit=20&offset=${20 * _num - 20}`),
  ]).then(axios.spread((response2) => {
    checkSeen.value = false;
    if (selectValue.value == 'https://api-music.imsyy.top/') {
      // GET Music List
      arrayObj.push(...response2.data.artists)
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
    }
  }));
}
// Search Music
function searchVideos(_num: number) {
  let alterLink: string = "";
  checkSeen.value = true;
  scrollType.value = 'searchTarget';
  if (selectValue.value == 'https://api-music.imsyy.top/') {
    alterLink = proxyLinks.value[0] + `${selectValue.value}search?keywords=${inputMessage.value}&limit=20&offset=${20 * _num - 20}`;
  }
  axios.all([
    axios.get(alterLink),
  ]).then(axios.spread((response2) => {
    checkSeen.value = false;
    if (selectValue.value == 'https://api-music.imsyy.top/') {
      // GET Music List
      arrayObj.push(...response2.data.result.songs)
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
    }
  }));
  //Add random playlist music 
  let audio = document.querySelector('audio');
  audio?.addEventListener('ended', function() {
    let ids = arrayObj.map(x=>x.id)[Math.floor(Math.random() * arrayObj.length)]
    audioPlay(ids)
  });
}

// Detect selectValue Change
watch(selectValue, (newselectValue) => {
  getMenuAndList(newselectValue, 1);
  arrayObj = [];
  countNm.value = 1;
  let mybutton = document.getElementById("root");
  mybutton!.scrollTop = 0;
  musicBox.value = false;
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

// Play Audio
function audioPlay(_id:number){
  // Check if can play them play
  axios.all([
    axios.get(proxyLinks.value[0] + 'https://api-music.imsyy.top' + '/check/music?id=' + _id),
    axios.get(proxyLinks.value[0] + 'https://api-music.imsyy.top' + '/song/url?id=' + _id),
  ]).then(axios.spread((response1,response2) => {
    var data1 = response1.data;
    var data2 = response2.data;
    if(data1.success){
      musicBox.value = true;
      musicSrc.value = data2.data[0].url
    }else{
      setTimeout(() => {
                alert('Sorry, the music is not support to play...');
            }, 3000);
    }
  }));
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
      <li v-for="item in categoryArr" @click="getCategory(item.type_id, 1); countNm = 1; arrayObj = []">
        <p><span :class="item.type_id">{{ item.type_name }}</span></p>
      </li>
    </ul>
  </div>
  <div class="toggle" :style="{ left: toggleRule ? toRight - 50 + 'px' : '5px' }" @click="toggleRule = !toggleRule"></div>
  <audio :src="musicSrc" controls id="Audio1" v-show="musicBox" autoplay></audio>
  <div id="root" @scroll="handleScroll" v-if="scrollType=='homepage'||scrollType=='cateTarget'">
    <div class="itemContainer">
      <a v-for="cols in videosArr"
        :href="`../catalogues/counplay?web=${selectValue}artist/songs&tab=${cols.id}&title=${cols.name}&typev=7`">
        <div class="item"><img class="itemImg" :src="cols.picUrl"
            :alt="cols.name" />
          <div class="userInfo"><img class="avatar" src="../assets/images/music.svg" alt="" /><span class="username">{{
            `[${cols.alias.join(' ')}]${cols.name}` }}</span></div>
        </div>
      </a>
    </div>
    <div class="itemContainer">
      <a v-for="cols in videosArr2"
        :href="`../catalogues/counplay?web=${selectValue}artist/songs&tab=${cols.id}&title=${cols.name}&typev=7`">
        <div class="item"><img class="itemImg" :src="cols.picUrl"
            :alt="cols.name" />
          <div class="userInfo"><img class="avatar" src="../assets/images/music.svg" alt="" /><span class="username">{{
            `[${cols.alias.join(' ')}]${cols.name}` }}</span></div>
        </div>
      </a>
    </div>
    <div class="itemContainer" v-show="thridContent">
      <a v-for="cols in videosArr3"
        :href="`../catalogues/counplay?web=${selectValue}artist/songs&tab=${cols.id}&title=${cols.name}&typev=7`">
        <div class="item"><img class="itemImg" :src="cols.picUrl"
            :alt="cols.name" />
          <div class="userInfo"><img class="avatar" src="../assets/images/music.svg" alt="" /><span class="username">{{
            `[${cols.alias.join(' ')}]${cols.name}` }}</span></div>
        </div>
      </a>
    </div>
    <div class="itemContainer" v-show="fourthContent">
      <a v-for="cols in videosArr4"
        :href="`../catalogues/counplay?web=${selectValue}artist/songs&tab=${cols.id}&title=${cols.name}&typev=7`">
        <div class="item"><img class="itemImg" :src="cols.picUrl"
            :alt="cols.name" />
          <div class="userInfo"><img class="avatar" src="../assets/images/music.svg" alt="" /><span class="username">{{
            `[${cols.alias.join(' ')}]${cols.name}` }}</span></div>
        </div>
      </a>
      <div class="loadingimg" v-show="checkSeen"><img src="../assets/images/loading.gif" tag="Easy Web TV Loading"></div>
    </div>
  </div>
  <div id="root" @scroll="handleScroll" v-else>
    <div class="itemContainer">
      <div v-for="item in videosArr" class="item" @click="audioPlay(item.id)">
        <img class="itemImg" :src="item.artists[0].img1v1Url" :alt="item.name" />
        <div class="userInfo">
          <img class="avatar" src="../assets/images/music.svg" alt="" />
          <span class="username">{{ `[${item.artists[0].name}]${item.name}` }}</span>
        </div>
      </div>
    </div>
    <div class="itemContainer">
      <div v-for="item in videosArr2" class="item" @click="audioPlay(item.id)">
        <img class="itemImg" :src="item.artists[0].img1v1Url" :alt="item.name" />
        <div class="userInfo">
          <img class="avatar" src="../assets/images/music.svg" alt="" />
          <span class="username">{{ `[${item.artists[0].name}]${item.name}` }}</span>
        </div>
      </div>
    </div>
    <div class="itemContainer" v-show="thridContent">
      <div v-for="item in videosArr3" class="item" @click="audioPlay(item.id)">
        <img class="itemImg" :src="item.artists[0].img1v1Url" :alt="item.name" />
        <div class="userInfo">
          <img class="avatar" src="../assets/images/music.svg" alt="" />
          <span class="username">{{ `[${item.artists[0].name}]${item.name}` }}</span>
        </div>
      </div>
    </div>
    <div class="itemContainer" v-show="fourthContent">
      <div v-for="item in videosArr4" class="item" @click="audioPlay(item.id)">
        <img class="itemImg" :src="item.artists[0].img1v1Url" :alt="item.name" />
        <div class="userInfo">
          <img class="avatar" src="../assets/images/music.svg" alt="" />
          <span class="username">{{ `[${item.artists[0].name}]${item.name}` }}</span>
        </div>
      </div>
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

audio {
  width: 100%;
  opacity: .8;
  z-index: 1001;
  bottom: 0;
  position: fixed;
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
