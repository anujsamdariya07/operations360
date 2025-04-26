const express = require('express');
const dotenv = require('dotenv').config();
const dbConnect = require('./config/dbConnect');
const authRoutes = require('./routes/authRoutes');
const organizationRoutes = require('./routes/organizationRoutes')

dbConnect();

const app = express();

app.use(express.json())

app.use('/api/auth', authRoutes);
app.use('/api/organization', organizationRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening at port: ${PORT}`);
});
