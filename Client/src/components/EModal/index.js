import './styles.css';
import {useEffect,useRef,useState} from 'react';
import closeIcon from '../../assets/close.svg';
import api from '../../services/api';
import {getItem} from '../../utils/localStorage';
import {getDateEdit} from '../../utils/functions';

function EModal({openEModal,
  setopenEModal,currentTransaction,transactions,setTransactions,categories,setChangeCategory,changeCategory}) {
  
  const [topPosition,setTopPosition] = useState(0);
  const [type,setType] = useState(false);
  const leftRef = useRef('');
  const rightRef = useRef('');
  const [form,setForm] = useState({
    type: '',
    value:'',
    category:'',
    date:'',
    description:''
})

  useEffect(() => {
    setTopPosition(50);
    
    
  },[openEModal])
  
  useEffect(() => {
    
    setForm({
      category : currentTransaction.categoria_id,
      type : currentTransaction.tipo,
      date : getDateEdit(currentTransaction.data),
      value : (currentTransaction.valor / 100 ),
      description : currentTransaction.descricao,
    })
  
    currentTransaction.tipo === 'entrada' ? setType(true) : setType(false);
  },[currentTransaction]);

  useEffect(() => {
    type ? setForm({...form,type:'entrada'}) : setForm({...form, type:'saida'});
  },[type])
  

  function handleChangeInput (e) {
    setForm({...form, [e.target.name]: e.target.value})
  }

  

  function handleChangeTransactionType() {
    type ? setType(false) : setType(true)
  }
  
  async function handleSubmit(e) {
    e.preventDefault(); 
    
    const token = getItem('token');
    try {
      const response = await api.put(`/transaction/${currentTransaction.id}`, 
      {
      categoria_id : form.category,
      tipo : form.type,
      data : form.date,
      valor : Number(form.value * 100),
      descricao : form.description
    },
    {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    },
      
    );
    
     const localTransactions = [...transactions];

     const index = localTransactions.findIndex((transaction) => {
      return transaction.id === currentTransaction.id;
    })
      

      const category = categories.find((item) => {
        return Number(item.id) === Number(form.category);
      })
      
      
      localTransactions[index].tipo = form.type;
      localTransactions[index].descricao = form.description;
      localTransactions[index].categoria_id = form.category;
      localTransactions[index].categoria_nome = category.descricao;
      localTransactions[index].valor = form.value * 100;
      localTransactions[index].data = form.date;

      

    setTransactions(localTransactions);
     

      setTimeout(() => {
        setopenEModal(false);
      }, 1000);

    }catch(error) {
      alert(error.message)
    }
  }

  
return (
  <> { openEModal &&
  <div className='general_container'>
    <div className='modal'
    style={{ top: topPosition }}>
      <div className='general_modal'>
     
        
        <img 
        src={closeIcon}
        alt=""
        onClick={()=>{setopenEModal(false)}} />
      
         
      <form className='form_edit'
      onSubmit={handleSubmit}>
       <h2>Editar Registro</h2>
      <div className='div_contain_btn'>
          <button 
           name='type'
           type='button'
           value={form.category}
           ref={leftRef}
           className={`${type ? 'btn btn_blue' : 'btn btn_inactive'}`} 
           onClick={() => (handleChangeTransactionType())}
           >Entrada
           </button>
          <button 
          name='type'
          type='button'
          value={form.category}
          ref={rightRef}
          className={`${type ? 'btn btn_inactive' : 'btn btn_red'}`}
          onClick={() => (handleChangeTransactionType())}
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

export default EModal;