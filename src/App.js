import React,{Fragment} from 'react'; 
import { Layout, Menu, Breadcrumb } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './Style/index.css';
import 'antd/dist/antd.css';

//--------------components--------------
import Users from './View/Users'
import Todos from './View/Todos'


const { Header, Content, Footer,Icon } = Layout;
function App() {
  return (<Fragment>
     <Layout className="layout">
       <Router>
    <Header>
    <div className="logo" ><h1 style={{color:"white",marginTop: '-18px',
    marginLeft: '10px'}}>ASZ Demo</h1></div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}
      >
        <Menu.Item key="1">
            <span>Deshboard</span>
                  <Link to="/" />  
          
        </Menu.Item>
        <Menu.Item key="2">
            <span>Todos</span>
                <Link to="/todo" />
        </Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      
          <Route exact path="/" component={Users} />
          <Route path="/todo" component={Todos} />
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2020 Created Mahtab</Footer>
    </Router>
  </Layout>,
  </Fragment>
  );
}

export default App;
