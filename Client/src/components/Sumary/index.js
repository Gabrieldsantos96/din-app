import { useEffect, useRef } from 'react';
import './styles.css';
import { totalEntries,totalOut} from '../../utils/functions';

function Sumary({transactions,setOpenAModal}) {
  const entriesRef = useRef(0);
  const outRef = useRef(0); 
  const totalRef = useRef(0);

  useEffect(() => { 
    entriesRef.current.textContent = `R$: ${(totalEntries(transactions) / 100).toFixed(2)}`;
    outRef.current.textContent = `R$: ${(totalOut(transactions) / 100).toFixed(2)}`;
    totalRef.current.textContent = `R$: ${((totalEntries(transactions) / 100) - (totalOut(transactions) / 100)).toFixed(2)}`
}, [transactions])



  

  return(
    <div className="sumary_div">
    <div className="account_div">
    <h4>Resumo</h4>
    <span className='text_entry'>Entradas: <span className='entries' ref={entriesRef}></span></span>
    <span className='text_output'>Saídas: <span className='out' ref={outRef}></span></span>
    <div className='line'></div>
    <strong className='text_balance'>Saldo: <span className='balance' ref={totalRef}></span></strong> 
  </div>
  <button className='btn_purple'
  onClick={()=>{setOpenAModal(true)}}
  >Adicionar Registro
  </button>
  </div>
  )
}

export default Sumary;

