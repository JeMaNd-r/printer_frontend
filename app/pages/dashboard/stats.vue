<script setup lang="ts">
definePageMeta({
  middleware: ['authenticated']
})

// Retrieve printer states from the backend API
interface Printer_State {
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

interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

const page = ref(1)

const { data: printer_states } = await useFetch<PaginatedResponse<Printer_State>>(
  'http://localhost:8000/core/stats',
  {
    credentials: 'include',
    query: {
      format: 'json',
      p: page
    }
  }
)

const total = computed(() => {
  return printer_states.value?.count ?? 0
})

const stateArray: Record<number, string> = {
  0: "Idle",
  10: "Preparing",
  20: "Running",
  30: "Paused",
  40: "Finished",
  50: "Unknown",
  60: "Failed"
}

const timelineItems = computed(() =>
  printer_states.value?.results.map(state => ({
    value: state.id,
    title: stateArray[state.state] + ' | ' + (state.detailed_state ?? ''),
    date: new Date(state.created_at).toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }),
    description: `${state.percentage !== null ? `${state.percentage}%` : 'Progress unknown'} of Project ${
      new URL(state.project ?? 'none').pathname.match(/\/(\d+)\/?$/)?.[1] ?? 'unknown'
    }`,
    icon: state.is_light_on ? 'i-lucide-lightbulb' : 'i-lucide-lightbulb-off'
  })) ?? []
)
</script>

<template>
  <div>
    <h2>
      3D Printer Stats
    </h2>
    <p>
      Here are the past printer states from the 3D printer. Select a page to view more states. 
      The states are displayed in a timeline format, showing the state, date, and progress of each print job.
    </p>
    <br>
    <UTimeline 
      :items="timelineItems"
    />
    <br>
    <UPagination
      v-model:page="page"
      :total="total"
    />
  </div>
</template>
