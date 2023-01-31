<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import CustomView from '@/components/CustomView.vue';
import OptionsComp from '@/components/Optionscomp.vue';
import * as translateJson from '../../static/jsons/translate.json';

const startDefaultTranslate: string|null = window.localStorage.getItem('languages');
let menuArrs: { url: string, target: string, reveal: string, message: string, infos: string }[] = reactive(translateJson.selectbox);
let seenBar = ref(false);
let seenAdt = ref(false);
let message = ref("");

// Set Default Home
onMounted(()=>{
  if(window.localStorage.getItem('adult') == 'open'){
    seenAdt.value = true;
    menuArrs = startDefaultTranslate == null ? reactive(translateJson.selectbox) : reactive(translateJson[startDefaultTranslate]);
  }else{
    seenAdt.value = false;
    menuArrs = menuArrs.filter(x=>x.target.indexOf('adult') == -1);
  }
});

// Get Lanuage Select Box Compnonet Value
const updateMessage = (val:string) => {
  message.value = val;
  menuArrs = reactive(translateJson[val]);
  window.localStorage.setItem('languages', val);
}

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
    menuArrs = menuArrs.filter(x=>x.target.indexOf('adult') == -1);
    seenAdt.value = !seenAdt.value;
    localStorage.removeItem('adult');
  }
  return seenAdt
}

</script>

<template>
  <div id="mySidenav" class="sidenav" v-show="seenBar">
    <h3>Easy Web TV</h3>
    <hr>
    <div>
      <span>Sensitive Content</span>
      <label class="switch">
        <input type="checkbox" id="adultban" @click="checkAdult" v-on:checked="seenAdt"/>
        <span class="slider round"></span>
      </label>
    </div>
    <div>
      <OptionsComp input-name="Languages" alg="languages" bnm="languages" v-model="message"
        @update:model-value="updateMessage" />
    </div>
    <div>
      <span>Clear</span>
      <button class="cachebtn">All</button>
    </div>
    <div>
      <span>Source</span>
      <button class="cachebtn"><a href="#sourcebox" data-reveal-id="sourceitem">Control</a></button>
    </div>
    <div>
      <span>Version</span>
      <label class="switch" style="cursor: pointer;"><a href="#logbox" data-reveal-id="logboxitem"
          style="color:#fff">8.2.0</a></label>
    </div>
    <div>
      <span>About</span>
      <label class="switch" style="cursor: pointer;"><a href="#infobox" data-reveal-id="infoboxitem"
          style="color:#fff">APP</a></label>
    </div>
  </div>
  <div id="main" @click="seenBar = !seenBar">
    <span style="cursor:pointer"><img src="src/assets/images/menuicon.png"></span>
  </div>
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
