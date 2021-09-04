import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function ProgressBar({ orderStep }) {
  const [step, setStep] = useState(orderStep);
  useEffect(() => {
    setStep(orderStep);
  }, [orderStep]);
  const completed = step => {
    switch (step) {
      case 'select restaurant':
        return [25, 'Step 1: 원하는 식당을 골라주세요'];
      case 'Default Welcome Intent':
        return [50, 'Step 2: 드시고 싶은 메뉴를 골라주세요'];
      case 'order_menu':
        return [75, 'Step 3: 주문확인 하겠습니다'];
      case 'Payment':
        return [85, 'Step 4: 카카오페이 창으로 이동합니다'];
      case 'Confirm_After_Payment':
        return [100, 'Step 5: 주문이 완료되었습니다!'];
      default:
        return [0, '다시 입력하거나 새로고침해주세요 :('];
    }
  };

  const totalContainerStyles = {
    height: 50,
    color: 'white',
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
  };

  const barContainerStyles = {
    height: 8,
    width: '100%',
    backgroundColor: '#e0e0de',
    borderRadius: '30px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '12px',
  };

  const fillerStyles = {
    height: '100%',
    width: `${completed(step)[0]}%`,
    backgroundColor: 'pink',
    textAlign: 'right',
    borderRadius: '30px',
  };

  const labelStyles = {
    height: 20,
    padding: 5,
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: '20px',
    zIndex: 3,
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

ProgressBar.propTypes = {
  orderStep: PropTypes.string,
};

export default ProgressBar;
