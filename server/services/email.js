import Mailgun from 'mailgun-js';

/**
 * Create a new instance of the email service via mailgun
 * @param {string} apiKey
 * @param {string} domain
 * @returns {EmailService}
 */
export function createMailgunService(apiKey, domain) {
    const mg = Mailgun({ apiKey, domain });
    return {
        async sendEmail(email) {
            await mg.messages().send(email);
        },
    };
}

/**
 * @typedef {import('./email').EmailService} EmailService
 */
