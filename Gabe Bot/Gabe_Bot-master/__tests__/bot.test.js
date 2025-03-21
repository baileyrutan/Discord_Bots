const Discord = require('discord.js');
const GabeBotClient = require('../bot');
const responseService = require('../services/responseService');
const DiscordApiService = require('../services/discordApiService');

// Mock dependencies
jest.mock('discord.js');
jest.mock('../services/responseService');
jest.mock('../services/discordApiService');
jest.mock('../configuration/configuration', () => ({
  configuration: {
    token: 'fake-token',
    serverId: '123456789'
  },
  validateConfig: jest.fn()
}));

describe('GabeBotClient', () => {
  let bot;
  let mockClient;
  let mockOn;
  
  beforeEach(() => {
    // Setup Discord.js client mock
    mockOn = jest.fn();
    mockClient = {
      on: mockOn,
      login: jest.fn().mockResolvedValue('login-success')
    };
    
    Discord.Client.mockImplementation(() => mockClient);
    
    // Mock response service
    responseService.initialize.mockReturnValue(responseService);
    responseService.getResponse.mockImplementation(msg => 
      msg.includes('hello') ? 'Hello there!' : null
    );
    
    // Mock API service
    DiscordApiService.fetchGuild.mockResolvedValue({
      name: 'Test Guild',
      id: '123456789'
    });
    DiscordApiService.fetchGuildScheduledEvents.mockResolvedValue([]);
    
    // Create a new bot instance
    bot = new GabeBotClient();
  });
  
  test('should set up event handlers on initialization', () => {
    expect(mockOn).toHaveBeenCalledWith('error', expect.any(Function));
    expect(mockOn).toHaveBeenCalledWith('ready', expect.any(Function));
    expect(mockOn).toHaveBeenCalledWith('message', expect.any(Function));
  });
  
  test('should start the bot and login', async () => {
    await bot.start();
    
    expect(mockClient.login).toHaveBeenCalledWith('fake-token');
  });
  
  test('should handle ready event', async () => {
    // Get the ready handler
    const readyHandler = mockOn.mock.calls.find(call => call[0] === 'ready')[1];
    
    // Call the handler
    await readyHandler();
    
    expect(responseService.initialize).toHaveBeenCalled();
    expect(DiscordApiService.fetchGuild).toHaveBeenCalledWith('123456789');
    expect(DiscordApiService.fetchGuildScheduledEvents).toHaveBeenCalledWith('123456789');
  });
  
  test('should handle message event', () => {
    // Get the message handler
    const messageHandler = mockOn.mock.calls.find(call => call[0] === 'message')[1];
    
    // Mock message objects
    const mockSend = jest.fn().mockResolvedValue({});
    const botMessage = { author: { bot: true } };
    const userMessage = { 
      author: { bot: false },
      content: 'hello bot',
      channel: { send: mockSend }
    };
    
    // Call handler with bot message (should ignore)
    messageHandler(botMessage);
    expect(responseService.getResponse).not.toHaveBeenCalled();
    
    // Call handler with user message
    messageHandler(userMessage);
    expect(responseService.getResponse).toHaveBeenCalledWith('hello bot');
    expect(mockSend).toHaveBeenCalledWith('Hello there!');
  });
}); 