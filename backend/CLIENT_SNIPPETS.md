```markdown
// Register
const registerJobSeeker = async (formData) => {
  const res = await fetch('http://localhost:4000/api/auth/register', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: formData.fullName, email: formData.email, password: formData.password, userType: 'JobSeeker', role: formData.preferredRole, location: formData.location })
  });
  return res.json();
};

// Login
const login = async (email, password) => {
  const res = await fetch('http://localhost:4000/api/auth/login', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
  return res.json();
};

// Get current user
const getMe = async () => { const res = await fetch('http://localhost:4000/api/auth/me', { credentials: 'include' }); return res.json(); };

// Post shift
const postShift = async (shiftData) => { const res = await fetch('http://localhost:4000/api/shifts', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(shiftData) }); return res.json(); };

// Apply
const applyToShift = async (shiftId, message) => { const res = await fetch(`http://localhost:4000/api/shifts/${shiftId}/apply`, { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message }) }); return res.json(); };

// Chat
const startChat = async (shiftId, partnerId) => { const res = await fetch('http://localhost:4000/api/chats', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ shiftId, partnerId }) }); return res.json(); };
const sendMessage = async (chatId, text) => { const res = await fetch(`http://localhost:4000/api/chats/${chatId}/messages`, { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) }); return res.json(); };
```