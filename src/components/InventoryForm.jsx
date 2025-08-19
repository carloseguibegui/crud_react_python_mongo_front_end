import React from 'react'
import { Form, Input, InputNumber, Button } from 'antd'

const InventoryForm = ({ initialValues, onSubmit, onCancel }) => {
    const [form] = Form.useForm()

    const handleFinish = (values) => {
        onSubmit(values)
        form.resetFields()
    }

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={initialValues}
            onFinish={handleFinish}
        >
            <Form.Item
                name="name"
                label="Nombre"
                rules={[{ required: true, message: 'Por favor ingrese el nombre del elemento.' }]}
            >
                <Input placeholder="Nombre del elemento" />
            </Form.Item>
            <Form.Item
                name="quantity"
                label="Cantidad"
                rules={[{ required: true, message: 'Por favor ingrese la cantidad.' }]}
            >
                <InputNumber min={1} placeholder="Cantidad" style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
                name="description"
                label="Descripción"
                rules={[{ required: true, message: 'Por favor ingrese una descripción.' }]}
            >
                <Input.TextArea placeholder="Descripción del elemento" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Guardar
                </Button>
                <Button style={{ marginLeft: '10px' }} onClick={onCancel}>
                    Cancelar
                </Button>
            </Form.Item>
        </Form>
    )
}

export default InventoryForm
