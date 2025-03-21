const responseHandler = require('../../utils/responseHandler');

describe('Response Handler', () => {
  // Sample test data
  const testResponseData = [
    { trigger: 'hello', quote: 'Hello there!' },
    { trigger: 'gaben', quote: 'Praise be to Gaben!' },
    { trigger: 'steam sale', quote: 'RIP your wallet.' }
  ];

  describe('getResponse', () => {
    test('should return correct response for matching trigger', () => {
      const result = responseHandler.getResponse('hello world', testResponseData);
      expect(result).toBe('Hello there!');
    });

    test('should return default message for non-matching message', () => {
      const result = responseHandler.getResponse('something random', testResponseData);
      expect(result).toBe("I don't know how to respond to that.");
    });

    test('should be case insensitive', () => {
      const result = responseHandler.getResponse('HELLO EVERYONE', testResponseData);
      expect(result).toBe('Hello there!');
    });

    test('should handle single match correctly', () => {
      // Create test data with one trigger that would match
      const singleMatchData = [
        { trigger: 'unique', quote: 'Only response' }
      ];

      const result = responseHandler.getResponse('unique message', singleMatchData);
      expect(result).toBe('Only response');
    });
  });

  describe('findMatches', () => {
    test('should find all matching responses', () => {
      const matches = responseHandler.findMatches('hello and gaben', testResponseData);
      expect(matches).toHaveLength(2);
      expect(matches).toContain('Hello there!');
      expect(matches).toContain('Praise be to Gaben!');
    });

    test('should return empty array when no matches found', () => {
      const matches = responseHandler.findMatches('no matches here', testResponseData);
      expect(matches).toHaveLength(0);
    });
  });
}); 