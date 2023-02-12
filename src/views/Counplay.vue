<script setup lang="ts">
import '../assets/css/main.css';
import VideoEmbed from '@/components/VideoJs.vue'
import { ref } from 'vue';
import axios from 'axios';

var channels = [];
var lst = [];
var checkSeen = ref(true);
//Get default localstorage key
var localkey = ['manga', 'bannedcountries', 'novel', 'movie', 'music', 'languages', 'porn', 'adult'];
const urlParams = new URLSearchParams(window.location.search);
var key = urlParams.get('tab');
var tis = urlParams.get('title');
document.title = tis + ' Channels';

axios.get('https://iptv-org.github.io/iptv/countries/' + key + ".m3u")
    .then(response => {
        checkSeen.value = false;
        let links = [];
        let str = response.data;
        lst = str.split(",").slice(1,).filter((x:string) => /[^h]+.m3u8/.test(x)).map((x:string) => x.split("\n"));
        for (let i = 0; i < lst.length; i++) {
            channels.push(lst[i][1]);
        }
    });

</script>
<template>
    <div id="left">
        <h3> {{ tis }} </h3>
        <ul id="menu">
            <li v-show="checkSeen">
                <p>Channels list is loading...</p>
            </li>
            <li v-for="(item,value) of lst">
                <p>
                    <input type="button" style="background-image: url('../src/assets/images/favorite.png')"/>
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
            <video-embed :sourceLink="channels[0]"/>
        </div>
    </div>
</template>

<style scoped>

</style>