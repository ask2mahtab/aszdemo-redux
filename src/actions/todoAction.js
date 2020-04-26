export const UpdateTodo=(Todo)=>{
    return{
        type:'UpdateTodo',
        payload:Todo
     }  
}
export const DeleteTodo=(Todo)=>{
    return{
        type:'DeleteTodo',
        payload:Todo
     }  
}
export const AddTodo=(Todo)=>{
    return{
        type:'AddTodo',
        payload:Todo
     }  
}