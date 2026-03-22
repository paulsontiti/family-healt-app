# 🏥 Family Health App – Real-Time Family Health & Habit Tracker

A **family-centered, full-stack health platform** designed to promote healthy lifestyles, prevent childhood obesity, and reduce future non-communicable diseases (NCDs). The app tracks children’s growth, daily habits, and gamifies healthy routines for families.

---

## ⚡ Key Features

* 👨‍👩‍👧‍👦 **Family Collaboration** – Track daily health habits across all family members
* 👶 **Child Health Profile** – Personal profiles with **BMI calculation** and **growth tracking**
* 📊 **Growth Charts** – Visualize weight and height trends over time
* 🥗 **Habit Tracker** – Daily tracking of water intake, fruits & vegetables, physical activity, and screen time
* 🎮 **Gamified Challenges** – Weekly family challenges with streaks and rewards
* 📚 **Nutrition Tips** – Short, localized tips for parents on healthy meals and portion sizes
* ⚡ **Real-Time Updates** – Live synchronization of habits and challenges using **Socket.IO**
* 🏗️ **Monorepo Architecture** – Shared packages for types, UI components, and database with **Turborepo**
* 🔌 **Backend API** – Modular REST API with **Node.js**, **Express**, and **MongoDB + Prisma ORM**
* 🎨 **Modern Frontend** – Responsive dashboard built with **Next.js** and Tailwind CSS

---

## 🏗️ Tech Stack

* **Frontend:** Next.js, React, Tailwind CSS
* **Backend:** Node.js, Express, Socket.IO
* **Database:** MongoDB, Prisma ORM
* **Monorepo:** Turborepo, TypeScript
* **Realtime:** Socket.IO
* **Deployment:** Vercel (frontend), Render / Railway (backend), MongoDB Atlas

---

## 🚀 Getting Started

### Prerequisites

* Node.js ≥ 18
* npm ≥ 9
* MongoDB Atlas account

### Clone the Repository

```bash
git clone https://github.com/yourusername/family-health-app.git
cd family-health-app
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in `apps/api`:

```env
MONGO_URL="your_mongodb_connection_string"
JWT_SECRET="your_secret_key"
PORT=5000
```

### Run the App (Development Mode)

```bash
npm run dev
```

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend API: [http://localhost:5000](http://localhost:5000)

---

## 📁 Folder Structure

```plaintext
family-health-app/
│ package.json          # Root package
│ turbo.json            # Turbo config
├─ apps/
│  ├─ web/             # Next.js frontend
│  └─ api/             # Express backend
└─ packages/
   ├─ db/              # Database & Prisma
   ├─ types/           # Shared TypeScript types
   └─ ui/              # Shared UI components
```

---

## 💡 Future Features

* User authentication with NextAuth or JWT
* Mobile app (React Native)
* Push notifications for habit reminders
* Advanced analytics for growth trends
* Multi-language support for local communities

---

## 📚 Seed Data

Sample seed data is provided for:

* Children
* Families
* Daily habits
* Challenges
* Tips

Run seed script:

```bash
npx tsx packages/db/prisma/seed.ts
```

---

## 🏆 Screenshots / Demo

*(Add screenshots or GIFs of the dashboard, growth charts, challenges, and tips here)*

---

## 📄 License

MIT License © [Your Name]
