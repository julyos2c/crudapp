import { createSlice } from "@reduxjs/toolkit";
import { employeeList } from "../../components/Data";

const employeeSlice = createSlice({
    name: "employees",
    initialState: [],
    reducers: {
        setEmployees: (state, action) => { 
            return action.payload;
        },

        addEmployee: (state, action) => {
            state.push(action.payload)
              
        },
        updateEmployee: (state, action) => {
            const { id, name, email, position } = action.payload;
            const employee = state.find(emp => emp.id === id);
            if (employee) {
                employee.name = name;
                employee.email = email;
                employee.position = position;
            }
        },
        deleteEmployee: (state, action) => {
            // const {id} = action.payload;
            // const uu = state.find(user => user.id == id);
            // if(uu) {
            return state.filter(user => user.id !== action.payload.id);
            }
        }
    
});

export const { setEmployees, addEmployee, updateEmployee, deleteEmployee} = employeeSlice.actions;
export default employeeSlice.reducer;