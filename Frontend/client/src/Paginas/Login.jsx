import MenuBar from "../Components/MenuBar";
import FormLogin from "../Components/FormLogin";
import Loginlogic from "../Components/FormLogin";

function Login() {
    return (
        <div className="full-background">
            <MenuBar>
            </MenuBar>
            <div className='containerP'>
                <div>
          <Loginlogic/>
          </div>
            </div>
        </div>
    );
}

export default Login;