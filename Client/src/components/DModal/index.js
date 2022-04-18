import './styles.css';

function DModal({transaction,handleDModal,setOpenPopup}) {
  return (
    <div className='div_popup'>
      <span>Apagar item?</span>
      <div className='div_contain_items'>
      <button className='left'
      onClick={() => handleDModal(transaction.id)}
      >Sim
      </button>
      <button className='right'
      onClick={() => setOpenPopup(false)}
      >Não
      </button>
      </div>
   </div>
  )
}

export default DModal;