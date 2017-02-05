

app.controller('Ctrl', function ($scope, $http) {


    $scope.one = true; // setting the first div visible when the page loads
    $scope.two = false; // hidden

    $scope.uploadType = [
      { id: 1, name: 'bc' },
      { id: 2, name: 'fo' },
      { id: 3, name: 'pd' },
      { id: 4, name: 'st' }
    ];

    

    $scope.SubmitForm = function () {
      //  alert('Selected count ID: ' + $scope.countSelected.name);
        $scope.add = {
            uploadId: "",
            uploadPath: "",
            uploadDate:""
        }

        $scope.add.uploadId = $scope.countSelected.name;
        $scope.add.uploadPath = $scope.path;
        $scope.add.uploadDate = $scope.enterdate;

        $scope.Add = [];

        $scope.Add.push($scope.add);

        $http({
            method: "POST",
            url: 'EQDashboard/api/NSEUpload',
            data: $scope.Add
        }).then(function successCallback(response) {

             $('#message').html('').prepend('<div class="alert alert-success" style="text-align:center"> Excel details saved.</div>').show();
            setTimeout(function () {
                $('#message').hide();
            }, 2000);
        }).error(function () {
                  //  defer.reject("File Upload Failed!");
              });
    };

});

app.directive('jqdatepicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
         link: function (scope, element, attrs, ngModelCtrl) {
             $(element).datepicker({
                dateFormat: 'yy-mm-dd',
                onSelect: function (date) {
                    scope.date = date;
                    scope.$apply();
                }
            });
        }
    };
});