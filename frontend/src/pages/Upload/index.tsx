import React, { useState } from 'react';

/** Components */
import GridRow from '../../common/template/GridRow';
import GridCol from '../../common/template/GridCol';
import InputFile from '../../common/template/InputFile';
import Modal, { ModalTypeInfo } from '../../common/template/Modal';

import ApiUpload from '../../services/ApiUpload';


const initialFileName = 'Select File'

export default function Upload() {


  const [file, setFile] = useState<any>();
  const [fileName, setFileName] = useState<string>(initialFileName);
  const [modal, setModal] = useState<{ info?: ModalTypeInfo, open?: boolean }>({ open: false })

  function handleSelectFile(e: any) {

    const formData = new FormData();
    formData.append('file', e.target.files[0])
    setFile(formData)
    setFileName(e.target.files[0].name)
  }

  function handleSubmit(e: any) {
    e.preventDefault();

    setModal({ open: true, info: 'load' });

    const config = { headers: { 'content-type': 'multipart/form-data' } }

    ApiUpload.post('upload', file, config)
      .then(() => setModal({ open: true, info: 'success' }))
      .catch(() => setModal({ open: true, info: 'error' }))
      .finally(() => setTimeout(() => {
        setModal({ open: false })
        setFileName(initialFileName)
      }, 1500))
  }


  return (
    <React.Fragment>
      <GridRow>
        <GridCol length={12}>
          <GridCol length={6}>
            <div className="card card-secundary">

              <div className="card-header">
                <h3 className="card-title"> Upload file </h3>
              </div>

              <form className="form" onSubmit={handleSubmit}>
                <div className="card-body">
                  <InputFile
                    id="file"
                    name="file"
                    label="Custom File"
                    fname={fileName}
                    onChange={handleSelectFile}
                  />

                  <button type="submit" className="btn btn-outline-secondary">Upload</button>
                </div>
              </form>
            </div>
          </GridCol>
        </GridCol>
      </GridRow >
      <Modal id="modalUploadFile" open={modal.open} info={modal.info} />
    </React.Fragment>
  );
}




