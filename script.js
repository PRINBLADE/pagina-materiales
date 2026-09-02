function iniciarSesion() {

    // Obtener lo que escribió el usuario
    const usuario = document.getElementById("usuario").value;
    const contrasena = document.getElementById("contrasena").value;

    // Lista temporal de profesores
    const profesores = {
        "1": {
            nombre: "Javier",
            contraseña: "1"
        },

        "2": {
            nombre: "Alice",
            contraseña: "2"
        },

        "3": {
            nombre: "Marta",
            contraseña: "3"
        }
    };

    // Verificar si existe el profesor
    if (profesores[usuario] && profesores[usuario].contraseña === contrasena) {

        // Mostrar el nombre del profesor
        document.getElementById("nombre-profesor").innerHTML =
            profesores[usuario].nombre;

        // Ocultar pantalla de login
        document.getElementById("pantalla-login").style.display = "none";

        // Mostrar sistema principal
        document.getElementById("pantalla-principal").style.display = "block";

    } else {

        document.getElementById("mensaje").innerHTML =
            "❌ Usuario o contraseña incorrectos.";

    }

}


function cerrarSesion() {

    // Ocultar sistema principal
    document.getElementById("pantalla-principal").style.display = "none";

    // Mostrar nuevamente el login
    document.getElementById("pantalla-login").style.display = "block";

    // Limpiar los campos
    document.getElementById("usuario").value = "";
    document.getElementById("contrasena").value = "";

    // Limpiar mensaje
    document.getElementById("mensaje").innerHTML = "";

}
