+++
title = "潛水字幕產生器"
date = 2026-02-18
slug = "Fit2Srt"
description = "早安潛水的影片有字幕顯示深度資訊"

[taxonomies]
tags = ["hot"]
categories = ["article"]

[extra]
cover = "cover.jpg"
+++

早安潛水的影片都有字幕顯示即時深度，這是為了方便再後續教學中檢討。
下面這個影片，在把字幕打開的情形下，可以清楚的瞭解到潛水員在施放SMB時的深度變化。

<iframe width="560" height="315" src="https://www.youtube.com/embed/ro4Y1-1ny4M?si=M3gRAn4p9fzO-RBv" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

我們採用的設備是Insta360的相機跟Garmin Descent G1，並採用自行開發程式，來生成字幕檔。
現在我們把這些工具做成[網頁版](https://fit2srt.diver.best/)，方便潛友使用。

以下是具體的步驟

**1. 取得原始影片檔**

最簡單的方式是從SD卡中取得，檔案會在這個路徑
> /DCIM/Camera01/VID_20250907_100705_00_015.insv

如果你的影片已經傳到手機，Android手機會在這個路徑
> /Android/data/com.arashivision.insta360akiko/files/Insta360OneR/galleryOriginal/X4/Camera01/VID_20250907_100705_00_015.insv

**2. 取得 FIT 檔**

開啟Garmin Dive，進入該次潛水後，從右上角的「⋮」開啟選單後，將潛水活動匯出為 FIT 檔。

**3. 打開網頁，生成 SRT 字幕檔**

把上面兩個步驟的檔案都傳輸至電腦，開啟[網頁版的字幕生成器](https://fit2srt.diver.best/)，將兩個檔案都上傳，再點 Generate 按鈕，即可以載對應影片的SRT字幕檔

**4. 上傳字幕檔**

在 Youtube 創作者後台影片編輯個中，可以上傳字幕，就大功告成了。


這個就是我們做出深度字幕的方法，後續我們還會有進一步的程式開發，如果你有不同的裝置或需求，有需要我們的地方，也可以與我們聯繫。

