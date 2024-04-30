<script setup lang="ts">
import VideoModel from '~/models/video.model';

const route = useRoute();
const { videoSlug } = route.params;

const currentVideo = VideoModel.bySlug((videoSlug as string) ?? '');

let countdown: number | null = null;
let showCountdown = false;

const router = useRouter();

const videoPlayer = ref<HTMLVideoElement | null>(null);

function goToPreviousVideo() {
  // Your logic to navigate to the previous video
}

function goToNextVideo() {
  // Your logic to navigate to the next video
}

function handleVideoEnd() {
  showCountdown = true;
  countdown = 10;
  const timer = setInterval(() => {
    if (countdown && countdown > 0) {
      countdown--;
    } else {
      clearInterval(timer);
      goToNextVideo();
    }
  }, 1000);
}
</script>

<template>
  <div v-if="currentVideo" class="container mx-auto pt-8 pb-12">
    <h1 class="text-5xl font-bold text-center text-white mb-8">
      {{ currentVideo.title }}
    </h1>

    <VideoPlayer
      :src="currentVideo.src"
      :thumbnail="currentVideo.thumbnail"
      @ended="handleVideoEnd"
    />

    <div class="flex justify-between items-center mb-8">
      <div class="flex items-center">
        <button
          class="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 flex items-center"
          @click="goToPreviousVideo"
        >
          <img
            :src="currentVideo.thumbnail"
            class="w-8 h-8 mr-2"
            :alt="currentVideo.title"
          />
          <span class="text-ellipsis">{{ currentVideo.title }}</span>
        </button>
      </div>

      <div class="flex items-center">
        <button
          class="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 flex items-center"
          @click="goToNextVideo"
        >
          <span class="text-ellipsis">{{ currentVideo.title }}</span>
          <img
            :src="currentVideo.thumbnail"
            class="w-8 h-8 ml-2"
            :alt="currentVideo.title"
          />
        </button>
      </div>
    </div>

    <div v-if="showCountdown" class="text-center text-white text-xl">
      {{ countdown }}
    </div>
  </div>
</template>

<style scoped></style>
