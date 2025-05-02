import { useNavigate } from 'react-router-dom';
import styles from "./Boton.module.css"

function Bot(props){
  const { BotText, navegar, onClick } = props; 
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick(); 
    if (navegar) navigate(navegar); 
  };

  return(
      <button className={styles.ButonGeneric} onClick={handleClick}>
          {BotText}
      </button>
  )}
export default Bot; 