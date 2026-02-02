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
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{type: "string"}],
      description: "Tags for categorizing and filtering sessions",
    },
    {
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      description: "Brief description for session cards (recommended: 100-150 characters)",
      rows: 3,
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {type: "block"},
        {type: "image"}
      ],
      description: "Full session content with rich text formatting"
    },
  ],
});
