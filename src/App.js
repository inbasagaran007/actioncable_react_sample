import React, { useEffect } from 'react';
import { createConsumer } from '@rails/actioncable';

const token = "your_token_here";
const url = "ws://localhost:3005/cable";

const App = () => {
  useEffect(() => {
    // Create Action Cable consumer
    const cable = createConsumer(url);

    // Subscribe to a channel
    const channel = cable.subscriptions.create('SidekiqNotificationsChannel', {
      connected() {
        console.log('Connected to SidekiqNotificationsChannel');
      },
      disconnected() {
        console.log('Disconnected from SidekiqNotificationsChannel');
      },
      received(data) {
        console.log('Received:', data);
      }
    });

    return () => {
      // Unsubscribe from the channel when the component unmounts
      channel.unsubscribe();
    };
  }, []);

  return (
    <div className="App">
      <h1>Action Cable Example</h1>
      <p>Open the browser console to see the received data.</p>
    </div>
  );
};

export default App;
