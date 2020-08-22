import React from 'react'


export type ModalTypeInfo = 'load' | 'success' | 'error' | '';

export interface ModalProps {
  id: string;
  open?: boolean;
  info?: ModalTypeInfo;
}

const Modal: React.FC<ModalProps> = props => {

  const iconInfo = (function (open) {
    const modal = props.open ? 'show' : 'hide'
    $(`#${props.id}`).modal(modal);

    switch (props.info) {
      case 'load':
        return 'fas fa-10x fa-sync fa-spin';
      case 'success':
        return 'far fa-10x fa-check-circle';
      case 'error':
        return 'fas fa-10x fa-times';
      default:
        return '';
    }

  })(props.open)

  return (
    <div className="modal fade" id={props.id} data-backdrop="static" data-keyboard="false">
      <div
        className="modal-dialog modal-dialog-centered modal-sm"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <i className={`${iconInfo}`}></i>
      </div>
    </div>
  );
}

export default Modal

export const handleModalInfo: Function = (call: Function) => {
  call()
}