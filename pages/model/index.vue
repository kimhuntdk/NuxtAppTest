<template>
    <div>
      <h1>Home</h1>
      <div v-if="users.length">
        <h2>User List</h2>
        <ul>
          <li v-for="user in users" :key="user.id">
            <strong>{{ user.username }}</strong> - {{ user.email }}
            <button @click="editUser(user)">Edit</button>
            <button @click="deleteUser(user.id)">Delete</button>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Loading users...</p>
      </div>
  
      <Modal v-if="editingUser" :show="!!editingUser" @close="closeModal">
        <h2>Edit User</h2>
        <form @submit.prevent="updateUser">
          <div>
            <label for="editUsername">Username:</label>
            <input type="text" v-model="editingUser.username" required />
          </div>
          <div>
            <label for="editEmail">Email:</label>
            <input type="email" v-model="editingUser.email" required />
          </div>
          <button type="submit">Update</button>
          <button @click="closeModal">Cancel</button>
        </form>
      </Modal>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const users = ref([])
  const editingUser = ref(null)
  
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3002/api/users/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }
  
      const data = await response.json()
      users.value = data
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }
  
  const editUser = (user) => {
    editingUser.value = { ...user }
  }
  
  const closeModal = () => {
    editingUser.value = null
  }
  
  const updateUser = async () => {
    try {
      const response = await fetch(`http://localhost:3002/api/users/${editingUser.value.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          username: editingUser.value.username,
          email: editingUser.value.email
        })
      })
  
      if (!response.ok) {
        throw new Error('Failed to update user')
      }
  
      await fetchUsers() // Fetch updated users list
      closeModal()
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }
  
  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3002/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
  
      if (!response.ok) {
        throw new Error('Failed to delete user')
      }
  
      await fetchUsers() // Fetch updated users list
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }
  
  onMounted(() => {
    fetchUsers()
  })
  </script>
  
  