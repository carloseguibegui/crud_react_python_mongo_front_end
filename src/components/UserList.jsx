import React, { useEffect, useState } from 'react';
import { List, Typography, message, Spin, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://crud-react-python-mongo-back-end.onrender.com/api/v1/users')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al obtener la lista de usuarios.');
                }
                return response.json();
            })
            .then((data) => setUsers(data.users))
            .catch((error) => {
                console.error('Error fetching users:', error);
                message.error('Error de conexión con el servidor.');
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
            <Menu mode="horizontal" style={{ marginBottom: '20px' }}>
                <Menu.Item key="login">
                    <Link to="/login">Iniciar Sesión</Link>
                </Menu.Item>
                <Menu.Item key="register">
                    <Link to="/register">Registrarse</Link>
                </Menu.Item>
            </Menu>
            <Title level={2} style={{ textAlign: 'center' }}>Lista de Usuarios</Title>
            {loading ? (
                <Spin tip="Cargando..." style={{ display: 'block', margin: '20px auto' }} />
            ) : (
                <List
                    bordered
                    dataSource={users}
                    renderItem={(user) => <List.Item>{user.username}</List.Item>}
                />
            )}
        </div>
    );
};

export default UserList;
