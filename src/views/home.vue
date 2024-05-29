<template>
  <div
    @dragenter="dragStatus = true"
    @drop.prevent="dropHandle"
    @dragover.prevent="null"
    @mouseleave="dragStatus = false"
    class="grid relative"
  >
    <div v-if="dragStatus" class="h-screen absolute w-screen flex justify-center items-center backdrop-blur-lg z-50">
      <span
        class="material-symbols-outlined absolute text-4xl cursor-pointer select-none top-10 right-10 text-blue-800"
        @click="dragStatus = false"
      >
        cancel
      </span>
      <div class="bg-white p-5 rounded-lg">
        <input type="file" class="hidden" />
        <h1 class="text-2xl font-semibold">Drop files here</h1>
        <p class="text-gray-500">You can also <span class="text-blue-500">click here</span> to select files</p>
      </div>
    </div>
    <div class="h-12 bg-gray-600">
      <div class="grid lg:grid-cols-3">
        <div class="lg:col-span-1 grid grid-cols-2 h-12">
          <div
            class="flex justify-center text-center items-center h-12 w-full text-white cursor-pointer"
            :class="{ 'bg-gray-700': showedTab === 'files' }"
            @click="showedTabChange('files')"
          >
            Files
          </div>
          <div
            class="flex justify-center text-center items-center h-12 w-full text-white cursor-pointer border-r border-gray-500"
            :class="{ 'bg-gray-700': showedTab === 'history' }"
            @click="showedTabChange('history')"
          >
            History
          </div>
        </div>
      </div>
    </div>
    <div class="grid lg:grid-cols-3">
      <div class="lg:col-span-1 bg-gray-50">
        <FilesTab v-if="showedTab === 'files'" />
        <div v-if="showedTab === 'history'" style="height: calc(100vh - 3rem)">
          <div v-if="selectedFile == null">
            <div class="grid h-full justify-center items-center">
              <span class="material-symbols-outlined text-center text-4xl text-gray-500"> history </span>
              <!-- selct a file to see history message -->
              <span class="text-gray-500">Select a file to see history</span>
            </div>
          </div>
          <HistoryTab v-else />
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useSidebarStore } from '../store/sidebarStore'
import { useFileStore } from '../store/fileStore'
import FilesTab from './sidebar/files-tab.vue'
import HistoryTab from './sidebar/history-tab.vue'

const sidebarStore = useSidebarStore()
const fileStore = useFileStore()
const dragStatus = ref(false)
const selectedFile = computed(() => sidebarStore.selectedFile)

const showedTab = computed(() => sidebarStore.showedTab)
const showedTabChange = (tab) => sidebarStore.showedTabChange(tab)
const dropHandle = (e) => {
  dragStatus.value = false
  const files = e.dataTransfer.files
  console.log(files)
  if (files.length) {
    for (let i = 0; i < files.length; i++) {
      fileStore.addFileToFileMap({ path: files[i].path })
    }
  }
}
</script>
