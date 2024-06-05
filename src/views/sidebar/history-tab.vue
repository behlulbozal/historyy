<template>
  <div v-if="selectedFile.commits.length > 0">
    <div class="p-1 m-1 grid mb-5">
      <strong>{{ selectedFile.name }}</strong>
      <small> {{ selectedFile.commits.length }} commits </small>
      <hr />
    </div>
    <div
      v-for="(file, index) in reverseCommits"
      :key="index"
      class="flex justify-between items-center border-b hover:shadow-sm p-1 m-1 rounded-md"
    >
      <div class="flex justify-between">
        <img class="h-12 w-12" :src="`assets/${selectedFile.extension.replace('.', '').toUpperCase()}.svg`"  />
        <div class="grid break-all cursor-pointer h-max select-none">
          <div class="flex items-center gap-1">
            <span class="text-sm">
              <strong>

                {{ file.summery }}
              </strong>
              <br />
             <small> {{ moment(file.date).format('MMMM Do YYYY, h:mm:ss a') }}</small>
            </span>
          </div>
          <span class="text-xs text-gray-500">{{ prettyBytes(selectedFile.size) }}</span>
        </div>
      </div>
      <div class="flex">
        <span
          v-tippy="'Return to this Version'"
          class="material-symbols-outlined text-gray-500 cursor-pointer text-2xl"
          @click="revertFile(file)"
        >
          reply_all
        </span>
        <span
          v-tippy="'Export'"
          @click="exportFile(file.path)"
          class="material-symbols-outlined text-gray-500 cursor-pointer text-2xl"
        >
          ios_share
        </span>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="grid h-full justify-center items-center">
      <span class="material-symbols-outlined text-center text-4xl text-gray-500"> history </span>
      <!-- selct a file to see history message -->
      <span class="text-gray-500">
        No history found for <strong>{{ selectedFile.name }}</strong>
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSidebarStore } from '../../store/sidebarStore'
import { useFileStore } from '../../store/fileStore'
import prettyBytes from 'pretty-bytes'
import moment from 'moment'

const sidebarStore = useSidebarStore()
const fileStore = useFileStore()
const selectedFile = computed(() => sidebarStore.selectedFile)
const exportFile = (path) => fileStore.exportFile({ path })
const reverseCommits = computed(() => selectedFile.value.commits.slice().reverse())
const revertFile = (commit) => fileStore.revertFile({ file: selectedFile.value, commit })
</script>
