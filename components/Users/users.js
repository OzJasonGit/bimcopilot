"use client";
import Password from "antd/es/input/Password";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/user_route");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error fetching users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add new user
  const addUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/user_route", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add user");
      toast.success(data.message || "User added successfully");
      await fetchUsers();
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error(error.message);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      const res = await fetch(`/api/user_route/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete user");
      toast.success(data.message || "User deleted successfully");
      await fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(error.message);
    }
  };

  // Start editing
  const startEdit = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingUser(null);
    setFormData({ name: "", email: "" });
  };

  // Update user
  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/user_route/${editingUser._id}`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update user");
      toast.success(data.message || "User updated successfully");
      await fetchUsers();
      cancelEdit();
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="p-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Users Management</h2>

      {/* Add / Edit User Form */}
      <form className="mb-4 flex gap-4" onSubmit={editingUser ? updateUser : addUser}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="p-2 border rounded w-1/4"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="p-2 border rounded w-1/4"
          required
        />
        {!editingUser && (
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-2 border rounded w-1/4"
            required
          />
        )}
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          {editingUser ? "Update User" : "Add User"}
        </button>
        {editingUser && (
          <button type="button" onClick={cancelEdit} className="px-4 py-2 bg-gray-500 text-white rounded">
            Cancel
          </button>
        )}
      </form>

      {/* Users Table */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.role === 1 ? "Admin" : "Member"}</td>
                <td className="border p-2">
                  <button
                    onClick={() => startEdit(user)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
