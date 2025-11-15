/**
 * Google Apps Script for UHackathon Registration Form
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet
 * 2. Click Extensions > Apps Script
 * 3. Delete any existing code and paste this entire script
 * 4. Update the SHEET_NAME constant below to match your sheet tab name
 * 5. Click "Deploy" > "New deployment"
 * 6. Select "Web app" as deployment type
 * 7. Set "Execute as" to "Me"
 * 8. Set "Who has access" to "Anyone"
 * 9. Click "Deploy"
 * 10. Copy the Web app URL
 * 11. Add to your .env.local file as: NEXT_PUBLIC_GOOGLE_SHEETS_URL=<your-url>
 */

// CONFIGURATION - Update this to match your sheet tab name
const SHEET_NAME = 'Registrations';

/**
 * Handles POST requests from the registration form
 */
function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet and sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      return ContentService
        .createTextOutput(JSON.stringify({ error: 'Sheet not found' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Check if headers exist, if not create them
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'First Name',
        'Last Name',
        'Email',
        'Company/University',
        'Concerns',
        'Hours',
        'Division',
        'Shirt Size',
        'Dietary Restrictions'
      ]);
    }
    
    // Append the new row with form data
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.firstName || '',
      data.lastName || '',
      data.email || '',
      data.company || '',
      data.concerns || '',
      data.hours || '',
      data.division || '',
      data.shirtSize || '',
      data.dietary || ''
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error and return error response
    Logger.log('Error: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handles GET requests - can be used for testing
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: 'UHackathon Registration API is running',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}