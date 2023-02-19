<script setup lang="ts">
import '../assets/css/main.css';
import VideoEmbed from '@/components/VideoJs.vue'
import Tools from '@/components/Tools.vue'
import { ref, nextTick, onMounted } from 'vue';
import axios from 'axios';
import { XMLParser } from "fast-xml-parser"

var checkSeen = ref(true);
var itemName = ref("");
var imageTarget = ref("");
var loveIcon = ref(true)
var inputMessage = ref("");
var numCount = ref(0);
var toggleRule = ref(true);
const myDivWidth = ref<HTMLElement | null>(null);
var toRight = ref();
const proxyLinks = ref({
  0: 'https://cors.luckydesigner.workers.dev/?',
});
const intro = ref('Nothing');
// TV
var lst = [];
var paramKey = ['countries', 'languages', 'categories'];
// Radio
const radiosource = ref(['https://de1.api.radio-browser.info/', 'https://fr1.api.radio-browser.info/', 'https://nl1.api.radio-browser.info/']);
var rand = Math.floor(Math.random() * radiosource.value.length);
var radioLink = ['', 'json/stations/bycountry/', 'json/stations/bylanguage/', 'json/stations/bytag/'];
var radioStations:string[][] = [];
const urlParams = new URLSearchParams(window.location.search);
const key = urlParams.get('tab');
const tis = urlParams.get('title');
const web = urlParams.get('web');
const tyv = urlParams.get('typev');
const acm = urlParams.get('ac');
// Theater
var movieArr:any[] = [];
// Porn
var pornArr:any[] = [];
onMounted(() => {
    toRight.value = myDivWidth.value?.getBoundingClientRect().width;
})
//Get TV Channels List
if(tyv == '1' || tyv == '2' || tyv == '3'){
    document.title = tis + ' Channels';
    axios.get(`https://iptv-org.github.io/iptv/${paramKey[Number(tyv) - 1]}/` + key + ".m3u")
    .then(response => {
        checkSeen.value = false;
        let str = response.data;
        lst = str.split(",").slice(1,).filter((x: string) => /[^h]+.m3u8/.test(x)).map((x: string) => x.split("\n"));
        itemName.value = lst[0][1];
    });
}else if(tyv == '4'){
    document.title = tis + ' Channels';
    axios.get(radiosource.value[rand] + radioLink[Number(key)] + tis)
    .then(response => {
        checkSeen.value = false;
        let str = response.data;
        for(let i of str){
            radioStations.push([i.name, i.favicon, i.url])
        }
        itemName.value = radioStations[0][2];
        imageTarget.value = radioStations[0][1];
    });
}else if(tyv == '5'){
    axios.get(proxyLinks.value[0] + `${web?.replace('json','xml')}?ac=videolist&ids=${key}`)
    .then(response => {
        checkSeen.value = false;
        let str = response.data;
        const options = {
            parseTagValue: true
        };
        const parser = new XMLParser(options);
        document.title = parser.parse(str).rss.list.video.name;
        intro.value = parser.parse(str).rss.list.video.des;
        let nameVideoList:string = "";
        if(typeof parser.parse(str).rss.list.video.dl.dd != 'object'){
            nameVideoList = parser.parse(str).rss.list.video.dl.dd
        }else{
            nameVideoList = parser.parse(str).rss.list.video.dl.dd.filter((x:string)=>x.indexOf('.m3u8')>-1)[0];
        }
        let parseArray = nameVideoList.split(/[$|#]/);
        let picSource:string = parser.parse(str).rss.list.video.pic;
        let nameArray:string[] = [];
        let linkArray:string[] = [];
        for(let i = 0; i < parseArray.length; i++){
            if(i%2==0){
                nameArray.push(parseArray[i])
            }else{
                linkArray.push(parseArray[i])
            }
        }
        movieArr = nameArray.map((x,y)=>[document.title + x, picSource, linkArray[y]])
        itemName.value = movieArr[0][2];
        imageTarget.value = movieArr[0][1];
    });
}else if(tyv == '6'){
    document.title = tis + '';
    axios.get(proxyLinks.value[0] + web + `&ids=${key}`)
    .then(response => {
        checkSeen.value = false;
        let str = response.data.data;
        pornArr = [[str[0].vod_title,str[0].vod_pic,str[0].vpath]];
        itemName.value = pornArr[0][2];
        imageTarget.value = pornArr[0][1];
    });
}
//Click Item Play Videos
function playItem(_e: string, _index: number, _image: string) {
    itemName.value = _e;
    imageTarget.value = _image;
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
function updateMessage(valueLink: string) {
    if (valueLink == "randomModel") {
        if(tyv == '1' || tyv == '2' || tyv == '3'){
            let detail = lst[Math.floor(Math.random() * lst.length)][1];
            let playIndex = lst.map((x) => x[1]).indexOf(detail)
            itemName.value = detail
            numCount.value = playIndex
        }else if(tyv == '4'){
            let ranArr = radioStations[Math.floor(Math.random() * radioStations.length)]
            let detail = ranArr[2];
            let imageSour = ranArr[1];
            let playIndex = radioStations.map((x) => x[2]).indexOf(detail)
            itemName.value = detail
            imageTarget.value = imageSour;
            numCount.value = playIndex
        }else if(tyv == '5'){
            let ranArr = movieArr[Math.floor(Math.random() * movieArr.length)]
            let detail = ranArr[2];
            let imageSour = ranArr[1];
            let playIndex = movieArr.map((x) => x[2]).indexOf(detail)
            itemName.value = detail
            imageTarget.value = imageSour;
            numCount.value = playIndex
        }else if(tyv == '6'){
            let ranArr = pornArr[Math.floor(Math.random() * pornArr.length)]
            let detail = ranArr[2];
            let imageSour = ranArr[1];
            let playIndex = pornArr.map((x) => x[2]).indexOf(detail)
            itemName.value = detail
            imageTarget.value = imageSour;
            numCount.value = playIndex
        }
    } else {
        if (valueLink.toLowerCase().endsWith('.m3u8')) {
            itemName.value = valueLink
        }
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
            <li v-show="!checkSeen" style="background-color:#fff"><input id="search" type="text" placeholder="Search..."
                    v-model="inputMessage" /></li>
            <li v-for="(item, index) of lst.filter((x: string) => x[0].toLowerCase().indexOf(inputMessage.toLowerCase()) > -1)"
                @click="playItem(item[1], index, '')" :class="index == numCount ? 'bd' : ''" v-if="tyv == '1' || tyv == '2' || tyv == '3'">
                <p>
                    <input type="button" :class="loveIcon ? getClass(item[1], item[0]) : getClass(item[1], item[0])"
                        @click="changeIcon(item[1], item[0])" />
                    <span :title="item[1]">{{ item[0] }}</span>
                </p>
            </li>
            <li v-for="(item, index) of radioStations.filter(x => x[0].toLowerCase().indexOf(inputMessage.toLowerCase()) > -1)"
                @click="playItem(item[2], index, item[1])" :class="index == numCount ? 'bd' : ''" v-if="tyv == '4'">
                <p>
                    <input type="button" :class="loveIcon ? getClass(item[2], item[0]) : getClass(item[2], item[0])"
                        @click="changeIcon(item[2], item[0])" />
                    <span :title="item[2]">{{ item[0] }}</span>
                </p>
            </li>
            <li v-for="(item, index) of movieArr.filter(x => x[0].toLowerCase().indexOf(inputMessage.toLowerCase()) > -1)"
                @click="playItem(item[2], index, item[1])" :class="index == numCount ? 'bd' : ''" v-if="tyv == '5'">
                <p>
                    <input type="button" :class="loveIcon ? getClass(item[2], item[0]) : getClass(item[2], item[0])"
                        @click="changeIcon(item[2], item[0])" />
                    <span :title="item[2]">{{ item[0] }}</span>
                </p>
            </li>
            <li v-for="(item, index) of pornArr.filter(x => x[0].toLowerCase().indexOf(inputMessage.toLowerCase()) > -1)"
                @click="playItem(item[2], index, item[1])" :class="index == numCount ? 'bd' : ''" v-if="tyv == '6'">
                <p>
                    <input type="button" :class="loveIcon ? getClass(item[2], item[0]) : getClass(item[2], item[0])"
                        @click="changeIcon(item[2], item[0])" />
                    <span :title="item[2]">{{ item[0] }}</span>
                </p>
            </li>
        </ul>
    </div>
    <Tools @sendParameter:click-play="updateMessage">
        {{ intro }}
    </Tools>
    <div class="toggle" :style="{ left: toggleRule ? toRight - 50 + 'px' : '5px' }" @click="toggleRule = !toggleRule">
    </div>
    <div id="right">
        <div id="div1">
            <!-- The element where the player will be placed -->
            <VideoEmbed :sourceLink="itemName.replace(';','')" :imageLink="imageTarget"/>
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