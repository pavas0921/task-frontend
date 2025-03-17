# 🧑‍💻 Task Frontend React

Este es un proyecto frontend desarrollado con **React 19** que consume una API propia para autenticación y gestión de tareas. Utiliza tecnologías modernas como Material-UI, Redux Toolkit, React Router y más para ofrecer una experiencia eficiente y escalable.

## 🚀 Características principales

- **Consumo de API propia**: Integra una API personalizada para gestionar los datos.
- **Estado global con Redux Toolkit**: Gestión eficiente del estado de la aplicación.
- **Enrutamiento dinámico**: Manejo de rutas con `react-router-dom`.
- **Componentes estilizados**: Uso de Material-UI una interfaz moderna y responsiva.

## 📦 Tecnologías utilizadas

- **React 19**: Biblioteca principal para la construcción de la interfaz.
- **Redux Toolkit**: Manejo de estado global simplificado.
- **React Router**: Navegación entre vistas.
- **Material-UI**: Componentes estilizados y personalizables.


## 📂 Estructura del proyecto

```
📦 tu-proyecto-react
├── 📂 node_modules
├── 📂 src
│   ├── 📂 app          # Store de datos redux  toolkit para gestion de estados
│   ├── 📂 components   # Componentes reutilizables
│   ├── 📂 features     # Lógica de negocio (Redux slices)
│   ├── 📂 pages        # Vistas de la aplicación
│   ├── 📂 services     # Peticiones a la API
│   ├── 📂 router       # Rutas de la app
│   └── main.jsx       # Punto de entrada
└── package.json
```

## 🛠️ Requisitos previos

- Node.js (v18 o superior)

## 📋 Instalación y ejecución

Clona el repositorio y accede a la carpeta del proyecto:

```bash
# Clonar el repositorio
git clone https://github.com/pavas0921/task-frontend.git

# Acceder al directorio
cd task-frontend

# Instalar las dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

Accede a la aplicación en **http://localhost:5173**.


## Comentarios

Para efectos de esta prueba, no se uso un archivo de variables de entorno, para facilitar su ejecución para su revisión. 

