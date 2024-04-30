<script setup lang="ts">
import VideoModel from '~/models/video.model';

const route = useRoute();
const { query } = route.params;

const preset = (query as string) ?? '';

const state = reactive({
  query: preset,
  filteredVideos: VideoModel.byName(preset) as Videos,
});

watch(
  () => state.query,
  () => (state.filteredVideos = VideoModel.byName(state.query)),
);
</script>

<template>
  <div class="container mx-auto pt-8 pb-12 text-center">
    <h1 class="text-5xl font-bold text-white mb-8">The Archive</h1>

    <input
      id="query"
      v-model="state.query"
      type="text"
      placeholder="Search by title"
      class="w-full mb-12 p-4 text-lg bg-card rounded-md text-white placeholder-white-200 focus:outline-none focus:bg-gray-700"
    />

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
      <a
        v-for="video in state.filteredVideos"
        :key="video.slug"
        :href="`/archive/video/${video.slug}/`"
        class="hover:shadow-lg block rounded-lg overflow-hidden"
      >
        <img
          :src="video.thumbnail"
          :alt="video.title"
          class="w-full h-40 object-cover rounded-md"
          loading="lazy"
        />
        <div class="p-4 text-left">
          <h2 class="text-xl font-semibold text-white">{{ video.title }}</h2>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.grid,
#query {
  max-width: 90%;
}
</style>
