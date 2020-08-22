import React, { useState, useEffect } from 'react';

/** Components */
import GridRow from '../../common/template/GridRow';
import GridCol from '../../common/template/GridCol';
import DataTable, { DataTableProps } from '../../common/template/DataTable';
import Modal, { ModalTypeInfo } from '../../common/template/Modal';

import ApiUpload from '../../services/ApiUpload';

const mockFileName = 'OutroExemploGrande_20200820110836000_9e7914c2086bba34db565ac2dc6c665b.xlsx'

export default function FileData() {

  const initDataFile: DataTableProps = {
    tableTitle: '',
    columns: [{ column: '', value: '' }],
    data: [{}]
  }

  const [dataFiles, setDataFile] = useState<DataTableProps>(initDataFile)
  const [modal, setModal] = useState<{ info?: ModalTypeInfo, open?: boolean }>({ open: false })

  function handleImportDataFile() {

    setModal({ open: true, info: 'load' });

    ApiUpload.get(`upload/${mockFileName}`)
      .then(response => response.data)
      .then(data => data.data)
      .then(data => {
        const columns = Object.keys(data[0]).map(col => ({ column: col, value: col }));
        return { tableTitle: mockFileName, columns, data }
      })
      .then(data => setDataFile(data))
      .then(() => setModal({ open: true, info: 'success' }))
      .catch(() => setModal({ open: true, info: 'error' }))
      .finally(() => setTimeout(() => setModal({ open: false, info: '' }), 1500))
  }

  useEffect(handleImportDataFile, [])

  return (
    <React.Fragment>
      <GridRow>
        <GridCol length={12}>
          <DataTable data={dataFiles.data} columns={dataFiles.columns} tableTitle={dataFiles.tableTitle} />
        </GridCol>
      </GridRow>
        <Modal id='modalFileData' open={modal.open} info={modal.info} />
    </React.Fragment>
  );
}

