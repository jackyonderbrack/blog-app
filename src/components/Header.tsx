import { NavLink } from "react-router-dom"
import './header.css'

interface NavigationProps {
    name: string,
    href: string,
    
}

const navigation: NavigationProps[] = [
    {name: 'Strona główna', href: "/"},
    {name: '+Dodaj nowe wydarzenie', href: "/add-event"},
]

function Header() {
    return (
        <header>


<nav className="d-flex container gap-2 my-4">
    {navigation.map(item => (
        <NavLink className="nav-item p-2"
            key={item.name}
            to={item.href}
        >
            <span className="nav-link">{item.name}</span>
        </NavLink>   
    ))}
</nav>

            
            
            
            
        </header>
    )
}

export default Header;