<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HomeView from './views/HomeView.vue'
import './assets/css/base.css';
</script>

<template>
  <HomeView />
  <!-- <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/routes/adult">About</RouterLink>
      </nav>
    </div>
  </header> -->
  <!-- <RouterView /> -->
</template>
