<template>
    <div class="pos-container">
        <div class="card p-4 shadow-3">
            <h2 class="text-green-800 font-bold mb-1">PUNTO DE VENTA: EL RINCONCITO DEL SOCONUSCO</h2>
            <p class="text-gray-600 mb-4">Registro de cosechas y productos artesanales</p>

            <!-- Formulario de Registro -->
            <div class="grid p-fluid align-items-end mb-4 bg-green-50 p-3 border-round border-1 border-green-200">
                <div class="col-12 md:col-3">
                    <label for="nombre" class="text-green-900 font-semibold">Producto...</label>
                    <InputText id="nombre" v-model="nuevoProducto.nombre" placeholder="Ej. Rambután" />
                </div>
                <div class="col-12 md:col-3">
                    <label for="imgUrl" class="text-green-900 font-semibold">URL Imagen (Opcional)</label>
                    <InputText id="imgUrl" v-model="nuevoProducto.imagen" placeholder="https://..." />
                </div>
                <div class="col-12 md:col-2">
                    <label for="cantidad" class="text-green-900 font-semibold">Cant.</label>
                    <InputNumber id="cantidad" v-model="nuevoProducto.cantidad" :min="1" placeholder="1" />
                </div>
                <div class="col-12 md:col-2">
                    <label for="precio" class="text-green-900 font-semibold">$ Precio U.</label>
                    <InputNumber id="precio" v-model="nuevoProducto.precioU" mode="currency" currency="MXN" locale="es-MX" placeholder="$0.00" />
                </div>
                <div class="col-12 md:col-2">
                    <Button v-if="!editando" label="Registrar" icon="pi pi-plus" class="p-button-success btn-agro w-full" @click="registrarProducto" />
                    <Button v-else label="Actualizar" icon="pi pi-save" class="p-button-warning w-full" @click="guardarEdicion" />
                </div>
            </div>

            <!-- Componente DataTable de PrimeVue -->
            <DataTable
                :value="productos"
                responsiveLayout="scroll"
                :paginator="true"
                :rows="3"
                class="p-datatable-sm custom-datatable"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Visualizando {first} a {last} de {totalRecords} productos"
                :rowsPerPageOptions="[3, 5, 10]"
            >
                <Column field="cns" header="Cns ↑↓" :sortable="true" style="width: 5%"></Column>

                <!-- Columna de Imagen -->
                <Column header="Imagen" style="width: 10%">
                    <template #body="slotProps">
                        <img :src="slotProps.data.imagen || imagenRespaldo" @error="onImageError" :alt="slotProps.data.nombre" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px; border: 1px solid #d1d5db" />
                    </template>
                </Column>

                <!-- Columna de Nombre -->
                <Column field="nombre" header="Nombre del Producto" style="width: 35%">
                    <template #body="slotProps">
                        <div style="white-space: normal; word-break: break-word">
                            {{ slotProps.data.nombre }}
                        </div>
                    </template>
                </Column>

                <Column field="precioU" header="Precio U." style="width: 15%">
                    <template #body="slotProps">
                        {{ formatCurrency(slotProps.data.precioU) }}
                    </template>
                </Column>

                <Column field="cantidad" header="Cant." style="width: 10%"></Column>

                <Column field="precioP" header="Precio P." style="width: 15%">
                    <template #body="slotProps">
                        <span class="font-semibold text-green-700">
                            {{ formatCurrency(slotProps.data.precioU * slotProps.data.cantidad) }}
                        </span>
                    </template>
                </Column>

                <!-- Acciones (Editar y Eliminar) -->
                <Column header="Acciones" style="width: 10%">
                    <template #body="slotProps">
                        <div class="flex gap-2">
                            <Button icon="pi pi-pencil" class="p-button-success p-button-sm p-button-rounded" @click="editarProducto(slotProps.data)" aria-label="Editar" />
                            <Button icon="pi pi-trash" class="p-button-danger p-button-sm p-button-rounded" @click="eliminarProducto(slotProps.data.cns)" aria-label="Eliminar" />
                        </div>
                    </template>
                </Column>

                <template #empty>
                    <div class="text-center p-3 text-green-600 font-bold">No hay productos registrados en esta venta.</div>
                </template>
            </DataTable>

            <!-- Sección de Totales Calculados -->
            <div class="grid p-fluid mt-4 justify-content-end bg-yellow-50 p-3 border-round border-1 border-yellow-200">
                <div class="col-12 md:col-3">
                    <label class="font-bold text-gray-700">Subtotal:</label>
                    <InputText :value="formatCurrency(subtotal)" readonly class="bg-white text-right font-bold text-gray-800" />
                </div>
                <div class="col-12 md:col-3">
                    <label class="font-bold text-gray-700">IVA (16%):</label>
                    <InputText :value="formatCurrency(iva)" readonly class="bg-white text-right font-bold text-gray-800" />
                </div>
                <div class="col-12 md:col-3">
                    <label class="font-bold text-green-900">Total a Pagar:</label>
                    <InputText :value="formatCurrency(total)" readonly class="bg-white text-right font-bold text-green-700 text-xl" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const imagenRespaldo = 'https://placehold.co/150x150/e2e8f0/475569?text=Caja';

const onImageError = (event) => {
    event.target.src = imagenRespaldo;
};

const productos = ref([
    { cns: 1, nombre: 'Caja de Mango Ataulfo (Exportación)', precioU: 350.0, cantidad: 2, imagen: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=150' },
    { cns: 2, nombre: 'Frasco Miel Orgánica de Abeja', precioU: 120.0, cantidad: 3, imagen: 'https://images.unsplash.com/photo-1587049352847-81a56d773c1c?auto=format&fit=crop&q=80&w=150' },
    { cns: 3, nombre: 'Bolsa de Café del Soconusco 500g', precioU: 180.0, cantidad: 1, imagen: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=150' }
]);

const nuevoProducto = ref({ nombre: '', cantidad: null, precioU: null, imagen: '' });
const editando = ref(false);
const idEdicion = ref(null);

// Cálculos reactivos automáticos mediante propiedades computadas
const subtotal = computed(() => productos.value.reduce((acc, prod) => acc + prod.precioU * prod.cantidad, 0));
const iva = computed(() => subtotal.value * 0.16);
const total = computed(() => subtotal.value + iva.value);

const formatCurrency = (value) => value.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });

const registrarProducto = () => {
    if (!nuevoProducto.value.nombre || !nuevoProducto.value.cantidad || !nuevoProducto.value.precioU) return;
    const nuevoCns = productos.value.length > 0 ? Math.max(...productos.value.map((p) => p.cns)) + 1 : 1;
    productos.value.push({
        cns: nuevoCns,
        nombre: nuevoProducto.value.nombre,
        precioU: nuevoProducto.value.precioU,
        cantidad: nuevoProducto.value.cantidad,
        imagen: nuevoProducto.value.imagen || imagenRespaldo
    });
    limpiarFormulario();
};

const eliminarProducto = (cns) => {
    productos.value = productos.value.filter((p) => p.cns !== cns);
};

const editarProducto = (producto) => {
    editando.value = true;
    idEdicion.value = producto.cns;
    nuevoProducto.value = { ...producto };
};

const guardarEdicion = () => {
    const index = productos.value.findIndex((p) => p.cns === idEdicion.value);
    if (index !== -1) {
        productos.value[index] = {
            ...productos.value[index],
            nombre: nuevoProducto.value.nombre,
            precioU: nuevoProducto.value.precioU,
            cantidad: nuevoProducto.value.cantidad,
            imagen: nuevoProducto.value.imagen || imagenRespaldo
        };
    }
    editando.value = false;
    limpiarFormulario();
};

const limpiarFormulario = () => {
    nuevoProducto.value = { nombre: '', cantidad: null, precioU: null, imagen: '' };
    idEdicion.value = null;
};
</script>

<style scoped>
.pos-container {
    max-width: 1200px;
    margin: 0 auto;
}
.bg-green-50 {
    background-color: #f0fdf4 !important;
}
.bg-yellow-50 {
    background-color: #fefce8 !important;
}
.text-green-900 {
    color: #14532d !important;
}
.btn-agro {
    background-color: #16a34a !important;
    border-color: #16a34a !important;
}
.btn-agro:hover {
    background-color: #15803d !important;
    border-color: #15803d !important;
}
:deep(.custom-datatable .p-datatable-header) {
    background-color: #f8fafc;
}
:deep(.custom-datatable .p-datatable-thead > tr > th) {
    background-color: #e6eedb;
    color: #2f3e1b;
    font-weight: 700;
}
</style>
