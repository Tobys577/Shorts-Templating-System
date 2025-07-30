# Shorts-Templating-System
An interview project, with the goal of taking a short-form video, turning it into a template, and then building an architecture around this to create videos of a similar structure.

[Figma Board](https://www.figma.com/design/3Bgkj2XVKVzrWUG7d8OnF7/Untitled?node-id=0-1&t=vxAIfsYQDU1WAByk-1)

--

### Templates

For online content, and especially short-form video content, it is very easy to spot common practices that you can see across many videos. These practices are often things like including subtitles, jump cuts and background music. This can easily be broken down into logical components, or requirements, that can then be replicated as a template for a system to create more videos from.

For this project I chose to look at the Andy Cooks youtube channel, as I enjoy his content, and also feel his short-form content makes obvious use of these common practices. One of the videos I chose to look at was his [Pain Perdu video](https://www.youtube.com/shorts/Rd0kYnUiIZU), which I found incoporated the following elements:
- Intro scene - longer clip
- Lots of jump cuts in time with sounds in the cooking process
- Subtitle Text
- Background music throughout
- Outro scene

<img width="1266" height="756" alt="image" src="https://github.com/user-attachments/assets/1c9309e4-47d4-4800-a049-7464f14f3f4d" />

As can be seen in the screenshot above, I broke down some more of his videos in figma (the board for which can be found [here](https://www.figma.com/design/3Bgkj2XVKVzrWUG7d8OnF7/Untitled?node-id=0-1&t=vxAIfsYQDU1WAByk-1)). From this I was able to extrapolate a basic template that could A, be formed into a JSON format (that can be handled by typescript) and B, represent Andy's style of shorts fairly accurately. This original template can be seen below:

<img width="769" height="694" alt="image" src="https://github.com/user-attachments/assets/2257d364-d5cb-464d-900b-edf02f8b7d43" />

This was then fairly simple to implement in typescript, making use of interfaces for not only the JSON parsing, but also when accessing templates from the code. This means that throughout the codebase, every component always knows what information is in the template object, and what isn't, which like with other strictly typed languages, is extremely helpful for avoiding bugs and errors during development. The interface for the template can be seen below.

```ts
export interface VideoTemplate {
    name: string;
    id: string;
    icon: string;
    backgroundMusic: 'required' | 'allowed' | 'none';
    clipTypes: Array<{
        type: 'intro' | 'standard' | 'outro';
        minDuration: number;
        maxDuration: number;
        subtitles:  'required' | 'allowed' | 'none';
        musicVolume: number;
        isFirst?: boolean;
    }>;
    scenes: Array<{
        clipType: string;
        minAmount: number;
        maxAmount?: number;
    }>;
}
```

This is then used throughout the project, but especially by the helper functions supplied in the [Templates.ts](./video-template-system/src/Templates.ts) script - which are used by many components to help with loading and access the template data.

--

To put this proof of concept into practice, I also designed - and implement a demo of - a system that a content creator could use to make their videos using not just the andy cooks template, but any similar templates that could be added down the line. 
As opposed to a standard video editor with many options that can become overwhelming, I took the opportunity here to use the chosen template to simplify the options the user had to make use of.

Below is my original Figma design for this web app:

<img width="1674" height="706" alt="image" src="https://github.com/user-attachments/assets/7d2a9269-3e71-4123-b5fd-af75e813fa30" />

And here is one of the pages in practice (built with next js, tailwind and a few other react libraries to help speed the prototype along):

<img width="1255" height="983" alt="image" src="https://github.com/user-attachments/assets/63a6d7a9-eec0-4d4c-a38c-79959e2ed7e2" />
