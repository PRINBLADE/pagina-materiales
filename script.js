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
        // Mostrar catálogo de materiales
        mostrarCatalogo();

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
// ==============================
// BASE DE DATOS TEMPORAL
// ==============================

const materiales = [

    {
        id: "MAT001",
        nombre: "ESP32",
        categoria: "Microcontroladores",
        unidad: "Unidad",
        imagen: "imagenes/esp32.jpg",

        descripcion: "Microcontrolador con conectividad WiFi y Bluetooth para desarrollar proyectos electrónicos y de automatización.",

        uso: "Robótica, automatización, Internet de las cosas y proyectos con comunicación inalámbrica."
    },

    {
        id: "MAT002",
        nombre: "Servomotor SG90",
        categoria: "Actuadores",
        unidad: "Unidad",
        imagen: "imagenes/sg90.jpg",

        descripcion: "Pequeño servomotor que permite controlar la posición angular de su eje.",

        uso: "Brazos robóticos, mecanismos móviles y proyectos de automatización."
    },

    {
        id: "MAT003",
        nombre: "Protoboard",
        categoria: "Prototipado",
        unidad: "Unidad",
        imagen: "imagenes/protoboard.jpg",

        descripcion: "Placa utilizada para construir y probar circuitos electrónicos sin necesidad de soldadura.",

        uso: "Pruebas de circuitos, prototipos electrónicos y prácticas de robótica."
    },

    {
        id: "MAT004",
        nombre: "LED",
        categoria: "Electrónica",
        unidad: "Unidad",
        imagen: "imagenes/led.jpg",

        descripcion: "Diodo emisor de luz utilizado para iluminación y señalización en circuitos electrónicos.",

        uso: "Indicadores luminosos, señales y proyectos electrónicos interactivos."
    },

    {
        id: "MAT005",
        nombre: "Sensor TCTR5000",
        categoria: "Sensores",
        unidad: "Unidad",
        imagen: "imagenes/TCRT5000.jpg",

        descripcion: "Sensor infrarrojo utilizado para detectar diferencias de reflexión sobre una superficie.",

        uso: "Robots seguidores de línea y sistemas básicos de detección infrarroja."
    }
    ];
// ==============================
// CARRITO DE COMPRAS
// ==============================

let carrito = [];
let cantidades = {};

function mostrarCatalogo() {

    const catalogo = document.getElementById("catalogo");

    // Limpiar el contenido anterior
    catalogo.innerHTML = "";

    // Recorrer todos los materiales
    materiales.forEach(function(material) {

        catalogo.innerHTML += `

            <div class="tarjeta-material">

                <img 
                    src="${material.imagen}" 
                    alt="${material.nombre}"
                >

                <h3>${material.nombre}</h3>

                <p>
                    <strong>Categoría:</strong>
                    ${material.categoria}
                </p>

                <p>
                    <strong>Unidad:</strong>
                    ${material.unidad}
                </p>

                <p>
                    <strong>Descripción:</strong><br>
                    ${material.descripcion}
                </p>

                <p>
                    <strong>Uso general:</strong><br>
                    ${material.uso}
                </p>

               <div class="selector-cantidad">

    <button onclick="cambiarCantidad('${material.id}', -1)">
        −
    </button>

    <span id="cantidad-${material.id}">
        1
    </span>

    <button onclick="cambiarCantidad('${material.id}', 1)">
        +
    </button>

</div>

<button onclick="agregarAlCarrito('${material.id}')">
    🛒 Agregar al carrito
</button>

            </div>

        `;

    });

}
function cambiarCantidad(id, cambio) {

    // Si todavía no existe una cantidad, comienza en 1
    if (!cantidades[id]) {
        cantidades[id] = 1;
    }

    // Cambiar la cantidad
    cantidades[id] += cambio;

    // No permitir cantidades menores de 1
    if (cantidades[id] < 1) {
        cantidades[id] = 1;
    }

    // Mostrar la nueva cantidad
    document.getElementById("cantidad-" + id).innerText =
        cantidades[id];

}
function agregarAlCarrito(id) {

    // Buscar el material seleccionado
    const materialSeleccionado = materiales.find(function(material) {
        return material.id === id;
    });

    // Obtener la cantidad seleccionada
    const cantidadSeleccionada = cantidades[id] || 1;

    // Revisar si el material ya está en el carrito
    const materialEnCarrito = carrito.find(function(item) {
        return item.id === id;
    });

    if (materialEnCarrito) {

        // Si ya existe, actualizar la cantidad
        materialEnCarrito.cantidad += cantidadSeleccionada;

    } else {

        // Si no existe, agregarlo al carrito
        carrito.push({
            ...materialSeleccionado,
            cantidad: cantidadSeleccionada
        });

    }

    // Reiniciar el selector del producto a 1
    cantidades[id] = 1;

    document.getElementById("cantidad-" + id).innerText = 1;
    
    actualizarContadorCarrito();

    // Por ahora mostramos una confirmación
    alert(
        materialSeleccionado.nombre +   
        " agregado al carrito.\nCantidad: " +
        cantidadSeleccionada
    );

    // Mostrar el contenido del carrito en la consola
    console.log(carrito);
    actualizarContadorCarrito();

}
function actualizarContadorCarrito() {

    const contador = document.getElementById("contador-carrito");

    console.log("Carrito actual:", carrito);
    console.log("Cantidad de tipos:", carrito.length);
    console.log("Elemento contador:", contador);

    contador.textContent = carrito.length;

}
function verCarrito() {

    // Ocultar pantalla principal
    document.getElementById("pantalla-principal").style.display = "none";

    // Mostrar pantalla del carrito
    document.getElementById("pantalla-carrito").style.display = "block";

    // Espacio donde aparecerán los materiales
    const contenido = document.getElementById("contenido-carrito");

    // Limpiar contenido anterior
    contenido.innerHTML = "";

    // Revisar si el carrito está vacío
    if (carrito.length === 0) {

        contenido.innerHTML = `
            <p>🛒 Tu carrito está vacío.</p>
        `;

        return;
    }

    // Mostrar cada material
    carrito.forEach(function(material) {

        contenido.innerHTML += `

            <div class="tarjeta-carrito">

                <img 
                    src="${material.imagen}" 
                    alt="${material.nombre}"
                >

                <div class="informacion-carrito">

                    <h3>${material.nombre}</h3>

                    <p>
                        <strong>Categoría:</strong>
                        ${material.categoria}
                    </p>

                    <p>
                        <strong>Cantidad solicitada:</strong>
                        ${material.cantidad} ${material.unidad}
                    </p>

                </div>

            </div>

        `;

    });

}

function volverCatalogo() {

    // Ocultar carrito
    document.getElementById("pantalla-carrito").style.display = "none";

    // Mostrar catálogo
    document.getElementById("pantalla-principal").style.display = "block";

}
