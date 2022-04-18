import './styles.css';
import {useEffect,useRef,useState} from 'react';
import closeIcon from '../../assets/close.svg';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import {getItem, setItem} from '../../utils/localStorage';



function Perfil({openPerfil,setOpenPerfil}) {
  const navigate = useNavigate;
  const [topPosition,setTopPosition] = useState(0);
  const [categories,setCategories] = useState([]);
  const [type,setType] = useState(false);
  const leftRef = useRef('');
  const rightRef = useRef('');
  const [form,setForm] = useState({
    nome: '',
    email: '',
    password: '',
    checkpassword: ''
})

  useEffect(() => {
    setTopPosition(50);
    loadUser();

    
  },[openPerfil])


  function handleChangeInput (e) {
    setForm({...form, [e.target.name]: e.target.value})
  }
  
  async function loadUser() {
    const token = getItem('token');
    try {
      const response = await api.get('/user/', 
    {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    }
      
    );
     
      const { data } = response;
      setForm({
        name : data.nome,
        email: data.email,
      })

    } catch(error) {
      alert(error.response.data.message)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault(); 

    if(form.password !== form.checkpassword) {
      window.alert('Por favor, confirme se a senha informada no campo de confirmação de senha é o mesma informada no campo de senha ');
      return;
    }

    if(form.password.length < 8) {
      window.alert('Por favor, Digite uma senha com mais de 8 caracteres');
      return;
    }

    const token = getItem('token');
    try {
      const response = await api.put('/user', 
      {
      nome: form.name,
      email: form.email,
      senha: form.password
    },
    {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    },
      
    );
    
    setItem('userName',form.name);
    
      setTimeout(() => {
        setOpenPerfil(false);
      }, 1000);

    }catch(error) {
      alert('Houve algum erro com a atualização do perfil, por favor tente novamente!')
    }
  }

  
return (
  <>
  {openPerfil &&

  <div className='general_container'>
    <div className='modal'
    style={{ top: topPosition }}>
      <div className='general_modal'>
      <h2>Editar perfil</h2>
        
        <img 
        src={closeIcon}
        alt=""
        onClick={()=>{setOpenPerfil(false)}} />

     <form className='form_perfil'
      onSubmit={handleSubmit}>
            <label>Nome</label>
            <input
            name='name' 
            type="text"
            value={form.name}
            placeholder='Nome'
            onChange={handleChangeInput}
            required />

            <label>Email</label>  
             <input
            name='email' 
            type="email"
            value={form.email}
            placeholder='Email'
            onChange={handleChangeInput}
            required />
            <label>Senha</label>
           <input 
            name='password' 
            type="password"
            value={form.password}
            placeholder='Senha'
            onChange={handleChangeInput}
            required />
            <label>Confirmação de senha</label>
            <input 
            name='checkpassword' 
            type="password"
            value={form.checkpassword}
            placeholder='Confirmação de senha'
            onChange={handleChangeInput}
            required />
            
            <div className="div_btn_confirm">
            <button 
            className='btn btn_purple btn_confirm'
            onClick={(e)=> handleSubmit(e)}
            >Confirmar</button>
            </div>
             

      </form>
      </div>
    </div>
  </div>
    }
  </>
)}

export default Perfil;