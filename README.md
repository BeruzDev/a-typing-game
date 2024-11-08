# A Typing Game - Juego de Mecanografía Interactivo 🖥️💬

Una aplicación web diseñada para mejorar la velocidad y precisión en la mecanografía. A Typing Game permite a los usuarios practicar con palabras, frases, o incluso fragmentos de código en varios lenguajes, proporcionando un seguimiento de métricas en tiempo real.

## 📋 Índice

- [Características](#características)
- [Capturas de Pantalla](#capturas-de-pantalla)
- [Despliegue](#despliegue)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## ✨ Características

- **Práctica de Mecanografía**: Practica con palabras, frases, o fragmentos de código subidas por el usuario.
- **Panel de Métricas en Tiempo Real**: Visualización en vivo de velocidad, precisión y errores.
- **Modo Oscuro/Claro**: Cambia el tema para facilitar la lectura en distintos ambientes.
- **Sesión de Usuario**: Inicia sesión para guardar tus estadísticas y objetivos diarios.
- **Personalización de Dificultad**: Ajusta la dificultad eligiendo entre palabras largas o cortas y frases de distintas dificultades.
- **Modo Extremo**: Modo avanzado en el que solo se muestra la letra actual y sus alrededores, como si estuvieras en una “habitación oscura”.

## 🖼️ Capturas de Pantalla

_**(TODAVÍA ESTOY TRABAJANDO EN ELLO!!)**_

## 🚀 Despliegue

Accede a la aplicación en el siguiente enlace:

[**A Typing Game**](https://typing-game.netlify.app)  *(enlace provisional, todavía no esta deployed)*

## 🕹️ Uso

1. Accede a la página y selecciona el tipo de práctica (palabras, frases o código).
2. Escribe en el cuadro de texto en el centro para comparar con el texto objetivo.
3. Observa las métricas en tiempo real, como la velocidad, precisión y errores.
4. Puedes iniciar sesión si deseas guardar tu progreso o continuar como invitado.
5. Ajusta el modo de visualización claro/oscuro usando el conmutador de tema.

## 📂 Estructura del Proyecto

```plaintext
src
├── components
│   ├── InputBox.jsx          # Componente donde el usuario escribe
│   ├── ModeSwitcher.jsx      # Selector de modo claro/oscuro
│   ├── StatsPanel.jsx        # Panel de métricas en tiempo real
│   ├── Summary.jsx           # Resumen al final de la sesión
│   └── TextDisplay.jsx       # Componente que muestra el texto objetivo
├── hooks
│   └── useTimer.js           # Hook personalizado para controlar el temporizador
├── styles
│   ├── main.scss             # Estilos principales y variables globales
│   ├── base
│   │   ├── _reset.scss       # Estilos de reset
│   │   └── _typography.scss  # Estilos de tipografía
│   ├── components
│   │   ├── _InputBox.scss
│   │   ├── _StatsPanel.scss
│   │   └── _TextDisplay.scss
│   ├── layout
│   │   ├── _container.scss
│   │   ├── _footer.scss
│   │   └── _header.scss
│   └── utils
│       ├── _colors.scss      # Paleta de colores
│       ├── _functions.scss   # Funciones Sass
│       └── _mixins.scss      # Mixins de estilos
├── App.js
└── index.js

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React, Sass
- **Estilos**: SCSS, CSS Modules
- **Despliegue**: Netlify

## 🤝 Contribuciones

Las contribuciones son bienvenidas. 
Si deseas mejorar el proyecto, abre un issue o envía un pull request.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
