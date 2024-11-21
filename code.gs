function doGet(e) {
  return HtmlService.createHtmlOutputFromFile("index");
}

function saveData(data) {
  const sheetName = "NASA_TLX_Results";
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(sheetName);

  // シートが存在しない場合は作成
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow([
      "タイムスタンプ (Timestamp)",
      "総合(Overall)",
      "知的・知覚的要求 (Mental Demand)",
      "身体的要求 (Physical Demand)",
      "時間的要求 (Temporal Demand)",
      "作業成績 (Performance)",
      "努力 (Effort)",
      "フラストレーション (Frustration)",
    ]);
  }

  const adjustedData = data.map((value) => value * 5);

  // データをシートに追加
  const timestamp = new Date();
  sheet.appendRow([timestamp, average(adjustedData), ...adjustedData]);
}

function sum(arr, fn) {
  if (fn) {
    return sum(arr.map(fn));
  } else {
    return arr.reduce(function (prev, current, i, arr) {
      return prev + current;
    });
  }
}

function average(arr, fn) {
  return sum(arr, fn) / arr.length;
}
