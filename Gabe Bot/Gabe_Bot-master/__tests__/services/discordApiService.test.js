const nock = require('nock');
const DiscordApiService = require('../../services/discordApiService');

// Mock configuration module
jest.mock('../../configuration/configuration', () => ({
  configuration: {
    token: 'fake-token',
    api: {
      baseUrl: 'discord.com',
      version: 'v9'
    }
  }
}));

describe('DiscordApiService', () => {
  beforeEach(() => {
    nock.disableNetConnect();
  });
  
  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });
  
  describe('fetchGuild', () => {
    test('should fetch guild data successfully', async () => {
      const mockGuildData = {
        id: '123456789',
        name: 'Test Guild',
        owner_id: '987654321'
      };
      
      nock('https://discord.com')
        .get('/api/v9/guilds/123456789')
        .reply(200, mockGuildData);
      
      const result = await DiscordApiService.fetchGuild('123456789');
      
      expect(result).toEqual(mockGuildData);
    });
    
    test('should handle API error', async () => {
      nock('https://discord.com')
        .get('/api/v9/guilds/invalid-id')
        .reply(404, { message: 'Guild not found' });
      
      await expect(DiscordApiService.fetchGuild('invalid-id'))
        .rejects.toThrow('API request failed with status 404');
    });
  });
  
  describe('fetchGuildScheduledEvents', () => {
    test('should fetch guild events successfully', async () => {
      const mockEvents = [
        {
          id: 'event1',
          name: 'Test Event',
          scheduled_start_time: '2023-01-01T12:00:00Z'
        }
      ];
      
      nock('https://discord.com')
        .get('/api/v9/guilds/123456789/scheduled-events')
        .reply(200, mockEvents);
      
      const result = await DiscordApiService.fetchGuildScheduledEvents('123456789');
      
      expect(result).toEqual(mockEvents);
    });
  });
}); 