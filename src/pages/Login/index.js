import React, { useState } from 'react'
import { Button, Card, Form, Input, Checkbox, message } from 'antd'
import styles from './index.module.scss'
import logo from '../../assets/logo.png'
import { useDispatch } from 'react-redux'
import { loginToken } from '../../store/actions/login'
import { useHistory } from 'react-router-dom'

export default function Login() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const onFinish = async ({ mobile, code }) => {
    setLoading(true)
    try {
      await dispatch(loginToken(mobile, code))

      message.success('登录成功', 1, () => {
        history.push('/home')
      })
    } catch (error) {
      if (!error.response) {
        message.warning('网络繁忙,请稍后再试', 1)
      } else {
        message.warning(error.response.data.message, 1)
        setLoading(false)
      }
    }
    // console.log(values)
  }
  return (
    <div className={styles.root}>
      <Card className="login">
        <img src={logo} className="img" />
        <Form
          onFinish={onFinish}
          validateTrigger={['onChange', 'onBlur']}
          initialValues={{
            mobile: '13911111111',
            code: '246810',
            agree: 'true',
          }}
        >
          <Form.Item
            name="mobile"
            // label="mobile"
            rules={[
              {
                required: true,
                message: '手机号不能为空',
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '手机号格式错误',
              },
            ]}
          >
            <Input placeholder="请输入手机号"></Input>
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: '验证码不能为空',
              },
              {
                pattern: /^\d{6}$/,
                message: '验证码格式错误',
              },
            ]}
          >
            <Input placeholder="请输入验证码"></Input>
          </Form.Item>
          <Form.Item
            valuePropName="checked"
            name="agree"
            rules={[
              {
                // 自定义校验规则
                validator(rule, value) {
                  if (value) {
                    // 自定义校验规则 通过这边可以发请求 去看用户名是否重复  重复了就走reject
                    return Promise.resolve()
                  } else {
                    return Promise.reject(new Error('请阅读并同意用户协议'))
                  }
                },
              },
            ]}
          >
            <Checkbox>我已同意用户协议</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: 350 }}
              loading={loading}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
