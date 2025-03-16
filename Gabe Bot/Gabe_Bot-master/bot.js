const Discord = require('discord.js');
const { validateConfig } = require('./config/config');
const ServiceFactory = require('./services/serviceFactory');
const GuildFormatter = require('./formatters/guildFormatter');

/**
 * Main Discord bot class
 */
class GabeBotClient {
    constructor() {
        // Validate configuration
        validateConfig();
        
        // Set up services
        const services = ServiceFactory.createServices();
        this.guildService = services.guildService;
        this.responseService = services.responseService;
        
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
        this.responseService.initialize();
        
        // Fetch guild information if server ID is provided
        const serverId = process.env.BOT_TEST_SERVER_ID;
        if (serverId) {
            await this.fetchGuildInfo(serverId);
            await this.fetchGuildEvents(serverId);
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
        const response = this.responseService.getResponse(message.content);
        
        // Send response if one was found
        if (response) {
            message.channel.send(response)
                .catch(err => console.error('Error sending message:', err));
        }
    }
    
    /**
     * Fetches and displays guild information
     * @param {string} guildId - The guild ID to fetch
     */
    async fetchGuildInfo(guildId) {
        try {
            const guild = await this.guildService.fetchGuild(guildId);
            console.log(GuildFormatter.formatGuildInfo(guild));
            return guild;
        } catch (error) {
            console.error('Failed to fetch guild information:', error.message);
            return null;
        }
    }
    
    /**
     * Fetches and displays scheduled events for a guild
     * @param {string} guildId - The guild ID to fetch events for
     */
    async fetchGuildEvents(guildId) {
        try {
            const events = await this.guildService.fetchGuildScheduledEvents(guildId);
            console.log(GuildFormatter.formatGuildEvents(events));
            return events;
        } catch (error) {
            console.error('Failed to fetch guild events:', error.message);
            return [];
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
        this.client.login(process.env.DISCORD_TOKEN)
            .catch(err => {
                console.error('Failed to login:', err);
                process.exit(1);
            });
    }
}

module.exports = GabeBotClient; 