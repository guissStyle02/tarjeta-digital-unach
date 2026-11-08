<template>
    <div class="formulario-container">
        <h2>GENERAR EL RFC DE UNA PERSONA</h2>

        <form @submit.prevent="generarCredencial">
            <div class="input-group">
                <label>Nombre(s):</label>
                <input type="text" v-model="empleadoLocal.nombre" placeholder="Ej. Susana" required />
            </div>
            <div class="input-group">
                <label>Apellido Paterno:</label>
                <input type="text" v-model="empleadoLocal.paterno" placeholder="Ej. Rojas" required />
            </div>
            <div class="input-group">
                <label>Apellido Materno:</label>
                <input type="text" v-model="empleadoLocal.materno" placeholder="Ej. Merida" />
            </div>
            <div class="input-group">
                <label>Fecha Nacimiento:</label>
                <input type="date" v-model="empleadoLocal.fecha" required />
            </div>

            <div class="toggle-group">
                <label class="switch-label">
                    <input type="checkbox" v-model="generarAuto" />
                    <span>Generar RFC automáticamente</span>
                </label>
            </div>

            <div class="input-group">
                <label>RFC:</label>
                <input type="text" v-model="empleadoLocal.rfc" placeholder="ROMS920822..." :disabled="generarAuto" required />
            </div>

            <button type="submit" class="btn-generar">GENERAR</button>
        </form>
    </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';

const emit = defineEmits(['update:empleado']);

const generarAuto = ref(true);

const empleadoLocal = reactive({
    nombre: 'Susana',
    paterno: 'Rojas',
    materno: 'Merida',
    fecha: '1992-08-22',
    rfc: 'ROMS920822MCSRRS09'
});

const calcularRFC = () => {
    if (!generarAuto.value) return;

    const p = (empleadoLocal.paterno || '').trim().toUpperCase();
    const m = (empleadoLocal.materno || '').trim().toUpperCase();
    const n = (empleadoLocal.nombre || '').trim().toUpperCase();
    const f = empleadoLocal.fecha;

    if (!p || !n || !f) {
        empleadoLocal.rfc = '';
        return;
    }

    const primeraP = p.charAt(0);
    const vocalesP = p.substring(1).match(/[AEIOU]/);
    const vocalP = vocalesP ? vocalesP[0] : 'X';

    const primeraM = m ? m.charAt(0) : 'X';

    const primeraN = n.charAt(0);

    const dateObj = new Date(f);
    const dateStr = new Date(dateObj.getTime() + dateObj.getTimezoneOffset() * 60000).toISOString().slice(2, 10).replace(/-/g, '');

    const homoclave = 'A1B';
    const digito = '9';

    empleadoLocal.rfc = `${primeraP}${vocalP}${primeraM}${primeraN}${dateStr}${homoclave}${digito}`;
};

watch(
    () => [empleadoLocal.nombre, empleadoLocal.paterno, empleadoLocal.materno, empleadoLocal.fecha, generarAuto.value],
    () => {
        calcularRFC();
    }
);

const generarCredencial = () => {
    emit('update:empleado', { ...empleadoLocal });
};
</script>

<style scoped>
.formulario-container {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    width: 100%;
}
h2 {
    font-size: 1.1rem;
    color: #334155;
    margin-bottom: 1.5rem;
}
.input-group {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
}
label {
    font-size: 0.85rem;
    color: #64748b;
    margin-bottom: 0.3rem;
}
input[type='text'],
input[type='date'] {
    padding: 0.6rem;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    outline: none;
    transition:
        border 0.3s,
        background-color 0.3s;
}
input[type='text']:focus,
input[type='date']:focus {
    border-color: #38bdf8;
}

input:disabled {
    background-color: #f1f5f9;
    color: #94a3b8;
    cursor: not-allowed;
    border-color: #e2e8f0;
}

.toggle-group {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
}
.switch-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    color: #334155;
    cursor: pointer;
    font-weight: 500;
}
.switch-label input[type='checkbox'] {
    width: 16px;
    height: 16px;
    cursor: pointer;
    accent-color: #10b981;
}

.btn-generar {
    width: 100%;
    background-color: #10b981;
    color: white;
    padding: 0.8rem;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 1rem;
    transition: background 0.3s;
}
.btn-generar:hover {
    background-color: #059669;
}
</style>
