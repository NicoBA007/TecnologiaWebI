//ejercicio 1
function determinarClima() {
    const input = document.getElementById('tempInput').value;
    const resultadoDiv = document.getElementById('resultadoClima');
    const temp = parseFloat(input);

    if (isNaN(temp)) {
        resultadoDiv.innerHTML = "Por favor, ingresa un número válido.";
        resultadoDiv.style.color = "#ff6b6b"; 
        return;
    }

    let clima = "";
    
    // Lógica de la tabla
    if (temp >= -10 && temp <= 15) {
        clima = "Frío ❄️";
    } else if (temp >= 16 && temp <= 25) {
        clima = "Templado 🌤️";
    } else if (temp >= 26 && temp <= 40) {
        clima = "Calor 🔥";
    } else {
        clima = "Temperatura fuera de rango (-10 a 40)";
    }

    resultadoDiv.style.color = "var(--text-secondary)";
    resultadoDiv.innerHTML = `Temperatura: <strong>${temp}°C</strong> <br> Clima: <strong>${clima}</strong>`;
}



//ejercicio2
function ejecutarFizzBuzz() {
    const resultadoDiv = document.getElementById('resultadoFizzBuzz');
    let output = "";

    for (let i = 1; i <= 100; i++) {
        let mensaje = "";
        
        if (i % 3 === 0) mensaje += "Fizz";
        if (i % 5 === 0) mensaje += "Buzz";
        
        if (mensaje !== "") {
            output += `${i}: ${mensaje}<br>`;
        } else {
             output += `${i}<br>`; 
        }
    }

    resultadoDiv.innerHTML = output;
}

//ejercicio 3
function mostrarFecha() {
    const resultadoDiv = document.getElementById('resultadoFecha');
    const fecha = new Date();

    const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const nombreDia = dias[fecha.getDay()];
    const diaNumero = fecha.getDate();
    const nombreMes = meses[fecha.getMonth()];
    const anio = fecha.getFullYear();

    const fechaTexto = `${nombreDia}, ${diaNumero} de ${nombreMes} del ${anio}`;

    resultadoDiv.innerHTML = fechaTexto;
}

//ejercicio 4
// Definición del objeto global para poder manipularlo
let lugarTuristico = {
    nombre: "Cristo de la Concordia",
    ciudad: "Cochabamba",
    precioEntrada: 10, // Bolivianos
    horario: "09:00 - 18:00",
    calificaciones: [5, 4, 5, 3, 5], // Array de calificaciones

    // Método promedio
    promedioCalificaciones: function() {
        if (this.calificaciones.length === 0) return 0;
        let suma = this.calificaciones.reduce((a, b) => a + b, 0);
        return (suma / this.calificaciones.length).toFixed(1);
    },

    // Método descuento
    aplicarDescuento: function(porcentaje) {
        const descuento = (this.precioEntrada * porcentaje) / 100;
        this.precioEntrada = this.precioEntrada - descuento;
    },
    
    // Helper para mostrar info en texto
    getInfo: function() {
        return `
            <strong>${this.nombre}</strong> (${this.ciudad})<br>
            Entrada: ${this.precioEntrada.toFixed(2)} Bs.<br>
            Horario: ${this.horario}<br>
            Calificaciones: [${this.calificaciones.join(", ")}]
        `;
    }
};

function verInfoLugar() {
    const resultadoDiv = document.getElementById('resultadoLugar');
    const promedio = lugarTuristico.promedioCalificaciones();
    
    resultadoDiv.innerHTML = `
        ${lugarTuristico.getInfo()}<br>
        --------------------------<br>
        <strong>Promedio: ${promedio} ⭐</strong>
    `;
}

function aplicarDescuentoLugar() {
    const input = document.getElementById('descuentoInput').value;
    const porcentaje = parseFloat(input);
    const resultadoDiv = document.getElementById('resultadoLugar');

    if (isNaN(porcentaje) || porcentaje <= 0) {
        alert("Ingrese un porcentaje válido");
        return;
    }

    lugarTuristico.aplicarDescuento(porcentaje);
    
    // Actualizamos la vista
    resultadoDiv.innerHTML = `
        ¡Descuento aplicado del ${porcentaje}%!<br>
        Nuevo precio: <strong>${lugarTuristico.precioEntrada.toFixed(2)} Bs.</strong>
    `;
}

// ejercicio 5
class Hotel {
    constructor(nombre, ciudad, habitacionesDisponibles) {
        this.nombre = nombre;
        this.ciudad = ciudad;
        this.habitacionesDisponibles = habitacionesDisponibles;
    }

    reservar(cantidad) {
        if (cantidad <= 0) return "Cantidad inválida.";
        if (cantidad > this.habitacionesDisponibles) {
            return `Error: Solo quedan ${this.habitacionesDisponibles} habitaciones.`;
        }
        this.habitacionesDisponibles -= cantidad;
        return `Reserva exitosa de ${cantidad} habitación(es).`;
    }

    liberar(cantidad) {
        if (cantidad <= 0) return "Cantidad inválida.";
        this.habitacionesDisponibles += cantidad;
        return `Se han liberado ${cantidad} habitación(es).`;
    }

    info() {
        return `Hotel <strong>${this.nombre}</strong> en ${this.ciudad}.<br>Disponibles: <strong>${this.habitacionesDisponibles}</strong>`;
    }
}

// Instanciamos el hotel
const miHotel = new Hotel("Gran Hotel Cochabamba", "Cochabamba", 50);

// Mostramos info inicial al cargar (opcional) o al pedirla
function mostrarInfoHotel() {
    const resultadoDiv = document.getElementById('resultadoHotel');
    resultadoDiv.innerHTML = miHotel.info();
}

function gestionarHotel(accion) {
    const input = document.getElementById('cantHabitaciones');
    const cantidad = parseInt(input.value);
    const resultadoDiv = document.getElementById('resultadoHotel');

    if (isNaN(cantidad) || cantidad <= 0) {
        resultadoDiv.innerHTML = "Por favor ingresa una cantidad válida de habitaciones.";
        return;
    }

    let mensaje = "";
    if (accion === 'reservar') {
        mensaje = miHotel.reservar(cantidad);
    } else if (accion === 'liberar') {
        mensaje = miHotel.liberar(cantidad);
    }

    // Mostramos el mensaje de la acción Y la info actualizada
    resultadoDiv.innerHTML = `${mensaje}<br><br>${miHotel.info()}`;
}