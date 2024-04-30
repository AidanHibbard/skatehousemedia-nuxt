<script setup lang="ts">
const props = defineProps<{
  src: string;
  thumbnail?: string;
}>();

const emits = defineEmits(['ended']);
</script>

<template>
  <video
    class="rounded-lg mx-auto"
    controls
    preload="none"
    :poster="props.thumbnail"
    @ended="emits('ended')"
  >
    <source type="video/mp4" :src="props.src" />
    Your browser does not support the video tag.
  </video>
</template>

<style scoped>
video {
  aspect-ratio: 16/9;
}
</style>
