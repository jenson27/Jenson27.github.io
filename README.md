# My Personal Portfolio

This portfolio was made with the Astrofy library, however i have heavily edited it.

## Installation

Run the following command in your terminal

```Command Prompt
npm install
```

Once the packages are installed you are ready to run astro. Astro comes with a built-in development server that has everything you need for project development. The astro dev command will start the local development server so that you can see your new website in action for the very first time.

```Command Prompt
npm run dev
```

## Tech Stack

- [Astro](https://astro.build)
- [tailwindcss](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)

## Project Structure

```php
├── src/
│   ├── components/
│   │   ├── cv/
│   │   │   ├── TimeLine
│   │   ├── BaseHead.astro
│   │   ├── Card.astro
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   └── HorizontalCard.astro
│   │   └── SideBar.astro
│   │   └── SideBarMenu.astro
│   │   └── SideBarFooter.astro
│   ├── content/
│   │   ├── certificate/
│   │   │   ├── certificate1.md
│   │   │   ├── certificate2.md
│   │   │   ├── certificate3.md
│   │   │   └── certificate4.md
│   │   ├── project/
│   │   │   ├── project1.md
│   │   │   ├── project2.md
│   │   │   ├── project3.md
│   │   │   └── project4.md
│   ├── layouts/
│   │   └── BaseLayout.astro
│   │   └── PostLayout.astro
│   └── pages/
│   │   ├── certificates/
│   │   │   ├── [...page].astro
│   │   │   ├── [slug].astro
│   │   ├── projects/
│   │   │   ├── [...page].astro
│   │   │   ├── [slug].astro
│   │   └── cv.astro
│   │   └── index.astro
│   │   └── projects.astro
│   │   └── rss.xml.js
│   ├── styles/
│   │   └── global.css
│   └── config.ts
├── public/
│   ├── favicon.svg
│   └── profile.webp
│   └── social_img.webp
├── astro.config.mjs
├── tailwind.config.cjs
├── package.json
└── tsconfig.json
```

### Site config

You can change global site configuration on '/src/config.ts' file:

- **SITE_TITLE**: Default pages title.
- **SITE_DESCRIPTION**: Default pages title.
- **GENERATE_SLUG_FROM_TITLE**: By default Astrofy will generate the blog slug pages base on the article name. Set this var to false if you want to use the Astro file base (Compatible with Astrofy older versions).
- **TRANSITION_API**: Enable and disable transition API

##### SideBar
To update the sidebar, please navigate to the following file path
```
Portfolio\src\components\SideBarMenu.astro
```

##### Adding of Certificate / Project
To add a new certificate / project, please navigate to the following filepath
```
Portfolio\src\content\[certificate / project]
```

Create a `.md` file and add code with this format at the top of each file.

```
---
title: "Project Title"
description: "Description"
pubDate: "Project date format(Sep 10 2022)"
thumbnail: "/project1/project1.png"
tags: ["project"]
---
```

### Pages
To add a new page, please navigate to the following filepath
```
Portfolio\src\pages\[certificate / project]
```
Create a `.astro` file and add code with this format at the top of each file with the following file below.

- pageName.astro
- [...page].astro
- [slug].astro

Note: your directory should look something like that or u can simply clone the astrofile from the other directory and edit it accordingly

##### Item format

Add code with this format at the top of each item file.

```js
---
title: "Demo Item 1"
description: "Item description"
heroImage: "Item img url"
details: true // show or hide details btn
custom_link_label: "Custom btn link label"
custom_link: "Custom btn link"
pubDate: "Sep 15 2022"
pricing: "$15"
oldPricing: "$25.5"
badge: "Featured"
checkoutUrl: "https://checkouturl.com/"
---
```

#### Images and videos
All images and videos are grouped by their respective pages and are stored in the filepath below

```
Portfolio\public
```
