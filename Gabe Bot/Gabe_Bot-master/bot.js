const Discord = require('discord.js');
const { configuration, validateConfig } = require('./configuration/configuration');
const responseService = require('./services/responseService');
const DiscordApiService = require('./services/discordApiService');

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
        if (configuration.serverId) {
            this.fetchGuildInfo(configuration.serverId);
            
            // Add this line to fetch scheduled events
            this.fetchGuildEvents(configuration.serverId);
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
            const guild = await DiscordApiService.fetchGuild(guildId);
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
     * Fetches and logs scheduled events for a guild
     * @param {string} guildId - The guild ID to fetch events for
     */
    async fetchGuildEvents(guildId) {
        try {
            const events = await DiscordApiService.fetchGuildScheduledEvents(guildId);
            console.log(`Found ${events.length} scheduled events for guild ${guildId}:`);
            
            if (events.length > 0) {
                events.forEach((event, index) => {
                    console.log(`\nEvent ${index + 1}:`);
                    console.log(`Name: ${event.name}`);
                    console.log(`Description: ${event.description || 'No description'}`);
                    console.log(`Start Time: ${new Date(event.scheduled_start_time).toLocaleString()}`);
                    if (event.scheduled_end_time) {
                        console.log(`End Time: ${new Date(event.scheduled_end_time).toLocaleString()}`);
                    }
                    console.log(`Status: ${event.status}`);
                    console.log(`Creator: ${event.creator_id}`);
                    console.log(`Location: ${event.entity_metadata?.location || 'No location'}`);
                });
            } else {
                console.log('No scheduled events found');
            }
            
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
        this.client.login(configuration.token)
            .catch(err => {
                console.error('Failed to login:', err);
                process.exit(1);
            });
    }
}

module.exports = GabeBotClient; 