<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
const seen = ref(false);
const fav = ref(false);
var loveIcon = ref(true)
const emmitsClick = defineEmits(['sendParameter:clickPlay']);
const inputLink = ref('');
const localkey = ['manga', 'bannedcountries', 'novel', 'movie', 'music', 'languages', 'porn', 'adult'];
var favouriteItem: string[] = [];
var favouriteValue: string[] = [];
//Default Favourite List
onMounted(() => {
    for (let i of Object.keys(localStorage).filter((x:string) => !localkey.includes(x))) {
        favouriteItem.push(i);
        favouriteValue.push(localStorage[i]);
    }
});
//Toggle Menu
function toggleShow() {
    seen.value = !seen.value;
}
//Click Play Videos
function sendParameter(value: string) {
    emmitsClick('sendParameter:clickPlay', value)
    nextTick(() => {
        inputLink.value = "";
    })
}
//Return Last Page
function backPage() {
    window.history.back();
}
//Open Easy-Web-TV-Vue Project Page
function openGithub() {
    window.open('https://github.com/zhangboheng/Easy-Web-TV-Vue', '_blank')
}
//Open and Close Favourite List
function toggleFavor() {
    fav.value = !fav.value
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
</script>

<template>
    <div id="control">
        <div id="menuicon" title="Toggle tools menu" @click="toggleShow">
        </div>
        <div id="player" title="Play M3U8 Link videos" v-show="seen" @click="sendParameter(inputLink)">
        </div>
        <input id="inputlink" type="text" placeholder="Support m3u8 links to watch video..." v-show="seen"
            v-model="inputLink">
        <div id="prev" title="Back to previous page" v-show="seen" @click="backPage">
        </div>
        <div id="github" title="Go to project github" v-show="seen" @click="openGithub">
        </div>
        <div id="favorite" title="Open your favorite channels list" v-show="seen" @click="toggleFavor">
        </div>
        <div id="channelist" v-show="fav">
            <h3>Favorite</h3>
            <ul id="channelcontent">
                <li v-for="(item,index) in favouriteItem"><p><input type="button" :class="loveIcon ? getClass(item, favouriteValue[index]) : getClass(item, favouriteValue[index])" @click="changeIcon(item, favouriteValue[index])"/><span :title="item">{{ favouriteValue[index] }}</span></p></li>
            </ul>
        </div>
        <div id="shuffleplay" title="Random play channels video" v-show="seen">
        </div>
        <div id="epdetail" title="Content detail" v-show="seen">
        </div>
        <div id="epcontent">
        </div>
    </div>
</template>

<style scoped>
#menuicon {
    position: absolute;
    width: 50px;
    height: 50px;
    right: 20px;
    top: 10px;
    background: none;
    z-index: 999;
    background-image: url("../src/assets/images/menuicon.png");
    opacity: 0.5;
    cursor: pointer;
}

#menuicon:hover {
    opacity: 1;
}


#inputlink {
    position: absolute;
    right: 85px;
    top: 65px;
    height: 40px;
    width: 320px;
    background-color: #fff;
    z-index: 998;
    border: 0;
    opacity: 0.6;
    letter-spacing: 1px;
    text-indent: 4px;
}

#player {
    position: absolute;
    width: 50px;
    height: 50px;
    right: 20px;
    top: 60px;
    background: #fff;
    z-index: 999;
    border-radius: 25px;
    background-image: url("../src/assets/images/link.jpg");
    opacity: 0.5;
    cursor: pointer;
    color: #000;
}

#player:hover {
    opacity: 1;
}

#prev {
    position: absolute;
    width: 50px;
    height: 50px;
    right: 20px;
    top: 120px;
    background: #fff;
    z-index: 999;
    border-radius: 25px;
    background-image: url('../src/assets/images/previous.jpg');
    opacity: 0.5;
    cursor: pointer;
    color: #000;
}

#prev:hover {
    opacity: 1;
}

#github {
    position: absolute;
    width: 50px;
    height: 50px;
    right: 20px;
    top: 180px;
    background: #fff;
    z-index: 999;
    border-radius: 25px;
    background-image: url("../src/assets/images/github.jpg");
    opacity: 0.5;
    cursor: pointer;
    color: #000;
}

#github:hover {
    opacity: 1;
}

#favorite {
    position: absolute;
    width: 50px;
    height: 50px;
    right: 20px;
    top: 240px;
    background: #fff;
    z-index: 999;
    border-radius: 25px;
    background-image: url("../src/assets/images/documents.jpg");
    opacity: 0.5;
    cursor: pointer;
    color: #000;
}

#favorite:hover {
    opacity: 1;
}

#channelist {
    position: absolute;
    width: 200px;
    height: 300px;
    right: 100px;
    top: 240px;
    background: #e62117;
    z-index: 1000;
    opacity: 0.5;
    color: #fff;
    overflow-y: auto;
    text-align: center;
    outline: 1px solid #fff;
    outline-offset: -1px;
}

#shuffleplay {
    position: absolute;
    width: 50px;
    height: 50px;
    right: 20px;
    top: 300px;
    background: #fff;
    z-index: 999;
    border-radius: 25px;
    background-image: url("../src/assets/images/shuffleplay.png");
    opacity: 0.5;
    cursor: pointer;
    color: #000;
}

#shuffleplay:hover {
    opacity: 1;
}

#epdetail {
    position: absolute;
    width: 50px;
    height: 50px;
    right: 20px;
    top: 360px;
    background: #fff;
    z-index: 999;
    border-radius: 25px;
    background-image: url("../src/assets/images/detail.png");
    opacity: 0.5;
    cursor: pointer;
    color: #000;
    background-size: cover;
}

#epdetail:hover {
    opacity: 1;
}

#epcontent p {
    word-break: break-all;
    text-align: left;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 14px;
}
.favourimage {
    background-image: url('../src/assets/images/favorite.png');
}

.favourimage20 {
    background-image: url('../src/assets/images/favorite20.png');
}
</style>
