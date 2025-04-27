

function MenuBar({ children }) {
    return (
        <header className="header">
            <div className="MenuBarContent" >
                <h1 className="title">MundoHospedaje</h1>
                <nav className="nav-list">  
                    {children}
                </nav>
            </div>
        </header>

    )
}

export default MenuBar; 