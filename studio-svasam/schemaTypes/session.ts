// schemas/session.ts
import { defineType } from "sanity";

export default defineType({
  name: "session",
  title: "Session",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "mediaType",
      title: "Media Type",
      type: "string",
      options: {
        list: [
          { title: "Audio", value: "audio" },
          { title: "Video", value: "video" },
        ],
        layout: "radio",
      },
    },
    {
      name: "file",
      title: "File",
      type: "file",
      options: {
        accept: "audio/*,video/*",
      },
    },
    {
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Thumbnail image for session cards (recommended: 400x300px)",
    },
  ],
});
