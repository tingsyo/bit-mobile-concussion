'use strict';

// Applogs controller
angular.module('applogs').controller('ApplogsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Applogs',
	function($scope, $stateParams, $location, Authentication, Applogs) {
		$scope.authentication = Authentication;

		// Create new Applog
		$scope.create = function() {
			// Create new Applog object
			var applog = new Applogs ({
				name: this.name
			});

			// Redirect after save
			applog.$save(function(response) {
				$location.path('applogs/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Applog
		$scope.remove = function(applog) {
			if ( applog ) {
				applog.$remove();

				for (var i in $scope.applogs) {
					if ($scope.applogs [i] === applog) {
						$scope.applogs.splice(i, 1);
					}
				}
			} else {
				$scope.applog.$remove(function() {
					$location.path('applogs');
				});
			}
		};

		// Update existing Applog
		$scope.update = function() {
			var applog = $scope.applog;

			applog.$update(function() {
				$location.path('applogs/' + applog._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Applogs
		$scope.find = function() {
			$scope.applogs = Applogs.query();
		};

		// Find existing Applog
		$scope.findOne = function() {
			$scope.applog = Applogs.get({
				applogId: $stateParams.applogId
			});
		};

		// Symptoms
		$scope.symptoms = [
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

		// Export the articles to CSV
		$scope.exportApplogs = function(){
			var d = new Date();
			var dstring = d.toJSON().substring(0,19);
			console.log("Export to csv: "+"applog-"+dstring);
			exportJsonToCsv($scope.applogs, "applog-"+dstring, true);
		};
		// Export JSON object (the list) to csv file
		var exportJsonToCsv = function(JSONData, ReportTitle, ShowLabel){
			var fields = ["time","userid","created","overall","symptoms"];
			var headers = ["rectime","userid","synced","overall","s01","s02","s03","s04","s05","s06","s07","s08","s09","s10","s11","s12","s13","s14","s15"];
			//If JSONData is not an object then JSON.parse will parse the JSON string in an Object
	    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
	    var CSV = '';
			// Put headers in the 1st row
			var row = "";
			for(var i=0; i<headers.length; i++){
				row += headers[i] + ',';
			}
			row = row.slice(0, -1);
			//append Label row with line break
			CSV += row + '\r\n';
	    //1st loop is to extract each row
	    for (var i = 0; i < arrData.length; i++) {
	        var row = "";
	        //2nd loop will extract each column and convert it in string comma-seprated
	        for (var j=0; j<fields.length;j++) {
	            row += arrData[i][fields[j]] + ',';
	        }
	        row.slice(0, row.length - 1);
	        //add a line break after each row
	        CSV += row + '\r\n';
	    }
			// Check data beore output
	    if (CSV == '') {
	        alert("Invalid data");
	        return;
	    }
	    //Generate a file name
	    var fileName = "BITC_";
	    //this will remove the blank-spaces from the title and replace it with an underscore
	    fileName += ReportTitle.replace(/ /g,"_");
	    //Initialize file format you want csv or xls
	    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
	    // Now the little tricky part.
	    // you can use either>> window.open(uri);
	    // but this will not work in some browsers
	    // or you will not get the correct file extension

	    //this trick will generate a temp <a /> tag
	    var link = document.createElement("a");
	    link.href = uri;
	    //set the visibility hidden so it will not effect on your web-layout
	    //link.style = "visibility:hidden";
	    link.download = fileName + ".csv";
	    //this part will append the anchor tag and remove it after automatic click
	    document.body.appendChild(link);
	    link.click();
	    document.body.removeChild(link);
			// done
		};
	}
]);
