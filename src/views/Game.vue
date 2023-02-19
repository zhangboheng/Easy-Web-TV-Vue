<script setup lang="ts">
import '../assets/css/main.css';
import { ref, onMounted, watch} from 'vue';
var toggleRule = ref(true);
const myDivWidth = ref<HTMLElement | null>(null);
var toRight = ref();
var checkSeen = ref(true);
var inputMessage = ref("");
// Category Collection
const categoryArr = ref([
  {type_name:'PC',type_id:1}
]);
const gameUnit:any[] = [{
  target:'https://zhangboheng.github.io/Easy-Web-TV-M3u8/gamebox/ball/gameball.html',
  imgSrc:'../src/assets/gamebox/ball/squareobstacle.png',
  gameNm:'Square Obstacles',
  type_name:'PC'
},{
  target:'https://zhangboheng.github.io/Easy-Web-TV-M3u8/gamebox/bong/gamebong.html',
  imgSrc:'../src/assets/gamebox/bong/bong.png',
  gameNm:'Pong',
  type_name:'PC'
},{
  target:'https://zhangboheng.github.io/Easy-Web-TV-M3u8/gamebox/breakout/gamebreakout.html',
  imgSrc:'../src/assets/gamebox/breakout/breakout.png',
  gameNm:'Breakout',
  type_name:'PC'
},{
  target:'https://zhangboheng.github.io/Easy-Web-TV-M3u8/gamebox/tic-tac-toe/tic-tac-toe-game.html',
  imgSrc:'../src/assets/gamebox/tic-tac-toe/tictactoe.png',
  gameNm:'Tic Ta Toe',
  type_name:'PC'
}]
var gameArr:any[] = [];
var gameArr2:any[] = [];
var gameArr3:any[] = [];
var gameArr4:any[] = [];
// Stream Box Type
/*Over 1024 = 1; Over 640 = 2; Lower 640 = 3*/
const typeDifineRule = ref();
// ItemContainer Show and Hide
const thridContent = ref(true);
const fourthContent = ref(true);
onMounted(() => {
  toRight.value = myDivWidth.value?.getBoundingClientRect().width;
  checkSeen.value = false;
  if (window.innerWidth >= 1024) {
    typeDifineRule.value = 1
    gameArr = gameUnit.filter((x,y) => y%4==0);
    gameArr2 = gameUnit.filter((x,y) => y%4==1);
    gameArr3 = gameUnit.filter((x,y) => y%4==2);
    gameArr4 = gameUnit.filter((x,y) => y%4==3);
  } else if (window.innerWidth < 1024 && window.innerWidth > 640) {
    typeDifineRule.value = 2
    fourthContent.value = false
    gameArr = gameUnit.filter((x,y) => y%3==0);
    gameArr2 = gameUnit.filter((x,y) => y%3==1);
    gameArr3 = gameUnit.filter((x,y) => y%3==2);
  } else {
    typeDifineRule.value = 3
    thridContent.value = false
    fourthContent.value = false
    gameArr = gameUnit.filter((x,y) => y%2==0);
    gameArr2 = gameUnit.filter((x,y) => y%2==1);
  };
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
</script>
<template>
  <div id="left" ref="myDivWidth" v-show="toggleRule">
    <h3>Select Category</h3>
    <ul id="menu">
      <li v-show="checkSeen">
        <p>Category list is loading...</p>
      </li>
      <li v-show="!checkSeen" style="background-color:#fff"><input id="search" type="text" placeholder="Search..."
          v-model="inputMessage"/></li>
      <li v-for="item in categoryArr">
        <p><span :class="item.type_id">{{ item.type_name }}</span></p>
      </li>
    </ul>
  </div>
  <div class="toggle" :style="{ left: toggleRule ? toRight - 50 + 'px' : '5px' }" @click="toggleRule = !toggleRule"></div>
  <div id="root">
    <div class="itemContainer">
      <a v-for="cols in gameArr" :href="cols.target">
        <div class="item"><img class="itemImg" :src="cols.imgSrc" :alt="cols.gameNm" />
          <div class="userInfo"><img class="avatar" src="../assets/images/game.svg" alt="" /><span class="username">{{
            `[${cols.type_name}]${cols.gameNm}` }}</span></div>
        </div>
      </a>
    </div>
    <div class="itemContainer">
      <a v-for="cols in gameArr2" :href="cols.target">
        <div class="item"><img class="itemImg" :src="cols.imgSrc" :alt="cols.gameNm" />
          <div class="userInfo"><img class="avatar" src="../assets/images/game.svg" alt="" /><span class="username">{{
            `[${cols.type_name}]${cols.gameNm}` }}</span></div>
        </div>
      </a>
    </div>
    <div class="itemContainer" v-show="thridContent">
      <a v-for="cols in gameArr3" :href="cols.target">
        <div class="item"><img class="itemImg" :src="cols.imgSrc" :alt="cols.gameNm" />
          <div class="userInfo"><img class="avatar" src="../assets/images/game.svg" alt="" /><span class="username">{{
            `[${cols.type_name}]${cols.gameNm}` }}</span></div>
        </div>
      </a>
    </div>
    <div class="itemContainer" v-show="fourthContent">
      <a v-for="cols in gameArr4" :href="cols.target">
        <div class="item"><img class="itemImg" :src="cols.imgSrc" :alt="cols.gameNm" />
          <div class="userInfo"><img class="avatar" src="../assets/images/game.svg" alt="" /><span class="username">{{
            `[${cols.type_name}]${cols.gameNm}` }}</span></div>
        </div>
      </a>
      <div class="loadingimg" v-show="checkSeen"><img src="../assets/images/loading.gif" tag="Easy Web TV Loading"></div>
    </div>
  </div>
  <div id="prevbox" title="Back to previous page" @mouseenter="hover()" @click="goToPage()" @mouseleave="leave()"></div>
</template>

<style scoped>

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
}
</style>
