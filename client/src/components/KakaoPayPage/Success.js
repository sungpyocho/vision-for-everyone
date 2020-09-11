import React, { useEffect } from "react";
import styled from "styled-components";
import handClap from "../../assets/hand-clap.png";

const SuccessBlock = styled.div`
  margin: 0;
  padding: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: 5rem;
`;

function Success() {
  window.top.postMessage(
    JSON.stringify({
      message: "Success",
    })
  );

  return (
    <SuccessBlock>
      <h3>결제 성공했습니다!</h3>
      <div>
        <img src={handClap} style={{ width: "100%" }} />
      </div>
      <h4>닫기 버튼을 눌러주세요.</h4>
    </SuccessBlock>
  );
}

export default Success;
