/**
 * Claire & Daniel — réception des RSVP vers Google Sheets
 * Collez ce code dans Extensions > Apps Script du Google Sheet.
 */
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Réponses');
  if (!sheet) throw new Error("Créez d'abord un onglet nommé Réponses.");
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),
    data.name || '',
    data.presence || '',
    data.adults || '',
    data.children || '',
    data.diet || '',
    data.message || ''
  ]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
