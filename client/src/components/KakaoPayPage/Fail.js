import React, { useEffect } from 'react'
import styled from 'styled-components'
import failCry from "../../assets/fail-cry.png";

const FailBlock = styled.div`
    margin: 0;
    padding: 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    display: flex;
    margin-top: 5rem;
`

function Fail() {
    window.top.postMessage(JSON.stringify({
        message: "Fail"
    }))

    useEffect(() => {
        document.querySelector(".makeStyles-root-1").style.display = 'none';
    }, [])

    return (
        <FailBlock>
          <h3>
            결제 과정에서 오류가 생겼습니다.
          </h3>
          <div>
              <img src={failCry} style={{width: '100%'}} />
          </div>
          <h4>다시 주문 부탁드려요.</h4>
        </FailBlock>
        
    )
}

export default Fail
