const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const dbPath = './db.json';

// Helper function to read the database
const readDb = () => {
  const dbData = fs.readFileSync(dbPath);
  return JSON.parse(dbData);
};

// Helper function to write to the database
const writeDb = (dbData) => {
  fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
};

// GET all users
app.get('/api/users', (req, res) => {
  const db = readDb();
  res.json(db.users.concat(db.businessUsers));
});

// GET all shifts
app.get('/api/shifts', (req, res) => {
  const db = readDb();
  res.json(db.shifts);
});

// GET all jobs
app.get('/api/jobs', (req, res) => {
  const db = readDb();
  res.json(db.jobs);
});

// GET all chats
app.get('/api/chats', (req, res) => {
  const db = readDb();
  res.json(db.chats);
});

// GET all availability posts
app.get('/api/availability', (req, res) => {
  const db = readDb();
  res.json(db.availabilityPosts);
});

// GET website content
app.get('/api/website-content', (req, res) => {
    const db = readDb();
    res.json(db.websiteContent);
});

// POST a new shift
app.post('/api/shifts', (req, res) => {
    const db = readDb();
    const newShift = req.body;
    newShift.id = `shift-${Date.now()}`;
    db.shifts.push(newShift);
    writeDb(db);
    res.json(newShift);
});

// POST a new job
app.post('/api/jobs', (req, res) => {
    const db = readDb();
    const newJob = req.body;
    newJob.id = `job-${Date.now()}`;
    db.jobs.push(newJob);
    writeDb(db);
    res.json(newJob);
});

// POST a new availability post
app.post('/api/availability', (req, res) => {
    const db = readDb();
    const newAvailability = req.body;
    newAvailability.id = `ap-${Date.now()}`;
    db.availabilityPosts.push(newAvailability);
    writeDb(db);
    res.json(newAvailability);
});

// POST a new chat message
app.post('/api/chats/:chatId/messages', (req, res) => {
    const db = readDb();
    const chatId = req.params.chatId;
    const newMessage = req.body;
    newMessage.id = `msg-${Date.now()}`;
    const chat = db.chats.find(c => c.id === chatId);
    if (chat) {
        chat.messages.push(newMessage);
        writeDb(db);
        res.json(newMessage);
    } else {
        res.status(404).send('Chat not found');
    }
});

// PUT (update) a user
app.put('/api/users/:userId', (req, res) => {
    const db = readDb();
    const userId = req.params.userId;
    const updatedUser = req.body;
    let userIndex = db.users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        db.users[userIndex] = updatedUser;
    } else {
        userIndex = db.businessUsers.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
            db.businessUsers[userIndex] = updatedUser;
        } else {
            return res.status(404).send('User not found');
        }
    }
    writeDb(db);
    res.json(updatedUser);
});


// DELETE a user
app.delete('/api/users/:userId', (req, res) => {
    const db = readDb();
    const userId = req.params.userId;
    let userIndex = db.users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        db.users.splice(userIndex, 1);
    } else {
        userIndex = db.businessUsers.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
            db.businessUsers.splice(userIndex, 1);
        } else {
            return res.status(404).send('User not found');
        }
    }
    writeDb(db);
    res.status(204).send();
});

// DELETE a shift
app.delete('/api/shifts/:shiftId', (req, res) => {
    const db = readDb();
    const shiftId = req.params.shiftId;
    const shiftIndex = db.shifts.findIndex(s => s.id === shiftId);
    if (shiftIndex !== -1) {
        db.shifts.splice(shiftIndex, 1);
        writeDb(db);
        res.status(204).send();
    } else {
        res.status(404).send('Shift not found');
    }
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
