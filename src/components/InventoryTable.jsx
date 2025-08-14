import React, { useEffect } from 'react';
import {
    Table,
    Typography,
    Button,
    Space,
    Popconfirm,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, deleteItem } from '../redux/inventorySlice';


const InventoryTable = ({ onEdit }) => {
    const dispatch = useDispatch();
    const { items, loading } = useSelector((state) => state.inventory);

    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

    const handleDelete = (id) => {
        console.log('Deleting item with id:', id); // Log para depuración
        dispatch(deleteItem(id));
    };


    const COLUMNS = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            render: (_, { name }) => (
                <Typography.Paragraph
                    ellipsis={{ rows: 1 }}
                    className="text-capitalize"
                    style={{ marginBottom: 0 }}
                >
                    {name.substring(0, 20)}
                </Typography.Paragraph>
            ),
        },
        {
            title: 'Cantidad',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Descripción',
            dataIndex: 'description',
            key: 'description',
            render: (_) => <span className="text-capitalize">{_}</span>,
        },
        {
            title: 'Acciones',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => onEdit(record)}>
                        Editar
                    </Button>
                    <Popconfirm
                        title="¿Estás seguro de eliminar este elemento?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Sí"
                        cancelText="No"
                    >
                        <Button type="link" danger>
                            Eliminar
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Table
            dataSource={items}
            columns={COLUMNS}
            rowKey="id"
            loading={loading}
            pagination={{ pageSize: 5 }}
        />
    );
};

export default InventoryTable;
