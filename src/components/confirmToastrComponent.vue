<template>
  <div class="container">
    <span> {{ message }} </span>
    <br />
    <strong @click="accepted" class="cursor-pointer p-1 hover:bg-white hover:text-black">
      {{ button }}
    </strong>
  </div>
</template>

<script setup>
const emit = defineEmits(['accepted'])
const accepted = () => emit('accepted')
defineProps({
  message: String,
  button: String,
})
</script>
