<template>
    <div class="dashboard-layout">
        <!-- Menú lateral que siempre estará visible -->
        <aside class="sidebar">
            <div class="logo">Facultad de Negocios<br />UNACH</div>
            <nav>
                <ul>
                    <li><router-link to="/" class="nav-link" active-class="active">Empleados (Tarjeta)</router-link></li>
                    <li><router-link to="/puntoventa" class="nav-link" active-class="active">Punto de Venta</router-link></li>
                </ul>
            </nav>
        </aside>

        <!-- Área dinámica donde Vue inyectará TarjetaView o PuntoDeVenta -->
        <main class="main-content">
            <router-view />
        </main>
    </div>
</template>

<style>
/* Estilos globales y del cascarón */
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
.nav-link {
    text-decoration: none;
    display: block;
    padding: 0.8rem;
    color: #64748b;
    cursor: pointer;
    border-radius: 6px;
    margin-bottom: 0.5rem;
}
.nav-link.active {
    color: #0284c7;
    background-color: #e0f2fe;
    font-weight: bold;
}
.main-content {
    flex: 1;
    padding: 2rem;
}
/* Ocultar el menú al imprimir */
@media print {
    .sidebar {
        display: none !important;
    }
    .main-content {
        padding: 0 !important;
    }
}
</style>
