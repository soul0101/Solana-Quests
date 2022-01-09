const web3 = require("@solana/web3.js");

const getReturnAmount = (stake, ratio) => {
  return stake * ratio;
};

const totalAmtToBePaid = () => {
  return 2;
};

const randomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

module.exports = { getReturnAmount, totalAmtToBePaid, randomNumber };
