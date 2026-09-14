<script setup lang="ts">
definePageMeta({
  middleware: ['authenticated']
})

const { user, logout: logoutFromDjango } = useDjangoAuth()

async function logout() {
  await logoutFromDjango()
  await navigateTo('/login')
}
</script>

<template>
  <div v-if="user">
    <UPageHero
      title="Welcome to the Dashboard"
      description="View the latest printer stats and manage the printing projects."
      :links="[{
        label: 'Stats',
        to: '/dashboard/stats',
        trailingIcon: 'i-lucide-file-chart-line',
        size: 'xl',
        color: 'neutral',
        variant: 'subtle'
      }, {
        label: 'Projects',
        to: '/dashboard/projects',
        target: '_blank',
        trailingIcon: 'i-lucide-book-open',
        size: 'xl',
        color: 'neutral',
        variant: 'subtle'
      }]"
    />
    <UButton
      color="warning"
      icon="i-lucide-log-out"
      @click="logout"
    >
      Logout
    </UButton>
  </div>
</template>
