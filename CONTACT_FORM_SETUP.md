# Contact Form Setup Guide

## Overview
The contact form modal has been integrated into your CTA and Hero sections. When users click "Book a Free Call", a modal opens with a contact form that submits to Google Sheets and sends a confirmation email.

## Google Sheets Setup

### Step 1: Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Contact Form Submissions" or similar
4. Add these column headers in Row 1:
   - A1: `Timestamp`
   - B1: `First Name`
   - C1: `Last Name`
   - D1: `Email`
   - E1: `Subject`
   - F1: `Message`

### Step 2: Create Google Apps Script
1. In your Google Sheet, click `Extensions` → `Apps Script`
2. Delete any existing code
3. Paste this code:

```javascript
function doPost(e) {
  try {
    // Log the incoming request for debugging
    Logger.log('Received POST request');
    Logger.log('Parameters: ' + JSON.stringify(e.parameter));
    
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Get form data from parameters
    const timestamp = e.parameter.Timestamp || new Date().toISOString();
    const firstName = e.parameter['First Name'] || e.parameter.firstName || '';
    const lastName = e.parameter['Last Name'] || e.parameter.lastName || '';
    const email = e.parameter.Email || e.parameter.email || '';
    const subject = e.parameter.Subject || e.parameter.subject || '';
    const message = e.parameter.Message || e.parameter.message || '';
    
    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      Logger.log('Missing required fields');
      return ContentService.createTextOutput(JSON.stringify({
        'result': 'error',
        'error': 'Missing required fields'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Append to sheet
    sheet.appendRow([timestamp, firstName, lastName, email, subject, message]);
    Logger.log('Data appended to sheet successfully');
    
    // Send confirmation email
    try {
      const emailSubject = "Thank You for Contacting Us!";
      const emailBody = `Dear ${firstName} ${lastName},

Thank you for reaching out to us! We have received your message and will get back to you shortly.

Your submission details:
Subject: ${subject}
Message: ${message}

Best regards,
The Team`;
      
      MailApp.sendEmail({
        to: email,
        subject: emailSubject,
        body: emailBody
      });
      Logger.log('Confirmation email sent to: ' + email);
    } catch(emailError) {
      Logger.log('Email error (non-fatal): ' + emailError.toString());
      // Don't fail the whole request if email fails
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'message': 'Form submitted successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    Logger.log('Error: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'error': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function to verify the script works
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    'result': 'success',
    'message': 'Google Apps Script is working! Use POST to submit data.'
  })).setMimeType(ContentService.MimeType.JSON);
}
```

4. Click `Save` (disk icon)
5. Click `Deploy` → `New deployment`
6. Click the gear icon next to "Select type" → Choose `Web app`
7. Configure:
   - Description: "Contact Form Handler"
   - Execute as: `Me`
   - Who has access: `Anyone`
8. Click `Deploy`
9. Click `Authorize access` and grant permissions
10. **Copy the Web App URL** - you'll need this!

### Step 3: Add Environment Variable
1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Add this line (replace with your actual URL):

```env
GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

3. Restart your development server

## Testing

### Quick Test with HTML File
1. Open `test-contact.html` in your browser
2. Paste your Google Apps Script URL in the first field
3. Fill out the form (or use the pre-filled test data)
4. Click "Test Submit"
5. Check the result and verify:
   - Success message appears
   - New row appears in Google Sheet
   - Confirmation email arrives

### Test the Form in Your App
1. Run your development server: `npm run dev`
2. Click "Book a Free Call" button
3. Fill out the form
4. Submit
5. Check:
   - Google Sheet for new row
   - Email inbox for confirmation email
   - Console for any errors

### Troubleshooting

**Form doesn't submit:**
- Check browser console for errors
- Verify `GOOGLE_SHEETS_URL` is set correctly in `.env.local`
- Ensure Google Apps Script is deployed as "Anyone" can access
- Make sure you copied the `/exec` URL, not the `/dev` URL

**No email received:**
- Check spam folder
- Verify email address in form
- Check Google Apps Script execution logs (View → Executions in Apps Script)
- Email sending may fail but form submission should still work

**Data not in sheet:**
- Verify column headers match exactly (case-sensitive)
- Check Apps Script permissions
- View Apps Script execution logs (View → Executions)
- Try the test function by visiting the script URL in browser (should show "Google Apps Script is working!")

**"Failed to submit to Google Sheets" error:**
1. Open Google Apps Script editor
2. Click "View" → "Executions" to see error logs
3. Common issues:
   - Script not deployed or deployment URL wrong
   - Permissions not granted
   - Sheet structure doesn't match (check column headers)
4. Test the script directly:
   - Visit your script URL in a browser
   - Should see: `{"result":"success","message":"Google Apps Script is working! Use POST to submit data."}`
   - If you see an error, the script isn't deployed correctly

**Re-deploying the Script:**
If you make changes to the Google Apps Script:
1. Click "Deploy" → "Manage deployments"
2. Click the pencil icon to edit
3. Change "Version" to "New version"
4. Click "Deploy"
5. The URL stays the same, no need to update `.env.local`

## Customization

### Change Email Template
Edit the `emailBody` in the Google Apps Script to customize the confirmation email.

### Add More Fields
1. Add column to Google Sheet
2. Update `contact-form-modal.tsx` to include new field
3. Update `app/api/contact/route.ts` to pass new field
4. Update Google Apps Script to handle new field

### Style the Modal
Edit `components/ui/contact-form-modal.tsx` to change colors, layout, or styling.

## Production Deployment

Before deploying to production:
1. Add `GOOGLE_SHEETS_URL` to your hosting platform's environment variables (Vercel, Netlify, etc.)
2. Test the form in production
3. Monitor Google Sheet for submissions

## Security Notes

- The Google Apps Script runs with your permissions
- Form data is sent over HTTPS
- No sensitive data is stored in the frontend
- Consider adding rate limiting for production
- Add CAPTCHA if you experience spam

## Support

If you encounter issues:
1. Check the browser console for errors
2. View Google Apps Script execution logs
3. Verify all environment variables are set
4. Test with a simple form submission first
