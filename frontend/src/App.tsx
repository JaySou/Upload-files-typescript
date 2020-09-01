import "./common/template/Dependencies";
import React from "react";

/** Component Routes */
import Routes from "./Routes";

/** Components template */
import NavBar from "./common/template/NavBar";
import Footer from "./common/template/Footer";
import ContentWrapper from "./common/template/ContentWrapper";

export default function App() {
  return (
    <React.Fragment>
      <NavBar />
      <ContentWrapper>
        <Routes />
      </ContentWrapper>
      <Footer />
    </React.Fragment>
  );
}
