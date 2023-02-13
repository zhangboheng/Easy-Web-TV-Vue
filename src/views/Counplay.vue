<script setup lang="ts">
import '../assets/css/main.css';
import VideoEmbed from '@/components/VideoJs.vue'
import { ref, nextTick } from 'vue';
import axios from 'axios';

var channels = [];
var lst = [];
var checkSeen = ref(true);
var itemName = ref("");
var loveIcon = ref(true)
//Get default localstorage key
var localkey = ['manga', 'bannedcountries', 'novel', 'movie', 'music', 'languages', 'porn', 'adult'];
const urlParams = new URLSearchParams(window.location.search);
var key = urlParams.get('tab');
var tis = urlParams.get('title');
document.title = tis + ' Channels';
//Get TV Channels List
axios.get('https://iptv-org.github.io/iptv/countries/' + key + ".m3u")
    .then(response => {
        checkSeen.value = false;
        let str = response.data;
        lst = str.split(",").slice(1,).filter((x: string) => /[^h]+.m3u8/.test(x)).map((x: string) => x.split("\n"));
        for (let i = 0; i < lst.length; i++) {
            channels.push(lst[i][1]);
        }
        itemName.value = channels[0];
    });
//Click Item Play Videos
function playItem(_e: string) {
    itemName.value = _e;
}
//Set Love Icon Size
function getClass(_a: string, _b: string) {
    let loveIcon: string = "";
    if (window.innerWidth > 640) {
        loveIcon = window.localStorage.getItem(_a) == _b ? 'favourimage' : 'unfavourimage';
    } else {
        loveIcon = window.localStorage.getItem(_a) == _b ? 'favourimage20' : 'unfavourimage20';
    }
    return loveIcon;
}
//Change Icon State
function changeIcon(_a: string, _b: string) {
    if (!window.localStorage) {
        console.log("Browser not support localstorage");
        return false;
    } else {
        if(getClass(_a, _b) == "favourimage" || getClass(_a, _b) == "favourimage20"){
            localStorage.removeItem(_a);
        }else{
            window.localStorage.setItem(_a, _b);
        }
    }
    nextTick(()=>{
        loveIcon.value = !loveIcon.value;
    });
}

</script>
<template>
    <div id="left">
        <h3> {{ tis }} </h3>
        <ul id="menu">
            <li v-show="checkSeen">
                <p>Channels list is loading...</p>
            </li>
            <li v-for="(item, value) of lst">
                <p @click="playItem(channels[value])">
                    <input type="button" :class="loveIcon ? getClass(channels[value], item[0]) : getClass(channels[value], item[0])"
                        @click="changeIcon(channels[value], item[0])" />
                    <span :title="channels[value]">{{ item[0] }}</span>
                </p>
            </li>
        </ul>
    </div>
    <div class="toggle"></div>
    <div id="control">
        <div id="menuicon" title="Toggle tools menu">
        </div>
        <div id="player" title="Play M3U8 Link videos">
        </div>
        <input id="inputlink" type="text" placeholder="Support m3u8 links to watch video...">
        <div id="prev" title="Back to previous page">
        </div>
        <div id="github" title="Go to project github">
        </div>
        <div id="favorite" title="Open your favorite channels list">
        </div>
        <div id="channelist">
            <h3>Favorite</h3>
            <ul id="channelcontent">
                <li>
                    <p>Please click like to collect</p>
                </li>
            </ul>
        </div>
        <div id="shuffleplay" title="Random play channels video">
        </div>
    </div>
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