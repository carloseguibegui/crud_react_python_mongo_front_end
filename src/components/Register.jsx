import React, { useState } from 'react'
import { Form, Input, Button, Typography, message, notification } from 'antd'
import { UserOutlined, LockOutlined, SmileOutlined, CloseOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const { Title } = Typography

const Register = () => {
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const [api, contextHolder] = notification.useNotification()
    const navigate = useNavigate()

    const handleRegister = async (values) => {
        setLoading(true)
        try {
            const response = await fetch('https://crud-react-python-mongo-back-end.onrender.com/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(values),
            })
            const data = await response.json()
            if (response.ok) {
                message.success(data.message)
                login(data.token) // Usar el método login del AuthContext
                api.success({
                    message: 'Registro Exitoso',
                    description: data.message,
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                })
                await new Promise(resolve => setTimeout(resolve, 1000))
                navigate('/dashboard')
            } else {
                api.error({
                    message: 'Error al registrar usuario',
                    description: data.detail || 'Error al registrar usuario.',
                    icon: <CloseOutlined style={{ color: '#ff4d4f' }} />,
                })
                message.error(data.detail || 'Error al registrar usuario.')
            }
        } catch (error) {
            console.error('Error registering user:', error)
            message.error('Error de conexión con el servidor.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ width: '100%', maxWidth: '400px', padding: '24px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
                <Title level={2} style={{ textAlign: 'center' }}>Registro</Title>
                <Form
                    name="register"
                    initialValues={{ remember: true }}
                    onFinish={handleRegister}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Por favor ingrese su nombre de usuario.' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Nombre de usuario" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Por favor ingrese su contraseña.' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={loading}>
                            Registrar
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        <Link to="/">Iniciar sesión</Link>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Register
