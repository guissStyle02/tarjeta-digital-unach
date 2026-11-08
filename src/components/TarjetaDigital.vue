<template>
    <div class="tarjeta-container">
        <h2>TARJETA DIGITAL</h2>
        <div class="credencial">
            <div class="header-azul">
                <div class="logo-company">
                    <div class="diamante"></div>
                    <div>
                        <strong>YOUR COMPANY</strong>
                        <p>Slogan Goes Here</p>
                    </div>
                </div>
            </div>

            <div class="foto-perfil">
                <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Perfil" />
            </div>

            <div class="datos-empleado">
                <h3>
                    {{ empleado.nombre?.toUpperCase() || 'NOMBRE' }} <br />
                    {{ empleado.paterno?.toUpperCase() || '' }} {{ empleado.materno?.toUpperCase() || '' }}
                </h3>

                <p class="id-texto">ID : {{ empleado.rfc || 'SIN DATOS' }}</p>

                <div class="qr-container">
                    <qrcode-vue :value="empleado.rfc || 'Sin datos'" :size="80" level="H" />
                </div>
            </div>

            <div class="footer-azul"></div>
        </div>
    </div>
</template>

<script setup>
import QrcodeVue from 'qrcode.vue';

const props = defineProps({
    empleado: {
        type: Object,
        default: () => ({ nombre: '', paterno: '', materno: '', rfc: '' })
    }
});
</script>

<style scoped>
.tarjeta-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
h2 {
    font-size: 1.1rem;
    color: #334155;
    margin-bottom: 1.5rem;
    align-self: flex-start;
}
.credencial {
    width: 320px;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    text-align: center;
    border: 1px solid #e2e8f0;
}
.header-azul {
    background: #1e3a5f;
    border-bottom: 20px solid #2563eb;
    border-bottom-left-radius: 50% 30px;
    border-bottom-right-radius: 50% 30px;
    height: 120px;
    padding: 1.5rem;
    color: white;
}
.logo-company {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.8rem;
    text-align: left;
}
.diamante {
    width: 16px;
    height: 16px;
    background: white;
    transform: rotate(45deg);
}
.foto-perfil {
    width: 90px;
    height: 90px;
    background: white;
    border-radius: 50%;
    margin: -45px auto 10px;
    padding: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.foto-perfil img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
}
.datos-empleado {
    padding: 0.5rem 2rem 1.5rem;
}
h3 {
    color: #0f172a;
    font-size: 1.1rem;
    margin-bottom: 0.8rem;
    line-height: 1.2;
}
.id-texto {
    font-size: 0.9rem;
    color: #334155;
    margin-bottom: 0.5rem;
    font-weight: bold;
}
.qr-container {
    margin-top: 0.5rem;
    display: flex;
    justify-content: center;
}
.footer-azul {
    background: #2563eb;
    height: 25px;
    border-top-left-radius: 50% 10px;
    border-top-right-radius: 50% 10px;
}
</style>
