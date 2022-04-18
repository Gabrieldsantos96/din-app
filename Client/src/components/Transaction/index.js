import DModal from '../../components/DModal';
import Edit from '../../assets/edit.svg';
import Delete from '../../assets/delete.svg';
import './styles.css';
import {getDayOfWeek,getDate,getDateBla} from '../../utils/functions'; 
import { useState,useEffect,useRef } from 'react';


function Transaction({transaction,handleSetCurrentTransaction,handleDModal}) { 

  
  const thisValueRef = useRef(0);
  const [OpenPopup,setOpenPopup] = useState(false);

  useEffect(() => {
    handleChangeValueColor();
  },[transaction.tipo]) 

  function handleChangeValueColor() {
    if (transaction.tipo === 'entrada') {
      thisValueRef.current.style.color = '#3A9FF1';
    } else {
      thisValueRef.current.style.color = '#FA8C10';
    }
  }

  return (
    <div className='transaction'>
     <span className='align_text'>{ getDate(transaction.data)}</span>
     <span className='align_text'>{getDayOfWeek(transaction.data)}</span>
     <span className='align_text'>{transaction.descricao}</span>
     <span className='align_text'>{transaction.categoria_nome}</span>
     <span className='value align_text' ref={thisValueRef}>R$ {(transaction.valor / 100).toFixed(2)}</span>
     <div>
       <img
       src={Edit}
       alt=""
       onClick={()=> handleSetCurrentTransaction(transaction)}
       />

       <img className='delete-icon'
       src={Delete}
       alt=""
       onClick={() => OpenPopup ? setOpenPopup(false) : setOpenPopup(true)}
       
       />  
     </div>
     { OpenPopup &&
      <DModal
      transaction={transaction}
      handleDModal={handleDModal}
      setOpenPopup={setOpenPopup}
      />
     }
     
     
    </div>
  )
  
};

export default Transaction;