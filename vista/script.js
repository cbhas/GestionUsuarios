// Variables globales
let usuarios = [];
let idActual = 1;

// Referencias a elementos del DOM
const formCrear = document.getElementById("crearUsuario");
const formEditar = document.getElementById("editarUsuario");
const tablaUsuarios = document.querySelector("#tablaUsuarios tbody");
const campoBuscar = document.getElementById("buscar");

// Crear un usuario
formCrear.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(formCrear);
    const nuevoUsuario = {
        idUsuario: idActual++,
        nombre: formData.get("nombre"),
        correo: formData.get("correo"),
        contrasena: formData.get("contrasena"),
        rol: formData.get("rol"),
    };
    usuarios.push(nuevoUsuario);
    renderizarTabla();
    formCrear.reset();
});

// Mostrar tabla de usuarios
function renderizarTabla(lista = usuarios) {
    tablaUsuarios.innerHTML = "";
    lista.forEach((usuario) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${usuario.idUsuario}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.correo}</td>
            <td>${usuario.rol}</td>
            <td>
                <button class="btn-editar" onclick="mostrarFormularioEditar(${usuario.idUsuario})">Editar</button>
                <button class="btn-eliminar" onclick="eliminarUsuario(${usuario.idUsuario})">Eliminar</button>
            </td>
        `;
        tablaUsuarios.appendChild(fila);
    });
}

// Editar usuario
formEditar.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(formEditar);
    const idUsuario = formEditar.dataset.idUsuario;
    const usuario = usuarios.find((u) => u.idUsuario === parseInt(idUsuario));
    usuario.nombre = formData.get("nombre");
    usuario.correo = formData.get("correo");
    usuario.rol = formData.get("rol");
    renderizarTabla();
    formEditar.style.display = "none";
    formEditar.reset();
});

function mostrarFormularioEditar(id) {
    const usuario = usuarios.find((u) => u.idUsuario === id);
    formEditar.dataset.idUsuario = usuario.idUsuario;
    formEditar.nombre.value = usuario.nombre;
    formEditar.correo.value = usuario.correo;
    formEditar.rol.value = usuario.rol;
    formEditar.style.display = "block";
}

// Eliminar usuario
function eliminarUsuario(id) {
    usuarios = usuarios.filter((u) => u.idUsuario !== id);
    renderizarTabla();
}

// Buscar usuarios
campoBuscar.addEventListener("input", () => {
    const termino = campoBuscar.value.toLowerCase();
    const usuariosFiltrados = usuarios.filter((usuario) =>
        usuario.nombre.toLowerCase().includes(termino) ||
        usuario.correo.toLowerCase().includes(termino)
    );
    renderizarTabla(usuariosFiltrados);
});
