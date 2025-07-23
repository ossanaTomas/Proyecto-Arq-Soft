/*import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useAnimation } from "framer-motion";
import "./RollingImage.css";

// Array de imágenes por defecto si no se proveen a través de props.
const DEFAULT_IMGS = [
  "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1495103033382-fe343886b671?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1506781961370-37a89d6b3095?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1599576838688-8a6c11263108?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1494094892896-7f14a4433b7a?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1664910706524-e783eed89e71?q=80&w=3869&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const RollingGallery = ({ images = [], autoplay = false, pauseOnHover = false }) => {
  // Hooks de React y Framer Motion declarados en el nivel superior.
  const [isScreenSizeSm, setIsScreenSizeSm] = useState(window.innerWidth <= 640);
  const rotation = useMotionValue(0);
  const controls = useAnimation();
  const autoplayRef = useRef(null);

  // Usa las imágenes de las props, o las imágenes por defecto si el array de props está vacío.
  const galleryImages = images && images.length > 0 ? images : DEFAULT_IMGS;
  
  // Variables calculadas
  const faceCount = galleryImages.length;
  const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
  const radius = cylinderWidth / (2 * Math.PI);
  const faceWidth = cylinderWidth / faceCount;
  const dragFactor = 0.05;
  const rotationAngle = 360 / faceCount;

  // Funciones de control de la animación
  const handleDrag = (_, info) => {
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_, info) => {
    controls.start({
      rotateY: rotation.get() + info.velocity.x * dragFactor,
      transition: { type: "spring", stiffness: 60, damping: 20, mass: 0.1 },
    });
  };

  const stopAutoplay = () => {
    clearInterval(autoplayRef.current);
    controls.stop();
  };
  
  const startAutoplay = useCallback(() => {
    stopAutoplay(); // Asegurarse de limpiar cualquier intervalo anterior
    autoplayRef.current = setInterval(() => {
      const newRotation = rotation.get() - rotationAngle;
      rotation.set(newRotation);
      controls.start({
        rotateY: newRotation,
        transition: { duration: 1.9, ease: "linear" },
      });
    }, 2000);
  }, [controls, rotation, rotationAngle]);


  // Effect para manejar el cambio de tamaño de la ventana.
  useEffect(() => {
    const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Effect para controlar el autoplay.
  useEffect(() => {
    if (autoplay) {
      startAutoplay();
    }
    // La función de limpieza se encarga de detener el intervalo al desmontar el componente.
    return () => stopAutoplay();
  }, [autoplay, startAutoplay]);


  // Handlers para pausar y reanudar la animación con el mouse.
  const handleMouseEnter = () => {
    if (autoplay && pauseOnHover) {
      stopAutoplay();
    }
  };

  const handleMouseLeave = () => {
    if (autoplay && pauseOnHover) {
      startAutoplay();
    }
  };

  return (
    <div className="gallery-container">
      <div className="gallery-gradient gallery-gradient-left"></div>
      <div className="gallery-gradient gallery-gradient-right"></div>
      <div className="gallery-content">
        <motion.div
          drag="x"
          className="gallery-track"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            width: cylinderWidth,
            rotateY: rotation,
            transformStyle: "preserve-3d",
          }}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          animate={controls}
        >
          {galleryImages.map((url, i) => (
            <div
              key={i} // Para una lista estática, el índice es aceptable. Si la lista cambia, usa un ID único.
              className="gallery-item"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${i * rotationAngle}deg) translateZ(${radius}px)`,
              }}
            >
              <img src={url} alt={`gallery-image-${i}`} className="gallery-img" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RollingGallery;*/