
import MenuBar from "../../Components/MenuBar/MenuBar";
import FormLogin from "../../Components/FormLogin/FormLogin";
import Loginlogic from "../../Components/FormLogin/FormLogin";
import styles from './Login.module.css';



function Login() {



    return (
        <div className={styles.container}>
          <MenuBar />
          <main className={styles.main}>
            <FormLogin />
          </main>
        </div>
      );
    }

export default Login