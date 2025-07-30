// Third-party Imports
import { configureStore } from '@reduxjs/toolkit'

// Slice Imports
import designReducer from '@/redux-store/slices/design'

export const store = configureStore({
  reducer: {
    designReducer,   
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
