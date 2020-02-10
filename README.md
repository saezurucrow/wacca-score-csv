# wacca-score-csv 説明書

## これは何

[音楽ゲームWACCA](https://wacca.marv.jp/)のマイページサイトから自身の全楽曲のスコアを取得しCSVファイルとして出力するBookmarkletです。

## 登録方法

1. 以下のコードをブックマーク登録する。


```
javascript:(function(url){s=document.createElement('script');s.src=url;document.body.appendChild(s);})('https://saezurucrow.github.io/wacca-score-csv/scraping.js')
```
#### ブックマークレット登録方法
- iOS-Safari : https://wayohoo.com/ios/tips/how-to-install-bookmarklet-in-safari-for-ios.html
- iOS&Android-Chrome : https://rezv.net/iphone/9352/#Chrome
- PC : https://qiita.com/aqril_1132/items/b5f9040ccb8cbc705d04

2. WACCA公式マイページにアクセスし、 [プレイデータ]>[楽曲スコア]のページを開く(https://wacca.marv-games.jp/web/music)

2. 登録したブックマークを実行する。

## 最後に

作成にあたりシマンドさん(TwitterID:@shimmand)の旧スコアツールのコードを参考にしました。大変感謝しております。

また、コードの記述に関してご指摘等ございましたら報告していただけると幸いです。
