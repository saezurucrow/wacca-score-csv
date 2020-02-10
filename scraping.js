class CSV {
  constructor(data, keys = false) {
    this.ARRAY = Symbol('ARRAY');
    this.OBJECT = Symbol('OBJECT');

    this.data = data;

    if (CSV.isArray(data)) {
      if (0 == data.length) {
        this.dataType = this.ARRAY
      } else if (CSV.isObject(data[0])) {
        this.dataType = this.OBJECT
      } else if (CSV.isArray(data[0])) {
        this.dataType = this.ARRAY
      } else {
        throw Error('Error: 未対応のデータ型です')
      }
    } else {
      throw Error('Error: 未対応のデータ型です')
    }

    this.keys = keys
  }

  toString() {
    if (this.dataType === this.ARRAY) {
      return this.data.map((record) => (
        record.map((field) => (
          CSV.prepare(field)
        )).join(',')
      )).join('\n')
    } else if (this.dataType === this.OBJECT) {
      const keys = this.keys || Array.from(this.extractKeys(this.data));

      const arrayData = this.data.map((record) => (
        keys.map((key) => record[key])
      ))

      return [].concat([keys], arrayData).map((record) => (
        record.map((field) => (
          CSV.prepare(field)
        )).join(',')
      )).join('\n')
    }
  }

  save(filename = 'data.csv') {
    if (!filename.match(/\.csv$/i)) {
      filename = filename + '.csv'
    }

    const csvStr = this.toString();

    const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    const blob = new Blob([bom, csvStr], {
      'type': 'text/csv'
    });
    const url = window.URL || window.webkitURL;
    const blobURL = url.createObjectURL(blob);

    let a = document.createElement('a');
    a.download = decodeURI(filename);
    a.href = blobURL;
    a.type = 'text/csv';

    a.click();
  }

  extractKeys(data) {
    return new Set([].concat(...this.data.map((record) => Object.keys(record))));
  }

  static prepare(field) {
    return '"' + ('' + field).replace(/"/g, '""') + '"';
  }

  static isObject(obj) {
    return '[object Object]' === Object.prototype.toString.call(obj);
  }

  static isArray(obj) {
    return '[object Array]' === Object.prototype.toString.call(obj);
  }
}

try {
  const URL = location.href;

  if (URL != "https://wacca.marv-games.jp/web/music") {
    throw new Error("表示しているページが違います。プレイデータの楽曲スコアのページを開いて再度試してください。");
  }

  let results = [];
  let score_ave = [0, 0, 0];
  let tmpScore, tmpResult;
  let nodes = $('[class*="muuri-item"]');

  for (let i = 1; i <= nodes.length; i++) {
    tmpScore = nodes[i - 1].querySelectorAll('.playdata__score-list__song-info__score');

    tmpResult = {
      title: nodes[i - 1].querySelector('.playdata__score-list__song-info__name').innerText,
      n_score: tmpScore[0].innerText.replace(/\s+/g, "").replace("SCORE", ""),
      h_score: tmpScore[1].innerText.replace(/\s+/g, "").replace("SCORE", ""),
      e_score: tmpScore[2].innerText.replace(/\s+/g, "").replace("SCORE", ""),
    }

    score_ave[0] += parseInt(tmpResult.n_score);
    score_ave[1] += parseInt(tmpResult.h_score);
    score_ave[2] += parseInt(tmpResult.e_score);

    results.push(tmpResult)
  }

  score_ave[0] = Math.round(score_ave[0] / nodes.length);
  score_ave[1] = Math.round(score_ave[1] / nodes.length);
  score_ave[2] = Math.round(score_ave[2] / nodes.length);

  alert(`WACCAスコア集計ツール\nAuthor:@chirping_crow\n\nAverage(小数点以下四捨五入):\nNORMAL:${score_ave[0]}\nHARD:${score_ave[1]}\nEXPERT:${score_ave[2]}\n\nボタンを押すとCSVのダウンロードが始まります。`);

  (new CSV(results)).save('wacca_score.csv');
} catch (e) {
  alert(e);
}