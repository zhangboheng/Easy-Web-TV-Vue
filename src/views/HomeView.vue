<script setup lang="ts">
import CustomView from '@/components/CustomView.vue';
import { reactive } from 'vue'
const menuArrs: { url: string, target: string, reveal: string, message: string, infos: string }[] = reactive([
  { "url": "src/assets/images/tv.svg", "target": "#popupbox", "reveal": "chooseitem", "message": "Enter", "infos": "Watch 6000+ TV Channels..." },
  { "url": "src/assets/images/comprehensive.svg", "target": "routes/comprehensive.html", "reveal": "", "message": "Enter", "infos": "Watch Movies, Series, Animes..." },
  { "url": "src/assets/images/radio.svg", "target": "#popupbox", "reveal": "chooseitem", "message": "Enter", "infos": "Listen 28000+ Radio Stations..." },
  { "url": "src/assets/images/reading.svg", "target": "routes/novel.html", "reveal": "", "message": "Enter", "infos": "Reading More Than 100000+ Books..." },
  { "url": "src/assets/images/manga.svg", "target": "routes/manga.html", "reveal": "", "message": "Enter", "infos": "Reading Lots of Manga Books..." },
  { "url": "src/assets/images/music.svg", "target": "routes/music.html", "reveal": "", "message": "Enter", "infos": "Listen to The World Music..." },
  { "url": "src/assets/images/game.svg", "target": "routes/game.html", "reveal": "", "message": "Enter", "infos": "Constructing until version 9.0.0" },
]);
</script>

<template>
  <div id="mySidenav" class="sidenav">
    <h3>Easy Web TV</h3>
    <hr>
    <div>
      <span>Sensitive Content</span>
      <label class="switch">
        <input type="checkbox" id="adultban">
        <span class="slider round"></span>
      </label>
    </div>
    <div>
      <span>Languages</span>
      <select id="languages" name="languages">
      </select>
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
  <div id="main">
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
