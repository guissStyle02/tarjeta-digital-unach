<template>
    <div class="pos-wrapper">
        <div class="pos-container p-3 md:p-4">
            <!-- Encabezado artesanal -->
            <div class="text-center mb-4 mt-2">
                <h2 class="text-3xl md:text-4xl text-green-900 font-bold mt-2" style="font-family: 'Georgia', serif">El Rinconcito del Soconusco</h2>
                <p class="text-green-800 text-base md:text-lg mt-1 italic font-medium">Sabores, cosechas y tradiciones de nuestra tierra</p>
            </div>

            <div class="card p-3 md:p-5 shadow-4 border-round-xl custom-glass-card">
                <!-- Formulario de Registro perfectamente alineado -->
                <div class="grid form-grid mb-4 bg-white p-3 md:p-4 border-round-lg shadow-1">
                    <div class="col-12 md:col-3 flex flex-column justify-content-end">
                        <label for="nombre" class="text-green-900 font-bold mb-2">Producto</label>
                        <InputText id="nombre" v-model="nuevoProducto.nombre" placeholder="Ej. Rambután o Miel" class="w-full" />
                    </div>

                    <div class="col-12 md:col-3 flex flex-column justify-content-end">
                        <label for="imgUrl" class="text-green-900 font-bold mb-2">URL Imagen (Opcional)</label>
                        <InputText id="imgUrl" v-model="nuevoProducto.imagen" placeholder="https://..." class="w-full" />
                    </div>

                    <div class="col-12 md:col-2 flex flex-column justify-content-end">
                        <label for="cantidad" class="text-green-900 font-bold mb-2">Cantidad</label>
                        <InputNumber inputId="cantidad" v-model="nuevoProducto.cantidad" :min="1" placeholder="1" class="w-full" />
                    </div>

                    <div class="col-12 md:col-2 flex flex-column justify-content-end">
                        <label for="precio" class="text-green-900 font-bold mb-2">$ Precio U.</label>
                        <InputNumber inputId="precio" v-model="nuevoProducto.precioU" mode="currency" currency="MXN" locale="es-MX" placeholder="$0.00" class="w-full" />
                    </div>

                    <div class="col-12 md:col-2 flex flex-column justify-content-end mt-2 md:mt-0">
                        <Button v-if="!editando" label="Registrar" icon="pi pi-plus" class="p-button-success btn-agro w-full" @click="registrarProducto" />
                        <Button v-else label="Actualizar" icon="pi pi-save" class="p-button-warning w-full" @click="guardarEdicion" />
                    </div>
                </div>

                <!-- DataTable de PrimeVue -->
                <DataTable
                    :value="productos"
                    responsiveLayout="scroll"
                    :paginator="true"
                    :rows="3"
                    class="p-datatable-sm custom-datatable shadow-1 border-round-lg"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Visualizando {first} a {last} de {totalRecords} productos"
                    :rowsPerPageOptions="[3, 5, 10]"
                >
                    <Column field="cns" header="Cns" :sortable="true" style="width: 6%"></Column>

                    <Column header="Imagen" style="width: 12%">
                        <template #body="slotProps">
                            <img :src="slotProps.data.imagen || imagenRespaldo" @error="onImageError" :alt="slotProps.data.nombre" class="product-img" />
                        </template>
                    </Column>

                    <Column field="nombre" header="Nombre del Producto" style="width: 32%">
                        <template #body="slotProps">
                            <div class="product-name">
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
                            <span class="font-bold text-green-700">
                                {{ formatCurrency(slotProps.data.precioU * slotProps.data.cantidad) }}
                            </span>
                        </template>
                    </Column>

                    <Column header="Acciones" style="width: 10%">
                        <template #body="slotProps">
                            <div class="flex align-items-center justify-content-center gap-2">
                                <Button icon="pi pi-pencil" class="p-button-text p-button-success p-button-rounded action-icon-btn" @click="editarProducto(slotProps.data)" aria-label="Editar producto" title="Editar" />
                                <Button icon="pi pi-trash" class="p-button-text p-button-danger p-button-rounded action-icon-btn" @click="eliminarProducto(slotProps.data.cns)" aria-label="Eliminar producto" title="Eliminar" />
                            </div>
                        </template>
                    </Column>

                    <template #empty>
                        <div class="text-center p-4 text-green-700 font-bold">No hay productos registrados en esta venta.</div>
                    </template>
                </DataTable>

                <!-- Totales con labels correctamente vinculados -->
                <div class="grid p-fluid mt-4 justify-content-end p-3 border-round-lg shadow-1 totals-box">
                    <div class="col-12 md:col-3">
                        <label for="subtotal" class="font-bold text-gray-700 block mb-1">Subtotal:</label>
                        <InputText id="subtotal" :value="formatCurrency(subtotal)" readonly class="bg-white text-right font-bold text-gray-800" />
                    </div>
                    <div class="col-12 md:col-3">
                        <label for="iva" class="font-bold text-gray-700 block mb-1">IVA (16%):</label>
                        <InputText id="iva" :value="formatCurrency(iva)" readonly class="bg-white text-right font-bold text-gray-800" />
                    </div>
                    <div class="col-12 md:col-4">
                        <label for="total" class="font-bold text-green-900 block mb-1">Total a Pagar:</label>
                        <InputText id="total" :value="formatCurrency(total)" readonly class="bg-white text-right font-bold text-green-700 text-xl" />
                    </div>
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
    {
        cns: 1,
        nombre: 'Caja de Mango Ataulfo (Exportación)',
        precioU: 350.0,
        cantidad: 2,
        imagen: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=150'
    },
    {
        cns: 2,
        nombre: 'Frasco Miel Orgánica de Abeja',
        precioU: 120.0,
        cantidad: 3,
        imagen: 'https://images.unsplash.com/photo-1587049352847-81a56d773c1c?auto=format&fit=crop&q=80&w=150'
    },
    {
        cns: 3,
        nombre: 'Bolsa de Café del Soconusco 500g',
        precioU: 180.0,
        cantidad: 1,
        imagen: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=150'
    },
    {
        cns: 4,
        nombre: 'Mermelada de Mango',
        precioU: 85.0,
        cantidad: 5,
        imagen: 'https://placehold.co/150x150/fca5a5/7f1d1d?text=Mermelada'
    }
]);

const nuevoProducto = ref({ nombre: '', cantidad: null, precioU: null, imagen: '' });
const editando = ref(false);
const idEdicion = ref(null);

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
.pos-wrapper {
    min-height: calc(100vh - 65px);
    background-color: #dcfce7;
    background-image: radial-gradient(#86efac 2px, transparent 2px), radial-gradient(#86efac 2px, transparent 2px);
    background-size: 60px 60px;
    background-position:
        0 0,
        30px 30px;
}

.pos-container {
    max-width: 1250px;
    margin: 0 auto;
}

.badge-chiapas {
    background-color: #14532d;
    color: #fef08a;
    padding: 0.35rem 1rem;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
}

.custom-glass-card {
    background-color: rgba(255, 255, 255, 0.96) !important;
}

.btn-agro {
    background-color: #16a34a !important;
    border-color: #16a34a !important;
    font-weight: bold;
}

.btn-agro:hover {
    background-color: #15803d !important;
    border-color: #15803d !important;
}

.product-img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 10px;
    border: 2px solid #e2e8f0;
}

.product-name {
    white-space: normal;
    word-break: break-word;
    font-weight: 600;
    color: #1e293b;
}

.action-icon-btn {
    width: 2.5rem !important;
    height: 2.5rem !important;
}

.totals-box {
    background-color: #f7fee7;
    border: 2px dashed #a3e635;
}

:deep(.custom-datatable .p-datatable-thead > tr > th) {
    background-color: #e6eedb;
    color: #2f3e1b;
    font-weight: 700;
}
</style>
