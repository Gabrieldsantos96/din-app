import { useEffect } from 'react';
import './styles.css';


function Filter({categories,openFilter,activeItems,setActiveItems,filterTransactions,loadTransactions}) {

  useEffect(() => {
    setActiveItems([]);
    
  },[]);

  function handleIncludesItem(id) {
    const localItems = [...activeItems];

    localItems.push(id);

    setActiveItems(localItems);
  }

    function handleCleanUp() {
    setActiveItems([])
    loadTransactions();
  }


  return (
    <>
   { openFilter &&
  <div className="filter_container">
  <h4>Categorias</h4>
<div className='filter_contain_Items'>
  
  {
  categories.map ((category) => (
    <button  
    className={`${activeItems.includes(category.id) ?'btn_filter_active' :'btn_filter_inactive'}`} 
    key={category.id}
    onClick={()=>handleIncludesItem(category.id)}
    >{category.descricao} +</button>
    ))
  }
</div>
<div>
    <button className=
    'btn_filter_inactive'
    onClick={handleCleanUp}
    >Limpar Filtros
    </button>

    <button
    className='btn_filter_active'
    onClick={()=> filterTransactions()}
    >Aplicar Filtros
    </button>
  </div>
  </div>

   }
    </>
  )
}


export default Filter;