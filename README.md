
<img width="10%" alt="image" src="https://github.com/behlulbozal/historyy/assets/57594143/1809dd43-dbc1-4838-9386-8b5453c7afd3">

<div>
  <img width="30%" alt="image" src="https://github.com/behlulbozal/historyy/assets/57594143/becce37c-c0c0-4ab2-83cc-9c6b3f832222">
  <img width="30%" alt="image" src="https://github.com/behlulbozal/historyy/assets/57594143/99edcc2d-1543-46e7-b7ac-3a1442d7a72c">
  <img width="30%" alt="image" src="https://github.com/behlulbozal/historyy/assets/57594143/05e62f39-27d9-4fe4-8200-260fcc6ed5c8">
</div>

### [Download For MAC](https://drive.google.com/file/d/1vlY3mlGz1qK5rU4LDaoWHyhRl9gcmhR4/view?usp=sharing "Download For MAC")

### Project Overview

This project is a file versioning system, designed to track changes to files and maintain a history of modifications. This system uses Electron and Vite to provide a user-friendly interface for managing file versions, similar to how Git manages code repositories. Tailwind CSS is used for styling the application.

### Table of Contents

1. [Features](#features)
2. [Project Structure](#project-structure)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Configuration](#configuration)
6. [Contributing](#contributing)
7. [License](#license)

### Features

- **File Versioning**: Commit and track changes to files with detailed commit messages.
- **History Management**: View and revert to previous versions of files.
- **User-Friendly Interface**: Simple and intuitive UI for managing file versions.
- **Multi-Platform Support**: Runs on Windows, macOS, and Linux.
- **Preload Scripts**: Securely preload scripts with Vite and Electron.
- **Styling with Tailwind CSS**: Utilizes Tailwind CSS for styling the application.

### Project Structure

```
historyy
├── .gitignore
├── .prettierrc
├── .vite
├── forge.config.js
├── forge.env.d.ts
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── src
│   ├── components
│   ├── pages
│   ├── styles
│   ├── utils
│   ├── main.js
│   ├── renderer.js
│   ├── store
│   │   ├── fileStore.js
│   │   └── sidebarStore.js
├── static
├── tailwind.config.js
├── vite.base.config.mjs
├── vite.main.config.mjs
├── vite.preload.config.mjs
└ vite.renderer.config.mjs
```

- **.gitignore**: Specifies files and directories to be ignored by Git.
- **.prettierrc**: Configuration file for Prettier, a code formatting tool.
- **.vite**: Vite configuration files.
- **forge.config.js**: Electron Forge configuration file.
- **forge.env.d.ts**: TypeScript declaration file for environment variables.
- **index.html**: Main HTML file.
- **package-lock.json**: Automatically generated file for package installation consistency.
- **package.json**: Contains project metadata and dependencies.
- **postcss.config.js**: Configuration file for PostCSS.
- **src**: Directory containing source code.
  - **components**: Reusable components.
  - **pages**: Page components.
  - **styles**: CSS and style files.
  - **utils**: Utility functions.
  - **main.js**: Entry point for the application.
  - **renderer.js**: Renderer process script.
  - **store**: Directory containing Vuex stores.
    - **fileStore.js**: Manages file-related state and operations.
    - **sidebarStore.js**: Manages sidebar-related state and operations.
- **static**: Directory for static assets.
- **tailwind.config.js**: Configuration file for Tailwind CSS.
- **vite.base.config.mjs**: Base configuration for Vite.
- **vite.main.config.mjs**: Main process configuration for Vite.
- **vite.preload.config.mjs**: Preload script configuration for Vite.
- **vite.renderer.config.mjs**: Renderer process configuration for Vite.
- **yarn.lock**: Lockfile for Yarn package manager.

### Detailed Features

#### File Store (fileStore.js)

The `fileStore` is responsible for managing file-related state and operations. It includes functionalities such as:

- Initializing the file map and file directories.
- Checking and updating the file map based on file changes.
- Reading, writing, and committing files.
- Handling file versioning and history.

#### Sidebar Store (sidebarStore.js)

The `sidebarStore` manages the state and behavior of the application's sidebar. It includes:

- Toggling the visibility of the sidebar.
- Managing the list of items displayed in the sidebar.
- Handling user interactions with the sidebar.

#### Renderer (renderer.js)

The `renderer.js` file sets up the renderer process for the Electron application. It includes:

- Importing and configuring Vue.js and its plugins.
- Setting up global CSS with Tailwind.
- Initializing and mounting the Vue application.
- Configuring plugins like Vue Tippy for tooltips and Vue Toastification for toast notifications.

### Installation

To install the project, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/behlulbozal/historyy
    ```

2. Navigate to the project directory:
    ```bash
    cd historyy
    ```

3. Install dependencies:
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

### Usage

To start the application, use the following command:

```bash
npm start
```
or
```bash
yarn start
```

### Configuration

The project uses several configuration files to customize its behavior:

- **forge.config.js**: Configures Electron Forge settings.
- **.prettierrc**: Customizes code formatting rules.
- **tailwind.config.js**: Tailwind CSS configuration.
- **vite.base.config.mjs**, **vite.main.config.mjs**, **vite.preload.config.mjs**, **vite.renderer.config.mjs**: Vite configuration files.

### Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. Make your changes and commit them:
    ```bash
    git commit -m 'Add some feature'
    ```
4. Push to the branch:
    ```bash
    git push origin feature/your-feature-name
    ```
5. Open a pull request.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
