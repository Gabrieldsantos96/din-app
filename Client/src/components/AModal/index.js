import './styles.css';
import {useEffect,useRef,useState} from 'react';
import closeIcon from '../../assets/close.svg';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import {getItem} from '../../utils/localStorage';
import {getDate} from '../../utils/functions';



function AModal({openAModal,setOpenAModal,transactions,setTransactions,categories}) {
  const navigate = useNavigate;
  const [topPosition,setTopPosition] = useState(0);
  const [type,setType] = useState(false);
  const leftRef = useRef('');
  const rightRef = useRef('');
  const [form,setForm] = useState({
    type: 'saida',
    value:'',
    category:'',
    date:'',
    description:''
})

  useEffect(() => {
    setTopPosition(50);
    setType(false);
  },[openAModal])

  useEffect(() => {
    !type ? setForm({...form,type:'saida'}) : setForm({...form, type:'entrada'});
  },[type])


  function handleChangeTransactionType() {
    !type ? setType(true) : setType(false);
}

  function handleChangeInput (e) {
    setForm({...form, [e.target.name]: e.target.value})
  }
  
  async function handleSubmit(e) {
  
    e.preventDefault(); 

    const token = getItem('token');
    try {
      const response = await api.post('/transaction', 
      {
        tipo: form.type,
        descricao: form.description,
        valor: Number(form.value * 100),
        data: form.date,
        categoria_id: Number(form.category)
    },
    {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    },
      
    );
      const { data } = response;

      const localTransactions = ([...transactions,data]);

      setTransactions(localTransactions);
      
      setTimeout(() => {
        setOpenAModal(false);
      }, 1000);

    }catch(error) {
      alert(error.message)
    }
  }

  
return (
  <>{openAModal &&

  <div className='general_container'>
    <div className='modal'
    style={{ top: topPosition }}>
      <div className='general_modal'>
      <h2>Adicionar Registro</h2>
        
        <img 
        src={closeIcon}
        alt=""
        onClick={()=>{setOpenAModal(false)}} />

      
         
      <form className='form_add'
      onSubmit={handleSubmit}>
      <div className='div_contain_btn'>
          <button 
           name='type'
           type='button'
           value={form.category}
           ref={leftRef}
           className={`${type ? 'btn btn_blue' : 'btn btn_inactive'}`}
           onClick={() => handleChangeTransactionType()}
           >Entrada
           </button>
          <button 
          name='type'
          type='button'
          value={form.category}
          ref={rightRef}
          className={`${type ? 'btn btn_inactive' : 'btn btn_red'}`}
          onClick={() => handleChangeTransactionType()}
          >Saída
          </button>
        </div>
        
          <label>
            Valor
            </label>
          <input
          name='value' 
          type="text"
          value={form.value}
          placeholder='R$'
          onChange={handleChangeInput}
          required />
          

          <label>
            Categoria
            </label>
            <select 
            name="category"
            id=""
            value={form.category}
            onChange={handleChangeInput}
            required>
            <option defaultValue=''>Selecione</option>
          {
            categories.map ((category) => (
              <option key={category.id} value={category.id}>{category.descricao}</option>
            ))
          }
        </select>
  
            <label>
              Data
              </label>
            <input
            name='date' 
            type="date"
            value={form.date}
            placeholder='Mês/Dia/Ano'
            onChange={handleChangeInput}
            required />
            

          <label>
              Descrição
              </label>
            <input 
            name='description' 
            type="text"
            value={form.description}
            placeholder='Celular'
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

export default AModal;