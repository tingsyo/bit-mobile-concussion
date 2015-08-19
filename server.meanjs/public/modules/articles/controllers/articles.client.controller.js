'use strict';

// Articles controller
angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
	function($scope, $stateParams, $location, Authentication, Articles) {
		$scope.authentication = Authentication;

		// Create new Article
		$scope.create = function() {
			// Create new Article object
			var article = new Articles({
				title: this.title,
				content: this.content
			});

			// Redirect after save
			article.$save(function(response) {
				$location.path('articles/' + response._id);

				// Clear form fields
				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Article
		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		// Update existing Article
		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Articles
		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		// Find existing Article
		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
		};

		// Export the articles to CSV
		$scope.exportArticles = function(){
			var d = new Date();
			var dstring = d.toJSON().substring(0,19);
			console.log("Export to csv: "+"diary-"+dstring);
			exportJsonToCsv($scope.articles, "diary-"+dstring, true);
		};
		// Export JSON object (the list) to csv file
		var exportJsonToCsv = function(JSONData, ReportTitle, ShowLabel){

			//If JSONData is not an object then JSON.parse will parse the JSON string in an Object
	    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

	    var CSV = '';
	    //This condition will generate the Label/Header
	    if (ShowLabel) {
	        var row = "";
	        //This loop will extract the label from 1st index of on array
	        for (var index in arrData[0]) {
	            //Now convert each value to string and comma-seprated
	            row += index + ',';
	        }
	        row = row.slice(0, -1);
	        //append Label row with line break
	        CSV += row + '\r\n';
	    }
	    //1st loop is to extract each row
	    for (var i = 0; i < arrData.length; i++) {
	        var row = "";
	        //2nd loop will extract each column and convert it in string comma-seprated
	        for (var index in arrData[i]) {
	            row += '"' + arrData[i][index] + '",';
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
