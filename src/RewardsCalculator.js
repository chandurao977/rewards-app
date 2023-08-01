import React, { useState, useEffect } from 'react';

// Simulated asynchronous API call function
const fetchData = () => {
  return new Promise((resolve) => {
    // Simulating API call delay
    setTimeout(() => {
      const mockTransactions = [
        { customer: 'Sachin Tendulkar', month: 'January', amount: 120 },
        { customer: 'Virender Sehwag', month: 'February', amount: 80 },
        { customer: 'Virat Kohli', month: 'January', amount: 70 },
        // Add more transactions here as needed
      ];
      resolve(mockTransactions);
    }, 1000); // delay of 1 second
  });
};

const RewardsCalculator = () => {
  const [transactions, setTransactions] = useState([]);
  const [rewardsData, setRewardsData] = useState([]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      const data = await fetchData();
      setTransactions(data);
    };
    fetchDataAsync();
  }, []);

  useEffect(() => {
    // Calculate reward points for each customer per month
    const calculateRewards = () => {
      const rewardsByCustomerMonth = {};
      transactions.forEach((transaction) => {
        const { customer, month, amount } = transaction;
        const pointsOver100 = Math.max(amount - 100, 0) * 2;
        const pointsBetween50And100 = Math.max(Math.min(amount, 100) - 50, 0);
        const totalPoints = pointsOver100 + pointsBetween50And100;

        const key = `${customer}-${month}`;
        if (rewardsByCustomerMonth[key]) {
          rewardsByCustomerMonth[key] += totalPoints;
        } else {
          rewardsByCustomerMonth[key] = totalPoints;
        }
      });

      const rewardsData = Object.entries(rewardsByCustomerMonth).map(([key, points]) => {
        const [customer, month] = key.split('-');
        return { customer, month, points };
      });

      setRewardsData(rewardsData);
    };

    calculateRewards();
  }, [transactions]);

  return (
    <div>
      <h2>Rewards Points Earned</h2>
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Month</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {rewardsData.map((data) => (
            <tr key={`${data.customer}-${data.month}`}>
              <td>{data.customer}</td>
              <td>{data.month}</td>
              <td>{data.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RewardsCalculator;
