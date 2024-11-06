const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://chiragdj2005:Chi050505@finbank.5xu1x.mongodb.net/?retryWrites=true&w=majority&appName=FinBank";
let db;

// Connect to MongoDB
MongoClient.connect(uri, {  useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000 })
  .then(client => {
    console.log('Connected to MongoDB');
    db = client.db('FinBank');
  })
  .catch(error => console.error('Failed to connect to MongoDB:', error));

// Login endpoint
app.post('/login', async (req, res) => {
  const { bankId, password, type } = req.body;
  const collection = type === 'user' ? 'users' : 'employees';

  try {
    const user = await db.collection(collection).findOne({ bankId, password });
    if (user) {
      res.json({ status: 'success', type, bankId });
    } else {
      res.status(401).json({ status: 'fail', message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

// Sign up endpoint
app.post('/signup', async (req, res) => {
  const { bankId, password, type, balance = 0 } = req.body;
  const collection = type === 'user' ? 'users' : 'employees';

  try {
    const existingUser = await db.collection(collection).findOne({ bankId });
    if (existingUser) {
      return res.status(400).json({ message: 'Bank ID already exists' });
    }

    const newUser = { bankId, password, balance, loans: [] };
    await db.collection(collection).insertOne(newUser);
    
    res.json({ status: 'success', message: 'Account created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Get balance endpoint for users
app.get('/user/balance/:bankId', async (req, res) => {
  const bankId = req.params.bankId;

  try {
    const user = await db.collection('users').findOne({ bankId });
    if (user) {
      res.json({ balance: user.balance });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get loans endpoint for users
app.get('/user/loans/:bankId', async (req, res) => {
  const bankId = req.params.bankId;

  try {
    const user = await db.collection('users').findOne({ bankId });
    if (user) {
      res.json({ loans: user.loans || [] });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Apply for loan endpoint for users
app.post('/user/applyLoan', async (req, res) => {
  const { bankId, amount } = req.body;
  console.log('Loan application request:', { bankId, amount }); // Log incoming request data

  if (amount <= 0) {
    console.log('Invalid loan amount:', amount);  // Log invalid amount case
    return res.status(400).json({ message: 'Invalid loan amount' });
  }

  try {
    const user = await db.collection('users').findOne({ bankId });
    console.log('Fetched user data:', user);  // Log fetched user data

    if (user) {
      const loanStatus = amount <= 0.1 * user.balance ? 'approved' : 'pending';
      console.log(`Loan status set to: ${loanStatus}`);  // Log loan status decision

      const newLoan = { amount: Number(amount), status: loanStatus };
      const result = await db.collection('users').updateOne(
        { bankId },
        {
          $push: { loans: newLoan },
          $inc: { balance: loanStatus === 'approved' ? amount : 0 }
        }
      );
      console.log('Database update result:', result);  // Log update operation result

      res.json({ message: `Loan application ${loanStatus}`, loans: [...user.loans, newLoan] });
    } else {
      console.log('User not found for bankId:', bankId);  // Log if user is not found
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Internal server error:', error);  // Log any internal server error
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Approve loan endpoint for employees
app.post('/employee/approveLoan', async (req, res) => {
  const { bankId, loanIndex } = req.body;

  try {
    const user = await db.collection('users').findOne({ bankId });

    if (user && user.loans[loanIndex] && user.loans[loanIndex].status === 'pending') {
      user.loans[loanIndex].status = 'approved';
      await db.collection('users').updateOne(
        { bankId },
        {
          $set: { loans: user.loans },
          $inc: { balance: user.loans[loanIndex].amount }
        }
      );

      res.json({ message: 'Loan approved', loans: user.loans });
    } else {
      res.status(400).json({ message: 'Loan not found or already approved' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Fetch user details endpoint for employees
app.get('/user/details/:bankId', async (req, res) => {
  const bankId = req.params.bankId;

  try {
    const user = await db.collection('users').findOne({ bankId });
    if (user) {
      res.json({
        bankId: user.bankId,
        balance: user.balance,
        loans: user.loans || []
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
