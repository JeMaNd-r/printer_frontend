<script setup lang="ts">
definePageMeta({
  middleware: ['authenticated']
})

// Retrieve projects from the backend API
interface Project {
    id: number
    url: string
    project_name: string
    project_description: string
    created_at: string
    updated_at: string
    is_created_manually: boolean
    owner: {
      id: number
      email: string
      first_name: string
      last_name: string
      is_superuser: boolean
    }
    printer_states: [string]
}

interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

const page = ref(1)

const { data: projects } = await useFetch<PaginatedResponse<Project>>(
  'http://localhost:8000/core/projects',
  {
    credentials: 'include',
    query: {
      format: 'json',
      page: page
    }
  }
)

const total = computed(() => {
  return projects.value?.count ?? 0
})
</script>

<template>
  <div>
    <h2 class="text-2xl font-semibold tracking-tight">
      Printing Projects
    </h2>
    <p class="text">
      List of printing projects that have been sent to the 3D printer. Each project has a unique ID and a name. 
      You can view the details of each project by clicking on the project card.
    </p>
    <br>
    <UPageGrid>
      <UPageCard
        v-for="project in projects?.results ?? []"
        :key="project.id"
        variant="subtle"
        class="w-full"
        :title="`${project.project_name} (${project.id})`"
        :description="project.project_description"
        :to="`/dashboard/project_${project.id}`"
      />
    </UPageGrid>
    <br>
    <UPagination
      v-model:page="page"
      :total="total"
    />
    <br>
    <UButton icon="i-lucide-arrow-left" to:="/dashboard/stats" variant="subtle">
      Stats
    </UButton> <1-- TODO: Add logout functionality --></1-->
  </div>
</template>
