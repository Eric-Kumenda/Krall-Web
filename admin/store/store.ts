import { configureStore } from '@reduxjs/toolkit'
// Import slices here as we create them
import eventsReducer from './slices/eventsSlice'
import merchReducer from './slices/merchSlice'
import usersReducer from './slices/usersSlice'
import profileReducer from './slices/profileSlice'
import attendeesReducer from './slices/attendeesSlice'
import dashboardReducer from './slices/dashboardSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      events: eventsReducer,
      merch: merchReducer,
      users: usersReducer,
      profile: profileReducer,
      attendees: attendeesReducer,
      dashboard: dashboardReducer,
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
