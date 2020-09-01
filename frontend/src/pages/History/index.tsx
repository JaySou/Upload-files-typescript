import React, { useState, useEffect } from "react";
import GridRow from "../../common/template/GridRow";
import GridCol from "../../common/template/GridCol";
import Callout from "../../common/template/Callout";
import Modal, { ModalTypeInfo } from "../../common/template/Modal";
import ApiUpload from "../../services/ApiUpload";
import { LinkWrapper } from "../../common/components/Router";
import HeaderContent from "../../common/template/HeaderContent";
import ContentContainer from "../../common/template/ContentContainer";

interface HistoryDataProps {
  filename: string;
  file: string;
  dateImport: string;
  hash: string;
  extensao: string;
}

export default function History() {
  const [historyData, setHistoryData] = useState<HistoryDataProps[]>([]);
  const [modal, setModal] = useState<{ info?: ModalTypeInfo; open?: boolean }>({
    open: false,
  });

  useEffect(() => {
    setModal({ open: true, info: "load" });

    ApiUpload.get("upload")
      .then((response) => response.data)
      .then((data) =>
        data.map((item: any) => {
          const [file, dt, hash, extensao] = item.filename
            .match(/\w+?_|\w+?\.|\w{1,5}/gi)
            .map((x: string) => x.replace(/\.|_/gi, ""));
          return {
            filename: item.filename,
            file,
            dateImport: `${dt.substr(0, 4)}-${dt.substr(4, 2)}-${dt.substr(
              6,
              2
            )} ${dt.substr(8, 2)}:${dt.substr(10, 2)}:${dt.substr(
              12,
              2
            )}.${dt.substr(14, 3)}`,
            hash,
            extensao,
          };
        })
      )
      .then((data) => setHistoryData(data))
      .then(() => setModal({ open: true, info: "success" }))
      .catch(() => setModal({ open: true, info: "error" }))
      .finally(() => setTimeout(() => setModal({ open: false }), 1500));
  }, []);

  return (
    <React.Fragment>
      <HeaderContent title="History Uploads" />
      <ContentContainer>
        <GridRow>
          <GridCol length={12}>
            {historyData.map((item: HistoryDataProps) => (
              <Callout type="info" title={item.file} col={12} key={item.hash}>
                <p>
                  <LinkWrapper to={`file-data/${item.filename}`}>
                    {item.filename}
                  </LinkWrapper>
                </p>
                <p>{item.dateImport}</p>
                <p>{item.extensao}</p>
                <p>{item.hash}</p>
              </Callout>
            ))}
          </GridCol>
        </GridRow>
        <Modal id="modalHistory" open={modal.open} info={modal.info} />
      </ContentContainer>
    </React.Fragment>
  );
}
