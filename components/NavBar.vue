<script setup lang="ts">
import VideoModel from '~/models/video.model';
import { ArrowLeftIcon } from '@heroicons/vue/24/solid';

const state = reactive({
  query: '',
  filteredVideos: [] as Videos,
});

watch(
  () => state.query,
  () => {
    if (state.query)
      state.filteredVideos = VideoModel.byName(state.query).slice(0, 10);
    else state.filteredVideos = [];
  },
);
</script>

<template>
  <header>
    <nav class="bg-black py-4 px-8 flex justify-between items-center">
      <a href="/archive" class="text-white text-lg"
        ><ArrowLeftIcon class="h-6 w-6 inline" /> Back to Archive</a
      >
      <div class="relative">
        <input
          v-model="state.query"
          type="text"
          placeholder="Find a video"
          class="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:bg-gray-900 focus:ring-2 focus:ring-gray-500 w-64"
        />
        <ul
          v-if="state.filteredVideos.length"
          class="absolute z-10 bg-gray-800 text-white rounded-lg mt-2 w-64"
        >
          <li v-for="video in state.filteredVideos" :key="video.title">
            <a
              :href="`/archive/video/${video.slug}`"
              class="h-full w-full block px-4 py-2 cursor-pointer hover:bg-gray-700"
            >
              {{ video.title }}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<style scoped></style>
