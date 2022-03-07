import React, { useState, useRef, useEffect } from 'react'
import {
  Card,
  Breadcrumb,
  Input,
  Form,
  Select,
  Button,
  Space,
  Radio,
  Upload,
  Modal,
  message,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'

import { Link, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './index.module.scss'
import { uploadArticle } from '../../store/actions/article'
import { editArticle } from '../../store/actions/edit'
const { Option } = Select
export default function Publish({ match }) {
  console.log(match.params.id, '2323')
  const history = useHistory()
  const dispatch = useDispatch()
  const allChannels = useSelector((state) => state.channels)

  const editArt = useSelector((state) => state.edit)

  console.log(editArt, 'editArt')
  // console.log(allChannels)
  const [type, setType] = useState(0)
  const [fileList, setFileList] = useState([])
  const [previewVisible, setPreviewVisible] = useState(false)
  const [imgUrl, setImgUrl] = useState('')
  const formRef = useRef(null)
  const onFileChange = ({ fileList }) => {
    setFileList(fileList)
  }
  const onTypeChange = (e) => {
    setType(e.target.value)
    setFileList([])
  }
  const saveDraft = async (values, draft) => {
    if (fileList.length !== type) {
      return message.warn('请上传正确的图片数量')
    }
    history.push('/home/article')
    message.success('发布成功')

    const img =
      fileList &&
      fileList.map((item) => {
        return item.url
      })
    await dispatch(
      uploadArticle(
        {
          ...values,
          cover: {
            type: type,
            images: img,
          },
        },
        draft
      )
    )
  }
  const handlePreview = (file) => {
    console.log(file, 'file')
    const images = file.url || file.response.data.url
    setPreviewVisible(true)
    setImgUrl(images)
  }
  const onFinish = (values) => {
    saveDraft(values, false)
  }
  const beforeUpload = (file) => {
    // console.log(e)
    if (file.size >= 1024 * 500) {
      message.warn('上传文件不能超过500K，请重新上传')
      return Upload.LIST_IGNORE
    }
    // if (!['images/png', 'images/jpeg'].includes(file.type)) {
    //   message.warn('请上传文件格式为png/jpg')
    //   return Upload.LIST_IGNORE
    // }
    return true
  }
  const draftClick = async () => {
    const values = await formRef.current.validateFields()
    saveDraft(values, true)
  }

  const saveEdit = async (id) => {
    await dispatch(editArticle(id))
  }

  useEffect(() => {
    console.log(1)
    if (match.params.id) {
      saveEdit(match.params.id)

      const imgType = editArt.cover.type
      setType(imgType)
      const content = {
        ...editArt,
        type: imgType,
      }
      console.log(2)
      formRef.current.setFieldsValue(content)
      console.log(3)
      const {
        cover: { images },
      } = editArt
      const img = images.map((item) => {
        return { url: item }
      })
      // console.log(img)
      setFileList(img)
    }
  }, [dispatch, match.params.id])

  console.log(fileList, 'fileList')
  return (
    <Card
      title={
        <Breadcrumb>
          <Breadcrumb.Item>
            {' '}
            <Link to="/home">首页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/home/publish">发布文章</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      }
    >
      <Form
        ref={formRef}
        labelCol={{ span: 4 }}
        onFinish={onFinish}
        initialValues={{ content: '', type: type }}
        validateTrigger={['onChange', 'onBlur']}
      >
        <Form.Item
          label="标题"
          name="title"
          rules={[
            {
              required: true,
              message: '标题不能为空',
            },
          ]}
        >
          <Input placeholder="请输入文章标题" style={{ width: 200 }}></Input>
        </Form.Item>
        <Form.Item
          label="频道"
          name="channel_id"
          rules={[
            {
              required: true,
              message: '频道不能为空',
            },
          ]}
        >
          <Select style={{ width: 200 }} placeholder="请选择频道">
            {allChannels.map((item) => (
              <Option value={item.id} key={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="封面" name="type">
          <Radio.Group onChange={onTypeChange}>
            <Radio value={1}>单图</Radio>
            <Radio value={3}>三图</Radio>
            <Radio value={0}>无图</Radio>
          </Radio.Group>
        </Form.Item>
        {type !== 0 && (
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Upload
              onChange={onFileChange}
              fileList={fileList}
              listType="picture-card"
              action="http://toutiao.itheima.net/v1_0/upload"
              name="image"
              onPreview={handlePreview}
              beforeUpload={beforeUpload}
            >
              {fileList.length < type && <PlusOutlined />}
            </Upload>
            <Modal
              visible={previewVisible}
              title={'图片预览'}
              footer={null}
              onCancel={() => setPreviewVisible(false)}
            >
              <img src={imgUrl} alt="" style={{ width: 100, height: 100 }} />
            </Modal>
          </Form.Item>
        )}

        <Form.Item
          label="内容"
          name="content"
          rules={[
            {
              required: true,
              message: '内容不能为空',
            },
          ]}
        >
          <ReactQuill theme="snow"></ReactQuill>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              发布
            </Button>
            <Button onClick={draftClick}>草稿</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  )
}
