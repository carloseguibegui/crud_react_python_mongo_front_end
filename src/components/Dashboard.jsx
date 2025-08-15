import {
    PieChartOutlined,
} from '@ant-design/icons';
import {
    Breadcrumb,
    Layout,
    theme,
    Typography,
    Button,
} from 'antd';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import InventoryTable from './InventoryTable';
import InventoryForm from './InventoryForm';
import { addItem, updateItem, fetchItems } from '../redux/inventorySlice';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('Dashboard', '1', <PieChartOutlined />),
    // getItem('Option 2', '2', <DesktopOutlined />),
    // getItem('User', 'sub1', <UserOutlined />, [
    //     getItem('Tom', '3'),
    //     getItem('Bill', '4'),
    //     getItem('Alex', '5'),
    // ]),
    // getItem('Team', 'sub2', <TeamOutlined />, [
    //     getItem('Team 1', '6'),
    //     getItem('Team 2', '8'),
    // ]),
    // getItem('Files', '9', <FileOutlined />),
];

const Dashboard = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [collapsed, setCollapsed] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [isFormVisible, setFormVisible] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login'); // Redirigir al login si no está autenticado
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        dispatch(fetchItems()); // Usar acción de Redux para obtener los datos
    }, [dispatch]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleAdd = () => {
        setEditingItem(null);
        setFormVisible(true);
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormVisible(true);
    };

    const handleSubmit = (item) => {
        if (editingItem) {
            dispatch(updateItem({ ...editingItem, ...item }));
        } else {
            dispatch(addItem(item));
        }
        setFormVisible(false);
    };

    const handleCancel = () => {
        setFormVisible(false);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                // collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <div style={{ padding: '16px', textAlign: 'center' }}>
                    <Button type="primary" danger onClick={handleLogout}>
                        Cerrar Sesión
                    </Button>
                </div>
            </Sider>
            <Layout>
                <Content style={{ margin: '20px 16px' }}>
                    <Breadcrumb
                        style={{ margin: '16px 0' }}
                        items={[{ title: 'Dashboard' }]}
                    />

                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Typography style={{ marginBottom: '20px' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Button
                                    type="primary"
                                    onClick={handleAdd}
                                    style={{ marginBottom: '20px' }}
                                >
                                    Agregar Elemento
                                </Button>

                            </div>
                        </Typography>

                        <InventoryTable onEdit={handleEdit} />
                        {isFormVisible && (
                            <InventoryForm
                                initialValues={editingItem}
                                onSubmit={handleSubmit}
                                onCancel={handleCancel}
                            />
                        )}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Made with ❤️ by <a href="https://github.com/carloseguibegui/" target="_blank" rel="noopener noreferrer"> Carlos Eguibegui
                    </a>
                </Footer>
            </Layout>
        </Layout>
    );
};

export default Dashboard;
