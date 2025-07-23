import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import BACKEND_URL from '../../config';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${BACKEND_URL}/api/bank/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const sortedData = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setUsers(sortedData.map((acc) => acc.user));
      setBankAccounts(sortedData);
    } catch (err) {
      alert('Error loading dashboard data.');
    }
  };

  const handleEditClick = (account) => {
    setEditingId(account._id);
    setEditedData({
      bankName: account.bankName,
      branchName: account.branchName,
      ifscCode: account.ifscCode,
      accountNumber: account.accountNumber,
      accountHolderName: account.accountHolderName,
    });
  };

  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleSave = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${BACKEND_URL}/api/bank/update/${id}`, editedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingId(null);
      fetchDashboardData();
    } catch (err) {
      alert('Failed to update');
    }
  };

  const getFieldValue = (account, field) => {
    switch (field) {
      case 'username':
        return account.user?.username || '';
      case 'bankName':
        return account.bankName || '';
      case 'ifscCode':
        return account.ifscCode || '';
      case 'accountNumber':
        return account.accountNumber?.toString() || '';
      case 'accountHolderName':
        return account.accountHolderName || '';
      default:
        return `${account.user?.username} ${account.bankName} ${account.ifscCode} ${account.accountNumber} ${account.accountHolderName}` || '';
    }
  };

  const filteredAccounts = bankAccounts.filter((account) =>
    getFieldValue(account, searchField).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Admin Dashboard</h2>

      <div className="stats-row">
        <div className="stat-box">
          <h4>Total Users</h4>
          <p>{new Set(users.map((u) => u._id)).size}</p>
        </div>
        <div className="stat-box">
          <h4>Total Bank Accounts</h4>
          <p>{bankAccounts.length}</p>
        </div>
      </div>

      <div className="dashboard-filters">
        <h5>View & Edit All User Bank Info</h5>
        <div className="filter-controls">
          <select
            className="form-select"
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
          >
            <option value="all">All Fields</option>
            <option value="username">Username</option>
            <option value="bankName">Bank Name</option>
            <option value="ifscCode">IFSC Code</option>
            <option value="accountNumber">Account Number</option>
            <option value="accountHolderName">Account Holder</option>
          </select>
          <input
            type="text"
            placeholder="🔍 Search..."
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Username</th>
              <th>Bank Name</th>
              <th>Branch</th>
              <th>IFSC</th>
              <th>Account No.</th>
              <th>Holder Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.map((acc) => (
              <tr key={acc._id}>
                <td>{acc.user?.username}</td>
                {editingId === acc._id ? (
                  <>
                    <td><input type="text" name="bankName" value={editedData.bankName} onChange={handleChange} /></td>
                    <td><input type="text" name="branchName" value={editedData.branchName} onChange={handleChange} /></td>
                    <td><input type="text" name="ifscCode" value={editedData.ifscCode} onChange={handleChange} /></td>
                    <td><input type="text" name="accountNumber" value={editedData.accountNumber} onChange={handleChange} /></td>
                    <td><input type="text" name="accountHolderName" value={editedData.accountHolderName} onChange={handleChange} /></td>
                    <td>
                      <button className="btn btn-success btn-sm" onClick={() => handleSave(acc._id)}>Save</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{acc.bankName}</td>
                    <td>{acc.branchName}</td>
                    <td>{acc.ifscCode}</td>
                    <td>{acc.accountNumber}</td>
                    <td>{acc.accountHolderName}</td>
                    <td>
                      <button className="btn btn-warning btn-sm" onClick={() => handleEditClick(acc)}>Edit</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
