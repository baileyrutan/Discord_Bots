/**
 * Formatter for guild-related data
 */
class GuildFormatter {
    /**
     * Formats guild data for console output
     * @param {Object} guild - Guild data from API
     * @returns {string} - Formatted guild information
     */
    static formatGuildInfo(guild) {
        return [
            'Guild Information:',
            `Name: ${guild.name}`,
            `ID: ${guild.id}`,
            `Owner ID: ${guild.owner_id}`,
            `Member Count: ${guild.approximate_member_count || 'Unknown'}`
        ].join('\n');
    }
    
    /**
     * Formats guild event data for console output
     * @param {Array} events - Guild events data from API
     * @returns {string} - Formatted events information
     */
    static formatGuildEvents(events) {
        if (events.length === 0) {
            return 'No scheduled events found';
        }
        
        const lines = [`Found ${events.length} scheduled events:`];
        
        events.forEach((event, index) => {
            lines.push(
                `\nEvent ${index + 1}:`,
                `Name: ${event.name}`,
                `Description: ${event.description || 'No description'}`,
                `Start Time: ${new Date(event.scheduled_start_time).toLocaleString()}`
            );
            
            if (event.scheduled_end_time) {
                lines.push(`End Time: ${new Date(event.scheduled_end_time).toLocaleString()}`);
            }
            
            lines.push(
                `Status: ${event.status}`,
                `Creator: ${event.creator_id}`,
                `Location: ${event.entity_metadata?.location || 'No location'}`
            );
        });
        
        return lines.join('\n');
    }
}

module.exports = GuildFormatter; 