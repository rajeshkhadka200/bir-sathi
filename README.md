# 🏥Bir Saathi

A smart, WhatsApp-based assistant that improves patient experience at **Bir Hospital** by providing **real-time token status** updates and hospital navigation — all without installing any app.

---

## 🧠 Core Idea

Every day, **700–800 patients** visit **Bir Hospital** and line up at the OPD counter after collecting a token. But:

- They **don’t know how long they'll wait**
- There’s **no update** on when their turn comes
- It creates **crowding**, **confusion**, and **stress**

### 💡 What if patients could relax, grab tea, or sit down… and only return when it’s their turn?

**Bir Saathi** solves this.

Using **WhatsApp** — a tool every Nepali already uses — patients can:

- 🕒 Get real-time token updates
- 🚶‍♂️ Know their estimated wait time

---

## 🔧 What the System Does

### ✅ For Patients (via WhatsApp Bot)

Patients send messages like:

Bot replies:

🎫 Current Token: 45
⏳ You’re 45 away
🕐 Est. wait time: 1 hr 15 min
📍 Counter: TBA

### 📊 For Admins

A simple **Dashboard** to:

- Input current token number
- Monitor token movement
- Broadcast messages
- View analytics (optional future scope)

---

## 🏥 Problems Solved

- ⛔ Eliminates unnecessary crowding at OPD counters
- 🧘 Reduces stress by giving patients control over their wait
- 📲 No app installs — just use WhatsApp

---

## 🧱 Tech Stack

### 🖥️ Frontend

- **React JS**
- **CSS **

### 🧠 Backend

- **Node.js**

### 🗄️ Database

- **MongoDB** – for storing user queries, logs, and history

---

## ⏱️ What We’re Building in 24 Hours

A full system consisting of:

- ✅ WhatsApp chatbot (via Twilio)
- ✅ Admin dashboard to control token flow
- ✅ Real-time updates pushed to patients

---

## 📈 Potential Extensions

- 🔔 SMS fallback for non-WhatsApp users
- 🌐 Public display for current token (TV screens)
- 👩‍⚕️ Department-level queue integration
- 🔊 Voice alerts for low-vision patients

---

## 🏁 Getting Started (Dev Setup)

```bash
# Clone the repo
git clone https://github.com/rajeshkhadka200/bir-saathi.git
cd bir-saathi

# Install dependencies
npm install

# Run frontend
npm run dev

# Run backend
cd server
npm install
npm start



```
