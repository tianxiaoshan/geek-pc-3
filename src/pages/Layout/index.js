import React, { useEffect, useState, useRef } from 'react'
import {
  Layout,
  Menu,
  Breadcrumb,
  Popconfirm,
  Modal,
  Form,
  Button,
  message,
  Input,
} from 'antd'
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  LoginOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import styles from './index.module.scss'
import { removeTokenInfo } from '../../utils/storage'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { profile, upload } from '../../store/actions/profile'
import { useSelector } from 'react-redux'

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout
export default function Layoutt() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [cur, setCur] = useState({ id: '', name: '' })

  const fileRef = useRef(null)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(profile())
  }, [dispatch])
  const profileInfo = useSelector((state) => state.profile)
  const { photo, name, mobile, gender, birthday, intro } = profileInfo

  const history = useHistory()
  const confirm = () => {
    removeTokenInfo()
    history.push('/login')
  }
  const editProfile = () => {
    setIsModalVisible(true)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const onUpload = () => {
    fileRef.current.click()
  }
  const onFile = async (e) => {
    // console.log(e.target.files[0])
    setLoading(true)
    const file = e.target.files[0]
    const fd = new FormData()
    fd.append('photo', file)
    await dispatch(upload(fd))
    message.success('修改成功', 1)
    setLoading(false)
    setIsModalVisible(false)
  }
  const onDoubleClick = ({ id, title }) => {
    setCur({ id: id, name: title })
  }
  const list = [
    { id: 1, title: name, label: '昵称' },
    { id: 2, title: gender, label: '性别' },
    { id: 3, title: intro, label: '简介' },
    { id: 4, title: birthday, label: '生日' },
    { id: 5, title: mobile, label: '手机号' },
  ]
  return (
    <Layout className={styles.root}>
      <Header className="header">
        <div className="logo" />
        <div className="right">
          <span>
            <img src={photo} alt="" className="img" /> {name}
          </span>
          <span onClick={editProfile}>
            {' '}
            <TeamOutlined />
            个人中心
          </span>
          <Popconfirm
            placement="bottom"
            title={'你确定要退出登录？'}
            onConfirm={confirm}
            okText="是的"
            cancelText="取消"
          >
            <LoginOutlined />
            退出
          </Popconfirm>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
              <Menu.Item key="1">option1</Menu.Item>
              <Menu.Item key="2">option2</Menu.Item>
              <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
              <Menu.Item key="5">option5</Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              icon={<NotificationOutlined />}
              title="subnav 3"
            >
              <Menu.Item key="9">option9</Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
      {isModalVisible && (
        <Modal
          title="编辑个人资料"
          visible={isModalVisible}
          onCancel={handleCancel}
          className="modal"
        >
          <div>
            {' '}
            <div className="box">
              {' '}
              <img src={photo} alt="" className="modal_img" />
            </div>
            <Button
              type="primary"
              className="btn"
              onClick={onUpload}
              loading={loading}
            >
              上传头像
            </Button>
            <input type="file" hidden ref={fileRef} onChange={onFile} />
          </div>
          <Form>
            {list.map((item) => (
              <Form.Item
                label={item.label}
                onDoubleClick={() => onDoubleClick(item)}
                key={item.id}
              >
                {cur.id === item.id ? (
                  <Input
                    value={cur.name}
                    onChange={(e) => setCur({ id: '', name: e.target.value })}
                  ></Input>
                ) : (
                  item.title
                )}
              </Form.Item>
            ))}

            {/* <Form.Item label="性别">{gender}</Form.Item>
            <Form.Item label="简介">{intro}</Form.Item>
            <Form.Item label="生日">{birthday}</Form.Item>
            <Form.Item label="手机号">{mobile}</Form.Item> */}
          </Form>
        </Modal>
      )}
    </Layout>
  )
}
