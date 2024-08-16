import React from "react";
import { Progress } from "antd";
const Analytics = ({ allTransaction }) => {
  // category
  const categories = [
    "salary",
    "tip",
    "project",
    "movie",
    "food",
    "bills",
    "medical",
    "fees",
    "tax",
  ];
  console.log(allTransaction,allTransaction.length);
  // total transaction
  const totalTransaction = allTransaction.length;
  // console.log(allTransaction[0].type);
  const totalIncomeTransaction = allTransaction.filter(
    (transaction) => transaction.type === "Income"
  );
  console.log(totalIncomeTransaction);
  const totalExpenseTransaction = allTransaction.filter(
    (transaction) => transaction.type === "Expense"
  );
  // console.log(totalExpenseTransaction);
  const totalIncomePercent =
    (totalIncomeTransaction.length / totalTransaction) * 100;
  const totalExpensePercent =
    (totalExpenseTransaction.length / totalTransaction) * 100;

  // total turnover
  const totalTurnover = allTransaction.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = allTransaction
    .filter((transaction) => transaction.type === "Income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpenseTurnover = allTransaction
    .filter((transaction) => transaction.type === "Expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalIncomeTurnoverPercent =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercent =
    (totalExpenseTurnover / totalTurnover) * 100;

    // console.log(totalTransaction,totalIncomeTransaction,totalExpenseTransaction,totalIncomePercent,totalExpensePercent,totalTurnover,totalIncomeTurnover,totalExpenseTurnover,totalIncomeTurnoverPercent,totalExpenseTurnoverPercent);
  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              Total Transaction : {totalTransaction}
            </div>
            <div className="card-body">
              <h5 className="text-success">
                Income : {totalIncomeTransaction.length}
              </h5>
              <h5 className="text-danger">
                Expense : {totalExpenseTransaction.length}
              </h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalIncomePercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2"
                  percent={totalExpensePercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">Total Turnover : {totalTurnover}</div>
          <div className="card-body">
            <h5 className="text-success">
              Income : {totalIncomeTurnover.length}
            </h5>
            <h5 className="text-danger">
              Expense : {totalExpenseTurnover.length}
            </h5>
            <div>
              <Progress
                type="circle"
                strokeColor={"green"}
                className="mx-2"
                percent={totalIncomeTurnoverPercent.toFixed(0)}
              />
              <Progress
                type="circle"
                strokeColor={"red"}
                className="mx-2"
                percent={totalExpenseTurnoverPercent.toFixed(0)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row-m-3">
        <div className="col-md-4">
          <h4>Categorywise Income</h4>
          {categories.map((category) => {
            const amount = allTransaction
              .filter(
                (transaction) =>
                  transaction.type === "Income" &&
                  transaction.category === category
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);
            return (
              amount > 0 && (
                <div className="card">
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress
                      percent={((amount / totalIncomeTurnover) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Analytics;
