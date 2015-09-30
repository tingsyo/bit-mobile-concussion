angular.module('starter.controllers', ['ionic','ngCordova'])

.controller('MainCtrl', function($scope, $location, $http, $window, UserInfo, UserRecords, Diaries, $rootScope, $cordovaLocalNotification, ServerSettings) {
    // Check user profile is set
    var userInfo = UserInfo.all();
    if(userInfo.id === ""){
        $location.path('/tab/login');
    } else {
        //$window.location.reload(true);  // Refresh data
        console.log("UserID: " + userInfo.id);
    }
    //
    // Try to sync data
    $scope.syncRec = function(rec, serverurl){
        $scope.result = -1;
        $http({
            method: 'POST',
            url:serverurl,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: rec
        })
        .then(
            function(resolve) {
                console.log("sync complete: "+rec.userid+" : "+rec.time);
                $scope.result = 1;
            },
            function(err){
                console.log(err);
                $scope.result = 0;
            }
        );
        //console.log(result);
        return $scope.result;
    }
    /* Sync user records with the server */
    $scope.syncRecords = function(){
        // Retrieve all records
        $scope.userRecords = UserRecords.all();
        // Configure http post parameters
        var serverurl = ServerSettings.serverurl + "applogs";
        console.log($scope.userRecords.length.toString()+' local records found.');
        // Sync unsynced records
        var rcount = 0;
        for(var i=0; i<$scope.userRecords.length; i++){
            if(!$scope.userRecords[i].synced){
                rec = {
                    time: Date.parse($scope.userRecords[i].time),
                    userid: userInfo.id,
                    overall: $scope.userRecords[i].overall.value,
                    symptoms:[
                        $scope.userRecords[i].symptoms[0].value,
                        $scope.userRecords[i].symptoms[1].value,
                        $scope.userRecords[i].symptoms[2].value,
                        $scope.userRecords[i].symptoms[3].value,
                        $scope.userRecords[i].symptoms[4].value,
                        $scope.userRecords[i].symptoms[5].value,
                        $scope.userRecords[i].symptoms[6].value,
                        $scope.userRecords[i].symptoms[7].value,
                        $scope.userRecords[i].symptoms[8].value,
                        $scope.userRecords[i].symptoms[9].value,
                        $scope.userRecords[i].symptoms[10].value,
                        $scope.userRecords[i].symptoms[11].value,
                        $scope.userRecords[i].symptoms[12].value,
                        $scope.userRecords[i].symptoms[13].value,
                        $scope.userRecords[i].symptoms[14].value
                    ]
                };
                console.log(rec);
                // Sync this record
                var syncResult = 0;
                syncResult = $scope.syncRec(rec, serverurl);
                //console.log(syncResult);
                if(syncResult != 0){
                    $scope.userRecords[i].synced = true;
                    rcount ++;
                }
            }
        }
        //
        console.log(rcount + ' records sent to '+ serverurl);
        // Update local user records
        UserRecords.save($scope.userRecords);
    };
    /* Sync user diary with the server */
    $scope.syncDiaries = function(){
        $scope.diaries = Diaries.all();
        // Configure http post parameters
        var serverurl = ServerSettings.serverurl + "articles";
        console.log($scope.diaries.length.toString()+' local diariy entries found.');
        // Sync unsynced records
        var dcount = 0;
        for(var i=0; i<$scope.diaries.length; i++){
            if(!$scope.diaries[i].synced){
                rec = {
                    tiitle: Date.parse($scope.diaries[i].title),
                    userid: userInfo.id,
                    content: $scope.diaries[i].content
                };
                console.log(rec);
                // Sync this record
                var synced = 0;
                synced = $scope.syncRec(rec, serverurl);
                //
                if(synced != 0) {
                    $scope.diaries[i].synced = true;
                    dcount++;
                }
            }
        }
        //
        console.log(dcount + ' diary entries sent to '+ serverurl);
        // Update local user records
        Diaries.save($scope.diaries);
    }
    // Automatic syn data on start
    $scope.syncRecords();
    $scope.syncDiaries();
    // Check the time since accident
    // Retrieve only past 7 days of data
    var today = new Date();
    var watchPeriod = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 13);
    var incidentDay = Date.parse(userInfo.incidentDate);
    if(incidentDay < watchPeriod){
        console.log("More than 2 weeks since incident, go to main screen");
        $location.path('/tab/main');
    } else {
        console.log("Less than 2 weeks since incident, go to evaluation");
        $location.path('/tab/evaluation');
    }
    //
})

.controller('DiaryCtrl', function($scope, $ionicModal, $ionicPopup, Diaries) {
    $scope.diaries = Diaries.all();
    // Create new diary
    $ionicModal.fromTemplateUrl('templates/u-new-diary.html', function(modal) {
        $scope.diaryModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });

    // Called when the form is submitted
    $scope.createDiary = function(diary) {
        $scope.diaries.push({
            title: $scope.diaryTimestamp,
            content: diary.content,
            synced: false
        });
        $scope.diaryModal.hide();
        // Save all diaries
        Diaries.save($scope.diaries)
        diary.title = "";
    };

    // Open our new diary modal
    $scope.newDiary = function() {
        var ts = new Date();
        $scope.diaryTimestamp = ts.toJSON().substring(0,19);
        //console.log($scope.diaryTimestamp);
        $scope.diaryModal.show();
    };

    // Close the new diary modal
    $scope.closeNewDiary = function() {
        $scope.diaryModal.hide();
    };

    // Show diary
    $scope.showDiary = function(diary){
        var diaryPopup = $ionicPopup.alert({
            title: diary.title,
            template: diary.content,
            scope: $scope,
            buttons: [
                {   text: '完成'}
            ]
        });
        diaryPopup.then(function(res) {
            // Log for testing
            //console.log(items);
        });
    }
})

.controller('EvalSympCtrl', function($scope, $location, $window, Symptoms, Interventions, InterventionMap, $ionicPopup, UserRecords, $cordovaLocalNotification) {
    // User Records
    $scope.userRecords = UserRecords.all();
    // Overall score
    $scope.overall = Symptoms.all().overall;
    // Symptoms score
    $scope.symptoms = Symptoms.all().symptoms;
    // Calculate scores for response
    var calculateEval = function(overall, symptoms){
        var overallScore = overall.value;
        var numberOfSymptoms = 0;
        var highScore = 0;
        var highSymptoms = [];
        // Loop through symptoms
        for (i=0; i< 15; i++){
            var score = symptoms[i].value;
            // Count non-zero symptoms
            if (score != 0) {numberOfSymptoms++;}
            // Keep highest score
            if (score > highScore) {
                highScore = score;
                highSymptoms = [symptoms[i].id];
            } else if(score == highScore){
                highSymptoms.push(symptoms[i].id);
            }
        }
        // wrap up calculations
        return {
            overall: overallScore,
            nSymptoms: numberOfSymptoms,
            symptoms: highSymptoms,
            intensity: highScore
        };
    };
    // Save symptoms to local storage
    var saveEvaluations = function(overall, symptoms){
        var d = new Date();
        $scope.userRecords.push({time:d.toUTCString(), overall:overall, symptoms:symptoms, synced: false});
        UserRecords.save($scope.userRecords);
        // Reset all evaluations
        $scope.overall = Symptoms.all().overall;
        $scope.symptoms = Symptoms.all().symptoms;
        // Log for testing
        //console.log($scope.userRecords);
        return(0);
    }

    // Show intervention
    $scope.showIntervention = function(items) {
        //console.log(items);
        //alert(item.content);
        var interventionPopup = $ionicPopup.alert({
            title: '給您的建議',
            cssClass: 'customizedIntervention',
            templateUrl: 'templates/u-intervention.html',
            scope: $scope,
            buttons: [{text: '完成'}]
        });
        interventionPopup.then(function(res) {
            // Log for testing
            //console.log(items);
            $window.location.reload(true);  // Refresh data
        });
    };



    // Main export function: response generator
    var interventions = Interventions.all();
    var interventionMap = InterventionMap.all();
    $scope.interventionToDeliver = [];
    $scope.generateResponse = function(){
        // Save to localstorage
        saveEvaluations($scope.overall, $scope.symptoms);
        // Generate intervention content
        $scope.interventionToDeliver = [];
        var eval = calculateEval($scope.overall, $scope.symptoms);
        // Log for testing
        //console.log(eval);
        // Check high-score symptoms
        var intList = [];
        for(var i=0; i< eval.symptoms.length; i++){
            // Check if intensity level passed high, add audio
            if (eval.intensity > 6) {
                var items = interventionMap[eval.symptoms[i]].high;
                var item = items[Math.floor(Math.random()*items.length)];
                // Send content to interventionToDeliver if it's not there yet
                if (intList.indexOf(item) == -1) {
                    //console.log(item + " is not in list yet, add it.");
                    intList.push(item);
                    $scope.interventionToDeliver.push(interventions[item]);
                }
            }
            // Check if intensity level passed medium, add audio
            if (eval.intensity > 3) {
                var items = interventionMap[eval.symptoms[i]].medium;
                var item = items[Math.floor(Math.random()*items.length)];
                // Send content to interventionToDeliver if it's not there yet
                if (intList.indexOf(item) == -1) {
                    //console.log(item + " is not in list yet, add it.");
                    intList.push(item);
                    $scope.interventionToDeliver.push(interventions[item]);
                }
            }
            // Get a list of candidate interventions: low intensity
            var items = interventionMap[eval.symptoms[i]].low;
            // Randomly draw one
            var item = items[Math.floor(Math.random()*items.length)];
            // Send content to interventionToDeliver if it's not there yet
            if (intList.indexOf(item) == -1) {
                //console.log(item + " is not in list yet, add it.");
                intList.push(item);
                $scope.interventionToDeliver.push(interventions[item]);
            }
        }
        // Log for testing
        //console.log($scope.interventionToDeliver);
        $scope.showIntervention($scope.interventionToDeliver);
        // Register notification
        $scope.registerPush($scope.overall);
        // Back to main page
        $location.path('/tab/main');   // Go to home page
    };
    // cordova local notification
    $scope.$on("$cordovaLocalNotification:added", function(id, state, json) {
        alert("Added a notification");
    });
    //
    $scope.addNotification = function(id, time, message) {
        var alarmTime = new Date();
        alarmTime.setMinutes(alarmTime.getMinutes() + time);
        $cordovaLocalNotification.schedule({
            id: id,
            at: alarmTime,
            text: message,
            title: "Dr.Mobile",
            sound: null
        }).then(function () {
            console.log("The notification has been set");
        });
    };

    $scope.isScheduled = function() {
        $cordovaLocalNotification.isScheduled("1234").then(function(isScheduled) {
            alert("Notification 1234 Scheduled: " + isScheduled);
        });
    }
    // Add event notification
    $scope.registerPush = function(overallScore){
        if(overallScore <=5) {
            console.log("整體干擾五分以下: 1hr/2hr");
            $scope.addNotification(101, 60, '請問您的症狀有好轉嗎？');
            $scope.addNotification(201, 120, '請問您的症狀有好轉嗎？');            
        } else if (overallScore <= 8){
            console.log("整體干擾6~8: 2hr/6hr");
            $scope.addNotification(101, 120, '請問您的症狀有好轉嗎？');
            $scope.addNotification(201, 360, '請問您的症狀有好轉嗎？');            
        } else {
            console.log("整體干擾>8: 4hr/8hr");
            $scope.addNotification(101, 240, '請問您的症狀有好轉嗎？');
            $scope.addNotification(201, 480, '請問您的症狀有好轉嗎？');            
        }

    };
    // cordova local notification
})

.controller('ProfileCtrl', function($scope, $ionicHistory, $window, $location, UserInfo, UserRecords, Symptoms) {
    //$scope.userinfo = {};
    $scope.userinfo = angular.copy(UserInfo.all());
    $scope.isHistoryShown = false;
    // Symptoms score
    $scope.symptoms = Symptoms.all().symptoms;
    //console.log($scope.userinfo);
    /* When "confirm modification" clicked */
    $scope.idIsNotValid = ($scope.userinfo.id==="");
    $scope.modifyProfile = function(){
        // Check ID is input
        if($scope.userinfo.id===""){
            $scope.idIsNotValid = true;
        } else {
            UserInfo.save($scope.userinfo); // Save to localstorage
            $location.path('/tab/main');   // Go to home page
        }
    };

    /* Retrieve full evaluation history
    var retrieveUserRecords = function(){
        // Keep user records up to date
        $scope.userRecords = UserRecords.all();
        // Convert to matrix
        urecTime = [];
        urecOverall = [];
        urecSymptoms = [];
        for( var i=0; i < $scope.userRecords.length; i++){
            // Get time stamp
            urecTime.push(Date.parse($scope.userRecords[i].time));
            // Get symptoms value
            urecOverall.push($scope.userRecords[i].overall.value);
            var allSymp = [];
            for(var j=0; j<$scope.userRecords[i].symptoms.length; j++){
                allSymp.push($scope.userRecords[i].symptoms[j].value);
            }
            urecSymptoms.push(allSymp);
        }
        //console.log({time: urecTime, overall: urecOverall, symptoms.urecSymptoms});
        return({time: urecTime, overall: urecOverall, symptoms: urecSymptoms});
    };*/
    /* Retrieve records for the last 7 days */
    var retrieveUserRecords7Day = function(){
        // Retrieve only past 7 days of data
        var today = new Date();
        var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);
        // Keep user records up to date
        $scope.userRecords = UserRecords.all();
        // Convert to matrix
        urecTime = [];
        urecDay = []; // for calculating days from now
        urecOverall = [];
        urecSymptoms = [];
        for( var i=0; i < $scope.userRecords.length; i++){
            //console.log(Date.parse(lastWeek));
            //console.log(Date.parse($scope.userRecords[i].time));
            if(Date.parse($scope.userRecords[i].time) - Date.parse(lastWeek) >=0){
                // Get time stamp
                var recDate = new Date($scope.userRecords[i].time)
                urecTime.push(Date.parse($scope.userRecords[i].time));
                urecDay.push(today.getDate() - recDate.getDate());
                // Get symptoms value
                urecOverall.push($scope.userRecords[i].overall.value);
                var allSymp = [];
                for(var j=0; j<$scope.userRecords[i].symptoms.length; j++){
                    allSymp.push($scope.userRecords[i].symptoms[j].value);
                }
                urecSymptoms.push(allSymp);
            }
        }
        //console.log({time: urecTime, overall: urecOverall, symptoms.urecSymptoms});
        return({time: urecTime, day: urecDay, overall: urecOverall, symptoms: urecSymptoms});
    }

    // Get highest symptoms
    var getHighestSymptoms = function(sympRecs){
        var symptoms = Symptoms.all().symptoms;
        // Accumulated scores
        var cscores = [];
        var cfreq = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        for(var i=0; i< sympRecs.length; i++){
            for(var j=0; j< symptoms.length; j++){
                // Accumulative scores
                if(!cscores[j]) {
                    cscores[j] = parseInt(sympRecs[i][j]);
                } else {
                    cscores[j] += parseInt(sympRecs[i][j]);
                }
                // Count frequency
                if(sympRecs[i][j]!=0){
                    cfreq[j] += 1;
                }
            }
        }
        // Find max
        var maxScore = Math.max.apply(null, cscores);
        var maxIdx = cscores.indexOf(maxScore);
        var maxSymp = symptoms[maxIdx];
        maxSymp.value = maxScore;
        // Find most frequent
        var maxFreq = Math.max.apply(null, cfreq);
        var freqIdx = cfreq.indexOf(maxFreq);
        var freqSymp = symptoms[freqIdx];
        freqSymp.value = maxFreq;
        // Log for testing
        //console.log(cscores);
        //console.log(maxScore);
        //console.log(maxIdx);
        //console.log(symptoms[maxIdx].name);
        return({intense: maxSymp, frequent: freqSymp});
    };

    var createHistoryPlot = function(hdata){
        // Assign options
        $scope.figureOptions = {
            chart: {
                type: 'lineChart',
                //height: 350,
                margin: {left:90,top:20,bottom:20,right:50},
                x: function(d){return d.day;},
                y: function(d){return d.score;},
                transitionDuration: 300,
                xAxis: {
                    axisLabel: 'Time',
                    tickFormat: function(d) {
                        return d3.time.format('%Y/%m/%d')(new Date(d))
                    }
                },
                yAxis: {
                    axisLabel: '影響程度',
                    tickValues:['0','2','4','6','8','10'],
                    tickFormat: function(d) {
                        return d3.format('%')(d/10)
                    },
                    axisLabelDistance: 10,
                },
                yDomain: [0,10],
                callback: function(chart){
                    console.log("!!! lineChart callback !!!");
                }
            }
        };
        // Convert records into daily average (x: day, y: score)
        console.log("Summary for the past 7 days: initialization");
        var today = new Date();
        var datapoints = [];
        for(var i=6; i>=0; i--){
            datapoints.push({
                day: new Date(today.getFullYear(), today.getMonth(), today.getDate() - i),
                score: 0
            });
        }
        // Loop through records to sum up
        console.log("Summary for the past 7 days: sum up overall");
        var recPerDay = [0,0,0,0,0,0,0];
        for(var i=0; i<hdata.overall.length; i++){
            if (hdata.overall[i] > 0){
                datapoints[6-hdata.day[i]].score += parseInt(hdata.overall[i]);
                recPerDay[6-hdata.day[i]]++;
            }
        }
        for(var i=6; i>=0; i--){
            if(recPerDay[i]>0){
                datapoints[i].score = datapoints[i].score/recPerDay[i];
            }
        }
        console.log(datapoints);
        // Assign data
        $scope.figureData = [
            {
                key:"整體影響",
                values:datapoints
            }
        ];
        // Assign Options to figure 2
        $scope.figureOptions2 = {
            chart: {
                type: 'pieChart',
                margin: {left:90,top:20,bottom:20,right:50},
                x: function(d){return d.symptom;},
                y: function(d){return d.count;},
                showLabels: true,
                pie: {
                    startAngle: function(d) { return d.startAngle/2 -Math.PI/2 },
                    endAngle: function(d) { return d.endAngle/2 -Math.PI/2 }
                },
                transitionDuration: 300,
                showLegend: false,
                callback: function(chart){
                    console.log("!!! pieChart callback !!!");
                }
            }
        };
        var sympCount = [];
        // Initialization
        var nSymp = $scope.symptoms.length;
        for(var j=0; j<nSymp; j++){
            sympCount.push({symptom: $scope.symptoms[j].name, count:0});
        }
        for(var i = 0; i < hdata.symptoms.length; i++){
            // Count
            for(var j=0; j<nSymp; j++){
                if(hdata.symptoms[i][j]!=0){
                    sympCount[j].count++;
                }
            }
        }
        console.log(sympCount);
        $scope.figureData2 = sympCount;

    };

    // Show history
    $scope.showHistory = function(){
        // Toggle hidden information
        if($scope.isHistoryShown) {
            $scope.isHistoryShown = false;
            $scope.figureData = null;
            $scope.figureData2 = null;
            return(0);
        } else {
            $scope.isHistoryShown = true;
        }
        // Retrieve local records
        var recs = retrieveUserRecords7Day();
        console.log("User records: " + recs);
        console.log(recs);
        // Calculate the symptoms with the highest impact
        var topSymps = getHighestSymptoms(recs.symptoms);
        $scope.sympI = topSymps.intense;
        $scope.sympF = topSymps.frequent;
        //console.log("Top symptoms: ");
        //console.log(topSymps);
        // Generate plot
        createHistoryPlot(recs);
        // Done
        return(0);
    };
})

.controller('StaticInterventionCtrl', function($scope, $ionicPopup) {
    $scope.isCi1Open = false;
    $scope.intContent = [
        {
            id: 'ci100',
            title: '身體病痛不要來',
            content: '頭痛、頭暈、容易疲倦是腦震盪後最常見的身體症狀。在受傷後一個月內，最重要的是讓大腦多休息，減少大腦的負擔。建議您把握下列三個重點：',
            children:[
                {id: 'ci101', title:'循序漸進', content: '建議您在這段休養的期間內，工作的難度應該要逐漸增加，千萬不要急於要求自己馬上恢復至受傷前的表現。'},
                {id: 'ci102', title:'欲速則不達', content: '這段期間要盡量避免增加大腦的負擔。當您一感到疲累時，請馬上放下手邊工作，讓大腦休息一下再繼續工作。'},
                {id: 'ci103', title:'適合您的休息方式', content: '建議從過去經驗中找出您感到最放鬆、無負擔且無需耗費腦力的活動，做為您的休息方式最合適。'}
            ]
        },
        {
            id: 'ci200',
            title: '頭腦補給站：注意力',
            content: '受傷後，注意力無法集中是常見的情形。可利用底下這些方法來改善注意力：',
            children:[
                {id:'ci201', title:'當個好奇寶寶', content: '想要記下重要的事情時，在心裡頭提出許多相關的疑問，有助於更專注眼前，來幫助您記得更多。'},
                {id:'ci202', title:'減少干擾', content: '將有限的精力放在重要事件上，盡量排除其他不必要的干擾，也不要同一時間做太多事。'},
                {id:'ci203', title:'利用小幫手', content: '用行事曆規畫行程，確保您會記得重要事件，無須分神去操心是否遺漏些什麼。'}
            ]
        },
        {
            id: 'ci300',
            title: '頭腦補給站：記憶力',
            content: '若您有記性變差的情形，可試試看下列方法來改善記憶的問題：',
            children:[
                {id:'ci301', title:'複誦', content: '藉由多次默唸來加深印象。'},
                {id:'ci302', title:'心像', content: '在腦海裡想像一個畫面來強化印象，想像畫面越是具體鮮明，越能幫助您事後回想。'},
                {id:'ci303', title:'利用想像力', content: '將新的資訊與原先熟悉的事物做連結，回想時便可利用熟悉的事物來幫助您回溯新資訊。'}
            ]
        },
        {
            id: 'ci400',
            title: '揮別壞心情',
            content: '頭部外傷後，您是否容易感到心情低落、焦慮不安，或不耐煩的情形增加了呢？',
            children:[
                {id:'ci401', title:'低落、焦慮', content: '若您覺察到自己陷入負面想法的迴圈中的時候，請告訴自己<em>「停！」</em>，並且回過頭思考，事情是否真如您所想像的那麼糟，在日常生活中，也可多安排一些感興趣的活動，以提升低落心情。'},
                {id:'ci402', title:'憤怒', content: '發怒的原因通常是來自於疲倦感，因此，當您感到疲累不堪時，不妨重新調整行程表與步調，以避免負擔過重。而保持冷靜是問題解決的第一步，嘗試提醒自己「等三秒再開口」，並選擇適當的語氣及時機表達您的看法，或動腦想想其他解決辦法，皆有助於解決問題。'}
           ]
        },
        {
            id: 'ci500',
            title: '夜夜好眠',
            content: '假如您有入睡困難、早醒、或睡眠品質不佳等情形，建議依照下列睡眠好習慣，以改善睡眠品質：',
            children:[
                {id:'ci501', title:'放鬆練習', content: '睡前放鬆練習。'},
                {id:'ci502', title:'減少聲音和光線', content: '減少會破壞睡眠的聲音和光線。'},
                {id:'ci503', title:'不要在床上進行其他活動', content: '千萬不要在床上進行睡覺或性行為以外的事。'},
                {id:'ci504', title:'避免食用刺激性的食物。', content: '睡前八小時避免食用刺激性或含咖啡因的食物。'},
                {id:'ci505', title:'建立規律的作息', content: '建立規律的作息，固定入睡及起床時間，且白天盡量不要小睡或補眠。'},
                {id:'ci506', title:'等到有睡意再回床上睡覺', content: '若躺在床上十五分鐘仍未入睡，就離開床鋪並做些安靜或無趣的活動，等到有睡意再回床上睡覺。'},
            ]
        },
        {
            id: 'ci600',
            title: '幫壓力減重',
            content: '人們面對壓力事件時，會考量該壓力事件、環境限制或可運用之資源、及自身的能力水準，再根據整體評估結果選擇合宜的壓力因應方式：',
            children:[
                {id:'ci601', title:'問題解決導向', content: '若認為壓力事件能被解決，宜採用問題解決導向，消除壓力的根源。'},
                {id:'ci602', title:'情緒焦點導向', content: '若壓力事件不易被處理，則傾向採用情緒焦點導向，調適壓力事件帶來的負面感受。'},
                {id:'ci603', title:'', content: '而這段期間內除個人壓力調適之外，<em>「週遭重要他人」</em>的支持與陪伴亦相當重要，有助於患者受傷後的恢復。'},
            ]
        }
    ];
    /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
    $scope.toggleGroup = function(group) {
        if ($scope.isGroupShown(group)) {
          $scope.shownGroup = null;
        } else {
          $scope.shownGroup = group;
        }
    };
    $scope.isGroupShown = function(group) {
        return $scope.shownGroup === group;
    };
    // An alert dialog
    $scope.showAlert = function(item) {
        //console.log(item);
        //alert(item.content);
        var alertPopup = $ionicPopup.alert({
            title: item.title,
            template: item.content
        });
        alertPopup.then(function(res) {
            // Log for testing
            //console.log(item.id);
        });
    };
})

.controller('ContactUsCtrl', function($scope) {

})
;
