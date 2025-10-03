// src/utils/emailTemplates.js

const commonStyles = `
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
`;

const containerStyles = `
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
`;

const getBaseTemplate = (title, content) => `
    <div style="${commonStyles}">
        <div style="${containerStyles}">
            <h2 style="color: #4f46e5;">${title}</h2>
            ${content}
            <p style="margin-top: 20px; font-size: 0.9em; color: #777;">
                Thank you,<br/>Poornima University Admin
            </p>
        </div>
    </div>
`;

export const getConfirmationTemplate = (data) => {
    const title = 'Booking Request Received';
    const content = `
        <p>Hello ${data.userName},</p>
        <p>We have received your request for <strong>"${data.eventTitle}"</strong> and it is now pending approval.</p>
        <p>You can check the status on the "My Bookings" page.</p>
    `;
    return getBaseTemplate(title, content);
};

export const getApprovalTemplate = (data) => {
    const title = 'Your Booking has been Approved!';
    let content = `
        <p>Hello ${data.userName},</p>
        <p>Your request for the event <strong>"${data.eventTitle}"</strong> has been approved.</p>
    `;

    if (data.isReassigned) {
        content += `
            <div style="background-color: #EFF6FF; border-left: 4px solid #3B82F6; padding: 10px; margin: 15px 0;">
                <p><strong>Please Note:</strong> Your booking has been re-assigned to a different hall by the administrator.</p>
                <p><strong>Original Hall:</strong> ${data.originalHall}<br>
                   <strong>New Hall:</strong> ${data.finalHallName}</p>
            </div>
        `;
    }
    content += `<p>We look forward to your event on ${data.eventDate}.</p>`;
    return getBaseTemplate(title, content);
};

export const getRejectionTemplate = (data) => {
    const title = 'Update on Your Booking Request';
    let content = `
        <p>Hello ${data.userName},</p>
        <p>We regret to inform you that your booking request for <strong>"${data.eventTitle}"</strong> on ${data.eventDate} has been rejected.</p>
    `;

    if (data.adminNotes) {
        content += `
            <p><strong>Reason provided by admin:</strong></p>
            <p style="font-style: italic; background-color: #f3f4f6; padding: 10px; border-radius: 5px;">"${data.adminNotes}"</p>
        `;
    }
    content += `<p>If you have any questions, please contact the administration office.</p>`;
    return getBaseTemplate(title, content);
};