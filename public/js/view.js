class ClienteView {
    constructor() {
        this.tableBody = document.getElementById('clientesTableBody');
        this.form = document.getElementById('clienteForm');
    }

    mostrarClientes(clientes) {
        this.tableBody.innerHTML = '';
        clientes.forEach(cliente => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${cliente.nombres}</td>
                <td>${cliente.cedula}</td>
                <td>${cliente.usuario}</td>
                <td>${cliente.correo}</td>
                <td>
                    <button class="action-btn edit-btn" onclick="controller.editarCliente(${cliente.id})">Editar</button>
                    <button class="action-btn delete-btn" onclick="controller.eliminarCliente(${cliente.id})">Eliminar</button>
                </td>
            `;
            this.tableBody.appendChild(row);
        });
    }

    obtenerDatosFormulario() {
        return {
            id: document.getElementById('clienteId').value || null,
            nombres: document.getElementById('nombres').value,
            cedula: document.getElementById('cedula').value,
            usuario: document.getElementById('usuario').value,
            correo: document.getElementById('correo').value,
            password: document.getElementById('password').value
        };
    }

    limpiarFormulario() {
        this.form.reset();
        document.getElementById('clienteId').value = '';
        document.getElementById('submitBtn').textContent = 'Guardar Cliente';
    }

    setFormulario(cliente) {
        document.getElementById('clienteId').value = cliente.id;
        document.getElementById('nombres').value = cliente.nombres;
        document.getElementById('cedula').value = cliente.cedula;
        document.getElementById('usuario').value = cliente.usuario;
        document.getElementById('correo').value = cliente.correo;
        document.getElementById('password').value = '';
        document.getElementById('submitBtn').textContent = 'Actualizar Cliente';
    }
}