# 💈 The Barbers Blade

A modern, full-stack barbershop management system built with cutting-edge technologies. This application provides a comprehensive solution for barbershop owners and customers to manage appointments, services, and professional profiles.

Screenshots on the bottom of this readme.

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication system
- **Appointment Scheduling**: Book and manage appointments with preferred professionals
- **Service Management**: Browse available services with pricing and duration
- **Professional Profiles**: Detailed profiles for barbers and stylists
- **Multi-Platform**: Web, mobile, and API support
- **Real-time Availability**: Check professional availability in real-time
- **Responsive Design**: Works seamlessly across all devices

## 🏗️ Architecture

This is a **monorepo** built with **Turborepo** featuring:

### Applications

- **Backend** (`apps/backend`): NestJS REST API with PostgreSQL
- **Frontend** (`apps/frontend`): Next.js web application
- **Mobile** (`apps/mobile`): React Native with Expo

### Packages

- **Core** (`packages/core`): Shared business logic and entities
- **UI** (`packages/ui`): Reusable UI components
- **ESLint Config** (`packages/eslint-config`): Shared linting configuration
- **TypeScript Config** (`packages/typescript-config`): Shared TypeScript configuration

## 🛠️ Tech Stack

### Backend

- **NestJS**: Node.js framework for scalable server-side applications
- **PostgreSQL**: Robust relational database
- **Prisma**: Modern database ORM with type safety
- **JWT**: JSON Web Token for authentication
- **bcrypt**: Password hashing and encryption
- **Docker**: Containerization for development and deployment

### Frontend

- **Next.js 14**: React framework with App Router
- **React 18**: Modern React with hooks and concurrent features
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Headless UI components
- **Framer Motion**: Smooth animations and transitions
- **Axios**: HTTP client for API communication

### Mobile

- **React Native**: Cross-platform mobile development
- **Expo**: React Native platform and tools
- **React Navigation**: Navigation library for React Native
- **AsyncStorage**: Local storage for mobile apps

### Development Tools

- **Turborepo**: Monorepo build system
- **TypeScript**: Type-safe JavaScript development
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Jest**: Testing framework

## 📦 Installation

### Prerequisites

- Node.js >= 18
- Docker and Docker Compose
- **npm** or **yarn** package manager (both are supported, but **yarn** is recommended and will be used in this tutorial)

### Step-by-Step Setup

#### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd blade-barbershop
yarn install
```

_This installs all dependencies for the monorepo and sets up the workspace._

#### 2. Environment Configuration

Create a `.env` file for each application (`apps/frontend`, `apps/mobile`, `apps/backend`) by copying the corresponding `.env.sample`:

```bash
cp apps/frontend/.env.sample apps/frontend/.env
cp apps/mobile/.env.sample apps/mobile/.env
cp apps/backend/.env.sample apps/backend/.env
```

Edit each `.env` file as needed to provide the correct environment variables for your setup.

_Environment files contain sensitive configuration such as database URLs and API keys._

#### 3. Build Core Package

```bash
cd packages/core
yarn build
```

_This builds the shared core package that contains business logic used by all applications._

#### 4. Database Setup

Start a PostgreSQL database container in the background:

```bash
cd ../../apps/backend
docker compose up --build -d
```

Generate Prisma client based on schema:

```bash
yarn prisma generate
```

Apply prisma migrations to the empty database, it will create the tables:

```bash
yarn prisma migrate deploy
```

Populates the database with sample data (users, professionals, services, etc.)

```bash
yarn prisma db seed
```

#### 5. Start Development Servers

Navigate to the root and starts all applications in development mode using Turborepo.

```bash
cd ../..
yarn dev
```

## 🚀 Getting Started

### Development Mode

Run all applications in development mode:

```bash
yarn dev
```

This will start:

- Backend API on `http://localhost:3001`
- Frontend web app on `http://localhost:3000`
- Mobile app with Expo (follow terminal instructions)

### Individual Applications

You can also run applications individually:

```bash
# Backend only
cd apps/backend
yarn dev

# Frontend only
cd apps/frontend
yarn dev

# Mobile only
cd apps/mobile
yarn dev
```

## 👤 Accessing the Application

After starting the development servers, open your browser and navigate to the local frontend address: [http://localhost:3000](http://localhost:3000).

- To create a new client account, visit [http://localhost:3000/login](http://localhost:3000/login) and use the registration option.
- To log in as a barber for testing, use the following credentials:
  - **Email:** `jhonny@barbersblade.app`
  - **Password:** `#Senha123`

## 🏁 Building for Production

### Build All Applications

```bash
yarn build
```

### Build Individual Applications

```bash
# Backend
cd apps/backend
yarn build
yarn start:prod

# Frontend
cd apps/frontend
yarn build
yarn start

# Mobile
cd apps/mobile
yarn build
```

## 📚 API Documentation

### Authentication Endpoints

- `POST /user/sign-up` - User registration
- `POST /user/sign-in` - User authentication

### Scheduling Endpoints

- `POST /scheduling` - Create appointment
- `GET /scheduling/:email` - Get user appointments
- `GET /scheduling/busy-times/:professional/:date` - Check availability
- `DELETE /scheduling/:id` - Cancel appointment

### Resource Endpoints

- `GET /professionals` - List all professionals
- `GET /services` - List all services

## 🗂️ Project Structure

```
barbers-blade/
├── apps/
│   ├── backend/          # NestJS API
│   │   ├── src/
│   │   │   ├── user/     # User management
│   │   │   ├── professional/ # Professional profiles
│   │   │   ├── service/  # Service management
│   │   │   ├── scheduling/ # Appointment system
│   │   │   └── db/       # Database layer
│   │   └── prisma/       # Database schema & migrations
│   ├── frontend/         # Next.js web app
│   │   ├── src/
│   │   │   ├── app/      # App router pages
│   │   │   ├── components/ # React components
│   │   │   └── lib/      # Utilities
│   │   └── public/       # Static assets
│   └── mobile/           # React Native app
│       ├── src/
│       │   ├── screens/  # Mobile screens
│       │   └── components/ # Mobile components
│       └── assets/       # Mobile assets
├── packages/
│   ├── core/            # Shared business logic
│   ├── ui/              # Shared UI components
│   ├── eslint-config/   # Linting configuration
│   └── typescript-config/ # TypeScript configuration
└── turbo.json           # Turborepo configuration
```

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Input Validation**: Comprehensive data validation
- **CORS Configuration**: Secure cross-origin requests
- **Authorization Guards**: Route-level access control

## 🧪 Testing

```bash
# Run all tests
yarn test

# Backend tests
cd apps/backend
yarn test
yarn test:e2e

# Frontend tests
cd apps/frontend
yarn test
```

## 🔧 Development Commands

```bash
# Lint all code
yarn lint

# Format code
yarn format

# Type checking
yarn check

# Clean build artifacts
yarn clean
```

## 📱 Mobile Development

### iOS

```bash
cd apps/mobile
yarn ios
```

### Android

```bash
cd apps/mobile
yarn android
```

### Web (Expo)

```bash
cd apps/mobile
yarn web
```

## 🚀 Deployment

### Backend Deployment

- Build the NestJS application
- Set up PostgreSQL database
- Configure environment variables
- Deploy to your preferred platform (Vercel, Railway, etc.)

### Frontend Deployment

- Build the Next.js application
- Configure API endpoint
- Deploy to Vercel or similar platform

### Mobile Deployment

- Build with Expo
- Submit to App Store / Google Play Store

## 📋 TODO List

### Upcoming Features & Improvements

1. **Mobile: JWT Authentication**

   - Implement JWT token-based authentication for the mobile application
   - Ensure secure login/logout functionality across mobile platforms

2. **Mobile: Secure Data Storage**

   - Integrate Expo Secure Store for secure local data storage
   - Store sensitive information like tokens and user data securely

3. **Mobile: Professional Dashboard**

   - Create professional profile page for barbers/stylists
   - Add functionality to view appointments
   - Implement appointment deletion capabilities for professionals

4. **Error Handling Pages**

   - Create dedicated error pages for failed API requests
   - Implement proper error boundaries and user-friendly error messages
   - Add retry mechanisms for failed network requests

5. **Shared Context Management**
   - Move shared contexts from mobile and frontend applications to packages
   - Create unified state management across all applications
   - Ensure consistent data flow and state synchronization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by the need for efficient barbershop management
- Thanks to the open-source community for amazing tools and libraries

## Screenshots

<img width="1333" height="711" alt="home" src="https://github.com/user-attachments/assets/51cb1588-958c-4732-8643-98f3ab663681" />
<img width="1346" height="723" alt="signup" src="https://github.com/user-attachments/assets/5a80fb7b-de30-4a68-ad08-a13ae9e6fbca" />
<img width="1330" height="707" alt="barbers" src="https://github.com/user-attachments/assets/92e9ca78-920d-409a-afbe-14bc217f2227" />
<img width="1335" height="713" alt="schedule-1" src="https://github.com/user-attachments/assets/67da68f9-3501-4ee3-842f-eafd9882bd44" />
<img width="1329" height="710" alt="shcedule-2" src="https://github.com/user-attachments/assets/628a7354-93b7-413b-b7f5-625a83da1ce6" />
<img width="1327" height="713" alt="my-sched" src="https://github.com/user-attachments/assets/2d43ef89-85ac-4048-9127-05040ccf7151" />


**Made with ❤️ for the barbershop community**
