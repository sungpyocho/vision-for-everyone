import React, { useEffect } from 'react'


function Success() {
    window.top.postMessage(JSON.stringify({
        message: "Success"
    }))

    useEffect(() => {
        document.querySelector(".makeStyles-root-1").style.display = 'none';
    }, [])

    return (
        <div>
            결제 성공했습니다. 닫기 버튼을 눌러주세요.
        </div>
    )
}

export default Success
