var orderType = prompt(
  'WACCA楽曲スコアソートツール\nAuthor:@chirping_crow\n\nソート順を入力してください。\n昇順は0、降順は1を記入してください。',
  '0'
);

var levelNum = prompt(
  'レベルフィルター\n\nレベルを入力してください。\n現在選択している難易度でのレベルが表示されます。\n1~14(13+など+がついているものは.1を付け足して入力してください。)\n(例:13+→13.1)\n0を入力するとフィルターは無視されます',
  '0'
);

var RANK = ['normal', 'hard', 'expert', 'inferno'];

Number(levelNum);

try {
  if (orderType != '0' && orderType != '1') {
    throw new Error('error : ソート順は0か1を記入してください。');
  }

  if (levelNum < 0 || levelNum > 14) {
    throw new Error('error : レベルは1~14の値を入力してください。');
  }

  grid.filter(function (item) {
    var element = item.getElement();
    if (levelNum == 0) {
      return true;
    }
    return element.getAttribute(`data-rank_${RANK[$rankCategory - 1]}_level`) == levelNum;
  });

  let nodes = $('[class*="muuri-item"]');
  let tmpScore;
  for (let i = 1; i <= nodes.length; i++) {
    tmpScore = nodes[i - 1].querySelectorAll('.playdata__score-list__song-info__score');

    $(nodes[i - 1]).data('rank_normal_score', tmpScore[0].innerText.replace(/\s+/g, '').replace('SCORE', ''));
    $(nodes[i - 1]).data('rank_hard_score', tmpScore[1].innerText.replace(/\s+/g, '').replace('SCORE', ''));
    $(nodes[i - 1]).data('rank_expert_score', tmpScore[2].innerText.replace(/\s+/g, '').replace('SCORE', ''));
    $(nodes[i - 1]).data('rank_inferno_score', tmpScore[3].innerText.replace(/\s+/g, '').replace('SCORE', ''));
  }

  window.parent.sortRankScore(orderType);
} catch (e) {
  alert(e);
}

function sortRankScore(orderType) {
  grid.sort(compareItemTitle);

  function compareItemTitle(a, b) {
    var aVal = '';
    var bVal = '';
    if ($rankCategory === '1') {
      aVal = $(a.getElement()).data('rank_normal_score') || '';
      bVal = $(b.getElement()).data('rank_normal_score') || '';
    } else if ($rankCategory === '2') {
      aVal = $(a.getElement()).data('rank_hard_score') || '';
      bVal = $(b.getElement()).data('rank_hard_score') || '';
    } else if ($rankCategory === '3') {
      aVal = $(a.getElement()).data('rank_expert_score') || '';
      bVal = $(b.getElement()).data('rank_expert_score') || '';
    } else if ($rankCategory === '4') {
      aVal = $(a.getElement()).data('rank_inferno_score') || '';
      bVal = $(b.getElement()).data('rank_inferno_score') || '';
    }
    aVal = Number(aVal);
    bVal = Number(bVal);
    if (orderType === '0') {
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    } else {
      return aVal > bVal ? -1 : aVal > bVal ? 1 : 0;
    }
  }
}
