const Discord = require('discord.js');
const { config, validateConfig } = require('./config/config');
const responseService = require('./services/responseService');
const ApiService = require('./services/apiService');

/**
 * Main Discord bot class
 */
class GabeBotClient {
    constructor() {
        // Validate configuration
        validateConfig();
        
        // Initialize Discord client
        this.client = new Discord.Client();
        
        // Set up event handlers
        this.setupEventHandlers();
    }
    
    /**
     * Sets up event handlers for the Discord client
     */
    setupEventHandlers() {
        // Error handling
        this.client.on('error', this.handleError.bind(this));
        
        // Bot ready event
        this.client.on('ready', this.handleReady.bind(this));
        
        // Message handling
        this.client.on('message', this.handleMessage.bind(this));
    }
    
    /**
     * Handles bot ready event
     */
    async handleReady() {
        console.log(`Logged in as ${this.client.user.tag}!`);
        
        // Initialize response service
        responseService.initialize();
        
        // Fetch guild information if server ID is provided
        if (config.serverId) {
            this.fetchGuildInfo(config.serverId);
        }
    }
    
    /**
     * Handles incoming messages
     * @param {Discord.Message} message - The Discord message
     */
    handleMessage(message) {
        // Ignore bot messages
        if (message.author.bot) return;
        
        // Get response for message
        const response = responseService.getResponse(message.content);
        
        // Send response if one was found
        if (response) {
            message.channel.send(response)
                .catch(err => console.error('Error sending message:', err));
        }
    }
    
    /**
     * Fetches guild information
     * @param {string} guildId - The guild ID to fetch
     */
    async fetchGuildInfo(guildId) {
        try {
            const guild = await ApiService.fetchGuild(guildId);
            console.log('Guild Information:');
            console.log(`Name: ${guild.name}`);
            console.log(`ID: ${guild.id}`);
            console.log(`Owner ID: ${guild.owner_id}`);
            console.log(`Member Count: ${guild.approximate_member_count || 'Unknown'}`);
        } catch (error) {
            console.error('Failed to fetch guild information:', error.message);
        }
    }
    
    /**
     * Handles Discord client errors
     * @param {Error} error - The error that occurred
     */
    handleError(error) {
        console.error('Discord client error:', error);
    }
    
    /**
     * Starts the bot
     */
    start() {
        this.client.login(config.token)
            .catch(err => {
                console.error('Failed to login:', err);
                process.exit(1);
            });
    }
}

module.exports = GabeBotClient; 