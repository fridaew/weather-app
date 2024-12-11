import React, {useRef} from 'react'

const Modal = ({onClose}) => {
 const modalRef = useRef()

 const closeModal = (e) =>{
    if(modalRef.current === e.target){
        onClose();
    }
 }
  return (
    <div ref={modalRef} onClick={closeModal}>
      <button onClick={onClose}>X</button>
      <h1>Modal</h1>
      <ul>
        <li>Väder</li>
      </ul>
    </div>
  )
}

export default Modal







