import React,{Fragment,useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {UpdateTodo,DeleteTodo,AddTodo} from '../../actions/todoAction'
import { Table,Button,Form, Input,Modal,Popconfirm,message,DatePicker,Select  } from 'antd';
import { EditTwoTone,DeleteTwoTone,QuestionCircleOutlined} from '@ant-design/icons';
import moment from 'moment';
import '../../Style/table.css'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
function Todos(props){
  const [tableData,setTableData]=useState([]);
  const [visible,setVisible]=useState(false);
  const [loading,setLoading]=useState(false);
  const [form]=Form.useForm();
  const [index,setIndex]=useState();
    const tblColumn=[{
            title: 'Task',
            dataIndex: 'task',
            key: 'task',
        },
        {
            title: 'Date Added',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (<Fragment>
            
            <Button onClick={(e)=>Edit(record,e)} type="primary" shape="circle" icon={<EditTwoTone />} size={"large"} ghost/>
            <Popconfirm icon={<QuestionCircleOutlined/>}
              title="Are you sure delete this task?"
              onConfirm={(e)=>confirm(record,e)}
              okText="Yes"
              cancelText="No"
          >
          <Button style={{marginLeft:'5px'}}  type="primary" shape="circle" icon={ <DeleteTwoTone />} size={"large"} ghost/>
          </Popconfirm>
            
            </Fragment>),
        }
    ]///--------------table column end----------------------------------------------
    function fetchTableData(){
      const tbldata=[];
      if(props.Todos.length>0){
        // props.Users.foreach(function(row){
          Array.prototype.forEach.call(props.Todos,(row,i)=>{
          let data={
            task:row.task,
            date: row.date,             //moment(row.date,'DD-MM-YYYY'),
            status:row.status,
            key:i
          }
          tbldata.push(data);
        })
        setTableData(tbldata);
      }
    }
    //=------------------------------------------------
    
    function confirm(row,e) {
      console.log(e);
      Delete(row,e)
     
    }
    ///---------------------------------------------Edit ()--------------
    function Edit(row,e){
      console.log(row);
      form.setFieldsValue({
        task: row.task,
        date:moment(row.date,'DD-MM-YYYY'),      //row.date,
        status:row.status
        });
        setIndex(row.key)
        showModal()
    }
    //----------------------Delete()-------------------------------
    function Delete(row,e){
      let todos=props.Todos;
          todos.splice(row.key,1);
          props.UpdateTodo(todos);
          fetchTableData();
    }
    ////------------------------------ show Modal------------------------
    const showModal = () => {
      setVisible(true);
    };
 //// ------------------------------handleOK--------------------------------
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false); setVisible(false);
    }, 1000);
  };
  /////-----------------------handle cancel-------------------------------------
  const handleCancel = () => {
    setVisible(false);
  };
  ////-------------------------create User----------------
  function createTodo(){
    form.setFieldsValue({
      name: '',
      email:''
    });
    showModal();
  }
  ////--------------------adduser------------------------------------
  function addTodo(values){
    setLoading(true);
    let todos=props.Todos;
    values.date=moment(values.date).format("DD-MM-YYYY").toString()
    todos.push(values);
    props.UpdateTodo(todos);
    setTimeout(() => {
      setLoading(false); setVisible(false);
      fetchTableData();
    }, 1000);
  }
  function editTodo(values){
    setLoading(true);
    let todos=props.Users;
    todos[index]=values;
    setIndex(null);
    props.UpdateTodo(todos);
    setTimeout(() => {
      setLoading(false); setVisible(false);
      fetchTableData();
    }, 1000);
  }
  //---------------validation action
  const onFinish = values => {
    if(index){
      editTodo(values)
    }
    else{
      addTodo(values);
    }
   
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
    //-----------------useEffect----------------------------
    useEffect(()=>{
      fetchTableData();
    },[])

    return(<Fragment>
        <div className="table-container">
         <div>
                <Button type="primary" 
                onClick={createTodo}
                ghost>Add New Task</Button>
              </div>
        <Table columns={tblColumn} dataSource={tableData} />
        </div>
        <div>
        <Modal
          visible={visible}
          title="Title"
          onOk={handleOk}
          onCancel={handleCancel}
          centered={true}
          maskClosable={false}
          maskClosable={false}
          okButtonProps={{ style: { display: 'none' } }}
          cancelButtonProps={{ style: { display: 'none' } }}
        >
          <div>
                  <Form
                    form={form}
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                  >
                    <Form.Item
                      label="Task"
                      name="task"
                      rules={[{ required: true, message: 'Please input task name' }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item label="DatePicker" name="date"
                    rules={[{ required: true, message: 'Please select date!' }]}
                    >
                        <DatePicker format={"DD-MM-YYYY"}/>
                   </Form.Item>
                   <Form.Item label="Select" name="status"
                   rules={[{ required: true, message: 'Please select status!' }]}
                   >
                      <Select >
                        <Select.Option value="todo">Todo</Select.Option>
                        <Select.Option value="in progress">Inprogress</Select.Option>
                        <Select.Option value="dependency">Dependency</Select.Option>
                        <Select.Option value="hold">Hold</Select.Option>
                        <Select.Option value="finished">Finshed</Select.Option>
                      </Select>
                  </Form.Item>
                  <Form.Item {...tailLayout}>
                      <Button type="primary" htmlType="submit" loading={loading}>
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
          </div>
        </Modal>
        </div>
      
    </Fragment>)
}

const mapStateToProps=(state)=>{
    return {Todos:state.todos} 
  }
  const mapDispatchToProps=(dispatch)=>{
    return {
      UpdateTodo:(todo)=>{dispatch(UpdateTodo(todo))}
        // changeName:(name)=>{dispatch({type:'CHANGE_NAME',payload:name})}
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Todos);
   