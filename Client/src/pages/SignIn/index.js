import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import api from '../../services/api';
import {getItem,setItem} from '../../utils/localStorage';

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

useEffect(() => {
  const token = getItem('token');
  
  if (token) {
    navigate('/main')
  }
},[]);

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      if (!email || !password) {
        return;
      }

      const response = await api.post('/login', 
      {
        email:email,
        senha:password
      });

      const {token, usuario} = response.data;
      setItem('token',token);
      setItem('userId',usuario.id);
      setItem('userName',usuario.nome);

        navigate('/main');

    }catch(error) {
      alert('Email ou senha inválida, por favor tente novamente!')
    }
  }

  return (
    <div className='container container_sign_in'>

      <div className="left_box">
      <h3>Controle suas <span>finanças</span>
        ,sem planilha chata.</h3>
      <p>Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem tudo num único lugar e em um clique de distância.</p>
      <button
       className='btn_purple'
       onClick={() => navigate('/sign-up')}
       >Cadastra-se</button>
      </div>
     <form className='form_sign_in'
       onSubmit={handleSubmit}>

        <h2>Login</h2>
        <label>
        E-mail:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        </label>
        <label>
          Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        </label>
        
        <button className='btn_purple'>
          Entrar
        </button>
        
      </form>
    </div>
 
  );
}

export default SignUp;
