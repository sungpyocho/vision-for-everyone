import React, { useState, useEffect } from "react";

function ProgressBar({orderStep}) {
  console.log(orderStep);
  const [step, setStep] = useState(orderStep);
  useEffect(()=>{
    setStep(orderStep)
  }, [orderStep])
  const completed = (step) => {
    switch (step) {
      case "select restaurant":
        return [25, "Step 1: 원하는 식당을 골라주세요"];
      case "select menu":
        return [50, "Step 2: 드시고 싶은 메뉴를 골라주세요"];
      case "select payment":
        return [75, "Step 3: 결제수단만 고르면 주문 끝!"];
      case "payment done":
        return [100, "주문이 완료되었어요 :D"];
      default:
        return [0, "통신이 불안정해요 :( 페이지를 새로고침해주세요"];
    }
  };
  
  const totalContainerStyles = {
    height: 50
  }

  const barContainerStyles = {
    height: 20,
    width: "100%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    marginLeft: "auto",
    marginRight: "auto",
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed(step)[0]}%`,
    backgroundColor: "limegreen",
    borderRadius: "inherit",
    textAlign: "right",
  };

  const labelStyles = {
    height: 20,
    padding: 5,
    color: "#222222",
    fontWeight: "bold",
    zIndex: 3
  };

  return (
    <div style={totalContainerStyles}>
      <div style={labelStyles}>{completed(step)[1]}</div>
      <div style={barContainerStyles}>
        <div style={fillerStyles}></div>
      </div>
    </div>
  );
}

export default ProgressBar;
