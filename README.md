# GabeBot

A Discord bot inspired by Gabe Newell that responds to messages with predefined quotes.

## Features

- **Trigger-based Responses**: Responds to messages containing specific trigger phrases
- **Random Response Selection**: When multiple responses match a message, one is randomly selected
- **Guild Information**: Can fetch and display Discord server information
- **SOLID Architecture**: Organized using modular, maintainable code structure

**Run the bot**
   ```
   node index.js
   ```

## How It Works

1. The bot reads response triggers and quotes from `chat_trigger_response_data.csv`
2. When a Discord user sends a message, the bot checks if it contains any trigger phrases
3. If a match is found, the bot responds with the corresponding quote
4. For messages with multiple matching triggers, a random response is selected

## Code Structure

- **`/config`**: Configuration settings
- **`/services`**: Core service implementations
- **`/utils`**: Utility functions
- **`bot.js`**: Main bot class
- **`index.js`**: Application entry point

## Customization

Edit `responseData.csv` to add your own trigger phrases and responses.
