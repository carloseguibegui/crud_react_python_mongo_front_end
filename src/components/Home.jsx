import React from 'react';
import { Typography, Button } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const Home = () => {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <Title>Bienvenido a la Aplicación</Title>
            <Link to="/login">
                <Button type="primary" style={{ margin: '10px' }}>
                    Iniciar Sesión
                </Button>
            </Link>
            <Link to="/dashboard">
                <Button type="default" style={{ margin: '10px' }}>
                    Ir al Dashboard
                </Button>
            </Link>
        </div>
    );
};

export default Home;
