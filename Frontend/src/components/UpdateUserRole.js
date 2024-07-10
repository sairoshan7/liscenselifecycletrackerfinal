import React, { useState } from "react";
import UpdateRoleService from "../services/UpdateRoleService";

import {useEffect } from "react";
const UpdateUserRole = () => {
  const [userId, setUserId] = useState("");
  const [roleId, setRoleId] = useState("");
  const [roleName, setRoleName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await UpdateRoleService.getAllRoles();
        setRoles(response.data); // Assuming response.data is an array of roles
      } catch (error) {
        console.error("Error fetching roles:", error);
        // Handle error fetching roles
      }
    };

    fetchRoles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await UpdateRoleService.updateUserRole(userId, { id: roleId, name: roleName });
      setMessage("Role updated successfully!");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("User not found.");
      } else {
        setError("An error occurred while updating the role.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card p-4 rounded">
            <h2 className="mb-4">Update User Role</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>User ID:</label>
                <input
                  type="number"
                  className="form-control"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Role ID:</label>
                <select
                  className="form-control"
                  value={roleId}
                  onChange={(e) => setRoleId(e.target.value)}
                  required
                >
                  <option value="">Select a Role ID</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
              <div className="form-group">
                <label>Role Name:</label>
                <select
                  className="form-control"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  required
                >
                  <option value="">Select a Role Name</option>
                  <option value="ROLE_USER">ROLE_USER</option>
                  <option value="ROLE_MANAGEMENT">ROLE_MANAGEMENT</option>
                  <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                  <option value="ROLE_TECHNICALSUPPORT">ROLE_TECHNICALSUPPORT</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">Update Role</button>
            </form>
            {message && <div className="mt-3 alert alert-info">{message}</div>}
            {error && <div className="mt-3 alert alert-danger">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserRole;