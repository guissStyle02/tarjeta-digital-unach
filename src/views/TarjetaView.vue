<template>
    <div class="tarjeta-layout">
        <div>
            <FormularioEmpleado @update:empleado="actualizarEmpleado" />
        </div>

        <div class="seccion-tarjeta">
            <TarjetaDigital :empleado="datosEmpleado" />
            <button class="btn-imprimir" @click="imprimirTarjeta">🖨️ IMPRIMIR TARJETA</button>
        </div>
    </div>
</template>

<script setup>
import FormularioEmpleado from '@/components/FormularioEmpleado.vue';
import TarjetaDigital from '@/components/TarjetaDigital.vue';
import { ref } from 'vue';

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

<style scoped>
.tarjeta-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    align-items: start;
}
@media (min-width: 1024px) {
    .tarjeta-layout {
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
    .btn-imprimir {
        display: none !important;
    }
    .tarjeta-layout {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
    :global(.formulario-container) {
        display: none !important;
    }
}
</style>
