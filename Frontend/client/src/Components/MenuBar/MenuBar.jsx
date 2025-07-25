
import styles from './MenuBar.module.css'

function MenuBar({ children }) {
   

    return (
        <header className={styles.header}>
            <div className={styles.MenuBarContent} >
                <h1 className={styles.title}>MundoHospedaje</h1>
                <nav className={styles.navlist}>  
                    {children}
                </nav>
            </div>
        </header>

    )
}

export default MenuBar; 