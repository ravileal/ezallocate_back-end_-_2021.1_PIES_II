const express: any = jest.createMockFromModule('express');

// Mock implementation of app.use method
express.use = jest.fn();

// Mock implementation of app.listen method
express.listen = jest.fn().mockImplementation((port, callback) => {
  // Simulate the server listening on the specified port
  console.log(`Mock app is listening on port ${port}!`);
  callback();
});

export default express;
