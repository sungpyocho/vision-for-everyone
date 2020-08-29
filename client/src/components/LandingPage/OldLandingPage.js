import React from "react";
import styled from "styled-components";
import Top from "./Sections/Top";
import MiddleOne from "./Sections/MiddleOne";
import MiddleTwo from "./Sections/MiddleTwo";
import Bottom from "./Sections/Bottom";

const LandingpageBlock = styled.div`
  height: calc(100% - 64px);
  position: absolute;
  width: 66.6%;
  left: 16.7%;
  right: 16.7%;
  @media (max-width: 768px) {
    width: 90%;
    left: 5%;
    right: 5%;
  }
`;

function LandingPage(props) {
  return (
    <LandingpageBlock>
      <div style={{ fontSize: "30px", textAlign: "center", fontWeight: "500" }}>
        <Top props={props} />
        <MiddleOne />
        <MiddleTwo />
        <Bottom />
      </div>
    </LandingpageBlock>
  );
}

export default LandingPage;
