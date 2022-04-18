import './styles.css';
import { clearAll, getItem} from '../../utils/localStorage';
import Logo from '../../assets/logo-dark.svg';
import Avatar from '../../assets/avatar.svg';
import Exit from '../../assets/exit.svg';
import { useRef,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Header({openPerfil,setOpenPerfil}) {
  const userNameRef = useRef('????');
  const navigate = useNavigate();

  useEffect(() => {
      userNameRef.current.textContent = getItem('userName');
  }, [openPerfil])

  return (
    <header>
      <div className='header_div_left'>
        <img className='logo-img'
        src={Logo}
        alt="logo"
        />
        </div>
      
      <div className='header_div_right'>
        <img className='avatar-img'
         src={Avatar}
         alt="avatar"
         onClick={() => setOpenPerfil(true)} />
         <span
         ref={userNameRef}></span>
      <img className='exit-img'
       src={Exit} 
       alt="exit"
       onClick={() => (
        clearAll(),
        navigate('/')
       )}
        />
      </div>
   </header>
  )
};

export default Header;