<script setup lang="ts">
definePageMeta({
  middleware: ['authenticated'],
})

const { user, logout: logoutFromDjango } = useDjangoAuth()

async function logout () {
  await logoutFromDjango()
  await navigateTo('/login')
}
</script>

<template>
    <div v-if="user">
        <h1>Welcome {{ user.name }}</h1>
        <button @click="logout">
            Logout
        </button>
    </div>
</template>
