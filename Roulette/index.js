const web3 = require("@solana/web3.js");
const inquirer = require("inquirer");
const { getReturnAmount, totalAmtToBePaid, randomNumber } = require("./helper.js");
const { getWalletBalance, transferSOL, airDropSol } = require("./solana");
const newPair = new web3.Keypair();
const publicKey = new web3.PublicKey(newPair._keypair.publicKey).toString();
const secretKey = newPair._keypair.secretKey;

const player = web3.Keypair.generate();
const treasurer = web3.Keypair.generate();

const gameDriver = () => {
  let returnAmount, randomNum, totalAmount;

  airDropSol(player);
  // airDropSol(player);
  // airDropSol(treasurer);
  airDropSol(treasurer);

  inquirer
    .prompt([
      {
        name: "stake",
        message: "How much do you want to stake?",
        default: "Maximum 2SOL",
      },
      {
        name: "ratio",
        message: "Ratio of staking? 1:X",
      },
    ])
    .then((answers) => {
      returnAmount = getReturnAmount(answers.stake, answers.ratio);
      totalAmount = totalAmtToBePaid();

      console.info("You need to pay ", answers.stake, "to move forward.");
      console.info("You will get", returnAmount, "if you guess correctly.");

      inquirer
        .prompt([
          {
            name: "guess",
            message: "Guess a random number from 1 to 5 (both 1 and 5 included)",
          },
        ])
        .then((answers) => {
          randomNum = randomNumber();
          console.log(
            "Signature of return transaction: ",
            transferSOL(player, treasurer, totalAmount)
          );
          if (answers.guess === randomNum) {
            console.info("CONGRATULATIONS!");
          } else {
            console.info("Better luck next time!");
            console.log(
              "Signature of return transaction: ",
              transferSOL(treasurer, player, returnAmount)
            );
          }
        });
    });
};

gameDriver();
