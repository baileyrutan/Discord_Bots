# GabeBot

A Discord bot inspired by Gabe Newell that responds to messages containing predefined trigger phrases with iconic quotes.

## Features

- **Trigger-based Responses**: Responds to messages containing specific trigger phrases
- **Random Response Selection**: When multiple responses match a message, one is randomly selected
- **Guild Information**: Can fetch and display Discord server information
- **SOLID Architecture**: Organized using modular, maintainable code structure

## Prerequisites

- [Node.js](https://nodejs.org/) (v16.x or higher recommended)
- A Discord Bot Token ([Guide to create a bot](https://discordjs.guide/preparations/setting-up-a-bot-application.html))
- Discord.js (v12.x or higher)

## Installation

1. **Clone the repository**
   ```
   git clone https://github.com/yourusername/GabeBot.git
   cd GabeBot
   ```

2. **Install dependencies**
   ```
   npm install
   ```
   
   If you encounter PowerShell execution policy errors, run:
   ```
   Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
   ```

3. **Configure your bot token**
   
   Create a `.env` file in the root directory:
   ```
   DISCORD_BOT_TOKEN=your_bot_token_here
   ```
   
   Or set it as an environment variable:
   ```
   # Windows (PowerShell)
   $env:DISCORD_BOT_TOKEN="your_bot_token_here"
   
   # Linux/macOS
   export DISCORD_BOT_TOKEN="your_bot_token_here"
   ```

4. **Run the bot**
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

Edit `chat_trigger_response_data.csv` to add your own trigger phrases and responses. The format is:
```
trigger_phrase,response_quote
```

## Troubleshooting

- **Missing package.json**: If you see "Cannot find package.json" error, run `npm init -y` in the project directory
- **Permission errors**: Try running PowerShell as Administrator or use the commands in the Installation section
- **Connection issues**: Verify your bot token is correct and the bot has proper permissions in your Discord server
- **Response not working**: Check that `chat_trigger_response_data.csv` is properly formatted and in the correct location

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
