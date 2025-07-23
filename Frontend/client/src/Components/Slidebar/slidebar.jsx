import React, { useState } from 'react';
import styles from './slidebar.module.css'

const SidebarSection = ({ title, items, onSelect }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className={styles.sidebarsection}>
      <div className={styles.sidebarSectionIitle} onClick={() => setOpen(!open)}>
        {title}
        <span className={styles.toggleicon}>{open ? '▼' : '▶'}</span>
      </div>
      {open && (
        <ul className={styles.sidebarsubitems}>
          {items.map((item, index) => (
            <li 
            key={index}
            onClick={()=>onSelect(title,item)}
             className={styles.sidebarsubitem}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const AdminSidebar = ({ onSelect }) => {
  return (
    <div  className={`${styles.adminSidebar} sidebar`}>
      <h2 className={styles.sidebarheader}>Administrar</h2>

      <SidebarSection
        title="Hoteles"
        items={['Ver todos y editar', 'Agregar nuevo']}
        onSelect={onSelect}
      />

      <SidebarSection
        title="Amenities"
        items={['Gestionar']}
        onSelect={onSelect}
      />

      <SidebarSection
        title="Reservas"
        items={['Ver reservas', 'Estadísticas-(Proximante)']}
        onSelect={onSelect}
      />

      <SidebarSection
        title="Usuarios"
        items={['Ver todos']}
        onSelect={onSelect}
      />
    </div>
  );
};

export default AdminSidebar;
