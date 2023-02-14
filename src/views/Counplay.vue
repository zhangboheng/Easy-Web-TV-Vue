<script setup lang="ts">
import '../assets/css/main.css';
import VideoEmbed from '@/components/VideoJs.vue'
import Tools from '@/components/Tools.vue'
import { ref, nextTick, onMounted } from 'vue';
import axios from 'axios';

var lst = [];
var checkSeen = ref(true);
var itemName = ref("");
var loveIcon = ref(true)
var inputMessage = ref("");
var numCount = ref(0);
var toggleRule = ref(true);
const myDivWidth =  ref<HTMLElement | null>(null);
var toRight = ref();
//Get default localstorage key
var paramKey = ['countries', 'languages', 'categories'];
const urlParams = new URLSearchParams(window.location.search);
const key = urlParams.get('tab');
const tis = urlParams.get('title');
const tyv = urlParams.get('typev');
document.title = tis + ' Channels';
onMounted(()=>{
    toRight.value = myDivWidth.value?.getBoundingClientRect().width;
})
//Get TV Channels List
axios.get(`https://iptv-org.github.io/iptv/${paramKey[Number(tyv) - 1]}/` + key + ".m3u")
    .then(response => {
        checkSeen.value = false;
        let str = response.data;
        lst = str.split(",").slice(1,).filter((x: string) => /[^h]+.m3u8/.test(x)).map((x: string) => x.split("\n"));
        itemName.value = lst[0][1];
    });
//Click Item Play Videos
function playItem(_e: string, _index:number) {
    itemName.value = _e;
    numCount.value = _index;
}
//Set Love Icon Size
function getClass(_a: string, _b: string) {
    let abc: string = "";
    if (window.innerWidth > 640) {
        abc = window.localStorage.getItem(_a) == _b ? 'favourimage' : 'unfavourimage';
    } else {
        abc = window.localStorage.getItem(_a) == _b ? 'favourimage20' : 'unfavourimage20';
    }
    return abc;
}
//Change Icon State
function changeIcon(_a: string, _b: string) {
    if (!window.localStorage) {
        console.log("Browser not support localstorage");
        return false;
    } else {
        if (getClass(_a, _b) == "favourimage" || getClass(_a, _b) == "favourimage20") {
            localStorage.removeItem(_a);
        } else {
            window.localStorage.setItem(_a, _b);
        }
    }
    nextTick(() => {
        loveIcon.value = !loveIcon.value;
    });
}
function updateMessage(valueLink:any){
    if(valueLink.toLowerCase().endsWith('.m3u8')){
        itemName.value = valueLink
    }
}
</script>
<template>
    <div id="left" ref="myDivWidth" v-show="toggleRule">
        <h3> {{ tis }} </h3>
        <ul id="menu">
            <li v-show="checkSeen">
                <p>Channels list is loading...</p>
            </li>
            <li v-show="!checkSeen" style="background-color:#fff"><input id="search" type="text" placeholder="Search..." v-model="inputMessage" /></li>
            <li v-for="(item, index) of lst.filter((x:string)=>x[0].toLowerCase().indexOf(inputMessage.toLowerCase())>-1)" @click="playItem(item[1], index)" :class="index == numCount ? 'bd' : ''">
                <p>
                    <input type="button"
                        :class="loveIcon ? getClass(item[1], item[0]) : getClass(item[1], item[0])"
                        @click="changeIcon(item[1], item[0])" />
                    <span :title="item[1]">{{ item[0] }}</span>
                </p>
            </li>
        </ul>
    </div>
    <Tools targetLink=""  @sendParameter:click-play="updateMessage"/>
    <div class="toggle" :style="{ left: toggleRule ? toRight - 50 + 'px' : '5px' }" @click="toggleRule=!toggleRule"></div>
    <div id="right">
        <div id="div1">
            <!-- The element where the player will be placed -->
            <video-embed :sourceLink="itemName" />
        </div>
    </div>
</template>

<style scoped>
.favourimage {
    background-image: url('../src/assets/images/favorite.png');
}

.unfavourimage {
    background-image: url('../src/assets/images/unfavorite.png');
}

.favourimage20 {
    background-image: url('../src/assets/images/favorite20.png');
}

.unfavourimage20 {
    background-image: url('../src/assets/images/unfavorite20.png');
}
</style>