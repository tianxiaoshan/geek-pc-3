import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  Card,
  Breadcrumb,
  Form,
  Radio,
  Select,
  Button,
  DatePicker,
  Table,
  Tag,
  Space,
} from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import { useDispatch } from 'react-redux'
import { getArticle } from '../../store/actions/article'
import defaultImg from '../../assets/error.png'

const { Option } = Select
const { RangePicker } = DatePicker

const statusList = [
  { id: -1, name: '全部', color: 'red' },
  { id: 0, name: '草稿', color: 'volcano' },
  { id: 1, name: '待审核', color: 'orange' },
  { id: 2, name: '审核通过', color: 'gold' },
  { id: 3, name: '审核失败', color: 'lime' },
]

export default function Article() {
  const history = useHistory()
  const dispatch = useDispatch()
  const allChannels = useSelector((state) => state.channels)
  const allArticle = useSelector((state) => state.article)
  const { page, per_page, total_count, results } = allArticle
  const [pages, setPages] = useState({
    page: 1,
    per_page: 10,
  })
  const [defaultValue, setDefaultValue] = useState({})
  useEffect(() => {
    dispatch(getArticle())
  }, [dispatch])

  const onFinish = async ({ channel_id, status, date }) => {
    // console.log({ channel_id, status, date })
    if (status !== -1) {
      defaultValue.status = status

      dispatch(getArticle(defaultValue))
    } else {
      delete defaultValue.status
    }
    if (channel_id !== undefined) {
      defaultValue.channel_id = channel_id
      dispatch(getArticle(defaultValue))
    } else {
      delete defaultValue.status
    }
    if (date) {
      defaultValue.begin_pubdate = date[0]
        .startOf('day')
        .format('YYYY-MM-DD HH-MM-SS')
      defaultValue.end_pubdate = date[0]
        .startOf('day')
        .format('YYYY-MM-DD HH-MM-SS')

      dispatch(getArticle(defaultValue))
    } else {
      delete defaultValue.status
    }

    pages.page = 1
  }

  const onChange = (page, per_page) => {
    setPages({ page, per_page })
    dispatch(getArticle(pages))
  }
  const editClick = (id) => {
    history.push(`/home/publish/${id}`)

    // console.log(id)
  }
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      render: (cover) => {
        if (cover.type === 0) {
          return <img src={defaultImg} alt="" style={{ width: 150 }} />
        }
        return <img src={cover.images[0]} alt="" style={{ width: 150 }} />
      },
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status) => {
        const obj = statusList.find((item) => item.id === status)
        return <Tag color={obj.color}>{obj.name}</Tag>
      },
    },
    {
      title: '时间',

      dataIndex: 'pubdate',
    },
    {
      title: '阅读数',
      dataIndex: 'read_count',
    },
    {
      title: '点赞数',
      dataIndex: 'like_count',
    },
    {
      title: '关注数',
      dataIndex: 'comment_count',
    },
    {
      title: '其他',
      dataIndex: 'id',
      render: (id) => {
        // console.log(id)
        return (
          <Space>
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => editClick(id)}
            ></Button>
            <Button
              shape="circle"
              danger
              type="primary"
              icon={<DeleteOutlined />}
            ></Button>
          </Space>
        )
      },
    },
  ]

  return (
    <div>
      <Card
        title={
          <Breadcrumb>
            <Breadcrumb.Item>
              {' '}
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/home/article">内容管理</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          onFinish={onFinish}
          initialValues={{ status: -1 }}
          validateTrigger={['onChange', 'onBlur']}
        >
          <Form.Item label="状态" name="status">
            <Radio.Group>
              {statusList.map((item) => (
                <Radio key={item.id} value={item.id}>
                  {item.name}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
          <Form.Item label="频道" name="channel_id">
            <Select style={{ width: 200 }} placeholder="请选择频道">
              {allChannels.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="日期" name="date">
            <RangePicker locale={locale} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`根据筛选条件共查询到${total_count}条结果:`}>
        <Table
          columns={columns}
          dataSource={results}
          rowKey="id"
          pagination={{
            position: ['bottomCenter'],
            current: page,
            pageSize: per_page,
            total: total_count,
            onChange: onChange,
          }}
        />
      </Card>
    </div>
  )
}
