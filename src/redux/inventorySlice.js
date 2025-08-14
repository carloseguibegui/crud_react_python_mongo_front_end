import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
// Async actions
export const fetchItems = createAsyncThunk('inventory/fetchItems', async () => {
    const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
    const response = await fetch('https://crud-react-python-mongo-back-end.onrender.com/api/v1/inventory', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (response.status === 401) {
        localStorage.removeItem('token'); // Eliminar el token si la sesión ha expirado
        window.location.href = '/login'; // Redirigir al usuario a la página de inicio de sesión
        return isRejectedWithValue('Unauthorized access, please log in again. Token expired / Token expirado');
    }
    const data = await response.json();
    return data;
});

export const addItem = createAsyncThunk('inventory/addItem', async (item) => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token); // Decodificar el token
    const userId = decodedToken.sub; // Obtener el user_id del token

    const response = await fetch('https://crud-react-python-mongo-back-end.onrender.com/api/v1/inventory', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...item, user_id: userId }), // Agregar user_id al cuerpo
    });

    return response.json();
});

export const updateItem = createAsyncThunk('inventory/updateItem', async (item) => {
    console.log('Updating item:', item);
    const response = await fetch(`https://crud-react-python-mongo-back-end.onrender.com/api/v1/inventory/${item.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    });
    return response.json();
});

export const deleteItem = createAsyncThunk('inventory/deleteItem', async (id) => {
    await fetch(`https://crud-react-python-mongo-back-end.onrender.com/api/v1/inventory/${id}`, {
        method: 'DELETE',
    });
    return id;
});

// Slice
const inventorySlice = createSlice({
    name: 'inventory',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addItem.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateItem.fulfilled, (state, action) => {
                const index = state.items.findIndex((item) => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.id !== action.payload);
            });
    },
});

export default inventorySlice.reducer;
