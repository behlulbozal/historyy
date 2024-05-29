<template>
  <div class="grid content-between" style="height: calc(100vh - 3rem)">
    <div class="grid h-full overflow-scroll">
      <input ref="fileSelectInput" @change="fileSelectInputChanged" type="file" class="hidden" />
      <div @click="fileSelectInputOpen" class="flex justify-end p-2">
        <span class="material-symbols-outlined text-gray-600 cursor-pointer"> note_add </span>
      </div>
      <div class="grid gap-3">
        <div
          v-for="(file, index) in fileMap"
          :key="index"
          class="flex justify-between items-center border-b hover:shadow-sm p-1 m-1 rounded-md"
          :class="{ 'bg-gray-200': selectedFile === file }"
          @click="selectFile(file)"
        >
          <div class="flex">
            <img class="h-12 w-12" :src="loadImg(`/static/${file.extension.replace('.', '').toUpperCase()}.svg`)" />
            <div class="grid break-all cursor-pointer h-max select-none">
              <div class="flex items-center gap-1">
                <tippy :content="file.path">
                  <span class="text-sm font-semibold">{{ file.name }}</span>
                </tippy>
                <span @click="openDir(file.path)" class="material-symbols-outlined text-sm mt-1"> open_in_new </span>
              </div>
              <span class="text-xs text-gray-500">{{ prettyBytes(file.size) }}</span>
            </div>
          </div>
          <div v-if="file?.notSaved" class="h-3 w-3 mr-1 bg-blue-500 rounded-full"></div>
          <div v-if="file?.removed" class="h-3 w-3 mr-1 bg-red-500 rounded-full"></div>
        </div>
      </div>
    </div>

    <div class="grid">
      <div v-if="selectedFile?.notSaved" class="bg-gray-200 p-5">
        <small
          >Current Changes: <strong>{{ selectedFile.name }}</strong></small
        >
        <!-- add summery input -->
        <input
          v-model="summery"
          type="text"
          class="w-full p-2 mt-2 border border-gray-300 rounded"
          placeholder="Add a summery"
          @keyup.enter="save"
        />
        <!-- add commit button -->
        <button @click="save" class="w-full p-2 mt-2 bg-gray-600 text-white rounded">Save</button>
      </div>

      <div v-if="selectedFile?.removed" class="bg-red-100 p-5">
        <small
          >We can not find the file: <strong>{{ selectedFile.name }}</strong></small
        >
        <div class="grid grid-cols-2 gap-2">
          <button @click="removeFile(selectedFile)" class="w-full p-2 mt-2 bg-red-500 text-white rounded">
            Remove
          </button>
          <button @click="reLocateFileInputOpen" class="w-full p-2 mt-2 bg-blue-500 text-white rounded">
            Re-Locate
          </button>
          <input @change="reLocateFileInputChanged" type="file" class="hidden" ref="reLocateFileInput" />
        </div>
      </div>
      <div v-if="selectedFile?.removed != true && selectedFile != null" class="bg-gray-200 p-1 mt-1">
        <small> {{ lastCommitTimeComputed }} </small>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useFileStore } from '../../store/fileStore'
import { useSidebarStore } from '../../store/sidebarStore'
import prettyBytes from 'pretty-bytes'
import moment from 'moment'
import openModal from '../../components/openModal.vue'

// Stores
const fileStore = useFileStore()
const sidebarStore = useSidebarStore()
const fileMap = computed(() => fileStore.fileMap)

// File Input Handling
const fileSelectInput = ref(null)
const fileSelectInputOpen = () => fileSelectInput.value.click()
const fileSelectInputChanged = () => {
  try {
    const files = fileSelectInput.value.files
    if (files.length) fileStore.addFileToFileMap({ path: files[0].path })
  } catch (error) {
    fileSelectInput.value.value = ''
  }
}

// File Relocate Handling
const reLocateFileInput = ref(null)
const reLocateFileInputOpen = () => reLocateFileInput.value.click()
const reLocateFileInputChanged = () => {
  try {
    const files = reLocateFileInput.value.files
    if (files.length) fileStore.reLocateFile({ file: selectedFile.value, newPath: files[0].path })
  } catch (error) {
    reLocateFileInput.value.value = ''
  }
}

const loadImg = (path) => new URL(path, import.meta.url).href
const selectedFile = computed(() => sidebarStore.selectedFile)
const selectFile = (file) => sidebarStore.selectFile(file)
const openDir = (path) => fileStore.openDir(path)
const removeFile = (file) => fileStore.removeFile(file)
const lastCommitTimeComputed = computed(() =>
  moment(fileStore.lastCommitTimeGetter({ file: selectedFile.value })).format('HH:mm - DD MMM YY')
)

const summery = ref('')
const save = () => {
  fileStore.saveCommit({ file: selectedFile.value, summery: summery.value })
  summery.value = ''
}
</script>
