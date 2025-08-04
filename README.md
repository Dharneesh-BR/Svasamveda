# Svasam - Wellness Platform

Svasam is a modern wellness platform built with React, Tailwind CSS, and Sanity.io. The platform provides a comprehensive solution for wellness programs, including mind, body, and soul categories, along with an e-commerce store for wellness products.

## Table of Contents
- [Features](#features)
- [For Non-Developers](#for-non-developers)
  - [Overview](#overview)
  - [Content Management](#content-management)
  - [Deployment](#deployment)
- [For Developers](#for-developers)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
  - [Development](#development)
  - [Project Structure](#project-structure)
  - [Environment Variables](#environment-variables)
  - [Deployment](#deployment-1)
- [Technologies Used](#technologies-used)
- [License](#license)

## Features

- **Wellness Programs**: Categorized programs for mind, body, and soul
- **E-commerce Store**: Integrated store for wellness products
- **Responsive Design**: Fully responsive layout for all devices
- **Modern UI**: Clean and intuitive user interface built with Tailwind CSS
- **Headless CMS**: Content managed through Sanity.io

## For Non-Developers

### Overview
Svasam is designed to be easily manageable by non-technical users through the Sanity.io content management system. The platform allows you to:
- Create and manage wellness programs
- Update product listings
- Manage blog content
- Update site content without touching code

### Content Management
1. **Access Sanity Studio**
   - Visit the Sanity Studio URL (provided during setup)
   - Log in with your credentials

2. **Managing Content**
   - **Programs**: Add, edit, or remove wellness programs
   - **Store Items**: Manage products in the e-commerce section
   - **Blog**: Create and manage blog posts
   - **Authors**: Manage author profiles

3. **Media Management**
   - Upload and manage images and other media files
   - Organize media into collections

### Deployment
- The frontend is deployed on Netlify
- Content updates are automatically reflected after publishing in Sanity Studio
- No technical knowledge is required for day-to-day content updates

## For Developers

### Prerequisites
- Node.js 16+ and npm 8+
- Git
- Sanity CLI (for CMS development)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/svasam.git
   cd svasam
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install Sanity CLI (if working with the CMS)
   npm install -g @sanity/cli
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_SANITY_PROJECT_ID=your-project-id
   VITE_SANITY_DATASET=production1
   VITE_SANITY_API_VERSION=2023-07-21
   VITE_SANITY_TOKEN=your-sanity-token
   ```

### Development

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Build for production**
   ```bash
   npm run build
   ```

3. **Preview production build**
   ```bash
   npm run preview
   ```

### Project Structure

```
src/
├── assets/           # Static assets (images, fonts, etc.)
├── components/       # Reusable React components
├── hooks/            # Custom React hooks
├── lib/              # Library code (API clients, utilities)
├── pages/            # Page components
│   ├── body/         # Body wellness programs
│   ├── mind/         # Mind wellness programs
│   ├── soul/         # Soul wellness programs
│   └── store/        # E-commerce store
├── styles/           # Global styles and Tailwind configuration
└── utils/            # Utility functions

studio-svasam/        # Sanity Studio configuration
├── schemas/          # Schema definitions for content types
└── ...
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SANITY_PROJECT_ID` | Your Sanity project ID | Yes |
| `VITE_SANITY_DATASET` | Sanity dataset name (e.g., 'production1') | Yes |
| `VITE_SANITY_API_VERSION` | Sanity API version | Yes |
| `VITE_SANITY_TOKEN` | Sanity API token (for write operations) | No |

### Deployment

1. **Frontend Deployment**
   The frontend is configured for deployment on Netlify. Push to the `main` branch to trigger automatic deployment.

2. **Sanity Studio Deployment**
   ```bash
   cd studio-svasam
   sanity deploy
   ```

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS
- **State Management**: React Context API
- **Content Management**: Sanity.io
- **Deployment**: Netlify (Frontend), Sanity (CMS)
- **Version Control**: Git, GitHub

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
