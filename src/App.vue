<template>
    <div class="dashboard-layout">
        <aside class="sidebar">
            <div class="logo">Facultad de Negocios<br />UNACH</div>
            <nav>
                <ul>
                    <li>Dashboard</li>
                    <li class="active">Demo Clientes</li>
                    <li>BarCode-QR</li>
                    <li>Empleados</li>
                </ul>
            </nav>
        </aside>

        <main class="main-content">
            <FormularioEmpleado @update:empleado="actualizarEmpleado" />

            <!-- botón de imprimir -->
            <div class="seccion-tarjeta">
                <TarjetaDigital :empleado="datosEmpleado" />
                <button class="btn-imprimir" @click="imprimirTarjeta">🖨️ IMPRIMIR TARJETA</button>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import FormularioEmpleado from './components/FormularioEmpleado.vue';
import TarjetaDigital from './components/TarjetaDigital.vue';

const datosEmpleado = ref({
    nombre: '',
    paterno: '',
    materno: '',
    fecha: '',
    rfc: ''
});

const actualizarEmpleado = (nuevosDatos) => {
    datosEmpleado.value = { ...nuevosDatos };
};

const imprimirTarjeta = () => {
    window.print();
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
body {
    background-color: #f1f5f9;
}
.dashboard-layout {
    display: flex;
    min-height: 100vh;
}

.sidebar {
    width: 250px;
    background: white;
    border-right: 1px solid #e2e8f0;
    padding: 1.5rem;
    display: none;
}
@media (min-width: 768px) {
    .sidebar {
        display: block;
    }
}
.logo {
    font-weight: bold;
    font-size: 1.1rem;
    margin-bottom: 2rem;
    color: #0f172a;
    line-height: 1.3;
}
nav ul {
    list-style: none;
}
nav li {
    padding: 0.8rem;
    color: #64748b;
    cursor: pointer;
    border-radius: 6px;
    margin-bottom: 0.5rem;
}
nav li.active {
    color: #0284c7;
    background-color: #e0f2fe;
    font-weight: bold;
}

.main-content {
    flex: 1;
    padding: 2rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    align-items: start;
}
@media (min-width: 1024px) {
    .main-content {
        grid-template-columns: 1fr 1fr;
    }
}

.seccion-tarjeta {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.btn-imprimir {
    margin-top: 1.5rem;
    background-color: #3b82f6;
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    width: 320px;
    transition: background 0.3s;
}
.btn-imprimir:hover {
    background-color: #2563eb;
}

@media print {
    .sidebar,
    .formulario-container,
    .btn-imprimir,
    h2 {
        display: none !important;
    }
    .dashboard-layout {
        display: block;
    }
    .main-content {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        padding: 0;
    }
    .tarjeta-container {
        margin: 0 auto;
        transform: scale(1.2);
    }
}
</style>
