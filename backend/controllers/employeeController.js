const { addEmployee } = require('../models/employeeModel');
const createEmployee = (req, res) => {
  const { name, employee_id, email, phone_number, department, date_of_joining, role } = req.body;

  if (!name || !employee_id || !email || !phone_number || !department || !date_of_joining || !role) {
    return res.status(400).json({ error: 'All fields are mandatory' });
  }

  const employee = { name, employee_id, email, phone_number, department, date_of_joining, role };

  addEmployee(employee, (err, result) => {
    if (err) {
      console.error('Error inserting employee:', err.message);
      return res.status(500).json({ error: `Error inserting employee: ${err.message}` });
    }
    return res.status(201).json({ message: 'Employee added successfully', result });
  });
};

module.exports = { createEmployee };
