<template>
    <div class="app-layout">
        <!-- Barra superior fija (siempre visible en celular y computadora) -->
        <header class="topbar shadow-2">
            <button class="menu-btn" @click="toggleMenu" aria-label="Abrir menú">
                <i class="pi pi-bars"></i>
                <span class="menu-btn-text">Menú</span>
            </button>
            <div class="logo-container">
                <h1 class="logo-etda">ETDA</h1>
            </div>
        </header>

        <div class="main-container">
            <!-- Menú Lateral (Sidebar) Deslizante -->
            <aside :class="['sidebar shadow-4', { 'sidebar-mobile-open': isMenuOpen }]">
                <div class="sidebar-header">
                    <span class="text-gray-500 font-bold text-sm uppercase">Navegación</span>
                    <button class="close-btn mobile-only" @click="closeMenu" aria-label="Cerrar menú">
                        <i class="pi pi-times"></i>
                    </button>
                </div>
                <nav>
                    <ul>
                        <li>
                            <router-link to="/" class="nav-link" active-class="active" @click="closeMenuOnMobile"> <i class="pi pi-id-card mr-3 text-xl"></i> Empleados (Tarjeta) </router-link>
                        </li>
                        <li>
                            <router-link to="/puntoventa" class="nav-link" active-class="active" @click="closeMenuOnMobile"> <i class="pi pi-shopping-cart mr-3 text-xl"></i> Punto de Venta </router-link>
                        </li>
                    </ul>
                </nav>
            </aside>

            <!-- Fondo oscuro semitransparente cuando el menú se abre en celular -->
            <div v-if="isMenuOpen" class="menu-overlay mobile-only" @click="closeMenu"></div>

            <!-- Área principal donde cambia la vista -->
            <main class="content-area">
                <router-view />
            </main>
        </div>
    </div>
</template>

<script setup>
import 'primeicons/primeicons.css';
import { ref } from 'vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
    isMenuOpen.value = false;
};

const closeMenuOnMobile = () => {
    if (window.innerWidth < 992) {
        isMenuOpen.value = false;
    }
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

/* --- BARRA SUPERIOR --- */
.topbar {
    background-color: #ffffff;
    height: 65px;
    display: flex;
    align-items: center;
    padding: 0 1.25rem;
    position: sticky;
    top: 0;
    z-index: 1000;
    border-bottom: 1px solid #e2e8f0;
}

.menu-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: #eff6ff;
    border: 1px solid #bfdbfe;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    color: #1d4ed8;
    cursor: pointer;
    padding: 0.5rem 0.85rem;
    transition: all 0.2s;
}

.menu-btn:hover {
    background-color: #dbeafe;
}

.logo-container {
    margin-left: 1rem;
}

.logo-etda {
    color: #2563eb;
    font-weight: 900;
    font-size: 1.7rem;
    letter-spacing: 2px;
    margin: 0;
}

/* --- CONTENEDOR Y MENÚ LATERAL --- */
.main-container {
    display: flex;
    flex: 1;
    position: relative;
}

.sidebar {
    background-color: #ffffff;
    width: 270px;
    z-index: 2000;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #e2e8f0;
    transition: left 0.3s ease-in-out;
    /* En móvil inicia oculto fuera de la pantalla */
    position: fixed;
    top: 0;
    left: -280px;
    height: 100vh;
}

.sidebar-mobile-open {
    left: 0;
}

.sidebar-header {
    height: 65px;
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
    font-size: 1.25rem;
    color: #64748b;
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
    padding: 0.9rem 1.2rem;
    color: #475569;
    font-weight: 600;
    border-radius: 8px;
    margin-bottom: 0.5rem;
    transition: all 0.2s;
}

.nav-link:hover {
    background-color: #f1f5f9;
    color: #1e293b;
}

.nav-link.active {
    color: #2563eb;
    background-color: #eff6ff;
}

.menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(15, 23, 42, 0.45);
    z-index: 1500;
}

.content-area {
    flex: 1;
    width: 100%;
    overflow-x: hidden;
}

/* --- COMPORTAMIENTO EN PANTALLA GRANDE (Computadora >= 992px) --- */
@media (min-width: 992px) {
    .sidebar {
        position: static;
        left: 0;
        height: auto;
    }
    .mobile-only,
    .menu-btn {
        display: none !important;
    }
    .logo-container {
        margin-left: 0;
    }
}

@media print {
    .topbar,
    .sidebar {
        display: none !important;
    }
}
</style>
