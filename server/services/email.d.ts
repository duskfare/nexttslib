export type EmailService = {
    sendEmail(email: Email): void;
};
export type Email = {
    from: string;
    to: string;
    subject: string;
    text: string;
};
