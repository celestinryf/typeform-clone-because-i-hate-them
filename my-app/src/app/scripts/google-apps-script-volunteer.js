/**
 * Google Apps Script for UHackathon Volunteer Form
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet for Volunteer Applications
 * 2. Click Extensions > Apps Script
 * 3. Paste this entire script
 * 4. Update the SHEET_NAME constant below to match your sheet tab name
 * 5. Deploy as Web app (Execute as: Me, Who has access: Anyone)
 * 6. Copy the Web app URL
 * 7. Add to .env.local as: NEXT_PUBLIC_VOLUNTEER_SHEETS_URL=<your-url>
 */

const SHEET_NAME = 'Volunteers';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      return ContentService
        .createTextOutput(JSON.stringify({ error: 'Sheet not found' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Create headers if this is the first row
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'First Name',
        'Last Name',
        'Email',
        'School/Company',
        'Availability',
        'Areas of Interest',
        'Previous Experience',
        'Shirt Size',
        'Dietary Restrictions'
      ]);
    }
    
    // Append the new volunteer application
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.firstName || '',
      data.lastName || '',
      data.email || '',
      data.school || '',
      data.availability || '',
      data.interests || '',
      data.experience || '',
      data.shirtSize || '',
      data.dietary || ''
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: 'UHackathon Volunteer Application API is running',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}