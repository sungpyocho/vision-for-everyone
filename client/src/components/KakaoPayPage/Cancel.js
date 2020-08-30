import React, { useEffect } from 'react'
import styled from 'styled-components'
import cancel from "../../assets/cancel.png";


const CancelBlock = styled.div`
    margin: 0;
    padding: 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    display: flex;
    margin-top: 5rem;
`

function Cancel() {
    window.top.postMessage(JSON.stringify({
        message: "Cancel"
    }))

    useEffect(() => {
        document.querySelector(".makeStyles-root-1").style.display = 'none';
    }, [])
    
    return (
        <CancelBlock>
          <h3>
            결제 취소 되었습니다.
          </h3>
          <div>
            <img src={cancel} style={{width: '100%'}}/>
          </div>
          <h4>다시 주문 부탁드려요.</h4>
        </CancelBlock>
    )
}

export default Cancel
