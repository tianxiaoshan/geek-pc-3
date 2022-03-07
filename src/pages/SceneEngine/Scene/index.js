import React, { memo, useState } from 'react'
import {
  HeartOutlined,
  PlusOutlined,
  CloseOutlined,
  CheckCircleFilled,
} from '@ant-design/icons'
import styles from './index.module.scss'

import {
  Card,
  Form,
  Input,
  Upload,
  Radio,
  Select,
  Button,
  Space,
  message,
  Modal,
} from 'antd'
const { Option } = Select

const Scene = () => {
  const sceneList = [
    { id: 0, title: '男性', icon: '' },
    { id: 1, title: '30-40岁', icon: '' },
    { id: 2, title: '已婚', icon: '' },
    { id: 3, title: '已有1辆车', icon: '' },
  ]
  const userPerceptionList = [
    { id: 0, name: '用户情绪', way: 'in', mood: '伤心，流泪，烦躁' },
    { id: 1, name: '用户姿态', way: '=', mood: '开门' },
    { id: 2, name: '用户反馈', way: 'in', mood: '伤心，流泪，烦躁' },
    { id: 3, name: '用户健康', way: '=', mood: '疲劳' },
  ]
  const contextPerceptionList = [
    { id: 0, name: '道路环境', way: 'in', mood: '伤心，流泪，烦躁' },
    { id: 1, name: '节气变化', way: 'in', mood: '伤心，流泪，烦躁' },
    { id: 2, name: '时间变化', way: 'in', mood: '伤心，流泪，烦躁' },
    { id: 3, name: '美景路线', way: 'in', mood: '伤心，流泪，烦躁' },
  ]
  const tripPerceptionList = [
    { id: 0, name: '出发位置', way: 'in', mood: '伤心，流泪，烦躁' },
    { id: 1, name: '出行目的', way: 'in', mood: '伤心，流泪，烦躁' },
    { id: 2, name: '目的地类型', way: 'in', mood: '伤心，流泪，烦躁' },
    { id: 3, name: '出行环节', way: 'in', mood: '伤心，流泪，烦躁' },
    { id: 4, name: '车辆姿态', way: 'in', mood: '伤心，流泪，烦躁' },
    { id: 5, name: '人车时空关系', way: 'in', mood: '伤心，流泪，烦躁' },
  ]
  const userRelationshipList = [
    { id: 0, name: '出发位置', way: 'in', mood: '伤心，流泪，烦躁' },
    { id: 1, name: '出行目的', way: 'in', mood: '伤心，流泪，烦躁' },
    { id: 2, name: '目的地类型', way: 'in', mood: '伤心，流泪，烦躁' },
    { id: 3, name: '出行环节', way: 'in', mood: '伤心，流泪，烦躁' },
    { id: 4, name: '车辆姿态', way: 'in', mood: '伤心，流泪，烦躁' },
    { id: 5, name: '人车时空关系', way: 'in', mood: '伤心，流泪，烦躁' },
  ]
  const [fileList, setFileList] = useState([
    {
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const onFinish = (value) => {
    console.log(value)
  }
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('请上传图片的格式为png和jpg')
      return Upload.LIST_IGNORE
    }
    if (file.size >= 1024 * 500) {
      message.warn('上传图片不得超过500kb')
      return Upload.LIST_IGNORE
    }
  }
  const onAddScene = () => {
    setIsModalVisible(true)
  }
  return (
    <>
      <Card
        className={styles.title}
        title={
          <div>
            {' '}
            <HeartOutlined />
            查看场景详情
          </div>
        }
      >
        <Form onFinish={onFinish} initialValues={{ type: 1 }}>
          <div className="box">
            <div className="box_left">
              <Form.Item
                label="场景名称"
                name="title"
                rules={[{ required: true, message: '场景名称不能为空' }]}
              >
                <Input
                  style={{ width: 200 }}
                  placeholder="请给模型起个响亮的名字"
                ></Input>
              </Form.Item>
              <Form.Item
                label="场景描述"
                name="description"
                rules={[{ required: true, message: '场景描述不能为空' }]}
              >
                <textarea
                  className="textarea"
                  cols="60"
                  rows="2"
                  placeholder="请描述场景主要做什么服务的推荐，推荐的机制是怎样的。"
                ></textarea>
              </Form.Item>
            </div>
            <Form.Item>
              <Upload
                listType="picture-card"
                beforeUpload={beforeUpload}
                action=""
                fileList={fileList}
              >
                {fileList <= 1 && (
                  <>
                    <PlusOutlined />
                    <div>上传logo</div>
                  </>
                )}
              </Upload>
              <div>支持格式：.jpg .png</div>
              <div>图片大小：40*40px-100*100px</div>
            </Form.Item>
          </div>
          <Form.Item
            label="现实方式"
            name="type"
            rules={[{ required: true, message: '请选择现实方式' }]}
          >
            <Radio.Group>
              <Radio value={1}>纯规则方式</Radio>
              <Radio value={2}>规则·模型混合</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="场景定义" className="scene">
            <div className="scene_box">
              <div className="scene_left"> 针对画像</div>
              <div className="scene_right">
                {sceneList.map((item) => (
                  <div className="card" key={item.id}>
                    <HeartOutlined />
                    <div className="close">
                      <CloseOutlined />
                    </div>
                    <div>{item.title}</div>
                  </div>
                ))}
                <div className="add" onClick={onAddScene}>
                  +
                </div>
                <Modal
                  visible={isModalVisible}
                  onCancel={() => setIsModalVisible(false)}
                  title="推荐针对用户画像"
                >
                  <Input></Input>
                </Modal>
              </div>
            </div>
            <div className="scene_box">
              <div className="scene_left">用户感知</div>
              <div className="scene_right">
                <div className="perception">
                  {userPerceptionList.map((item) => (
                    <div className="perception_box" key={item.id}>
                      {' '}
                      <Select defaultValue="1" style={{ width: 150 }}>
                        <Option value="1">{item.name}</Option>
                      </Select>
                      <Select defaultValue="1" style={{ width: 150 }}>
                        <Option value="1">{item.way}</Option>
                      </Select>
                      <div className="input">
                        <Input value={item.mood}></Input>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="scene_box">
              <div className="scene_left">环境感知</div>
              <div className="scene_right">
                <div className="perception">
                  {contextPerceptionList.map((item) => (
                    <div className="perception_box" key={item.id}>
                      {' '}
                      <Select defaultValue="1" style={{ width: 150 }}>
                        <Option value="1">{item.name}</Option>
                      </Select>
                      <Select defaultValue="1" style={{ width: 150 }}>
                        <Option value="1">{item.way}</Option>
                      </Select>
                      <div className="input">
                        <Input value={item.mood}></Input>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="scene_box">
              <div className="scene_left">出行感知</div>
              <div className="scene_right">
                <div className="perception">
                  {tripPerceptionList.map((item) => (
                    <div className="perception_box" key={item.id}>
                      {' '}
                      <Select defaultValue="1" style={{ width: 150 }}>
                        <Option value="1">{item.name}</Option>
                      </Select>
                      <Select defaultValue="1" style={{ width: 150 }}>
                        <Option value="1">{item.way}</Option>
                      </Select>
                      <div className="input">
                        <Input value={item.mood}></Input>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="scene_box">
              <div className="scene_left">用户关系</div>
              <div className="scene_right">
                <div className="perception">
                  {userRelationshipList.map((item) => (
                    <div className="perception_box" key={item.id}>
                      {' '}
                      <Select defaultValue="1" style={{ width: 150 }}>
                        <Option value="1">{item.name}</Option>
                      </Select>
                      <Select defaultValue="1" style={{ width: 150 }}>
                        <Option value="1">{item.way}</Option>
                      </Select>
                      <div className="input">
                        <Input value={item.mood}></Input>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Form.Item>
          <div className="model_name">
            <Form.Item label="使用模型名称" style={{ flex: 1 }} name="use">
              <Select defaultValue="1" style={{ width: 250 }}>
                <Option value="1">逻辑分类算法</Option>
              </Select>
            </Form.Item>
            <Form.Item label="模型版本号">
              <Select defaultValue="1" style={{ width: 200 }} name="edition">
                <Option value="1">V1.0.1</Option>
              </Select>
            </Form.Item>
          </div>
          <Form.Item label="冲突事件库" name="event">
            <div className="footer_box">
              <div className="card">
                事件1
                <Button type="primary" shape="round">
                  事件ID
                </Button>
                <div className="close">
                  <CloseOutlined />
                </div>
              </div>
              <div className="add">+</div>
            </div>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
              <Button>取消</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </>
  )
}

export default memo(Scene)
