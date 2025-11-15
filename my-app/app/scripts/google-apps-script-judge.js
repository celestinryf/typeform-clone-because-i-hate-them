/**
 * Google Apps Script for UHackathon Judge Application Form
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet for Judge Applications
 * 2. Click Extensions > Apps Script
 * 3. Paste this entire script
 * 4. Update the SHEET_NAME constant below to match your sheet tab name
 * 5. Deploy as Web app (Execute as: Me, Who has access: Anyone)
 * 6. Copy the Web app URL
 * 7. Add to .env.local as: NEXT_PUBLIC_JUDGE_SHEETS_URL=<your-url>
 */

const SHEET_NAME = 'Judges';

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
        'Company/Organization',
        'Area of Expertise',
        'Years of Experience',
        'Availability',
        'Motivation',
        'LinkedIn/Portfolio'
      ]);
    }
    
    // Append the new judge application
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.firstName || '',
      data.lastName || '',
      data.email || '',
      data.company || '',
      data.expertise || '',
      data.experience || '',
      data.availability || '',
      data.motivation || '',
      data.linkedIn || ''
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
      status: 'UHackathon Judge Application API is running',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}