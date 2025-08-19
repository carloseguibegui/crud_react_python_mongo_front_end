import React, { useState } from 'react'
import { Form, Input, Button, Typography, notification } from 'antd'
import { UserOutlined, LockOutlined, SmileOutlined, CloseOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const { Title } = Typography

const Login = () => {
    const [loading, setLoading] = useState(false)
    const [api, contextHolder] = notification.useNotification()
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleLogin = async (values) => {
        setLoading(true)
        try {
            const response = await fetch('https://crud-react-python-mongo-back-end.onrender.com/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(values),
            })

            let data
            try {
                data = await response.json()
            } catch (jsonError) {
                console.error('Error parsing JSON:', jsonError)
                throw new Error('La respuesta del servidor no es un JSON válido.')
            }

            if (response.ok) {
                login(data.token) // Usar el método login del AuthContext
                api.success({
                    message: 'Inicio de Sesión Exitoso',
                    description: data.message,
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                })
                await new Promise(resolve => setTimeout(resolve, 1000))
                navigate('/dashboard')
            } else {
                api.error({
                    message: 'Error al Iniciar Sesión',
                    description: data.detail || 'Error al iniciar sesión.',
                    icon: <CloseOutlined style={{ color: '#ff4d4f' }} />,
                })
            }
        } catch (error) {
            console.error('Error logging in:', error)
            api.error({
                message: 'Error de Conexión',
                description: 'Error de conexión con el servidor.',
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ width: '100%', maxWidth: '400px', padding: '24px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
                {contextHolder}
                <Title level={2} style={{ textAlign: 'center' }}>Inicio de Sesión</Title>
                <Form layout="vertical" onFinish={(values) => handleLogin(values)}>
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
                            Iniciar Sesión
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Link to="/register">Registrarse</Link>
                    </Form.Item>
                </Form>

            </div>
        </div>
    )
}

export default Login
