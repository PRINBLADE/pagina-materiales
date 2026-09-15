// ==============================
// CONEXIÓN CON SUPABASE
// ==============================

const SUPABASE_URL = "https://rczrrxpgelhkhuvuexgz.supabase.co";

const SUPABASE_KEY = "sb_publishable_J18eh2-Gz135sEe-sjrtGQ_wxoFFvy5";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
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
profesorActualId = usuario;
profesorActualNombre = profesores[usuario].nombre;
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

let profesorActualId = "";
let profesorActualNombre = "";

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

                   <p><strong>Cantidad solicitada:</strong></p>

<div class="selector-cantidad-carrito">

    <button onclick="cambiarCantidadCarrito('${material.id}', -1)">
        −
    </button>

    <span>
        ${material.cantidad}
    </span>

    <button onclick="cambiarCantidadCarrito('${material.id}', 1)">
        +
    </button>

</div>

<p>${material.unidad}</p>

<button 
    class="boton-eliminar"
    onclick="eliminarDelCarrito('${material.id}')"
>
    🗑️ Eliminar material
</button>

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
function cambiarCantidadCarrito(id, cambio) {

    const material = carrito.find(function(item) {
        return item.id === id;
    });

    if (!material) return;

    material.cantidad += cambio;

    // No permitir cantidades menores de 1
    if (material.cantidad < 1) {
        material.cantidad = 1;
    }

    // Volver a mostrar el carrito actualizado
    verCarrito();

}
function eliminarDelCarrito(id) {

    carrito = carrito.filter(function(item) {
        return item.id !== id;
    });

    // Actualizar contador
    actualizarContadorCarrito();

    // Volver a mostrar el carrito
    verCarrito();

}
async function confirmarSolicitud(event) {

    event.preventDefault();

    if (carrito.length === 0) {
        alert("🛒 El carrito está vacío.");
        return;
    }

    const solicitudes = carrito.map(function(material) {

        return {
            profesor_id: profesorActualId,
            profesor_nombre: profesorActualNombre,
            material_id: material.id,
            material_nombre: material.nombre,
            categoria: material.categoria,
            cantidad: material.cantidad
        };

    });

    console.log("Solicitudes a enviar:", solicitudes);

    const { data, error } = await supabaseClient
        .from("solicitudes")
        .insert(solicitudes);

    if (error) {

        console.error("Error al guardar:", error);

        alert("❌ No se pudo guardar la solicitud.");

        return;
    }

    alert("✅ Solicitud enviada correctamente.");

    carrito = [];

    actualizarContadorCarrito();

    verCarrito();

}
console.log("Supabase conectado:", supabaseClient);
async function verConsolidado() {

    // Ocultar carrito
    document.getElementById("pantalla-carrito").style.display = "none";

    // Mostrar consolidado
    document.getElementById("pantalla-consolidado").style.display = "block";

    const contenido = document.getElementById("contenido-consolidado");

    contenido.innerHTML = "<p>Cargando solicitudes...</p>";

    // Obtener solicitudes de Supabase
    const { data, error } = await supabaseClient
        .from("solicitudes")
        .select("*");

    if (error) {

        console.error("Error al consultar solicitudes:", error);

        contenido.innerHTML =
            "<p>❌ No se pudieron cargar las solicitudes.</p>";

        return;
    }

    console.log("Solicitudes recibidas:", data);

    // Verificar si existen solicitudes
    if (data.length === 0) {

        contenido.innerHTML =
            "<p>📋 No hay solicitudes registradas.</p>";

        return;
    }

    // ==============================
    // CONSOLIDAR POR MATERIAL
    // ==============================

    const consolidado = {};

    data.forEach(function(solicitud) {

        const idMaterial = solicitud.material_id;

        if (!consolidado[idMaterial]) {

           if (!consolidado[idMaterial]) {

    consolidado[idMaterial] = {
        id: solicitud.material_id,
        nombre: solicitud.material_nombre,
        categoria: solicitud.categoria,
        cantidad: 0,
        docentes: []
    };

}

        }

        consolidado[idMaterial].cantidad += solicitud.cantidad;
        consolidado[idMaterial].docentes.push({
    nombre: solicitud.profesor_nombre,
    cantidad: solicitud.cantidad
});
    });
// ==============================
// MOSTRAR CONSOLIDADO
// ==============================

contenido.innerHTML = "";

Object.values(consolidado).forEach(function(material) {

    // Buscar la información completa en el catálogo
    const informacionMaterial = materiales.find(function(item) {
        return item.id === material.id;
    });

    if (!informacionMaterial) {
        return;
    }

    // Crear el detalle de docentes
    let detalleDocentes = "";

    material.docentes.forEach(function(docente) {

        detalleDocentes += `
            <p>
                👤 ${docente.nombre}
                → ${docente.cantidad} ${informacionMaterial.unidad}
            </p>
        `;

    });

    contenido.innerHTML += `

        <div class="tarjeta-consolidado">

            <img
                src="${informacionMaterial.imagen}"
                alt="${informacionMaterial.nombre}"
            >

            <div class="informacion-consolidado">

                <h3>${informacionMaterial.nombre}</h3>

                <p>
                    <strong>Categoría:</strong>
                    ${informacionMaterial.categoria}
                </p>

                <p>
                    <strong>Descripción:</strong>
                    ${informacionMaterial.descripcion}
                </p>

                <p>
                    <strong>Uso general:</strong>
                    ${informacionMaterial.uso}
                </p>

                <p>
                    <strong>Unidad:</strong>
                    ${informacionMaterial.unidad}
                </p>

                <p>
                    <strong>🛒 Cantidad total necesaria:</strong>
                    ${material.cantidad}
                    ${informacionMaterial.unidad}
                </p>

                <hr>

                <h4>👥 Detalle por docente</h4>

                ${detalleDocentes}

            </div>

        </div>

    `;

});
}


function volverCarrito() {

    document.getElementById("pantalla-consolidado").style.display = "none";

    document.getElementById("pantalla-carrito").style.display = "block";

}
function exportarPedido() {

    if (!carrito && !materiales) {
        alert("❌ No hay información para exportar.");
        return;
    }

    // Obtener nuevamente las solicitudes
    supabaseClient
        .from("solicitudes")
        .select("*")
        .then(function(resultado) {

            const data = resultado.data;
            const error = resultado.error;

            if (error) {

                console.error("Error al obtener solicitudes:", error);

                alert("❌ No se pudo generar el pedido.");

                return;
            }

            if (!data || data.length === 0) {

                alert("📋 No hay solicitudes para exportar.");

                return;
            }

            // ==============================
            // CONSOLIDAR MATERIALES
            // ==============================

            const consolidado = {};

            data.forEach(function(solicitud) {

                const idMaterial = solicitud.material_id;

                if (!consolidado[idMaterial]) {

                    consolidado[idMaterial] = {
                        id: solicitud.material_id,
                        nombre: solicitud.material_nombre,
                        categoria: solicitud.categoria,
                        cantidad: 0,
                        docentes: []
                    };

                }

                consolidado[idMaterial].cantidad += solicitud.cantidad;

                consolidado[idMaterial].docentes.push({
                    nombre: solicitud.profesor_nombre,
                    cantidad: solicitud.cantidad
                });

            });

            // ==============================
            // PREPARAR DATOS PARA EXCEL
            // ==============================

            const filas = [];

            Object.values(consolidado).forEach(function(material) {

                const informacionMaterial = materiales.find(function(item) {
                    return item.id === material.id;
                });

                if (!informacionMaterial) {
                    return;
                }

                filas.push({

                    "Material":
                        informacionMaterial.nombre,

                    "Categoría":
                        informacionMaterial.categoria,

                    "Descripción":
                        informacionMaterial.descripcion,

                    "Uso general":
                        informacionMaterial.uso,

                    "Unidad":
                        informacionMaterial.unidad,

                    "Cantidad total":
                        material.cantidad,

                    "Imagen":
                        informacionMaterial.imagen

                });

            });

            // ==============================
            // CREAR ARCHIVO EXCEL
            // ==============================

            const hoja = XLSX.utils.json_to_sheet(filas);

            hoja["!cols"] = [
                { wch: 25 },
                { wch: 22 },
                { wch: 60 },
                { wch: 55 },
                { wch: 15 },
                { wch: 18 },
                { wch: 45 }
            ];

            const libro = XLSX.utils.book_new();

            XLSX.utils.book_append_sheet(
                libro,
                hoja,
                "Pedido"
            );

            XLSX.writeFile(
                libro,
                "Pedido_materiales.xlsx"
            );

        });

}
