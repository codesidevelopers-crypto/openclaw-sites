function doPost(e) {
  try {
    var sheet = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('SHEET_ID')).getSheetByName(PropertiesService.getScriptProperties().getProperty('SHEET_NAME') || 'Leads');
    var data = JSON.parse(e.postData.contents || '{}');

    sheet.appendRow([
      new Date(),
      data.name || '',
      data.phone || '',
      data.email || '',
      data.website || '',
      data.inn || '',
      data.selectedTariff || '',
      data.selectedTariff === 'Базовый' ? '29900' : data.selectedTariff === 'Стандарт' ? '49900' : data.selectedTariff === 'Расширенный' ? '79900' : '',
      data.hasForms || '',
      data.usesTools || '',
      data.hasEmployees || '',
      data.filedNoticeBefore || '',
      data.needType || '',
      data.utm_source || '',
      data.utm_medium || '',
      data.utm_campaign || '',
      data.utm_content || '',
      data.utm_term || '',
      data.referrer || '',
      data.landing_url || '',
      data.user_agent || '',
      data.source_page || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
