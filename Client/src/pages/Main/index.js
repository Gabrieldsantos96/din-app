import './styles.css';
import {format} from 'date-fns';
import filterIcon from '../../assets/filter-icon.svg';
import Orderby from '../../assets/orderby.svg';
import api from '../../services/api';
import {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {getItem} from '../../utils/localStorage';
import Header from '../../components/Header';
import Sumary from '../../components/Sumary';
import Transaction from '../../components/Transaction';
import AModal from '../../components/AModal';
import EModal from '../../components/EModal';
import Perfil from '../../components/Perfil';
import Filter from '../../components/Filter';


function Main() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [openAModal,setOpenAModal] = useState(false);
  const [openEModal,setopenEModal] = useState(false);
  const [openPerfil,setOpenPerfil] = useState(false);
  const [categories,setCategories] = useState({});
  const [openFilter,setOpenFilter] = useState(false);
  const [activeItems, setActiveItems] = useState([]);
  const [order,setOrder] = useState(false);
  const [currentTransaction,setCurrentTransaction] = useState({
    tipo: '????',
    categoria_id: 1,
    valor:0,
    descricao: '????',
    data: '2012-12-12T00:00:00.000Z'
  });
  
  
  useEffect(() => {
    const token = getItem('token'); 
    if (token) {
      navigate('/main');
    }
  loadTransactions();
  getCategory();
  },[]);

  useEffect(() => {
    handleSort();
  },[order]);


  function handleSort(){
    const local = [...transactions]
    local.sort((a,b) => {
    const dateB = new Date(b.data)
    const dateA = new Date(a.data)
    return order ? +dateB - +dateA : +dateA - +dateB
    })
    setTransactions(local);
  }
  
  function filterTransactions() {
    if (activeItems.length === 0) {
      return;
    } else {
      const localTransactions = [...transactions]
      const arrayAux = [];
      activeItems.map((category_id) => {
        let x = localTransactions.filter((transaction) => transaction.categoria_id == category_id)
        arrayAux.push(...x)
      })
     
      setTransactions(arrayAux);
    }
    
  }

  function handleSetCurrentTransaction (transaction) {
    setCurrentTransaction(transaction);
    setopenEModal(true);
  }

  async function getCategory() {
    const token = getItem('token');

    try {
      const response = await api.get('/category',{
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      const {data} = response;
      
      const localCategories = data;

      setCategories(localCategories)
      
    } catch(error) {
      alert(error.message)
    }
  }

  
  async function loadTransactions () {
    
      const token = getItem('token');
      try {
        const response = await api.get('/transaction',{
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        const { data } = response;
  
        const localTransactions = data;
        
        setTransactions(localTransactions);
  
  
      } catch (error) {
        alert(error.message)
      }
    
    
  }

  async function handleDModal (id) {
    const token = getItem('token');
    try {
      const response = await api.delete(`/transaction/${id}`,
        {
        headers:{
          Authorization: `Bearer ${token}` 
          }
        }
    );
      const localTs = [...transactions];

      const transactionDeleted = localTs.findIndex((transaction) => transaction.id === id);

      localTs.splice(transactionDeleted,1);

      setTransactions(localTs);

    }catch(error) {
      alert(error.message)
    }
  }
  
   return (
      
    <div className='container container_main'>
      <Header
      openPerfil={openPerfil}
      setOpenPerfil={setOpenPerfil}/>
      
      <Sumary 
      transactions={transactions} 
      setOpenAModal={setOpenAModal}
      />
     <div className='border'></div>
      <div className="transactions">
        <div className="filter_div">
          <div className="filter_bar">
            <img 
            src={filterIcon}
            alt=""
            onClick={() => openFilter ? setOpenFilter(false) : setOpenFilter(true)} />
            
            
          </div>
          
        </div>
        <Filter
            activeItems={activeItems}
            setActiveItems={setActiveItems}
            categories={categories}
            openFilter={openFilter}
            filterTransactions={filterTransactions}
            loadTransactions={loadTransactions}
            />
        <div className="transaction_bar">
          <strong className='align_text'
          onClick={() => order ? setOrder(false) : setOrder(true) }
          >Data <img
           src={Orderby}
           className = { order ? 'dec' : 'asc'}/>
           </strong>
          <strong className='align_text'>Dia da semana</strong>
          <strong className='align_text'>Descrição</strong>
          <strong className='align_text'>Categoria</strong>
          <strong className='align_text'>Valor</strong>
        </div>
        { 
        transactions.map((transaction) => (
          <Transaction 
          key={transaction.id}
          transaction={transaction}
          handleSetCurrentTransaction={handleSetCurrentTransaction}
          handleDModal={handleDModal}
          
           />
        ))
      }

          

      </div>
     
        <AModal 
      openAModal={openAModal}
      setOpenAModal={setOpenAModal}
      transactions={transactions}
      setTransactions={setTransactions}
      categories={categories}
 />
        <EModal
      openEModal={openEModal}
      setopenEModal={setopenEModal}
      currentTransaction={currentTransaction}
      transactions={transactions}
      setTransactions={setTransactions}
      categories={categories} 
  />
      <Perfil
      openPerfil={openPerfil}
      setOpenPerfil={setOpenPerfil}
      />

   
    </div>
    
  );
}

export default Main;
