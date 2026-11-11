<template>
    <div class="app-layout">
        <!-- Barra de navegación superior -->
        <header class="topbar shadow-2">
            <button class="menu-btn" @click="toggleMenu">
                <i class="pi pi-bars"></i>
            </button>
            <div class="logo-container">
                <h1 class="logo-etda">ETDA</h1>
            </div>
        </header>

        <div class="main-container">
            <!-- Menú Lateral (Sidebar) Deslizante -->
            <aside :class="['sidebar shadow-4', { 'sidebar-open': isMenuOpen }]">
                <div class="sidebar-header">
                    <h2 class="text-gray-500 font-bold text-sm uppercase">Menú de Navegación</h2>
                    <button class="close-btn" @click="closeMenu"><i class="pi pi-times"></i></button>
                </div>
                <nav>
                    <ul>
                        <li>
                            <router-link to="/" class="nav-link" active-class="active" @click="closeMenu"> <i class="pi pi-id-card mr-3 text-xl"></i> Empleados (Tarjeta) </router-link>
                        </li>
                        <li>
                            <router-link to="/puntoventa" class="nav-link" active-class="active" @click="closeMenu"> <i class="pi pi-shopping-cart mr-3 text-xl"></i> Punto de Venta </router-link>
                        </li>
                    </ul>
                </nav>
            </aside>

            <!-- Fondo oscuro para cuando el menú está abierto -->
            <div v-if="isMenuOpen" class="menu-overlay" @click="closeMenu"></div>

            <!-- Área donde se carga la pantalla completa -->
            <main class="content-area">
                <router-view />
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
    isMenuOpen.value = false;
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
    background-color: #f8fafc;
}

.app-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

/* Header Superior */
.topbar {
    background-color: white;
    height: 70px;
    display: flex;
    align-items: center;
    padding: 0 1.5rem;
    position: sticky;
    top: 0;
    z-index: 1000;
}

.menu-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #475569;
    cursor: pointer;
    padding: 0.5rem;
    transition: color 0.3s;
}

.menu-btn:hover {
    color: #2563eb;
}

.logo-container {
    margin-left: 1.5rem;
}

/* Logo ETDA en Azul Cálido */
.logo-etda {
    color: #2563eb; /* Azul cálido / Royal Blue */
    font-weight: 900;
    font-size: 1.8rem;
    letter-spacing: 2px;
    margin: 0;
}

.main-container {
    display: flex;
    flex: 1;
    position: relative;
}

/* Sidebar Deslizante */
.sidebar {
    position: fixed;
    top: 0;
    left: -300px; /* Oculto por defecto */
    width: 280px;
    height: 100vh;
    background-color: white;
    z-index: 2000;
    transition: left 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
}

.sidebar-open {
    left: 0; /* Aparece cuando está abierto */
}

.sidebar-header {
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.5rem;
    border-bottom: 1px solid #e2e8f0;
    margin-bottom: 1rem;
}

.close-btn {
    background: none;
    border: none;
    font-size: 1.2rem;
    color: #94a3b8;
    cursor: pointer;
}

nav ul {
    list-style: none;
    padding: 0 1rem;
}

.nav-link {
    text-decoration: none;
    display: flex;
    align-items: center;
    padding: 1rem 1.5rem;
    color: #64748b;
    font-weight: 600;
    border-radius: 8px;
    margin-bottom: 0.5rem;
    transition: all 0.2s;
}

.nav-link:hover {
    background-color: #f1f5f9;
    color: #334155;
}

.nav-link.active {
    color: #2563eb;
    background-color: #eff6ff;
}

/* Capa oscura que tapa el contenido cuando el menú está abierto */
.menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1500;
}

/* Área de contenido a pantalla completa */
.content-area {
    flex: 1;
    width: 100%;
    /* Sin paddings aquí para que el fondo artesanal ocupe toda la pantalla */
}

@media print {
    .topbar,
    .menu-btn {
        display: none !important;
    }
}
</style>
