import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
    AreaChartOutlined
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class MainLayout extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { children } = this.props;

    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider>
        <div className="logo" >
          <img src="/logo.png" height="36" alt="logo" />
          </div>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<AreaChartOutlined />}>
              หน้าแรก
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content>
            <Breadcrumb>
              <Breadcrumb.Item>หน้าแรก</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background"
            >
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Copyright @2020 iBotX. All right reserved.
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default MainLayout;
