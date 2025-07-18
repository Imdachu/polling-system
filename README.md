# polling-system
Polling System is a real-time voting application built using Node.js, Express, MongoDB, and Socket.io. It allows users to create polls, vote in real-time, and view live updates as votes are cast. The project demonstrates WebSocket-based live communication and MongoDB integration for data persistence

---

# **📊 Polling System (Real-Time Voting App)**
A **real-time voting application** built using **Node.js, Express, MongoDB, and Socket.io**. Users can **create polls, vote in real-time**, and see live updates instantly.

![Polling System Demo](https://via.placeholder.com/800x400?text=Polling+System+Demo)  


---

## **🚀 Features**
✅ Create new polls dynamically  
✅ Vote on polls in **real-time** (WebSockets)  
✅ See **live vote count updates**  
✅ Prevent duplicate votes per user/session  
✅ RESTful API for managing polls  

---

## **🛠 Technologies Used**
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Frontend:** EJS (Embedded JavaScript), HTML, CSS  
- **Real-time Updates:** Socket.io  
- **API Testing:** Postman / cURL  

---

## **📌 Installation & Setup**
Follow these steps to set up the project locally:

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/<your-username>/polling-system.git
cd polling-system
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Set Up Environment Variables**
Create a `.env` file and add the following:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/polling-system
```

### **4️⃣ Start the Server**
```sh
npm run dev
```
Your server will start on **`http://localhost:3000`**.

---

## **🎯 How to Use**
### **Create a Poll**
Visit **`http://localhost:3000/api/polls/create`** to create a new poll.

### **Vote in a Poll**
1. Open a poll at:
   ```
   http://localhost:3000/poll/<poll-id>
   ```
2. Click on an option to vote.
3. **See votes update in real-time!**

---

## **📡 API Endpoints**
| Method | Endpoint | Description |
|--------|---------|-------------|
| **POST** | `/api/polls/create` | Create a new poll |
| **GET** | `/api/polls/:id` | Get a poll by ID |
| **GET** | `/api/polls/view/:id` | View a poll page |
| **POST** | `/api/polls/vote` | Submit a vote |

Example **Create Poll** using `cURL`:
```sh
curl -X POST -H "Content-Type: application/json" -d '{
  "question": "Best Programming Language?",
  "options": ["JavaScript", "Python", "Java"]
}' http://localhost:3000/api/polls/create
```

---

## **🔹 Folder Structure**
```
polling-system/
│── views/               # Frontend templates
│   ├── createPoll.ejs   # Poll creation page
│   ├── poll.ejs         # Poll voting page
│── routes/
│   ├── polls.js         # API routes for polls
│── models/
│   ├── poll.js          # Poll schema (MongoDB)
│── public/              # Static assets (CSS, JS)
│── server.js            # Main server file
│── .env                 # Environment variables
│── package.json         # Node dependencies
│── README.md            # Project documentation
```

---

## **📌 Future Improvements**
🔹 User authentication (JWT)  
🔹 Poll expiration & scheduled closing  
🔹 Better UI with **React.js**  
🔹 Admin dashboard for poll management  

---

## **👨‍💻 Contributing**
Contributions are welcome! Feel free to **open an issue** or **submit a pull request**.

---

## **📜 License**
This project is open-source and available under the **MIT License**.

---

### **🌟 Show Your Support**
If you like this project, **please ⭐ star the repository** on GitHub!  
