<script setup lang="ts">
import { ref } from 'vue';
const text = ref([{
    content:'[2021-10-09] V8.2.0 release support to play one game'
},{
    content:'2021-10-06] V8.1.1 release Add about feature and fixed some bugs'
},{
    content:'[2021-10-02] V8.1.0 release Add source control feature'
},{
    content:'[2021-10-01] Delete one invalid manga source and add log history'
},{
    content:'[2021-09-16] V8.0.0 release support to listen to music online'
},{
    content:'[2021-09-15] V7.0.0 release support to read manga books'
},{
    content:'[2021-09-13] V6.0.0 release support to read novel books'
},{
    content:'[2021-09-08] V5.0.0 release support to listen 28000+ radio stations'
},{
    content:'[2021-09-04] V4.0.0 release support to watch movies, series, cartoon...'
},{
    content:'[2021-08-31] V3.0.0 release support to watch IPTV'
},{
    content:'[2021-08-29] V2.0.0 release support to search IPTV channels'
},{
    content:'[2021-08-29] V1.1.0 release pure code'
},{
    content:'[2021-08-28] V1.0.3 release support to remark favorite channels'
},{
    content:'[2021-04-21] V1.0.0 release'
}]);
</script>

<template>
    <div id="logbox">
        <div id="logboxitem" class="log-modal">
            <a href="#" class="close-log-modal">×</a>
            <div class="scrollidbar" style="text-align: left;">
                <p v-for="item in text">
                    {{ item.content }}
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>