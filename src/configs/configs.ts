import { GuildRegisterRolesProps } from 'src/interfaces/Guild.js';
import { GuildEmojiProps } from '../interfaces/index.js';

export const allowedGuilds: string[] = [
	'1288321418089725982',
	'958940026991943710',
];

export const guildEmojis: GuildEmojiProps[] = [
	{ guild: 'Guilda Hesperia', emoji: '🎭', roleId: '1292858149329702983' },
	{ guild: 'Guilda Belkaris', emoji: '🧭', roleId: '1292858727359184977' },
	{ guild: 'Guilda Hian', emoji: '🏅', roleId: '1292857855023517696' },
	{ guild: 'Guilda Asael', emoji: '🔰', roleId: '1292858726986023045' },
	{ guild: 'Guilda Argyris', emoji: '🪙', roleId: '1292858225196273777' },
	{ guild: 'Guilda Quinn', emoji: '✨', roleId: '1292858695297794189' },
	{ guild: 'Guilda Marx', emoji: '💡', roleId: '1291488205086134283' },
];

export const guildRegisterRoles: GuildRegisterRolesProps = {
	noRegisteredRoleId: '1292859601447813222',
	registeredRoleId: '1292859537480487035',
    inicianteRoleId: '1292859247092170782'
};
