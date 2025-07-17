const updateAmount = (cardIndex, increment) => {
  const btnCreateProductCart = document.getElementById(`btnCreateProductCart` + cardIndex);
  const btnUpdateProductCart = document.getElementById(`btnUpdateProductCart` + cardIndex);
  const btnDecreaseAmount = document.getElementById(`btnDecreaseAmount` + cardIndex);
  const inpAmount = document.getElementById(`inpAmount` + cardIndex);
  const newAmount = Math.max(parseInt(inpAmount.value) + increment, 0); 
  const mainActionBtn = btnUpdateProductCart || btnCreateProductCart;  
  btnDecreaseAmount.disabled = newAmount === 0;
  if (mainActionBtn) mainActionBtn.disabled = newAmount === 0;
  inpAmount.value = newAmount;
};

export const increaseAmount = (cardIndex) => updateAmount(cardIndex, 1);
export const decreaseAmount = (cardIndex) => updateAmount(cardIndex, -1);