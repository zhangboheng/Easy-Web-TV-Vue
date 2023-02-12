<script setup lang="ts">
import '../assets/css/base.css';
import { ref, reactive, onMounted, nextTick } from 'vue';
import CustomView from '@/components/CustomView.vue';
import OptionsComp from '@/components/Optionscomp.vue';
import PopupBox from '@/components/PopupBox.vue';
import History from '@/components/History.vue';
import AppAbout from '@/components/InfoBox.vue';
import SouceControl from '@/components/ToSource.vue';
import * as translateJson from '../../static/jsons/translate.json';

let startDefaultTranslate: string | null = window.localStorage.getItem('languages');
let menuArrs: { url: string, target: string, reveal: string, message: string, infos: string, switchIf?: string, langIf?: string, clearIf?: string, sourceIf?: string, versionIf?: string, aboutIf?: string }[] = reactive(translateJson.selectbox);
let seenBar = ref(false);
let seenAdt = ref(false);
let AdultIf = ref("");
let LangIf = ref("");
let ClearIf = ref("");
let SourceIf = ref("");
let VersionIf = ref("");
let AboutIf = ref("");
let message = ref("");
let SelectIf = ref("");
let CountryIf = ref("");
let LanguageIf = ref("");
let CatagoryIf = ref("");
let EnterIf = ref("");

// Set Default Home
onMounted(() => {
  if (window.localStorage.getItem('adult') == 'open') {
    seenAdt.value = true;
    menuArrs = startDefaultTranslate == null ? reactive(translateJson.selectbox) : reactive(translateJson[startDefaultTranslate]);
  } else {
    seenAdt.value = false;
    menuArrs = menuArrs.filter(x => x.target.indexOf('adult') == -1);
  }
  //if user back refresh page
  let link = window.location.href;
  if (link.indexOf('popupbox') > -1) {
    window.location.replace('/');
  }
});

// Get Lanuage Select Box Compnonet Value
const updateMessage = (val: string) => {
  message.value = val;
  if (window.localStorage.getItem('adult') == 'open') {
    menuArrs = reactive(translateJson[val]);
  } else {
    menuArrs = reactive(translateJson[val]).filter((x: { target: string | string[]; }) => x.target.indexOf('adult') == -1);
  }
  AdultIf.value = translateJson[val][0].switchIf
  LangIf.value = translateJson[val][0].langIf
  ClearIf.value = translateJson[val][0].clearIf
  SourceIf.value = translateJson[val][0].sourceIf
  VersionIf.value = translateJson[val][0].versionIf
  AboutIf.value = translateJson[val][0].aboutIf
  SelectIf.value = translateJson[val][0].selectIf
  EnterIf.value = translateJson[val][0].message
  CountryIf.value = translateJson[val][0].countryIf
  LanguageIf.value = translateJson[val][0].languageIf
  CatagoryIf.value = translateJson[val][0].catagoryIf
  window.localStorage.setItem('languages', val);
  nextTick(() => {
    startDefaultTranslate = window.localStorage.getItem('languages');
  })
}

// Click Adult Options Event
function checkAdult(e: any) {
  if (seenAdt.value == false) {
    if (confirm("Are you over 18 years old?")) {
      window.localStorage.setItem('adult', 'open');
      menuArrs = startDefaultTranslate == null ? reactive(translateJson.selectbox) : reactive(translateJson[startDefaultTranslate]);
      seenAdt.value = !seenAdt.value;
    } else {
      e.target.checked = false;
    }
  } else {
    menuArrs = menuArrs.filter(x => x.target.indexOf('adult') == -1);
    seenAdt.value = !seenAdt.value;
    localStorage.removeItem('adult');
  }
}

// Clear All LocalStorage
function clearAll() {
  if (confirm("Are you sure clear the cache?")) {
    localStorage.clear();
  } else {
    console.log("Not do nothing...");
  }
}

</script>

<template>
  <div id="mySidenav" class="sidenav" v-show="seenBar">
    <h3>Easy Web TV</h3>
    <hr>
    <div>
      <span>{{ AdultIf }}</span>
      <label class="switch">
        <input type="checkbox" id="adultban" @click="checkAdult" :checked="seenAdt" />
        <span class="slider round"></span>
      </label>
    </div>
    <div>
      <span>{{ LangIf }}</span>
      <OptionsComp alg="languages" bnm="languages" v-model="message" @update:model-value="updateMessage" />
    </div>
    <div>
      <span>{{ ClearIf }}</span>
      <button class="cachebtn" @click="clearAll()">All</button>
    </div>
    <div>
      <span>{{ SourceIf }}</span>
      <button class="cachebtn"><a href="#sourcebox" data-reveal-id="sourceitem">Control</a></button>
    </div>
    <div>
      <span>{{ VersionIf }}</span>
      <label class="switch" style="cursor: pointer;"><a href="#logbox" data-reveal-id="logboxitem"
          style="color:#fff">8.2.0</a></label>
    </div>
    <div>
      <span>{{ AboutIf }}</span>
      <label class="switch" style="cursor: pointer;"><a href="#infobox" data-reveal-id="infoboxitem"
          style="color:#fff">APP</a></label>
    </div>
  </div>
  <div id="main" @click="seenBar = !seenBar">
    <span style="cursor:pointer"><img src="src/assets/images/menuicon.png"></span>
  </div>
  <SouceControl>{{ SelectIf }}</SouceControl>
  <History />
  <AppAbout />
  <PopupBox>
    <template v-slot:selectable>{{ SelectIf }}</template>
    <template v-slot:coable>{{ CountryIf }}</template>
    <template v-slot:laable>{{ LanguageIf }}</template>
    <template v-slot:caable>{{ CatagoryIf }}</template>
    <template v-slot:goable>{{ EnterIf }}</template>
  </PopupBox>
  <div class="bodyCon08">
    <div class="students">
      <div id="four_flash">
        <div class="flashBg">
          <ul class="mobile">
            <CustomView v-for="item in menuArrs" :img-url="item.url" :href-target="item.target"
              :data-reveal-id="item.reveal" :msg="item.message" :info="item.infos" />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
