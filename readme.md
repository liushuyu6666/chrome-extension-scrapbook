# Overview

This chrome extension enables users to highlight and save specific sections of their ChatGPT conversations for organized compilation. This module first divides entire chats into multiple segments, each containing relevant text content. Users can then select and store desired parts, which can later be reorganized to create a personalized scrapbook.

**Chrome Extensions** enhance the Google Chrome browser by reacting to users' behaviors, modifying web pages, integrating with external services, or adding new features directly within the browser. When developing Chrome extensions, consider the following:

1. **Development and Deployment:**
   Typically, Chrome extensions are plain JavaScript projects that don't require additional compilation or preprocessing for testing. You can simply zip the project files for publishing. However, in this project, we use **Webpack** to compile our TypeScript source code into JavaScript, outputting all files into the `dist` folder.

2. **`manifest.json`:**
   The `manifest.json` file must be located at the root of the project. Note that for testing and deploying, the `dist` folder serves as the project's root. `manifest.json` defines key entries that instruct the extension on how to respond to user interactions:

   - **`content_scripts`**: Specifies scripts that run on designated web pages. Content scripts can read the content of a page and add event listeners. They can also inject scripts into the page without conflicting with the host page or other extensions' content scripts, as they operate in isolated environments.
   - **`background`**: Defines background scripts or service workers.
   - **`permissions`**: Lists the permissions required by the extension.
   - **`action`**: Sets up the extension's toolbar icon and its associated popup interface.
     - **`default_popup`**: Specifies the HTML file (`popup/popup.html`) that appears as a popup when the extension icon is clicked.
     - **`default_icon`**: Defines the icons used in the Chrome toolbar and the Chrome Web Store.

3. **`icons` folder:**
   Stores all icon files, which are duplicated to the root of the `dist` directory during the build process.

4. **`dist` folder:**
   Contains the compiled JavaScript files, ready for deployment and testing.



# Structure of the project

```
└── 📁chrome-extension-scrapbook
    └── 📁.github
        └── 📁workflows
            └── build.yml
    └── 📁.vscode
        └── settings.json
        └── tasks.json
    └── 📁icons
        └── icon128.png
        └── icon16.png
        └── icon32.png
        └── icon48.png
    └── 📁src
        └── 📁popup
            └── popup.tsx
        └── 📁text_chunk
            └── text_chunk.tsx
        └── 📁utils
            └── helper.ts
        └── manifest.json
    └── 📁webpack
        └── webpack.common.js
        └── webpack.dev.js
        └── webpack.prod.js
    └── .gitignore
    └── jest.config.js
    └── package.json
    └── readme.md
    └── tsconfig.json
    └── tsconfig.test.json
    └── yarn.lock

[by Draw Folder Structure]
```

1. **`webpack` folder:**
   Contains all Webpack configuration files that define how to compile the TypeScript project into JavaScript and organize the output files into the `dist` directory.

2. **`src` folder:**
   The primary directory for implementation. All files and folders within the `src` directory are maintained in the same structure when compiled into the `dist` folder.

   1. **`manifest.json`:**
      Defines the extension's metadata, permissions, and responses to specific user behaviors.

   2. **`text_chunk` folder:**
      Divides ChatGPT conversations into sections, allowing users to highlight and save important parts for creating an organized scrapbook.

3. **`icons` folder:**
   Stores all icon files, which are duplicated to the root of the `dist` directory during the build process.

4. **`dist` folder:**
   Contains the compiled JavaScript files, ready for deployment and testing.




# How to test it

1. **Clone the GitHub repository.**
2. **Install dependencies** by running `yarn`.
3. **Build the project** with `yarn build`, which will create a `dist` folder.
4. **Load the extension** into Chrome by uploading the `dist` folder.
