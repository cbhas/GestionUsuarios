class ClienteController {
    constructor() {
        this.model = new ClienteModel();
        this.view = new ClienteView();
        this.cargarClientes();
    }

    async cargarClientes() {
        const clientes = await this.model.obtenerClientes();
        this.view.mostrarClientes(clientes);
    }

    async buscarPorCedula() {
        const cedula = document.getElementById('searchCedula').value;
        if (cedula) {
            const cliente = await this.model.buscarPorCedula(cedula);
            if (cliente) {
                this.view.mostrarClientes([cliente]);
            } else {
                alert('Cliente no encontrado');
                this.cargarClientes();
            }
        } else {
            this.cargarClientes();
        }
    }

    async guardarCliente(event) {
        event.preventDefault();
        const cliente = this.view.obtenerDatosFormulario();
        
        try {
            await this.model.guardarCliente(cliente);
            this.view.limpiarFormulario();
            this.cargarClientes();
            alert(cliente.id ? 'Cliente actualizado con éxito' : 'Cliente creado con éxito');
        } catch (error) {
            alert('Error al guardar el cliente');
        }
    }

    async editarCliente(id) {
        const clientes = await this.model.obtenerClientes();
        const cliente = clientes.find(c => c.id === id);
        if (cliente) {
            this.view.setFormulario(cliente);
        }
    }

    async eliminarCliente(id) {
        if (confirm('¿Está seguro de eliminar este cliente?')) {
            try {
                await this.model.eliminarCliente(id);
                this.cargarClientes();
                alert('Cliente eliminado con éxito');
            } catch (error) {
                alert('Error al eliminar el cliente');
            }
        }
    }

    limpiarFormulario() {
        this.view.limpiarFormulario();
    }
}

const controller = new ClienteController();