const db = require('../config/db');

const addEmployee = (employee, callback) => {
  const query = `INSERT INTO employee (name, employee_id, email, phone_number, department, date_of_joining, role)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(query, 
    [employee.name, employee.employee_id, employee.email, employee.phone_number, employee.department, employee.date_of_joining, employee.role],
    (err, result) => {
      if (err) {
        console.error('Error inserting employee in model:', err.message);
        return callback(err);
      }
      console.log('Data inserted into the database:', { name: employee.name, employee_id: employee.employee_id , email: employee.email, phone_number:employee.phone_number, department: employee.department, date_of_joining: employee.date_of_joining, role:employee.role});
      callback(null, result);
    }
  );
};

module.exports = { addEmployee };
