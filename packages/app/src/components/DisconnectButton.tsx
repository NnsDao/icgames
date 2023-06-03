import React from 'react';

import { useWeb3 } from '../context/Web3Context';
import { magic } from '../libs/magic';

const DisconnectButton: React.FC = () => {
  // Get the initializeWeb3 function from the Web3 context
  const { initializeWeb3 } = useWeb3();

  // Define the event handler for the button click
  const handleDisconnect = async () => {
    try {
      // Try to disconnect the user's wallet using Magic's logout method
      await magic.user.logout();

      // After successful disconnection, re-initialize the Web3 instance
      initializeWeb3();
    } catch (error) {
      // Log any errors that occur during the disconnection process
      console.log('handleDisconnect:', error);
    }
  };

  // Render the button component with the click event handler
  return <div onClick={handleDisconnect}>Disconnect</div>;
};

export default DisconnectButton;
