import { defineStore } from 'pinia'
import { ref } from 'vue';
import { useSidebarStore } from './sidebarStore';
import { useToast } from "vue-toastification";
import confirmToastrComponent from '../components/confirmToastrComponent.vue';


async function fetchBasePath() {
    return await fileAPI.getBasePath();
}

export const useFileStore = defineStore('file', () => {
    // States

    let basePath = "";
    let fileMapPath = "";
    let filesPath = ""
    const fileMap = ref([]);
    const toast = useToast();

    // Init
    const fileMapInit = () => {
        try {
            fileMap.value = JSON.parse(fileAPI.readFileSync(fileMapPath, 'utf-8'));
        } catch (error) {
            if (error.message.includes('ENOENT')) {
                fileAPI.writeFileSync(fileMapPath, '[]');
                fileMap.value = JSON.parse(fileAPI.readFileSync(fileMapPath, 'utf-8'));
            } else {
                console.error(error);
            }
        }
    }
    const filesInit = () => {
        try {
            fileAPI.readdirSync(filesPath);

        } catch (error) {
            if (error.message.includes('ENOENT')) {
                fileAPI.mkdirSync(filesPath);
            } else {
                console.error(error);
            }
        }
    }
    const checkFileMap = (path) => {
        setInterval(() => {
            fileMap.value.forEach((fileMapObject) => {
                try {
                    const stat = getFileStat(fileMapObject.path);
                    const fileMapObjectMtime = new Date(fileMapObject.mtime).getTime();
                    const statMtime = new Date(stat.mtime).getTime();
                    if (statMtime > fileMapObjectMtime) {
                        fileMapObject.size = stat.size;
                        fileMapObject.mtime = stat.mtime;
                        fileMapObject.notSaved = true;
                    }
                } catch (error) {
                    if (error.message.includes('file_not_found')) {
                        fileMapObject.removed = true;
                        delete fileMapObject.notSaved;
                    }
                }
            })
            fileAPI.writeFileSync(fileMapPath, JSON.stringify(fileMap.value));
        }, 5000)
    }
    const checkBasePath = () => {
        try {
            fileAPI.readdirSync(basePath);
        } catch (error) {
            if (error.message.includes('ENOENT')) {
                fileAPI.mkdirSync(basePath);
            } else {
                console.error(error);
            }
        }
    }

    // Actions
    const getFileStat = (path) => {
        try {
            return fileAPI.statSync(path);
        } catch (error) {
            throw new Error('file_not_found');
        }
    };
    const getExtension = (path) => fileAPI.getExtension(path);
    const getStaticFile = (path) => fileAPI.getStaticFile(path);
    const convertFileMapObject = ({ path }) => {
        const stat = getFileStat(path);
        const extension = getExtension(path);


        return {
            path: path,
            size: stat.size,
            birthtime: stat.birthtime,
            mtime: stat.mtime,
            extension: extension,
            name: path.split('/')[path.split('/').length - 1],
            commits: []
        }
    }
    const addFileToFileMap = ({ path }) => {
        // check file added fileMap already
        const isFileExist = fileMap.value.find((fileMapObject) => fileMapObject.path === path);
        if (isFileExist) {
            const sidebarStore = useSidebarStore();
            sidebarStore.selectFile(isFileExist);
            toast.info("File already added to the list");
            throw new Error('File already added to the list');
        }
        const fileMapObject = convertFileMapObject({ path });
        fileMap.value.push(fileMapObject);
        fileAPI.writeFileSync(fileMapPath, JSON.stringify(fileMap.value));
    }
    const openDir = (path) => {
        // remove file from path
        try {
            const dirPath = path.split('/').slice(0, -1).join('/') + '/';
            fileAPI.opendir(dirPath)
            console.log(dirPath);
        } catch (error) {
            console.error(error);
            toast.info("Directory not found");
        }
    }
    const removeFile = (file) => {
        toast.error({
            component: confirmToastrComponent,
            props: {
                message: "Are you sure you want to delete " + file.name + " file?",
                button: "Delete"
            },
            listeners: {
                accepted: () => {
                    const fileIndex = fileMap.value.findIndex((fileMapObject) => fileMapObject.path === file.path);
                    fileMap.value.splice(fileIndex, 1);
                    fileAPI.writeFileSync(fileMapPath, JSON.stringify(fileMap.value));
                }
            }
        });
    }
    const saveCommit = ({ file, summery }) => {
        const fileIndex = fileMap.value.findIndex((fileMapObject) => fileMapObject === file);
        const newFileName = `${fileMap.value[fileIndex].name}-${new Date().getTime()}${fileMap.value[fileIndex].extension}`;
        fileAPI.writeFileSync(`${filesPath}/${newFileName}`, fileAPI.readFileSync(file.path));
        fileMap.value[fileIndex].commits.push({
            summery: summery,
            date: new Date(),
            path: `${filesPath}/${newFileName}`,
            size: getFileStat(`${filesPath}/${newFileName}`).size
        });

        delete fileMap.value[fileIndex].notSaved;
        fileAPI.writeFileSync(fileMapPath, JSON.stringify(fileMap.value));
    }

    const lastCommitTimeGetter = ({ file }) => {
        if (file === undefined || file == null) return null;
        const commits = file.commits;
        if (commits.length === 0) {
            return file.mtime;
        }
        return file.date;
    }

    const reLocateFile = ({ file, newPath }) => {

        try {
            if (fileMap.value.findIndex((fileMapObject) => fileMapObject.path === newPath) !== -1) {
                const oldFileIndex = fileMap.value.findIndex((fileMapObject) => fileMapObject === file);
                const oldFile = fileMap.value[oldFileIndex];
                toast.error({
                    component: confirmToastrComponent,
                    props: {
                        message: "File already exist, do you want to merge " + oldFile.name + " with new file?",
                        button: "Merge"
                    },
                    listeners: {
                        accepted: () => {
                            const fileIndex = fileMap.value.findIndex((fileMapObject) => fileMapObject.path === newPath);
                            const newFile = fileMap.value[fileIndex];
                            newFile.commits = newFile.commits.concat(oldFile.commits);
                            newFile.commits.sort((a, b) => new Date(b.date) - new Date(a.date));
                            fileMap.value.splice(oldFileIndex, 1);
                            fileAPI.writeFileSync(fileMapPath, JSON.stringify(fileMap.value));
                            toast.info("Merged with new file: " + newFile.name);
                        }
                    }
                });
            } else {
                const fileIndex = fileMap.value.findIndex((fileMapObject) => fileMapObject === file);
                const newFile = convertFileMapObject({ path: newPath });
                delete newFile.commits;
                newFile.commits = fileMap.value[fileIndex].commits;
                fileMap.value.splice(fileIndex, 1);
                fileMap.value.push(newFile);
                fileAPI.writeFileSync(fileMapPath, JSON.stringify(fileMap.value));
                toast.success("File path changed successfully");

            }
        } catch (error) {
            console.error(error);
            toast.error("File path change failed");
        }

    }

    const exportFile = ({ path }) => {
        const fileName = path.split('/')[path.split('/').length - 1];
        fileAPI.showSaveDialog(fileName).then((result) => {
            if (result.canceled) {
                toast.info("Export canceled");
                return;
            }
            fileAPI.writeFileSync(result.filePath, fileAPI.readFileSync(path));
            toast.success("File exported successfully");
        })
    }

    const revertFile = ({ file, commit }) => {
        // check file is changed if is changed commit file first
        const fileStat = getFileStat(file.path);
        if (fileStat.size !== commit.size) {
            saveCommit({ file: file, summery: "Auto Save" });
            toast.info("File is changed, first commit file");
        }


        fileAPI.writeFileSync(file.path, fileAPI.readFileSync(commit.path));
        toast.success("File reverted successfully");
    }

    fetchBasePath().then((result) => {
        basePath = result;
        fileMapPath = `${basePath}/fileMap.json`;
        filesPath = `${basePath}/files`;

        checkBasePath();
        fileMapInit();
        filesInit();
        checkFileMap();
    }).catch((error) => {
        console.error('Failed to fetch base path:', error);
    });

    return {
        addFileToFileMap,
        fileMap,
        getStaticFile,
        openDir,
        basePath,
        removeFile,
        saveCommit,
        lastCommitTimeGetter,
        reLocateFile,
        exportFile,
        revertFile
    }
})


