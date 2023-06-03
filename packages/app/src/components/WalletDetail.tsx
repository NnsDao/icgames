import { marginMedia } from '@horse-racing/react-components/style/media';
import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useUser } from '../context/UserContext';
import { useWeb3 } from '../context/Web3Context';

const Wrapper = styled.div`
  ${marginMedia(2)}
  background-color: #fff;
`;

const WalletDetail: React.FC = () => {
  const { web3 } = useWeb3();
  // Use the UserConTitle to get the current logged-in user
  const { user } = useUser();

  // Initialize state variable for balance
  const [balance, setBalance] = useState('...');

  // Call the getBalance function when the user state variable changes
  useEffect(() => {
    const getBalance = async () => {
      if (!user || !web3) return;
      try {
        // If account and web3 are available, get the balance
        const balance = await web3.eth.getBalance(user);

        // Convert the balance from Wei to Ether and set the state variable
        setBalance(web3.utils.fromWei(balance).substring(0, 7));
      } catch (error) {
        console.error(error);
      }
    };

    getBalance();
  }, [user]);

  return (
    <Wrapper>
      <Card style={{ width: 300 }}>
        <p>Address {user}</p>
        <p>Balance {balance} ETH</p>
      </Card>
    </Wrapper>
  );
};

export default WalletDetail;
