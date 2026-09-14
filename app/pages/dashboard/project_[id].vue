<script setup lang="ts">
definePageMeta({
  middleware: ['authenticated']
})

const route = useRoute()

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
  printer_states: string[]
}

interface PrinterState {
  id: number
  url: string
  state: number
  detailed_state: number | null
  created_at: string
  is_light_on: boolean
  percentage: number | null
  project: string | null
  temperature_nozzle: number | null
}

const { data: project } = await useFetch<Project>(
  `http://localhost:8000/core/projects/${route.params.id}`,
  {
    credentials: 'include',
    query: {
      format: 'json'
    }
  }
)

const printer_states = ref<PrinterState[]>([])

if (project.value?.printer_states?.length) {
  printer_states.value = await Promise.all(
    project.value.printer_states.map(stateUrl =>
      $fetch<PrinterState>(stateUrl, {
        credentials: 'include',
        query: {
          format: 'json'
        }
      })
    )
  )
}

const stateArray: Record<number, string> = {
  0: 'Idle',
  10: 'Preparing',
  20: 'Running',
  30: 'Paused',
  40: 'Finished',
  50: 'Unknown',
  60: 'Failed'
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-semibold tracking-tight">
      Project
    </h2>
    <UCard
      v-if="project"
      variant="subtle"
      class="w-full"
    >
      <template #header>
        <h3 class="font-semibold">
          ID {{project.id}}: {{ project.project_name }}
        </h3>
      </template>
      <p>
        {{ project.project_description }}
      </p>
      <template #footer>
        <UUser
          v-if="project.owner"
          :name="project.owner.first_name"
          :description="project.owner.email"
          :avatar="{ alt: project.owner.first_name }"
        />
      </template>
    </UCard>
    <p v-else>
      Project with ID {{ route.params.id }} not found.
    </p>
    <br>
    <h2 class="text-2xl font-semibold tracking-tight">
      Printer states
    </h2>
    <UPageList
      v-if="printer_states.length"
    >
      <UPageCard
        v-for="state in printer_states"
        :key="state.id"
        :title="stateArray[state.state] + ' | ' + (state.detailed_state ?? 'Unknown')"
        :description="`Progress: ${state.percentage !== null ? `${state.percentage}%` : 'unknown'}`"
      >
        <template #footer>
          <UUser
            :name="new Date(state.created_at).toLocaleString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit'
            })"
            :avatar="{
              icon: state.is_light_on ? 'i-lucide-lightbulb' : 'i-lucide-lightbulb-off',
              alt: state.is_light_on.toString()
            }"
          />
        </template>
      </UPageCard>
    </UPageList>
    <p v-else>
      No printer states available.
    </p>
  </div>
</template>
