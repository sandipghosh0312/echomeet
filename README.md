# Echo Meet

## Overview
Echo Meet is a fully responsive web application designed for seamless online collaboration. Built using cutting-edge technologies, Echo Meet enables users to connect effortlessly through real-time video calls, ensuring a smooth and productive experience for professionals, teams, and individuals alike.

---

## Features
- **Video Calling:** Real-time communication powered by Stream.io APIs.
- **Authentication:** Secure and efficient user authentication with Clerk.
- **Responsive Design:** Optimized for all devices, ensuring a great user experience on desktops, tablets, and mobile phones.
- **Modern UI Components:** Styled using ShadCN for a polished and consistent design.
- **Built with Next.js:** Leveraging the latest features of Next.js for server-side rendering and static site generation.

---

## Technologies Used
- **Next.js**: Framework for building the frontend and backend of the application.
- **ShadCN**: For elegant and customizable UI components.
- **Stream.io**: APIs for real-time video calling and interactions.
- **Clerk**: Authentication and user management.
- **HTML, CSS, JavaScript/TypeScript**: Core web technologies.

---

## Installation and Setup

### Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (LTS version recommended)
- **npm** or **yarn** (package manager)

### Steps
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/sandipghosh0312/echomeet.git
   cd echo-meet
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set Up Environment Variables:**
   Create a `.env.local` file in the root directory and add the following variables:
   ```env
   NEXT_PUBLIC_STREAM_API_KEY=<your-stream-api-key>
   NEXT_PUBLIC_CLERK_FRONTEND_API=<your-clerk-frontend-api>
   CLERK_API_KEY=<your-clerk-api-key>
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Open your browser and navigate to `http://localhost:3000` to view the application.

---

## Folder Structure
```
.
├── public           # Static assets like images, fonts, etc.
├── src
│   ├── components   # Reusable UI components
│   ├── pages        # Next.js pages (route definitions)
│   ├── styles       # Global and component-specific styles
│   ├── utils        # Utility functions
│   └── hooks        # Custom React hooks
├── .env.local       # Environment variables
├── package.json     # Project metadata and dependencies
└── README.md        # Project documentation
```

---

## Usage
1. **Sign Up / Log In:** Authenticate using Clerk’s secure login system.
2. **Start a Call:** Initiate a video call with a single click, leveraging Stream.io’s APIs.
3. **Collaborate:** Share ideas and connect seamlessly on any device.

---

## Acknowledgments
Special thanks to [JS Mastery](https://github.com/adrianhajdin) for his amazing tutorial and guidance, which inspired and aided the development of this project.

