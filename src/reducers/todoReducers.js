// const iState={
//     Todos:[{job:'Edit',date:'12-11-2020',status:'ToDo'}]
// }
const todoReducer=(state=[]
    // iState
    ,action)=>{
    console.log(action);
    switch (action.type)
    {
        case 'UpdateTodos':
                return {...state,Users:action.payload}
        // case 'DeleteTodos':
        //         return {...state,Users:action.payload}
        // case 'AddTodos':
        //     return {...state,Users:action.payload}
    }
    return state;
}
export default todoReducer