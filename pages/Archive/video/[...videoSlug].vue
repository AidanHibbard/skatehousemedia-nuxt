<script setup lang="ts">
import VideoModel from '~/models/video.model';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/vue/24/solid';

const route = useRoute();
const router = useRouter();
const { videoSlug } = route.params;
const slug = videoSlug[0];

const pagination = VideoModel.paginate(slug);

const state = reactive({
  ...pagination,
  showCountDown: false,
  countDown: 0,
});

function handleVideoEnd() {
  if (!state.nextVideo) return;
  state.showCountDown = true;
  state.countDown = 15;
  const timer = setInterval(() => {
    if (state.countDown >= 0 && state.countDown <= 15) {
      state.countDown--;
    } else {
      state.countDown = 0;
      state.showCountDown = false;
      clearInterval(timer);
      router.push(`/archive/video/${state.nextVideo?.slug}`);
    }
  }, 1000);
}

const countDownGradient = computed(() => {
  if (state.countDown === 0) return 'bg-card';
  const percentage = (state.countDown / 15) * 100;
  return `linear-gradient(to left, rgba(128,128,128,0.5) ${percentage}%, #31363F ${percentage}%)`;
});

const buttonDistance = computed(() => {
  if (state.previousVideo && state.nextVideo) return 'justify-between';
  if (state.previousVideo && !state.nextVideo) return 'justify-start';
  if (!state.previousVideo && state.nextVideo) return 'justify-end';
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

    <div class="flex m-8 w-3/5 mx-auto" :class="buttonDistance">
      <div v-if="state.previousVideo" class="flex items-center">
        <button
          class="bg-card text-white p-2 rounded hover:bg-gray-700 flex items-center"
          @click="router.push(`/archive/video/${state.previousVideo?.slug}`)"
        >
          <ArrowLeftIcon class="h-6 w-6 mr-2" />
          <span class="text-ellipsis">{{ state.previousVideo?.title }}</span>
        </button>
      </div>

      <div v-if="state.nextVideo" class="flex items-center">
        <button
          class="bg-card text-white p-2 rounded hover:bg-gray-700 flex items-center transition-all duration-500"
          :style="{ background: countDownGradient }"
          @click="router.push(`/archive/video/${state.nextVideo?.slug}`)"
        >
          <span class="text-ellipsis">{{ state.nextVideo?.title }}</span>
          <ArrowRightIcon class="h-6 w-6 ml-2" />
        </button>
      </div>
    </div>
  </div>
</template>
