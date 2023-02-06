<script setup lang="ts">
import { ref, onMounted } from 'vue';
const checkNum = ref(1);
const menuShowM = ref(true);
const menuShowN = ref(true);
const menuShowC = ref(true);
const menuShowD = ref(true);
const menuShowE = ref(true);
const sessionMar:string[] | undefined = window.localStorage.getItem('movie')?.split(",");
const sessionMbr:string[] | undefined = window.localStorage.getItem('novel')?.split(",");
const sessionMcr:string[] | undefined = window.localStorage.getItem('manga')?.split(",");
const sessionMdr:string[] | undefined = window.localStorage.getItem('music')?.split(",");
const sessionMer:string[] | undefined = window.localStorage.getItem('porn')?.split(",");
// Select Category
const selectBox = ref([{
  val:'1',
  chk:true,
  text:'Moive'
},{
  val:'2',
  chk:false,
  text:'Novel'
},{
  val:'3',
  chk:false,
  text:'Manga'
},{
  val:'4',
  chk:false,
  text:'Music'
},{
  val:'5',
  chk:false,
  text:'Porn'
}])
// Movie Source Array
const movieSouceArr = ref([{
  val: '39ys',
  chk: true,
  text: '39影视'
},{
  val:'wlys',
  chk:true,
  text: '卧龙影视'
},{
  val:'phzy',
  chk:true,
  text: '飘花资源'
},{
  val:'kby',
  chk:true,
  text: '快播云'
},{
  val:'tky',
  chk:true,
  text: '天空云'
},{
  val:'bjy',
  chk:true,
  text: '八戒云'
}]);

// Novel Source Array
const novelSouceArr = ref([{
  val: 'novelonlinefull',
  chk: true,
  text: 'novelonlinefull'
},{
  val:'95sb',
  chk:true,
  text: '95书包'
}]);

// Manga Source Array
const mangaSouceArr = ref([{
  val: 'mangabuddy',
  chk: true,
  text: 'mangabuddy'
},{
  val:'mangadex',
  chk:true,
  text: 'mangadex'
},{
  val:'dmmh',
  chk:true,
  text: '耽美漫画(PC端)'
}]);

// Music Source Array
const musicSouceArr = ref([{
  val: 'wymusic',
  chk: true,
  text: '网易云音乐'
}]);

// Music Source Array
const pornSouceArr = ref([{
  val: 'zmwzy',
  chk: true,
  text: '字幕网'
},{
  val: 'fedzy',
  chk: true,
  text: '富二代'
},{
  val: 'javmy',
  chk: true,
  text: 'JAV名优'
},{
  val: 'hyzy',
  chk: true,
  text: '环亚'
},{
  val: 'sszy',
  chk: true,
  text: '色色'
},{
  val: 'jjzy',
  chk: true,
  text: '玖玖'
},{
  val: 'lsnzy',
  chk: true,
  text: '狼少年'
},{
  val: 'bttzy',
  chk: true,
  text: '博天堂'
},{
  val: 'llzy',
  chk: true,
  text: '利来'
}]);

onMounted(()=>{
  if(sessionMar){
    movieSouceArr.value.map(x=>sessionMar.indexOf(x.val)>-1 ? x.chk = true : x.chk = false)
  }
  if(sessionMbr){
    novelSouceArr.value.map(x=>sessionMbr.indexOf(x.val)>-1 ? x.chk = true : x.chk = false)
  }
  if(sessionMcr){
    mangaSouceArr.value.map(x=>sessionMcr.indexOf(x.val)>-1 ? x.chk = true : x.chk = false)
  }
  if(sessionMdr){
    musicSouceArr.value.map(x=>sessionMdr.indexOf(x.val)>-1 ? x.chk = true : x.chk = false)
  }
  if(sessionMer){
    pornSouceArr.value.map(x=>sessionMer.indexOf(x.val)>-1 ? x.chk = true : x.chk = false)
  }
})

function goToSource(_num:number):void {
  if(_num == 1){
    menuShowM.value = !menuShowM.value;
    let all = movieSouceArr.value.filter(x=>x.chk == true).map(x=>x.val);
    window.localStorage.setItem('movie', all.join(','));
  }else if(_num == 2){
    menuShowN.value = !menuShowN.value;
    let all = novelSouceArr.value.filter(x=>x.chk == true).map(x=>x.val);
    window.localStorage.setItem('novel', all.join(','));
  }else if(_num == 3){
    menuShowC.value = !menuShowC.value;
    let all = mangaSouceArr.value.filter(x=>x.chk == true).map(x=>x.val);
    window.localStorage.setItem('manga', all.join(','));
  }else if(_num == 4){
    menuShowD.value = !menuShowD.value;
    let all = musicSouceArr.value.filter(x=>x.chk == true).map(x=>x.val);
    window.localStorage.setItem('music', all.join(','));
  }else{
    menuShowE.value = !menuShowE.value;
    let all = pornSouceArr.value.filter(x=>x.chk == true).map(x=>x.val);
    window.localStorage.setItem('porn', all.join(','));
  }
}

</script>

<template>
  <div id="sourcebox">
        <div id="sourceitem" class="source-modal">
            <a href="#" class="close-source-modal">×</a>
            <h2><slot></slot></h2>
            <div id="selectform" v-show="checkNum == 1 ? menuShowM : checkNum == 2 ? menuShowN : checkNum == 3 ? menuShowC : checkNum == 4 ? menuShowD : menuShowE">
              <ul>
                <li v-for="item in selectBox"><input type="radio" name="sourceName" :value="item.val" :checked="item.chk" v-model="checkNum"/><span>{{ item.text }}</span></li>
              </ul>
            </div>
            <div id="selectform" style="display:flex;" v-show="!menuShowM">
              <ul>
                <li v-for="item in movieSouceArr.slice(0,3)">
                  <input type="checkbox" name="movie" :value="item.val" :checked="item.chk" @click="item.chk = !item.chk"/>
                  <label for="movie">{{ item.text }}</label>
                </li>
              </ul>
              <ul>
                <li v-for="item in movieSouceArr.slice(3,6)">
                  <input type="checkbox" name="movie" :value="item.val" :checked="item.chk" @click="item.chk = !item.chk"/>
                  <label for="movie">{{ item.text }}</label>
                </li>
              </ul>
            </div>
            <div id="selectform" style="display:flex;" v-show="!menuShowN">
              <ul>
                <li v-for="item in novelSouceArr">
                  <input type="checkbox" name="novel" :value="item.val" :checked="item.chk" @click="item.chk = !item.chk"/>
                  <label for="novel">{{ item.text }}</label>
                </li>
              </ul>
            </div>
            <div id="selectform" style="display:flex;" v-show="!menuShowC">
              <ul>
                <li v-for="item in mangaSouceArr">
                  <input type="checkbox" name="manga" :value="item.val" :checked="item.chk" @click="item.chk = !item.chk"/>
                  <label for="manga">{{ item.text }}</label>
                </li>
              </ul>
            </div>
            <div id="selectform" style="display:flex;" v-show="!menuShowD">
              <ul>
                <li v-for="item in musicSouceArr">
                  <input type="checkbox" name="music" :value="item.val" :checked="item.chk" @click="item.chk = !item.chk"/>
                  <label for="music">{{ item.text }}</label>
                </li>
              </ul>
            </div>
            <div id="selectform" style="display:flex;" v-show="!menuShowE">
              <ul>
                <li v-for="item in pornSouceArr.slice(0,3)">
                  <input type="checkbox" name="porn" :value="item.val" :checked="item.chk" @click="item.chk = !item.chk"/>
                  <label for="porn">{{ item.text }}</label>
                </li>
              </ul>
              <ul>
                <li v-for="item in pornSouceArr.slice(3,6)">
                  <input type="checkbox" name="porn" :value="item.val" :checked="item.chk" @click="item.chk = !item.chk"/>
                  <label for="porn">{{ item.text }}</label>
                </li>
              </ul>
              <ul>
                <li v-for="item in pornSouceArr.slice(6,9)">
                  <input type="checkbox" name="porn" :value="item.val" :checked="item.chk" @click="item.chk = !item.chk"/>
                  <label for="porn">{{ item.text }}</label>
                </li>
              </ul>
            </div>
            <button class="stylebtn" @click="goToSource(checkNum)"><img src="src/assets/images/nextselect.svg" style="width:30px;"></button>
        </div>
  </div>
</template>

<style scoped>

</style>
