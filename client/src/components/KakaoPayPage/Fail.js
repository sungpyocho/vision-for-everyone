import React, { useEffect } from 'react'

function Fail() {
    window.top.postMessage(JSON.stringify({
        message: "Fail"
    }))

    useEffect(() => {
        document.querySelector(".makeStyles-root-1").style.display = 'none';
    }, [])

    return (
        <div>
            결제 과정에서 오류가 생겼습니다. 다시 주문 부탁드려요.
        </div>
    )
}

export default Fail
