import React, { useState, useEffect } from "react";

/** Components */
import GridRow from "../../common/template/GridRow";
import GridCol from "../../common/template/GridCol";
import DataTable, { DataTableProps } from "../../common/template/DataTable";
import Modal, { ModalTypeInfo } from "../../common/template/Modal";

import ApiUpload from "../../services/ApiUpload";
import HeaderContent from "../../common/template/HeaderContent";
import ContentContainer from "../../common/template/ContentContainer";
import SelectSearch from "../../common/template/SelectSearch";

interface SelectDataOptions {
  value: string;
  label: string;
}

export default function FileData() {

  const initDataFile: DataTableProps = {
    columns: [{ column: "", value: "" }],
    data: [{}],
  };

  const initDataOptions: SelectDataOptions = {
    value: "",
    label: "",
  };

  const [dataFiles, setDataFile] = useState<DataTableProps>(initDataFile);
  const [modal, setModal] = useState<{ info?: ModalTypeInfo; open?: boolean }>({
    open: false,
  });
  const [selectOptions, setSelectOptions] = useState<SelectDataOptions[]>([
    initDataOptions,
  ]);
  const [currentOption, setCurrentOption] = useState<string>("");

  function handleImportDataFile(file: string) {
    setModal({ open: true, info: "load" });

    ApiUpload.get(`upload/${file}`)
      .then((response) => response.data)
      .then((data) => data.data)
      .then((data) => {
        const columns = Object.keys(data[0]).map((col) => ({
          column: col,
          value: col,
        }));
        return { columns, data };
      })
      .then((data) => setDataFile(data))
      .then(() => setModal({ open: true, info: "success" }))
      .catch(() => setModal({ open: true, info: "error" }))
      .finally(() =>
        setTimeout(() => setModal({ open: false, info: "" }), 1500)
      );
  }

  function handleSelectFile(e: any) {
    setCurrentOption(e.target.value)
    handleImportDataFile(e.target.value)
  }

  useEffect(() => {
      ApiUpload.get("upload")
        .then((response) => response.data)
        .then((data) =>
          data.map((item: any) => {
            const newItem: SelectDataOptions = {
              value: item.filename,
              label: item.filename,
            };
            return newItem;
          })
        )
        .then((data: SelectDataOptions[]) => setSelectOptions(data))
        .then(() => {
          const currentURL = window.location.pathname.replace(/\/|file-data/gi, '');
          if(currentURL) {
            setCurrentOption(currentURL)
            handleImportDataFile(currentURL)
          }
        })
  }, []);

  return (
    <React.Fragment>
      <HeaderContent title="File Data" />
      <ContentContainer>
        <GridRow>
          <GridCol length={12}>
            <SelectSearch
              col={12}
              options={selectOptions}
              id="fileOptions"
              onChange={handleSelectFile}
              value={currentOption}
            />
          </GridCol>
        </GridRow>
        <GridRow>
          <GridCol length={12}>
            <DataTable
              data={dataFiles.data}
              columns={dataFiles.columns}
            />
          </GridCol>
        </GridRow>
        <Modal id="modalFileData" open={modal.open} info={modal.info} />
      </ContentContainer>
    </React.Fragment>
  );
}
