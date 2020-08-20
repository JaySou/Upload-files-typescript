import './dependencies';
import React, { useState, FormEvent } from 'react';

import logoExcel from './assets/images/excel.png';

import NavBar from './components/NavBar';
import NavItem from './components/NavItem';
import Content from './components/Content';

import api from './services/api';
import Table from './components/Table';

type TypeContent = 'upload' | 'history' | 'data'

interface DataHistory {
  filename: string;
  name: string;
  dateCreate: string;
  id: string;
  extension: string;
}

interface Pagination {
  pages: number;
  current: number;
  next: number;
  preview: number;
  list: number;
}


function App() {

  const [content, setContent] = useState<TypeContent>("upload");
  const [file, setFile] = useState<FormData>();
  const [history, setHistory] = useState<DataHistory[]>([]);
  const [currentData, setCurrentData] = useState<{ title: string, columns: any[], data: any[] }>({ title: '', columns: [], data: [] });
  const [pagination, setPagination] = useState<Pagination>({list: 50, pages: 0, current: 1,  next: 0, preview: 0})
  const [currentFileName, setCurrentFileName] = useState('');

  function importHistory() {
    api.get('upload')
      .then(response => response.data)
      .then(data =>
        data.map((file: { filename: string }): DataHistory => {
          const dados: string[] = file.filename.match(/\w+?_|\w+?\.|\w{1,5}/ig)?.map(x => x.replace(/\.|_/ig, "")) || []
          return {
            filename: file.filename,
            name: dados[0],
            dateCreate: `${dados[1].substr(0, 4)}-${dados[1].substr(4, 2)}-${dados[1].substr(6, 2)}`,
            id: dados[2],
            extension: dados[3]
          }
        })
      )
      .then(history => setHistory(history))
      .then(() => setContent("history"))
  }

  function importData(filename: string, page: number = 1) {
    api.get(`upload/${filename}?page=${page}&list=${pagination.list}`)
      .then(response => response.data)
      .then(data => {
        const cols = Object.keys(data.data[0]).map(col => ({ title: col, field: col }))
        setCurrentData({ title: filename, columns: cols, data: data.data });
        setPagination({current: data.current, list: pagination.list, next: data.next, preview: data.preview, pages: data.pages})
        setCurrentFileName(filename);
        setContent('data')

      })
      .then(() => console.log(currentData))
  }

  function handleSelectFile(e: any) {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    setFile(formData);
  }

  function handleUploadFile(e: FormEvent) {
    e.preventDefault()

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    api.post('upload', file, config)
      .then(response => response.data)
      .then(data => importHistory())
  }

  return (
    <>
      <div className="container-flex">
        <NavBar logo={logoExcel}>
          <NavItem label="Upload" handleClick={() => setContent('upload')} />
          <NavItem label="History" handleClick={() => importHistory()} />
          <NavItem label="Data" handleClick={() => setContent('data')} />
        </NavBar>
      </div>
      <hr style={{ marginTop: 125, border: 0 }} />


      {/*  Content Upload */}
      <div className="container d-flex align-items-center justify-content-center align-self-center mb-5">
        <Content content="upload" display={content}>
          <h3> Upload </h3>
          <hr />
          <form onSubmit={handleUploadFile}>
            <div className="form-group">
              <label htmlFor="exampleFormControlFile1"> Escolha o Arquivo <b>.xlsx</b></label>
              <input
                type="file"
                name="file"
                id="file"
                className="form-control-file"
                onChange={handleSelectFile}
              />
            </div>
            <button type="submit" className="btn btn-primary col-12" disabled={!file ? true : false}> Upload </button>
          </form>
        </Content>
      </div>

      {/*  Content History */}
      <div className="container d-flex align-items-center justify-content-center align-self-center mb-5">
        <Content content="history" display={content}>
          <h3> History </h3>
          <hr />
          <div className="row">
            {
              history.map(item => (
                <div className="card" style={{ width: "22rem", margin: 10 }} key={item.id}>
                  <div className="card-body">
                    <div className="card-header bg-default">{item.name}</div>
                    <p className="card-text">
                      <b className="badge badge-info"> Nome do arquivo </b>  <small> {item.filename} </small>
                    </p>
                    <p className="card-text">
                      <b className="badge badge-info"> Importado em </b> <small> {item.dateCreate} </small>
                    </p>
                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      style={{ paddingLeft: 15, paddingRight: 15, border: 0, outline: "none" }}
                      onClick={() => importData(item.filename)}
                    > View </button>
                  </div>
                </div>
              ))
            }
          </div>
        </Content>
      </div>

      {/*  Content Data */}
      <div className="container mb-5" style={{ marginTop: -50}}>
        <Content content="data" display={content}  >
            <Table 
              columns={currentData.columns} 
              data={currentData.data} 
              title={currentData.title} 
              atualPage={pagination.current}
              finishPage={pagination.pages}
              handleClickNext={() => importData(currentFileName, pagination.next)}
              handleClickPreview={() => importData(currentFileName, pagination.preview)}
            />
        </Content>
      </div>
    </>
  );
}

export default App;
