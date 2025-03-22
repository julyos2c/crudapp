import { configureStore } from '@reduxjs/toolkit'
import employeeReducer from './reducers/EmployeeReducer'


const store = configureStore({
    reducer: {
        employees: employeeReducer,
    }
});

export default store;