---
title: "ASCIIMotion"
description: "Convert any video into animated text using customizable character sets and resolution. A retro, terminal-style visual experience—frame by frame."
pubDate: "Aug 10 2024"
thumbnail: "/project4/thumbnail.jpg"
tags: ["project"]
---

This tool was inspired by the online trend surrounding Bad Apple!! from the Touhou Project series. The trend first gained traction in the late 2000s and saw a resurgence in the mid-2010s, showcasing the iconic video rendered entirely in ASCII art. It represents a playful and creative exploration of how video can be reimagined in unexpected and artistic ways.

<Image width="750" height="422" format="gif" src="/project4/project.gif" alt="gif" class="w-full mb-6" />

<h2 class="card-title">
    💬 How It Works
</h2>

<ul>
  <li>Takes a video as input</li>
  <li>Converts the video into individual image frames</li>
  <li>Translates each frame into ASCII characters</li>
  <li>Plays the ASCII animation frame by frame</li>
</ul>

<h2 class="card-title">
    Converting the video into individual image frames
</h2>

The first step in the process involves breaking the video down into individual frames. This is done by extracting each frame at a consistent frame rate (e.g., 24 or 30 frames per second), effectively turning the video into a sequence of static images. These frames serve as the raw material for further processing into ASCII art.

<Image width="750" height="422" format="png" src="/project4/videoframe.png" class="w-full mb-6" />

<h2 class="card-title">
    Translating Frames into ASCII Characters
</h2>

Each extracted image frame is processed and converted into a grid of ASCII characters based on brightness and contrast levels. This transforms visual details into text-based representations, which are then saved as individual text files—one for each frame.

<Image width="750" height="422" format="png" src="/project4/ascii.png" class="w-full mb-6" />

This project is available on GitHub: https://github.com/jenson27/VidToASCII. Feel free to check it out, try it yourself, and contribute!
