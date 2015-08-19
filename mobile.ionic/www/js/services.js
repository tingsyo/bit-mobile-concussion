angular.module('starter.services', [])

/**
* Settings of the server
*/
.factory('ServerSettings', function ( $http ) {
    var serverurl = "http://192.168.1.101:3300/"
    return serverurl;
})

/**
 * A service that returns symptoms data.
 */
.factory('Symptoms', function() {
//https://docs.google.com/spreadsheets/d/19bYEtQqt0kllwct28YLlkfDFEgY97Q_xLaSQfAxIM3E/edit?usp=sharing
  // 15 major symptoms for post-concussion patients
  var symptoms = [
    { id: 's01', name: '頭痛', value : 0},
    { id: 's02', name: '頭暈', value : 0},
    { id: 's03', name: '焦慮', value : 0},
    { id: 's04', name: '注意力不集中', value : 0},
    { id: 's05', name: '容易疲倦', value : 0},
    { id: 's06', name: '噁心', value : 0},
    { id: 's07', name: '體力變差', value : 0},
    { id: 's08', name: '憂鬱', value : 0},
    { id: 's09', name: '記憶力下降', value : 0},
    { id: 's10', name: '嘔吐', value : 0},
    { id: 's11', name: '視力模糊', value : 0},
    { id: 's12', name: '易怒', value : 0},
    { id: 's13', name: '失眠', value : 0},
    { id: 's14', name: '反應遲鈍', value : 0},
    { id: 's15', name: '耳鳴', value : 0}
  ];

  var overall = { id: 15, name: '整體影響', value : 0};

  return {
    all: function() {
      return {overall:overall, symptoms:symptoms};
    },
    get: function(symId) {
      // Simple index lookup
      return symptoms[symId];
    }
  }
})

/**
 * A service that returns intervention data.
 */
.factory('Interventions', function() {
    // intervention data to serve
    var interventions = {
        'ci000':{id: 'ci100', title: '認識腦震盪症候群', content:             '輕度頭部外傷患者一開始常會有頭痛、頭暈、容易疲倦、失眠等身體上的抱怨；後來以記憶力變差、注意力無法集中、易怒等情緒困擾為主，這些症狀可備統稱為「腦震盪症候群」。幸運的是，多數輕度頭部外傷患者在受傷後三個月內，即可恢復到受傷前的狀態。'},
        'ci100':{id: 'ci100', title: '身體病痛不要來', content:'頭痛、頭暈、容易疲倦是腦震盪後最常見的身體症狀。在受傷後一個月內，最重要的是讓大腦多休息，減少大腦的負擔。'},
        'ci101':{id: 'ci101', title:'循序漸進', content: '建議您在這段休養的期間內，工作的難度應該要逐漸增加，千萬不要急於要求自己馬上恢復至受傷前的表現。'},
        'ci102':{id: 'ci102', title:'欲速則不達', content: '這段期間要盡量避免增加大腦的負擔。當您一感到疲累時，請馬上放下手邊工作，讓大腦休息一下再繼續工作。'},
        'ci103':{id: 'ci103', title:'適合您的休息方式', content: '建議從過去經驗中找出您感到最放鬆、無負擔且無需耗費腦力的活動，做為您的休息方式最合適。'} ,
        'ci200':{id:'ci200', title:'頭腦補給站：注意力', content:'受傷後，注意力無法集中是常見的情形。可利用底下這些方法來改善注意力：'},
        'ci201':{id:'ci201', title:'當個好奇寶寶', content: '想要記下重要的事情時，在心裡頭提出許多相關的疑問，有助於更專注眼前，來幫助您記得更多。'},
        'ci202':{id:'ci202', title:'減少干擾', content: '將有限的精力放在重要事件上，盡量排除其他不必要的干擾，也不要同一時間做太多事。'},
        'ci203':{id:'ci203', title:'利用小幫手', content: '用行事曆規畫行程，確保您會記得重要事件，無須分神去操心是否遺漏些什麼。'},
        'ci300':'若您有記性變差的情形，可試試看下列方法來改善記憶的問題：',
        'ci301':{id:'ci301', title:'複誦', content: '藉由多次默唸來加深印象。'},
        'ci302':{id:'ci302', title:'心像', content: '在腦海裡想像一個畫面來強化印象，想像畫面越是具體鮮明，越能幫助您事後回想。'},
        'ci303':{id:'ci303', title:'利用想像力', content: '將新的資訊與原先熟悉的事物做連結，回想時便可利用熟悉的事物來幫助您回溯新資訊。'},
        'ci400':{id:'ci400', title:'揮別壞心情', content: '頭部外傷後，您是否容易感到心情低落、焦慮不安，或不耐煩的情形增加了呢？'},
        'ci401':{id:'ci401', title:'低落、焦慮', content: '若您覺察到自己陷入負面想法的迴圈中的時候，請告訴自己「停！」，並且回過頭思考，事情是否真如您所想像的那麼糟，在日常生活中，也可多安排一些感興趣的活動，以提升低落心情。'},
        'ci402':{id:'ci402', title:'憤怒', content: '發怒的原因通常是來自於疲倦感，因此，當您感到疲累不堪時，不妨重新調整行程表與步調，以避免負擔過重。而保持冷靜是問題解決的第一步，嘗試提醒自己「等三秒再開口」，並選擇適當的語氣及時機表達您的看法，或動腦想想其他解決辦法，皆有助於解決問題。'},
        'ci500':{id:'ci500', title:'夜夜好眠', content: '假如您有入睡困難、早醒、或睡眠品質不佳等情形，建議依照下列睡眠好習慣，以改善睡眠品質：'},
        'ci501':{id:'ci501', title:'放鬆練習', content: '睡前放鬆練習。'},
        'ci502':{id:'ci502', title:'減少聲音和光線', content: '減少會破壞睡眠的聲音和光線。'},
        'ci503':{id:'ci503', title:'不要在床上進行其他活動', content: '千萬不要在床上進行睡覺或性行為以外的事。'},
        'ci504':{id:'ci504', title:'避免食用刺激性的食物。', content: '睡前八小時避免食用刺激性或含咖啡因的食物。'},
        'ci505':{id:'ci505', title:'建立規律的作息', content: '建立規律的作息，固定入睡及起床時間，且白天盡量不要小睡或補眠。'},
        'ci506':{id:'ci506', title:'等到有睡意再回床上睡覺', content: '若躺在床上十五分鐘仍未入睡，就離開床鋪並做些安靜或無趣的活動，等到有睡意再回床上睡覺。'},
        'ci600':{id:'ci600', title:'幫壓力減重', content:'人們面對壓力事件時，會考量該壓力事件、環境限制或可運用之資源、及自身的能力水準，再根據整體評估結果選擇合宜的壓力因應方式：'},
        'ci601':{id:'ci601', title:'問題解決導向', content: '若認為壓力事件能被解決，宜採用問題解決導向，消除壓力的根源。'},
        'ci602':{id:'ci602', title:'情緒焦點導向', content: '若壓力事件不易被處理，則傾向採用情緒焦點導向，調適壓力事件帶來的負面感受。'},
        'ci603':{id:'ci603', title:'', content: '而這段期間內除個人壓力調適之外，「週遭重要他人」的支持與陪伴亦相當重要，有助於患者受傷後的恢復。'},
        's16a01': {'content': '復原的期間，生活中的壓力要逐漸增加，千萬不要急著回到受傷前的狀態，當您感到疲累或是身體不適時，請立刻放下手邊工作，休息一下再繼續工作', 'id': 's16a01', 'title': '症狀數'}, 's01m08': {'content': '這幾天請勿熬夜，充足的睡眠可以幫助您身體的復原', 'id': 's01m08', 'title': '頭痛'}, 's01m05': {'content': '您可以進行一些緩和運動放鬆緊繃的肌肉', 'id': 's01m05', 'title': '頭痛'}, 's01m04': {'content': '頭痛是腦震盪後最常見的身體症狀，必要時請勿排斥醫師的藥物。若覺得狀況一直未有改善，請進速就醫！', 'id': 's01m04', 'title': '頭痛'}, 's14a01': {'content': '請記住一個原則，一次處理一件事，請勿一次處理太多訊息增加大腦負擔，不需因此感到挫折或沮喪，給自己一些時間慢慢恢復到原本的狀態', 'id': 's14a01', 'title': '反應遲鈍'}, 's01m06': {'content': '適度的休息可以幫助您緩和身體的緊張感及生活的壓力感', 'id': 's01m06', 'title': '頭痛'}, 's01m01': {'content': '頭痛是腦震盪後最常見的身體症狀，請趕快放下手邊的工作讓大腦休息一下', 'id': 's01m01', 'title': '頭痛'}, 's01m03': {'content': '請放下手邊的工作，做幾個深呼吸和肢體伸展，緩和一下目前的不適', 'id': 's01m03', 'title': '頭痛'}, 's01m02': {'content': '儘量避免增加大腦的負擔，現在請您暫時放下手邊工作，喝口水休息片刻', 'id': 's01m02', 'title': '頭痛'}, 's15a01': {'content': '睡眠不足或是突然更換姿勢時，耳鳴的狀況會更加嚴重。請務必作息正常，切勿熬夜。另外在變換姿勢時，請慢慢來，讓您大腦適應身體姿勢的轉變。', 'id': 's15a01', 'title': '耳鳴'}, 's01m09': {'content': '正常且充足的睡眠可以幫助您減緩身體不適的症狀', 'id': 's01m09', 'title': '頭痛'}, 's04m06': {'content': '請勿長時間的看電視或使用電子產品，這些活動雖然可以短暫舒緩您生活壓力，但您的大腦並無法因此得到適當的休息', 'id': 's04m06', 'title': '注意力不集中'}, 's04m04': {'content': '您可以將有限的精力放在重要事件上，儘量排除其他非必要的干擾', 'id': 's04m04', 'title': '注意力不集中'}, 's04m05': {'content': '不要同一時間進行太多事情，一次一件慢慢來', 'id': 's04m05', 'title': '注意力不集中'}, 's04m02': {'content': '您可以暫時放下手邊的工作，走動一下活動筋骨', 'id': 's04m02', 'title': '注意力不集中'}, 's04m03': {'content': '您的身體已經累囉！起來動一動，轉換一下心情', 'id': 's04m03', 'title': '注意力不集中'}, 's04m01': {'content': '受傷後，注意力無法集中是常見的情形，請您暫時放下手邊的工作讓大腦休息一下', 'id': 's04m01', 'title': '注意力不集中'}, 's14m04': {'content': '請重新調整你生活的步調，在受傷復原的期間並不建議馬上回到原本的生活狀態', 'id': 's14m04', 'title': '反應遲鈍'}, 's14m03': {'content': '您可能會發現，最近在反應上跟以往比起來有些遲鈍，這是傷後正常的現象，請您在這段期間不要一次處理太多訊息以增加大腦的負擔', 'id': 's14m03', 'title': '反應遲鈍'}, 's14m02': {'content': '您可能發現最近在想與做之間有一個時間上的落差，這是傷後正常的現象，在復原期間一次處理一件事，對您的復原會有幫助', 'id': 's14m02', 'title': '反應遲鈍'}, 's14m01': {'content': '腦震盪後，您身體目前仍處於復原階段，在這段期間，建議您千萬不要急於要求自己馬上回到受傷前的狀態', 'id': 's14m01', 'title': '反應遲鈍'}, 's13m10': {'content': '您可以暫時先離開床鋪，進行一些較為靜態的活動，待有睡意再回到床上', 'id': 's13m10', 'title': '失眠'}, 's09a01': {'content': '您可以利用一些小幫手（像是鬧鈴提醒）來幫助您記得重要的事情', 'id': 's09a01', 'title': '記憶力下降'}, 's09a02': {'content': '將要記住的事情在內心多默念幾次，可以幫助您加深印象', 'id': 's09a02', 'title': '記憶力下降'}, 's01m07': {'content': '您可以進行一些較為緩和、無負擔的運動幫助身體的復原。目前請避免高強度的運動', 'id': 's01m07', 'title': '頭痛'}, 's11m01': {'content': '您目前用眼過度，眼睛已經發出求救訊號，建議您放下手邊工作，做一下望遠凝視放鬆眼部的肌肉', 'id': 's11m01', 'title': '視力模糊'}, 's13m08': {'content': '請勿在睡前進行激烈的運動，激烈的運動會刺激您的生理活動而影響入睡', 'id': 's13m08', 'title': '失眠'}, 's13m09': {'content': '請停止思考「為什麼我還沒睡著？」或「今晚又要失眠了！」等想法', 'id': 's13m09', 'title': '失眠'}, 's05a01': {'content': '您的身體目前處於復原期，請不要將自己的生活安排過多活動，以免身體的負擔過重', 'id': 's05a01', 'title': '容易疲倦'}, 's11m05': {'content': '在休養的期間，請避免在燈光、視線不足的情況下做事已增加眼睛的負荷', 'id': 's11m05', 'title': '視力模糊'}, 's05a02': {'content': '在白天時您可以安排幾個短暫的休息時間，讓生活中的壓力可以得到緩衝', 'id': 's05a02', 'title': '容易疲倦'}, 's13m02': {'content': '請盡量減少會干擾您睡眠的聲音和燈光', 'id': 's13m02', 'title': '失眠'}, 's13m03': {'content': '請盡量避免在床上進行睡眠或性行為以為的事（例如：辦公、閱讀）', 'id': 's13m03', 'title': '失眠'}, 's13m01': {'content': '在您睡覺前，可以進行一些肌肉放鬆的活動（例如：伸展運動），放鬆緊繃的肌肉', 'id': 's13m01', 'title': '失眠'}, 's13m06': {'content': '儘量避免在白天時的小睡或補眠，這樣對您晚上的睡眠會有幫助喲', 'id': 's13m06', 'title': '失眠'}, 's13m07': {'content': '如果躺在床上十五分鐘仍未入睡，請先離開床鋪近些一些靜態的活動，等到有睡意時再回到床上', 'id': 's13m07', 'title': '失眠'}, 's13m04': {'content': '睡前八小時請盡量避免食用刺激性或咖啡因的食物（例如：巧克力）', 'id': 's13m04', 'title': '失眠'}, 's13m05': {'content': '建立規律的作息時間，固定的時間入睡和起床，對您晚上的睡眠會有幫助喲！', 'id': 's13m05', 'title': '失眠'}, 's06a01': {'content': '請記住幾個原則，安排幾個休息時間讓自己好好的放鬆、休息，並且要有正常的作息和睡眠時間', 'id': 's06a01', 'title': '體力變差'}, 's06a02': {'content': '您可以進行一些緩和的運動（例如：散步、慢跑）來幫助您體力的鍛鍊', 'id': 's06a02', 'title': '體力變差'}, 's11m03': {'content': '熱敷您的雙眼，可以舒緩眼睛的疲憊唷', 'id': 's11m03', 'title': '視力模糊'}, 's10m02': {'content': '建議您少量多餐和避免過於辛辣、刺激之食物，以減少對腸胃的刺激', 'id': 's10m02', 'title': '嘔吐'}, 's09m05': {'content': '這段期間請搭配一些小工具（如：記事本）幫助要記住的事物，一方面避免遺漏，另一方面減輕大腦負荷', 'id': 's09m05', 'title': '記憶力下降'}, 's09m04': {'content': '您可以運用想像力，把要記起來的事物串連在一起幫助您回憶', 'id': 's09m04', 'title': '記憶力下降'}, 's09m01': {'content': '腦震盪過後，部分的人會有記憶力上的困擾，您不用因此而感到擔心。這一陣子，你可以利用隨身筆記本來幫助您記住重要事件，無須分神操心是否遺漏些什麼', 'id': 's09m01', 'title': '記憶力下降'}, 's10a02': {'content': '若嘔吐的症狀持續，請儘速就就醫', 'id': 's10a02', 'title': '嘔吐'}, 's10a01': {'content': '復原的期間，盡量避免過於刺激的食物', 'id': 's10a01', 'title': '嘔吐'}, 's09m02': {'content': '腦震盪過後，常會出現記憶力上的困擾。您可以利用隨身筆記本來記住重要事件，這一個方法也可以訓練您的記憶力喔', 'id': 's09m02', 'title': '記憶力下降'}, 's08a01': {'content': '找一些平常喜歡做的事情，來轉移這樣負面的情緒。有的時候可以找您要好的親朋好友聊聊天，抒發一下鬱悶的情緒。', 'id': 's08a01', 'title': '憂鬱'}, 's07m04': {'content': '可以嘗試進行一些緩和運動（例如：慢跑、游泳）來鍛鍊體力', 'id': 's07m04', 'title': '體力變差'}, 's07m03': {'content': '適時的休息片刻不僅可以減緩身體的不適感，也可以提高接下來工作的效率和品質喔！', 'id': 's07m03', 'title': '體力變差'}, 's07m02': {'content': '復原的期間，暫時不要將自己的行程安排過於緊密。留一些空間，允許自己休息一下', 'id': 's07m02', 'title': '體力變差'}, 's07m01': {'content': '您身體目前處於復原的階段，因此你可能會覺得體力與以往有所差異，請您適時地放下手邊工作休息片刻', 'id': 's07m01', 'title': '體力變差'}, 's15m04': {'content': '若您耳鳴的狀況持續不斷，建議您儘快到耳鼻喉科或神經外科就診', 'id': 's15m04', 'title': '耳鳴'}, 's15m05': {'content': '耳鳴會與心情和睡眠產生一個惡性的循環，保持良好的心情和睡眠是改善耳鳴狀況的第一步唷！', 'id': 's15m05', 'title': '耳鳴'}, 's15m06': {'content': '您可以進行一些較為緩和、平靜的運動，藉此放鬆肌肉、舒緩情緒，和轉移您對於耳鳴的注意力', 'id': 's15m06', 'title': '耳鳴'}, 's15m07': {'content': '您可以聆聽一些輕柔的音樂轉移目前對於耳鳴不舒服感的注意力', 'id': 's15m07', 'title': '耳鳴'}, 's09m03': {'content': '若發現有記憶力下降的情況，請不用擔心您回不到原本狀況。你可以試著在心中複誦要記憶的事物來增加印象', 'id': 's09m03', 'title': '記憶力下降'}, 's15m02': {'content': '你可以試試看腹式呼吸或是進行一些放鬆練習，這些方法都可以幫助您的耳鳴狀況緩解', 'id': 's15m02', 'title': '耳鳴'}, 's15m03': {'content': '適當的休息和充足的睡眠可以幫助您減緩耳鳴的狀況', 'id': 's15m03', 'title': '耳鳴'}, 's02m01': {'content': '頭暈是腦震盪後出其最常見的身體症狀，請儘量減少大腦的負擔，讓大腦多多休息', 'id': 's02m01', 'title': '頭暈'}, 's02m02': {'content': '請勿熬夜，充足的睡眠及正常的作息生活可以幫助減緩頭暈的狀況', 'id': 's02m02', 'title': '頭暈'}, 's02m03': {'content': '請放下手邊工作，給您的大腦暫時休息片刻', 'id': 's02m03', 'title': '頭暈'}, 's02m04': {'content': '您的身體在告訴您，他已經累了唷！喝口水，稍微休息一下', 'id': 's02m04', 'title': '頭暈'}, 's02m05': {'content': '請避免劇烈的運動或是過於晃動頭部的動作', 'id': 's02m05', 'title': '頭暈'}, 's02m06': {'content': '在轉換姿勢時（例如：起床、久坐後起身）請盡量慢慢來，讓大腦去適應姿勢的改變', 'id': 's02m06', 'title': '頭暈'}, 's02m07': {'content': '您可以記錄您頭暈時的狀況（例如：在哪一個時間點比較容易頭暈；頭暈時在做些什麼事...）來瞭解在什麼樣的情況下容易引起您的不適', 'id': 's02m07', 'title': '頭暈'}, 's04a02': {'content': '請減少周遭的干擾刺激，工作時一次進行一件事情', 'id': 's04a02', 'title': '注意力不集中'}, 's04a03': {'content': '放下手邊工作，休息10分鐘，再繼續工作對您注意力的維持會有幫助喔', 'id': 's04a03', 'title': '注意力不集中'}, 's04a01': {'content': '最近您可能會發現很難專注於某些事情，當您發現這樣的狀況時，不妨可以暫時休息一下，不用勉強自己必須繼續專注於該事件上', 'id': 's04a01', 'title': '注意力不集中'}, 's01m12': {'content': '這段期間儘量避免增加大腦的負擔，在休息時請盡量避免需要過多注意力的活動（例如：玩電腦）', 'id': 's01m12', 'title': '頭痛'}, 's11m02': {'content': '轉動一下您的眼球，並且輕按眼睛周圍可以幫助您眼睛放鬆', 'id': 's11m02', 'title': '視力模糊'}, 's12a01': {'content': '發怒或對事情的不耐煩通常是因為身體的疲憊或是不舒服所導致的，嘗試著重新調整生活和工作的步調，適當休息，避免過重的生活壓力。', 'id': 's12a01', 'title': '易怒'}, 's12a02': {'content': '快樂動，安心睡，健康吃，跟壞心情說掰掰～', 'id': 's12a02', 'title': '易怒'}, 's05m01': {'content': '容易疲倦是腦震盪後最常見的身體症狀，建議您可以進行放鬆、無負擔且無須消費腦力的活動，做為您的休息方式', 'id': 's05m01', 'title': '容易疲倦'}, 's11m04': {'content': '若您視力模糊的狀況持續為改善，建議您盡快到眼科或是神經外科就醫', 'id': 's11m04', 'title': '視力模糊'}, 's05m03': {'content': '您現在身體處於恢復期，感覺到疲憊是正常的狀況，您可以暫時放下手邊工作讓身體和心理休息片刻', 'id': 's05m03', 'title': '容易疲倦'}, 's05m02': {'content': '您可以在白天時安排1~2個工作休息時間或是午休時間，讓自己可以好好的休息一下', 'id': 's05m02', 'title': '容易疲倦'}, 's05m04': {'content': '可以進行一些緩和的運動（例如：慢跑、走路）來鍛鍊體力', 'id': 's05m04', 'title': '容易疲倦'}, 's08m02': {'content': '在日常生活中，您可以多安排一些感興趣的活動，來提升低落的心情', 'id': 's08m02', 'title': '憂鬱'}, 's08m03': {'content': '若您生活感到壓力，而且壓力事件不易被處理，建議您可以採用情緒焦點導向的方式，調適壓力事件帶來的負面感受', 'id': 's08m03', 'title': '憂鬱'}, 's08m01': {'content': '請告訴自己「停！」當您發現到自己掉入了負面想法的迴圈的時候，，並且回頭思考，事情是否真如您所想像的那麼糟糕', 'id': 's08m01', 'title': '憂鬱'}, 's03a02': {'content': '給自己的一些時間和空間，讓自己慢慢回到原本的生活軌道上。', 'id': 's03a02', 'title': '焦慮'}, 's03a01': {'content': '生活原本的壓力和身體的狀況可能會讓您覺得生活更加的緊張，無法放鬆。您可以做一些平常喜歡做的事情，轉移一下自己的注意力。', 'id': 's03a01', 'title': '焦慮'}, 's08m05': {'content': '這段期間您可能因為許多的壓力源，而使自己的情緒處於低落的狀態，建議您可以與親朋好友聊聊您的狀況，這對您情緒的紓解會有幫助', 'id': 's08m05', 'title': '憂鬱'}, 's11a01': {'content': '請再安排一些額外的休息時間，讓您的眼睛稍微休息一下，切勿注視近距離的畫面過久', 'id': 's11a01', 'title': '視力模糊'}, 's11a02': {'content': '熱敷您的眼睛，可以放鬆眼周的肌肉，讓您感覺舒服些', 'id': 's11a02', 'title': '視力模糊'}, 's10m03': {'content': '若嘔吐的狀況不斷，請儘速就醫', 'id': 's10m03', 'title': '嘔吐'}, 's15m08': {'content': '在夜深人靜時，耳鳴的狀況會更加明顯，您需要聆聽低音量的聲音來阻隔耳鳴的聲音', 'id': 's15m08', 'title': '耳鳴'}, 's10m01': {'content': '請適時補充電解質和食物，以補充身體所需的能量', 'id': 's10m01', 'title': '嘔吐'}, 's06m01': {'content': '腦震盪後，有些人會有噁心不舒服的狀況，建議您可以進行深呼吸的動作，來放鬆身體的不適感', 'id': 's06m01', 'title': '噁心'}, 's06m02': {'content': '腦震盪後，有些人會有噁心不舒服的狀況，您可以使用喉片或是小碎冰減緩噁心感', 'id': 's06m02', 'title': '噁心'}, 's06m03': {'content': '您可以到較為空曠或是空氣流通的地方，做幾個深呼吸，轉移不舒服的注意力', 'id': 's06m03', 'title': '噁心'}, 's01m15': {'content': '將您的狀況記錄下來（例如：做什麼事情時比較容易這樣的問題），可以更幫助您了解自己的狀況', 'id': 's01m15', 'title': '頭痛'}, 's12m05': {'content': '進行一些緩和的運動或是平常喜愛的休閒活動來舒緩緊繃的情緒吧', 'id': 's12m05', 'title': '易怒'}, 's12m04': {'content': '身體的不適感與日常生活瑣事會讓您對於一些不順心的事物容易失去耐心，您可以跟您的朋友或家人聊聊，抒發內心的壓力', 'id': 's12m04', 'title': '易怒'}, 's01m14': {'content': '這段期間，請盡量避免待在密閉、不通風的地方', 'id': 's01m14', 'title': '頭痛'}, 's12m06': {'content': '嘗試著將目前的狀態（例如：身體的不適感、生活中所面臨的壓力）告訴您周遭的親朋好友。這段期間，親友們的支持和陪伴是很重要的力量喔', 'id': 's12m06', 'title': '易怒'}, 's12m01': {'content': '發怒原因通常來自於您的疲憊感或是身體不適，你可以重新調整行程與步調，適時的休息以避免生活壓力負擔過重', 'id': 's12m01', 'title': '易怒'}, 's01m13': {'content': '休養的期間，請盡量遠離吵嘈的環境', 'id': 's01m13', 'title': '頭痛'}, 's12m03': {'content': '當您感覺到非常疲憊時，會容易失去耐心，記得要給自己足夠的時間休息！', 'id': 's12m03', 'title': '易怒'}, 's12m02': {'content': '保持冷靜是問題解決的第一步，您可以試著提醒自己「等三秒再開口」，選擇適當的語氣及時機表達您的看法', 'id': 's12m02', 'title': '易怒'}, 's01a01': {'content': '請放下手邊的工作，喝杯水、稍微起身走動休息一下，轉移一下工作上的壓力。', 'id': 's01a01', 'title': '頭痛'}, 's01a03': {'content': '放下手邊工作，讓您的大腦休息片刻', 'id': 's01a03', 'title': '頭痛'}, 's01a02': {'content': '若醫生有開立藥物，請勿排斥服用藥物', 'id': 's01a02', 'title': '頭痛'}, 's01m10': {'content': '休養的期間內，千萬不要急於要求自己馬上回到原來的生活狀態，應該要循序漸進、慢慢來', 'id': 's01m10', 'title': '頭痛'}, 's01m11': {'content': '您可以安排一些短暫的工作休息時間。（如：在午休之前的工作時間，安排一個10分鐘的休息）', 'id': 's01m11', 'title': '頭痛'}, 's08m04': {'content': '若您生活感到壓力，但此壓力事件是可以被解決，建議您可以採用問題解決導向的方式，規劃您解決的方式，消除您壓力的根源', 'id': 's08m04', 'title': '憂鬱'}, 's13a01': {'content': '請您先暫時離開床鋪，進行一些較為靜態的活動，或是進行一些肌肉放鬆的運動，等到想睡覺時，再回到床上', 'id': 's13a01', 'title': '失眠'}, 's02a01': {'content': '請放下手邊的工作，做幾個深呼吸，讓你的大腦和身體稍微休息一下', 'id': 's02a01', 'title': '頭暈'}, 's02a02': {'content': '在調整身體姿勢時（像是：起床），請放慢您的動作，慢慢來～讓大腦慢慢適應姿勢的改變', 'id': 's02a02', 'title': '頭暈'}, 's15m01': {'content': '降低周遭的聲音或是遠離噪音的環境會減緩您耳鳴的不舒服感', 'id': 's15m01', 'title': '耳鳴'}, 's03m03': {'content': '傷後的狀況和生活壓力可能會讓您情緒處於緊繃，給自己一些時間循序漸進地回到原本的生活軌道上，可以幫助您減緩焦慮感', 'id': 's03m03', 'title': '焦慮'}, 's03m02': {'content': '這段期間，您可能因為身體狀況以及生活壓力，感覺備感焦慮，建議您可以進行一些放鬆練習來放鬆您緊繃的肌肉和情緒', 'id': 's03m02', 'title': '焦慮'}, 's03m01': {'content': '當您發現到自己掉入了負面想法的惡性循環中，嘗試著讓這樣的想法停止下來（例如：散散步轉移注意力），等到情緒較為緩和時，再回頭重新思考所擔心的事情', 'id': 's03m01', 'title': '焦慮'}, 's03m04': {'content': '親友們的陪伴是很重要的喔！嘗試將最近的煩惱告訴周遭的家人或是好友吧！', 'id': 's03m04', 'title': '焦慮'}
    };

  return {
    all: function() {
      return interventions;
    },
    get: function(symId) {
      // Simple index lookup
      return interventions[symId];
    }
  }
})
/**
 * A service that returns intervention data.
 */
.factory('InterventionMap', function() {
    // intervention data to serve
    var interventionMap = {
        's00':{},
        's01':{
            low:['ci101','ci102','ci103'],
            medium:['s01a01','s01a02','s01a03'],
            high:['s01m01','s01m02','s01m03','s01m04','s01m05','s01m06','s01m07','s01m08','s01m09','s01m10','s01m11','s01m12','s01m13','s01m14','s01m15']
        },
        's02': {
            low:['ci101','ci102','ci103'],
            medium:['s02a01','s02a02'],
            high:['s02m01','s02m02','s02m03','s02m04','s02m05','s02m06','s02m07']
        },
        's03': {
            low:['ci401','ci601','ci602','ci603'],
            medium:['s03a01','s03a02'],
            high:['s03m01','s03m02','s03m03','s03m04']
        },
        's04': {
            low:['ci201','ci202','ci203'],
            medium:['s04a01','s04a02','s04a03'],
            high:['s04m01','s04m02','s04m03','s04m04','s04m05','s04m06']
        },
        's05': {
            low:['ci101','ci102','ci103'],
            medium:['s05a01','s05a01'],
            high:['s05m01','s05m02','s05m03','s05m04']
        },
        's06': {
            low:['ci101','ci102','ci103'],
            medium:['s06a01','s06a02'],
            high:['s06m01','s06m02','s06m03']
        },
        's07': {
            low:['ci101','ci102','ci103'],
            medium:['s07a01','s07a02'],
            high:['s07m01','s07m02','s07m03','s07m04']
        },
        's08': {
            low:['ci401','ci601','ci602','ci603'],
            medium:['s08a01'],
            high:['s08m01','s08m02','s08m03','s08m04','s08m05']
        },
        's09': {
            low:['ci301','ci302','ci303'],
            medium:['s09a01','s09a02'],
            high:['s09m01','s09m02','s09m03','s09m04','s09m05']
        },
        's10': {
            low:['ci101','ci102','ci103'],
            medium:['s10a01','s10a02'],
            high:['s10m01','s10m02','s10m03']
        },
        's11': {
            low:['ci101','ci102','ci103'],
            medium:['s11a01','s11a02'],
            high:['s11m01','s11m02','s11m03','s11m04','s11m05']
        },
        's12': {
            low:['ci401','ci601','ci602','ci603'],
            medium:['s12a01','s12a02'],
            high:['s12m01','s12m02','s12m03','s12m04','s12m05','s12m06']
        },
        's13': {
            low:['ci501','ci502','ci503','ci504','ci505','ci506'],
            medium:['s13a01'],
            high:['s13m01','s13m02','s13m03','s13m04','s13m05','s13m06','s13m07','s13m08','s13m09','s13m10']
        },
        's14': {
            low:['ci202'],
            medium:['s14a01'],
            high:['s14m01','s14m02','s14m03','s14m04']
        },
        's15': {
            low:['ci101','ci102','ci103'],
            medium:['s15a01'],
            high:['s15m01','s15m02','s15m03','s15m04','s15m05','s15m06','s15m07','s15m08']
        }
    };

  return {
    all: function() {
      return interventionMap;
    },
    get: function(symId) {
      // Simple index lookup
      return interventionMap[symId];
    }
  }
})

/**
 * User account data.
 */
.factory('UserInfo', function() {
  return {
    // Get userInfo from localstorage
    all: function() {
        var userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
        if(userInfo) {
            userInfo.incidentDate = new Date(userInfo.incidentDate);
            return(userInfo);
        }
        return {
            id: '',
            incidentDate: '',
            symptoms: ''
        };
    },
    // Save userInfo to localstorage
    save: function(userInfo) {
        window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
    },
    // Reset data for dev
    reset: function(){
        window.localStorage.removeItem('userInfo');
    }
  }
})

/**
 * User accessment records.
 */
.factory('UserRecords', function() {
  return {
    // Get userInfo from localstorage
    all: function() {
        var userRec = JSON.parse(window.localStorage.getItem('userRec'));
        if(userRec) {
            return(userRec);
        }
        return [];
    },
    // Save userInfo to localstorage
    save: function(userRec) {
        window.localStorage.setItem('userRec', JSON.stringify(userRec));
    },
    // Reset data for dev
    reset: function(){
        window.localStorage.removeItem('userRec');
    }
  }
})

/**
 * User diaries.
 */
.factory('Diaries', function() {
  return {
    // Get userInfo from localstorage
    all: function() {
        var diaries = JSON.parse(window.localStorage.getItem('userDiary'));
        if(diaries) {
            return(diaries);
        }
        return [];
    },
    // Save userInfo to localstorage
    save: function(diary) {
        window.localStorage.setItem('userDiary', JSON.stringify(diary));
    },
    // Reset data for dev
    reset: function(){
        window.localStorage.removeItem('userDiary');
    }
  }
})

/**
 * API for CORS problem
 * http://blog.ionic.io/handling-cors-issues-in-ionic/
 */
.factory('Api', function() {
    console.log('ApiEndpoint', ApiEndpoint);

    var postApplogData = function(rec) {
        return $http.post(ApiEndpoint.url + '/applogs', rec)
            .then(function(data) {
                console.log('Post applog: ', data);
                return data;
            });
    };
})
;
