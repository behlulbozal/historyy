import { defineStore } from 'pinia'
import { ref, computed } from 'vue';


export const useSidebarStore = defineStore('sidebar', () => {
    const showedTab = ref('files');
    const showedTabChange = (tab) => showedTab.value = tab;
    const selectedFile = ref(null);
    const selectFile = (file) => selectedFile.value = file;

    return { showedTabChange, showedTab, selectFile, selectedFile }
})


