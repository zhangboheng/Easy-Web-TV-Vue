

<script lang="ts">
import { ref, defineComponent, shallowRef } from 'vue'
import { computed } from "@vue/reactivity"
import type { VideoJsPlayer } from 'video.js'
import { VideoPlayer } from '@videojs-player/vue'
import type { VideoPlayerProps, VideoPlayerState } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

export default defineComponent({
  name: 'vue-basic-player-example',
  title: 'Basic player (Vue)',
  url: import.meta.url,
  components: {
    VideoPlayer
  },
  props: {
    sourceLink: String,
  },
  setup() {
    const windowHeight = window.innerHeight
    const player = shallowRef<VideoJsPlayer>()
    const handleMounted = (payload: any) => {
      player.value = payload.player
    }

    const handleEvent = (log: any) => {
      console.log('Basic player event', log)
    }

    return { player, windowHeight, handleMounted, handleEvent }
  }
})
</script>
<template>
  <video-player class="video-player vjs-big-play-centered"
    :src="sourceLink"
    poster="https://vjs.zencdn.net/v/oceans.png" crossorigin="anonymous" playsinline controls :volume="0.6"
    :height="windowHeight" :playback-rates="[0.7, 1.0, 1.5, 2.0]" @mounted="handleMounted" @ready="handleEvent($event)"
    @play="handleEvent($event)" @pause="handleEvent($event)" @ended="handleEvent($event)"
    @loadeddata="handleEvent($event)" @waiting="handleEvent($event)" @playing="handleEvent($event)"
    @canplay="handleEvent($event)" @canplaythrough="handleEvent($event)"
    @timeupdate="handleEvent(player?.currentTime())" />
</template>
<style lang="scss" scoped>
.video-player {
  background-color: #000;
  width: 100%;
}
</style>