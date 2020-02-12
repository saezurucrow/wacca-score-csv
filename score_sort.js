var orderType = prompt('WACCA楽曲スコアソートツール\nAuthor:@chirping_crow\n\nソート順を入力してください。\n昇順は0、降順は1を記入してください。', '0');

if (orderType == "0" || orderType == "1") {
  let nodes = $('[class*="muuri-item"]');
  let tmpScore;
  for (let i = 1; i <= nodes.length; i++) {
    tmpScore = nodes[i - 1].querySelectorAll('.playdata__score-list__song-info__score');

    $(nodes[i - 1]).data('rank_normal_score', tmpScore[0].innerText.replace(/\s+/g, "").replace("SCORE", ""))
    $(nodes[i - 1]).data('rank_hard_score', tmpScore[1].innerText.replace(/\s+/g, "").replace("SCORE", ""))
    $(nodes[i - 1]).data('rank_expert_score', tmpScore[2].innerText.replace(/\s+/g, "").replace("SCORE", ""))
  }

  function sortRankScore(orderType) {
    grid.sort(compareItemTitle);

    function compareItemTitle(a, b) {
      var aVal = '';
      var bVal = '';
      if ($rankCategory === "1") {
        aVal = $(a.getElement()).data('rank_normal_score') || '';
        bVal = $(b.getElement()).data('rank_normal_score') || '';
      } else if ($rankCategory === "2") {
        aVal = $(a.getElement()).data('rank_hard_score') || '';
        bVal = $(b.getElement()).data('rank_hard_score') || '';
      } else if ($rankCategory === "3") {
        aVal = $(a.getElement()).data('rank_expert_score') || '';
        bVal = $(b.getElement()).data('rank_expert_score') || '';
      }
      aVal = Number(aVal)
      bVal = Number(bVal)
      if (orderType === '0') {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      } else {
        return aVal > bVal ? -1 : aVal > bVal ? 1 : 0;
      }
    }
  }

  window.parent.sortRankScore(orderType)
} else if (orderType != "0" || orderType != "1") {
  alert("0か1を記入してください。")
} else {}