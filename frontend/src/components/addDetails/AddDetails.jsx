import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './AddDetails.css';
import { useNavigate  } from 'react-router-dom';
import BACKEND_URL from '../../config';



const AddDetails = () => {
    const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    ifscCode: '',
    branchName: '',
    bankName: '',
    accountNumber: '',
    accountHolderName: '',
  });

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const validate = () => {
    const messages = [];
    if (!formData.ifscCode.match(/^[A-Z]{4}0[A-Z0-9]{6}$/)) {
      messages.push('Invalid IFSC format.');
    }
    if (!formData.branchName.trim()) {
      messages.push(' Branch name is required.');
    }
    if (!formData.bankName.trim()) {
      messages.push(' Bank name is required.');
    }
    if (!formData.accountNumber.match(/^\d{9,18}$/)) {
      messages.push('Enter a valid account number (9–18 digits).');
    }
    if (!formData.accountHolderName.trim()) {
      messages.push(' Account holder name is required.');
    }

    if (messages.length > 0) {
      alert(messages.join('\n'));
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch(`${BACKEND_URL}/api/bank/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Bank account details added successfully!');
        navigate('/view-details')
        setFormData({
          ifscCode: '',
          branchName: '',
          bankName: '',
          accountNumber: '',
          accountHolderName: '',
        });
      } else {
        alert(`❌ ${data.message || 'Something went wrong.'}`);
      }
    } catch (error) {
      console.error(error);
      alert('❌ Failed to submit. Please try again later.');
    }
  };

  return (
    <div className="add-details-container py-5">
      <div className="container bg-white shadow p-4 rounded" data-aos="zoom-in">
        <h2 className="text-center mb-4 fw-bold text-dark">➕ Add Bank Account</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">IFSC Code</label>
              <input
                type="text"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter IFSC Code"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Branch Name</label>
              <input
                type="text"
                name="branchName"
                value={formData.branchName}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter Branch Name"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Bank Name</label>
              <input
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter Bank Name"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Account Number</label>
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter Account Number"
              />
            </div>

            <div className="col-md-12">
              <label className="form-label fw-semibold">Account Holder’s Name</label>
              <input
                type="text"
                name="accountHolderName"
                value={formData.accountHolderName}
                onChange={handleChange}
                className="form-control"
                placeholder="Full name of account holder"
              />
            </div>
          </div>

          <div className="text-center mt-4">
            <button className="btn btn-success px-5 py-2 fw-semibold" type="submit">
              Submit Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDetails;
