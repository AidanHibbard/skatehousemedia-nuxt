<script setup lang="ts">
import VideoModel from '~/models/video.model';
import { ArrowLeftIcon } from '@heroicons/vue/24/solid';

const route = useRoute();

const state = reactive({
  query: '',
  filteredVideos: [] as Videos,
});

watch(
  () => state.query,
  () => fetchVideos(),
);

function fetchVideos() {
  if (state.query) state.filteredVideos = VideoModel.byName(state.query);
  else state.filteredVideos = [];
}

const userIsViewingArchive = computed(() => {
  return route.name === 'Archive-query';
});
</script>

<template>
  <header v-if="!userIsViewingArchive">
    <nav class="bg-black py-4 px-4 sm:px-8 flex justify-between items-center">
      <a
        v-if="!userIsViewingArchive"
        href="/archive"
        class="text-white text-lg flex items-center"
      >
        <ArrowLeftIcon class="h-6 w-6 mr-2" /> Back to Archive
      </a>
      <div class="relative">
        <input
          v-model="state.query"
          type="text"
          placeholder="Find a video"
          class="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:bg-gray-900 focus:ring-2 focus:ring-gray-500 w-full sm:w-64"
          @keyup="fetchVideos"
        />
        <ul
          v-if="state.filteredVideos.length"
          class="absolute z-10 bg-gray-800 text-white rounded-lg mt-2 w-full sm:w-64"
        >
          <li
            v-for="video in state.filteredVideos.slice(0, 10)"
            :key="video.slug"
          >
            <a
              :href="`/archive/video/${video.slug}`"
              class="block px-4 py-2 cursor-pointer hover:bg-gray-700"
            >
              {{ video.title }}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
