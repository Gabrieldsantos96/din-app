import { useEffect, useState,useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import api from '../../services/api';
import {getItem} from '../../utils/localStorage';
import { set } from 'date-fns';

function SignUp() {
  const navigate = useNavigate();
  const [form,setForm] = useState({
    name:'',
    email:'',
    password:'',
    checkpassword:''
})
  

useEffect(() => {
  const token = getItem('token');
  
  if (token) {
    navigate('/main')
  }
},[]);

  function handleChangeInput (e) {
    setForm({...form, [e.target.name]: e.target.value})
  }
  

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.checkpassword !== form.password) {
      window.alert('A senha digitada no campo de confirmação de senha deve ser igual a senha digitada no campo anterior');
      return;
    }

    if (form.password.length < 8) {
      window.alert('Por favor, Digite uma senha com mais de 8 caracteres');
      return;
    }
     
    try {

      const response = await api.post('/user', 
      {
        nome: form.name,
        email: form.email,
        senha: form.password
      });
  
      navigate('/');
    }catch(error) {
      alert('Houve algum erro com o cadastro, por favor tente novamente!')
    }
  }

  return (
    <div className='container container_sign_up'>
      <form className='form_sign_up'
      onSubmit={handleSubmit}>
       
        <h2>Cadastra-se</h2>
      <label>
        Nome
      <input
      name='name' 
      type="text"
      value={form.name}
      onChange={handleChangeInput}
      required />
      </label>

      <label>
        E-mail
      <input
      name='email' 
      type="email"
      value={form.email}
      onChange={handleChangeInput}
      required />
      </label>

      <label>
        Senha
      <input
      name='password' 
      type="password"
      value={form.password}
      onChange={handleChangeInput}
      required />
      </label>
     <label>
        Confirmação de Senha
      <input 
      name='checkpassword' 
      type="password"
      value={form.checkpassword}
      onChange={handleChangeInput}
      required />
      </label>
      
      <button className='btn_purple'>Cadastrar</button>
      <span
       onClick={() => navigate('/')}
       >Já tem cadastro aqui? Clique aqui</span>
      </form>
     </div>
      );
  }
export default SignUp;
