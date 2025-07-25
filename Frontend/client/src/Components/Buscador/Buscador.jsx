
import styles from './Buscador.module.css'


function Buscador({ onSearchChange, onSortChange }) {
  return (
    <div className={styles.buscadorContainer}>
      <input
        type="text"
        placeholder="Buscar por nombre..."
        className={styles.inputText}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select
        className={styles.selectOrden}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="">Ordenar por...</option>
        <option value="nombre_asc">Nombre A-Z</option>
        <option value="nombre_desc">Nombre Z-A</option>
        <option value="creacion">Fecha de creación</option>
      </select>
    </div>
  );
}

export default Buscador;