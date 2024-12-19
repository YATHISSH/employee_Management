import React, { useState } from 'react';
import api from '../services/api';

const AddEmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    employee_id: '',
    email: '',
    phone_number: '',
    department: '',
    date_of_joining: '',
    role: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const departments = ['HR', 'Engineering', 'Marketing', 'Sales', 'Finance'];

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim().split(' ').length >= 2 ? '' : 'Please enter both first and last name.';
      case 'employee_id':
        return /^[a-zA-Z0-9]{1,10}$/.test(value) ? '' : 'Employee ID must be alphanumeric and max 10 characters.';
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Please enter a valid email address.';
      case 'phone_number':
        return /^[0-9]{10}$/.test(value) ? '' : 'Phone number must be exactly 10 digits.';
      case 'department':
        return value ? '' : 'Please select a department.';
      case 'date_of_joining':
        return new Date(value) <= new Date() ? '' : 'Date of joining cannot be in the future.';
      case 'role':
        return value.trim() ? '' : 'Role is required.';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await api.post('/add', formData);
      setSuccessMessage(response.data.message);
      setErrorMessage('');
      setFormData({
        name: '',
        employee_id: '',
        email: '',
        phone_number: '',
        department: '',
        date_of_joining: '',
        role: '',
      });
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.error || 'Server error occurred.');
      } else {
        setErrorMessage('Unable to connect to the server.');
      }
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      employee_id: '',
      email: '',
      phone_number: '',
      department: '',
      date_of_joining: '',
      role: '',
    });
    setErrors({});
    setSuccessMessage('');
    setErrorMessage('');
  };

  const formStyle = {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
  };

  const labelStyle = {
    fontWeight: 'bold',
    marginBottom: '5px',
    display: 'block',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  };

  const errorStyle = {
    color: 'red',
    fontSize: '14px',
    marginTop: '-10px',
    marginBottom: '10px',
  };

  return (
    <div style={formStyle}>
      <h2>Employee Management System</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label style={labelStyle}>{key.replace('_', ' ').toUpperCase()}</label>
            {key === 'department' ? (
              <select
                name={key}
                value={formData[key]}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="">Select a department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            ) : key === 'date_of_joining' ? (
              <input
                type="date"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                style={inputStyle}
              />
            ) : (
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                style={inputStyle}
              />
            )}
            {errors[key] && <p style={errorStyle}>{errors[key]}</p>}
          </div>
        ))}
        <button type="submit" style={{ ...buttonStyle, marginRight: '10px' }}>
          Submit
        </button>
        <button type="button" onClick={handleReset} style={buttonStyle}>
          Reset
        </button>
      </form>
      {successMessage && <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
    </div>
  );
};

export default AddEmployeeForm;
