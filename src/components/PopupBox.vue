<script setup lang="ts">
import { onUpdated } from 'vue';
import { ref, onMounted } from 'vue';

let getVal = ref("");
let getBoxVal = ref("");
// Select Category
const selectBox = ref([{
  val:'1',
  chk:true,
  nm:"coable"
},{
  val:'2',
  chk:false,
  nm:"laable"
},{
  val:'3',
  chk:false,
  nm:"caable"
}])

onMounted(()=>{
    getVal.value = "1";
});

function openUrl(_a:string){
    getBoxVal.value = window.localStorage.getItem("selectPop") ?? "";
    if(getBoxVal.value == "tv" && _a == "1"){
        window.open('./routes/countries', '_self');
    }else if(getBoxVal.value == "tv" && _a == "2"){
        window.open('./routes/languages', '_self');
    }else if(getBoxVal.value == "tv" && _a == "3"){
        window.open('./routes/category', '_self');
    }else if(getBoxVal.value == "radio" && _a == "1"){
        window.open('./routes/radio?t=1', '_self');
    }else if(getBoxVal.value == "radio" && _a == "2"){
        window.open('./routes/radio?t=2', '_self');
    }else if(getBoxVal.value == "radio" && _a == "3"){
        window.open('./routes/radio?t=3', '_self');
    }
}
</script>

<template>
    <div id="popupbox">
        <div id="chooseitem" class="reveal-modal">
            <a href="#" class="close-reveal-modal">×</a>
            <h2><slot name="selectable"></slot></h2>
            <div id="selectform">
                <li v-for="item in selectBox">
                    <input type="radio" name="radioName" :value="item.val" :checked="item.chk" v-model="getVal"/>
                    <slot :name="item.nm"></slot>
                </li>
            </div>
            <button class="stylebtn" @click="openUrl(getVal)"><slot name="goable"></slot></button>
        </div>
    </div>
</template>

<style scoped>

</style>