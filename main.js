// Maquina Expendedora
const outputDiv = document.getElementById("output");
const productButtonsDiv = document.getElementById("product-buttons");
const cartDiv = document.getElementById("cart");
const paymentForm = document.getElementById("payment-form");

const maquinaExpendedora = {
    productos: [],
    carrito: [],

    agregarProducto: function (nombre, numero, precio, stock, conAlcohol) {
        const producto = {
            nombre: nombre,
            numero: numero,
            precio: precio,
            stock: stock,
            conAlcohol: conAlcohol,
        };
        this.productos.push(producto);
    },

    mostrarProductos: function () {
        if (this.productos.length === 0) {
            this.mostrarMensaje(
                "No hay productos disponibles en la máquina expendedora.\n"
            );
            return;
        }

        this.productos.forEach((producto) => {
            this.crearBotonProducto(producto);
        });
    },

    crearBotonProducto: function (producto) {
        const botonProducto = document.createElement("button");
        botonProducto.textContent = `Comprar ${
            producto.nombre
        } - $${producto.precio.toFixed(2)}`;
        botonProducto.addEventListener("click", () => {
            // Añadir producto al carrito solo cuando se presiona "Ver Carrito"
            this.agregarAlCarrito(producto);
        });
        productButtonsDiv.appendChild(botonProducto);
    },

    agregarAlCarrito: function (producto) {
        this.carrito.push(producto);
        this.mostrarCarrito();
        this.mostrarMensaje(`${producto.nombre} agregado al carrito.\n`);
    },

    mostrarCarrito: function () {
        // Limpiar carrito antes de mostrar los productos en el carrito
        cartDiv.innerHTML = "";

        if (this.carrito.length === 0) {
            return; // No mostrar "El carrito está vacío" si no hay productos en el carrito
        }

        let totalCompra = 0;

        let mensaje = "Carrito de compras:<br>";
        this.carrito.forEach((producto) => {
            mensaje += `${producto.nombre} - $${producto.precio.toFixed(
                2
            )}<br>`;
            totalCompra += producto.precio;
        });

        mensaje += `<br>Total de la compra: $${totalCompra.toFixed(2)}<br>`;
        cartDiv.innerHTML = mensaje;

        this.mostrarFormularioPago(totalCompra);
    },

    mostrarFormularioPago: function (totalAPagar) {
        const paymentFormHTML = `
            <label for="payment-amount">Ingrese el monto a pagar: $</label>
            <input type="number" id="payment-amount" step="0.01" required>
            <button type="button" onclick="realizarPago(${totalAPagar})">Pagar</button>
        `;
        paymentForm.innerHTML = paymentFormHTML;
    },

    realizarPago: function (totalAPagar) {
        const montoIngresado = parseFloat(
            document.getElementById("payment-amount").value
        );

        if (isNaN(montoIngresado) || montoIngresado <= 0) {
            this.mostrarMensaje(
                "Por favor, ingrese un monto válido mayor a cero.\n"
            );
        } else if (montoIngresado < totalAPagar) {
            this.mostrarMensaje(
                "El monto ingresado es insuficiente. Por favor, ingrese más dinero.\n"
            );
        } else {
            const cambio = montoIngresado - totalAPagar;
            this.mostrarMensaje(`Cambio: $${cambio.toFixed(2)}\n`);
            this.mostrarMensaje("¡Compra exitosa! Gracias por tu compra.\n");
            this.mostrarMensaje("El carrito está vacío.\n");

            const fechaHoraActual = new Date().toLocaleString();
            this.mostrarMensaje(
                `Fecha y hora de la compra: ${fechaHoraActual}\n`
            );
            this.mostrarMensaje("Compra finalizada.\n");

            this.vaciarCarrito();

            // Mostrar mensaje de recarga después de 2 segundos
            setTimeout(() => {
                this.mostrarMensaje("La página se reiniciará en 3 segundos.\n");
            }, 2000);

            // Reiniciar la página después de 5 segundos
            setTimeout(() => {
                location.reload();
            }, 5000);
        }
    },

    vaciarCarrito: function () {
        this.carrito = [];
        this.actualizarInterfaz();
    },

    mostrarMensaje: function (mensaje) {
        const mensajeDiv = document.createElement("div");
        mensajeDiv.innerHTML = mensaje;
        mensajeDiv.classList.add("retro-message"); // Agregar la clase retro-message
        outputDiv.appendChild(mensajeDiv);
    },

    actualizarInterfaz: function () {
        // Limpiar botones de productos, carrito y formulario de pago
        productButtonsDiv.innerHTML = "";
        cartDiv.innerHTML = "";
        paymentForm.innerHTML = "";

        // Volver a mostrar productos y carrito
        this.mostrarProductos();
    },
};

function inicializarMaquina() {
    maquinaExpendedora.agregarProducto("Coca-Cola", 1, 1350.0, 10, false);
    maquinaExpendedora.agregarProducto("Fernet Branca", 2, 7800.0, 5, true);
    maquinaExpendedora.agregarProducto("Cerveza Quilmes", 3, 950.0, 8, true);
    maquinaExpendedora.agregarProducto("Vino Trumpeter", 4, 3500.0, 12, true);
    maquinaExpendedora.agregarProducto("Hielo", 5, 300.0, 20, false);

    maquinaExpendedora.mostrarProductos();
}

function realizarPago(totalAPagar) {
    maquinaExpendedora.realizarPago(totalAPagar);
}

inicializarMaquina();
