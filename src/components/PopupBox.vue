<script setup lang="ts">
</script>

<template>
    <div id="popupbox">
        <div id="chooseitem" class="reveal-modal">
            <a href="#" class="close-reveal-modal">×</a>
            <h2><slot name="selectable"></slot></h2>
            <div id="selectform">
                <input type="radio" name="radioName" value="1" checked/> <span>Contries</span> <br />
                <input type="radio" name="radioName" value="2" /> <span>Languages</span> <br />
                <input type="radio" name="radioName" value="3" /> <span>Category</span> <br />
            </div>
            <button class="stylebtn"><slot name="goable"></slot></button>
        </div>
    </div>
</template>

<style scoped>

</style>