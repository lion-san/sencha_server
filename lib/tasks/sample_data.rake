namespace :db do
  desc "Fill database with talk data"
  task populate: :environment do
    make_projects
  end
end


def make_projects

  @events = Array.new

  #=================================

  params =Array.new
  params.push('明治31年に塩尻市でワインが作られたんだよ。長野県内では一番最初だったんだよ。塩尻市のワインは100年を超える歴史があって、現在は8つの会社、1つの高校でワイン造りが行われているんだよ。1年間に約２９４０キロリットルのワインが出荷されていて、日本有数の産地として知られているんだよ。塩尻産メルローから生産されたワインは、世界的なコンクールでも賞をもらったりして評価が高いんだよ。')
  params.push('塩尻のもとやまじゅくは、そば切り発祥の地として全国的に有名なんだよ。塩尻には昔ながらの伝統を受け継いだおいしいそばを食べさせてくれるお店がたくさんあるんだよ。')
  params.push('塩尻は、雨が少なく日照時間の長いから、ぶどうを作るのに適しているんだよ。明治23年に桔梗ヶ原っていう場所にぶどうを植えたのが始まりだよ。現在は、日本有数のぶどう産地で年間約四千五百四十トンの収穫があるんだよ。')
  params.push('レタスは塩尻で採れる代表的な野菜なんだよ。年間約一万四千六百トンの収穫があって、これは長野県内第三位の収穫量なんだよ。')
  params.push('あやみどりは塩尻で生まれた緑大豆の名前だよ。平成21年に品種登録され、市内の使っていない農地等を使って「あやみどり」が栽培されているんだよ。きれいな緑色が特徴で豆腐やお菓子に使われているし、飲食店でもあやみどりを使った料理が食べられるんだよん。')
  params.push('山賊焼きは、大きな鳥のモモ肉やムネ肉をにんにく醤油タレに漬け込み、片栗粉をまぶして揚げる料理だよ。塩尻市内にある「山賊」というお店屋さんが調理方法を完成させたんだよ。')
  params.push('キムタクごはんは、塩尻市内の小、中学校で大人気の塩尻オリジナルの給食メニューだよ。材料は、ごはん、ベーコン、キムチ、たくあんなどだよ。キムチに含まれるカプサイシンは新陳代謝を高め、身体の脂肪を減らす働きがあるんだよ。肉類にはビタミンビーツーなどが豊富に含まれ体内でお米をしっかりとエネルギーに換える手助けをしているよ。なんとレシピが塩尻市のホームページで公開されているんだよ。')


  hour = 0
  event_count =1 
  for hour in 0..23 do

    min = 0
    del = 1

    count = 0

    while min < 60 do

      ev1 = Event.new(
        id: event_count,
        event: 'time',
        operator: '==',
        param: format("%02d", hour) + format("%02d", min)
      )
      act1 = Action.new(
        event_id: event_count,
        action: 'talk',
        param:  params[(count % params.length).floor]
      )
      ev1.actions << act1
      @events.push( ev1 )
      min = min + del

      count = count + 1
      event_count = event_count + 1

    end #End of while

  end #End of for

  #=================================

  puts "======="
  puts @events.length

  pj = Project.new(
    user_id: 'test',
    pjname:  'Shiojiri'
  )

  pj.events << @events

  pj.events.each do |e|
    puts "======="
    puts e.param
    puts e.actions.first.param
  end

  pj.save!

end

