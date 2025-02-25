import { useNavigate } from 'react-router-dom';

function Bot(props){
    const {BotText,navegar }= props; 
    const navigate = useNavigate(); // Hook para navegar


    const handleClick = () => {
      navigate(navegar);
    };


    return(
        <>
        <button className="ButonGeneric" onClick={handleClick}>
           {BotText}
           
        </button>
        </> 
    )
}
export default Bot; 