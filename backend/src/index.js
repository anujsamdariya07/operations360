const express = require('express');

const dotenv = require('dotenv').config();

const dbConnect = require('./config/dbConnect');

const authRoutes = require('./routes/authRoutes');
const organizationRoutes = require('./routes/organizationRoutes');
const itemRoutes = require('./routes/itemRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const messageRoutes = require('./routes/messageRoutes');
const orderRoutes = require('./routes/orderRoutes');
const customerRoutes = require('./routes/customerRoutes');

const cookieParser = require('cookie-parser');
const cors = require('cors')


dbConnect();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/organization', organizationRoutes);
app.use('/api/item', itemRoutes);
app.use('/api/employee', employeeRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening at port: ${PORT}`);
});
