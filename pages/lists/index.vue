<template>
    <ul role="list" class="divide-y divide-gray-100">
      <li v-for="user in users" :key="user.id" class="flex justify-between gap-x-6 py-5">
        <div class="flex min-w-0 gap-x-4">
          <img class="h-12 w-12 flex-none rounded-full bg-gray-50" :src="user.id" alt="" />
          <div class="min-w-0 flex-auto">
            <p class="text-sm font-semibold leading-6 text-gray-900">{{ user.username }}</p>
            <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{ user.email }}</p>
          </div>
        </div>
        <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <p class="text-sm leading-6 text-gray-900">{{ user.id }}</p>
          <p v-if="user.id" class="mt-1 text-xs leading-5 text-gray-500">
            Last seen <time :datetime="users.createdAt">{{ users.createdAt }}</time>
          </p>
          <div v-else class="mt-1 flex items-center gap-x-1.5">
            <div class="flex-none rounded-full bg-emerald-500/20 p-1">
              <div class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </div>
            <p class="text-xs leading-5 text-gray-500">Online</p>
          </div>
        </div>
        
      </li>
      
    </ul>
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