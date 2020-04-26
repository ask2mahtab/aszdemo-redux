// const iState={
//     Users:[{name:'Mahtab',email:'ask2mahtab@gmail.com'},
//             {name:'sunil',email:'ravi@gmail.com'}
// ]
// }

const userReducer=(state=''
        // iState
        ,action)=>{
    console.log(action);
    switch (action.type)
    {
        case 'UpdateUser':
                return action.payload
        // case 'DeleteUser':
        //         return action.payload
        // case 'AddUser':
        //     return stateaction.payload
    }
    return state;
}
export default userReducer ;