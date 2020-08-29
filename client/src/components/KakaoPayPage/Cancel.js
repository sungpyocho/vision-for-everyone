import React, { useEffect } from 'react'

function Cancel() {
    window.top.postMessage(JSON.stringify({
        message: "Cancel"
    }))

    useEffect(() => {
        document.querySelector(".makeStyles-root-1").style.display = 'none';
    }, [])
    
    return (
        <div>
            결제 취소 되었습니다. 다시 주문 부탁드려요.
        </div>
    )
}

export default Cancel
