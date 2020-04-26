import React,{Fragment,useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {UpdateUser,DeleteUser,AddUser} from '../../actions/userAction'
import { Table,Button,Form, Input,Modal,Popconfirm,message  } from 'antd';
import { EditTwoTone,DeleteTwoTone,QuestionCircleOutlined} from '@ant-design/icons';
  

import '../../Style/table.css'
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function Users(props){
      const [tableData,setTableData]=useState([]);
      const [visible,setVisible]=useState(false);
      const [loading,setLoading]=useState(false);
      const [form]=Form.useForm();
      const [index,setIndex]=useState();

      //--------table column-------------------------------------------------
      const tblColumn=[{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (<Fragment>
        
          <Button onClick={(e)=>Edit(record,e)} type="primary" shape="circle" icon={<EditTwoTone />} size={"large"} ghost/>
        <Popconfirm icon={<QuestionCircleOutlined/>} loading={loading}
          title="Are you sure delete this task?"
          onConfirm={(e)=>confirm(record,e)}
          okText="Yes"
          cancelText="No"
        >
          <Button style={{marginLeft:'5px'}}  type="primary" shape="circle" icon={ <DeleteTwoTone />} size={"large"} ghost/>
          </Popconfirm>
        
        </Fragment>),
      },
    
    ]///--------------table column end----------------------------------------------
    function confirm(row,e) {
      console.log(e);
      Delete(row,e)
      // handleOk()
     
    }
    ///---------------------------------------------Edit ()--------------
    function Edit(row,e){
      console.log(row);
      form.setFieldsValue({
          name: row.name,
          email:row.email
        });
        setIndex(row.key)
        showModal()
    }
    //----------------------Delete()-------------------------------
    function Delete(row,e){
      let users=props.Users;
          users.splice(row.key,1);
          props.UpdateUser(users);
          fetchTableData();
    }
    ////----------------------fetch Table Data from redux-------------------------
      function fetchTableData(){
        const tbldata=[];
        if(props.Users.length>0){
            Array.prototype.forEach.call(props.Users,(row,i)=>{
            let data={
              name:row.name,
              email:row.email,
              key:i
            }
            tbldata.push(data);
          })
          setTableData(tbldata);
        }
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
    function createUser(){
      form.setFieldsValue({
        name: '',
        email:''
      });
      showModal();
    }
    ////--------------------adduser------------------------------------
    function addUser(values){
      setLoading(true);
      let users=props.Users;
      users.push(values);
      props.UpdateUser(users);
      setTimeout(() => {
        setLoading(false); setVisible(false);
        fetchTableData();
      }, 1000);
    }
    function editUser(values){
      setLoading(true);
      let users=props.Users;
      users[index]=values;
      setIndex(null);
      props.UpdateUser(users);
      setTimeout(() => {
        setLoading(false); setVisible(false);
        fetchTableData();
      }, 1000);
    }
    //---------------validation action-------------------------------
    const  onFinish =async values => {
      // props.UpdateUser(values)
      if(index){
        editUser(values)
      }
      else{
        addUser(values);
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
 
  //////////----------------render------------------------------
    return(<Fragment>
        <div className="table-container">
            <div>
                <Button type="primary" 
                onClick={createUser}
                ghost>Create User</Button>
            </div>
            <Table columns={tblColumn} dataSource={tableData} />
        </div>
        <div>
        <Modal
          visible={visible}
          title="Form within a Modal"
          onOk={handleOk}
          okText="Save"
          okType="submit"
          onCancel={handleCancel}
          centered={true}
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
                      label="User Name"
                      name="name"
                      rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="email"
                      label="E-mail"
                      rules={[
                        {
                          type: 'email',
                          message: 'The input is not valid E-mail!',
                        },
                        {
                          required: true,
                          message: 'Please input your E-mail!',
                        },
                      ]}
                    >
                      <Input />
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
    return {Users:state.users} 
  }
  const mapDispatchToProps=(dispatch)=>{
    return {
      UpdateUser:(User)=>{dispatch(UpdateUser(User))},
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Users);
   