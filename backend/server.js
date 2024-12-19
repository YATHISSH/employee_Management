const express = require('express');
const cors = require('cors');
const employeeRoutes = require('./routes/employeeRoutes');
const db = require('./config/db'); 

const app = express();


app.use(express.json());
app.use(cors());

app.use('/api/employees', employeeRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
