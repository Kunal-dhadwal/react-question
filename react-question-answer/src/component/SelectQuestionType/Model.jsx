import React,{useEffect,useRef,useCallback} from "react";
import * as ReactDOM from "react-dom";
import PropTypes from "prop-types";

const Modal = ({ children, showModal, toggleModal }) => {
  const element=document.getElementById("model")
  const wrapperRef = useRef(null);
  const closeModal = useCallback(
    ({ target }) => {
      if (
        wrapperRef &&
        wrapperRef.current &&
        !wrapperRef.current.contains(target)
      ) {
        toggleModal();
      }
    },
    [toggleModal]
  );

  useEffect(() => {
    /*
      React v17+ requires the "capture" property to listen to all click events in the "capturing phase"
      To learn more about the phases: https://javascript.info/bubbling-and-capturing#capturing
    */
    document.addEventListener("click", closeModal, { capture: true });

    return () => {
      document.removeEventListener("click", closeModal, { capture: true });
    };
  }, [closeModal]);

  return showModal
    ? ReactDOM.createPortal(
        <>
          <div style={{borderStyle:"solid",width:"40%",height:"50vh",zIndex:-1,transition:"0.8s",padding:"10px"}} >
            <div style={{marginTop:"40px"}}>
              <div ref={wrapperRef}>
                {children}
              </div>
            </div>
          </div>
        </>,
        element
      )
    : null;
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  showModal: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired
};
export default Modal;
