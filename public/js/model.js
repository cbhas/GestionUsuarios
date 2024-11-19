class ClienteModel {
    async obtenerClientes() {
        const response = await fetch('/api/clientes');
        return await response.json();
    }

    async buscarPorCedula(cedula) {
        const response = await fetch(`/api/clientes/${cedula}`);
        if (response.ok) {
            return await response.json();
        }
        return null;
    }

    async guardarCliente(cliente) {
        const url = cliente.id ? `/api/clientes/${cliente.id}` : '/api/clientes';
        const method = cliente.id ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        });
        
        return await response.json();
    }

    async eliminarCliente(id) {
        await fetch(`/api/clientes/${id}`, {
            method: 'DELETE'
        });
    }
}