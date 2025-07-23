import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ViewDetails.css';
import BACKEND_URL from '../../config';

const ViewDetails = () => {
  const [accounts, setAccounts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${BACKEND_URL}/api/bank/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAccounts(res.data.reverse()); // Most recent at top
    } catch (err) {
      toast.error('Failed to load accounts');
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${BACKEND_URL}/api/bank/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Account deleted');
      fetchAccounts();
    } catch (err) {
      toast.error('Deletion failed');
    }
  };

  const handleEdit = (account) => {
    setEditing(account._id);
    setFormData(account);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${BACKEND_URL}/api/bank/update/${editing}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Account updated');
      setEditing(null);
      fetchAccounts();
    } catch (err) {
      toast.error('Update failed');
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-5 text-gradient">🏦 Your Bank Accounts</h2>
      {accounts.length === 0 ? (
        <p className="text-center text-muted">No accounts found</p>
      ) : (
        <div className="row justify-content-center g-4">
          {accounts.map((acc) => (
            <div key={acc._id} className="col-12 col-sm-10 col-md-6 col-lg-4 d-flex justify-content-center">
              <div className="card bank-card shadow rounded-4 w-100">
                <div className="card-body">
                  {editing === acc._id ? (
                    <>
                      {['bankName', 'branchName', 'ifscCode', 'accountNumber', 'accountHolderName'].map((field) => (
                        <input
                          key={field}
                          className="form-control mb-2"
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                          placeholder={field}
                        />
                      ))}
                      <button className="btn btn-success w-100 rounded-pill" onClick={handleUpdate}>
                        Save Changes
                      </button>
                    </>
                  ) : (
                    <>
                      <h5 className="fw-bold text-dark mb-3">{acc.bankName}</h5>
                      <ul className="list-unstyled small text-secondary">
                        <li><strong>Branch:</strong> {acc.branchName}</li>
                        <li><strong>IFSC:</strong> {acc.ifscCode}</li>
                        <li><strong>Acc #:</strong> {acc.accountNumber}</li>
                        <li><strong>Holder:</strong> {acc.accountHolderName}</li>
                      </ul>
                      <div className="d-flex justify-content-between mt-3">
                        <button className="btn btn-sm btn-outline-primary rounded-pill px-3" onClick={() => handleEdit(acc)}>
                          <FaEdit className="me-1" /> Edit
                        </button>
                        <button className="btn btn-sm btn-outline-danger rounded-pill px-3" onClick={() => handleDelete(acc._id)}>
                          <FaTrash className="me-1" /> Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewDetails;
