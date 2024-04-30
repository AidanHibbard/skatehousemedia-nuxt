<script setup lang="ts">
import VideoModel from '~/models/video.model';

const route = useRoute();
const { videoSlug } = route.params;
const slug = videoSlug[0];

const state = reactive({
  currentVideo: VideoModel.bySlug(slug ?? ''),
  nextVideo: null,
  previousVideo: null,
  showCountDown: false,
  countDown: 0,
});

function goToPreviousVideo() {
  // Your logic to navigate to the previous video
}

function goToNextVideo() {
  // Your logic to navigate to the next video
}

function handleVideoEnd() {
  state.showCountDown = true;
  state.countDown = 15;
  const timer = setInterval(() => {
    if (state.countDown >= 0 && state.countDown <= 15) {
      state.countDown--;
    } else {
      state.countDown = 0;
      state.showCountDown = false;
      clearInterval(timer);
      goToNextVideo();
    }
  }, 1000);
}

const countdownGradient = computed(() => {
  if (state.countDown === 0) return 'bg-card';
  const percentage = (state.countDown / 15) * 100;
  return `linear-gradient(to left, #31363F ${percentage}%, #21363C ${percentage}%)`;
});
</script>

<template>
  <div v-if="state.currentVideo" class="container mx-auto pt-8 pb-12">
    <h1 class="text-5xl font-bold text-center text-white mb-8">
      {{ state.currentVideo.title }}
    </h1>

    <VideoPlayer
      :src="state.currentVideo.src"
      :thumbnail="state.currentVideo.thumbnail"
      @ended="handleVideoEnd"
    />

    <div class="flex justify-between m-8 w-3/5 mx-auto">
      <div class="flex items-center">
        <button
          class="bg-card text-white p-2 rounded hover:bg-gray-700 flex items-center"
          @click="goToPreviousVideo"
        >
          <img
            :src="state.currentVideo.thumbnail"
            class="w-8 h-8 mr-2"
            :alt="state.currentVideo.title"
          />
          <span class="text-ellipsis">{{ state.currentVideo.title }}</span>
        </button>
      </div>

      <div class="flex items-center">
        <button
          class="bg-card text-white p-2 rounded hover:bg-gray-700 flex items-center transition-all duration-500"
          :style="{ background: countdownGradient }"
          @click="goToNextVideo"
        >
          <span class="text-ellipsis">{{ state.currentVideo.title }}</span>
          <img
            :src="state.currentVideo.thumbnail"
            class="w-8 h-8 ml-2"
            :alt="state.currentVideo.title"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
