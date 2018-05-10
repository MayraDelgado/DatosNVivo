var WatchDogApp = angular.module('WatchDogApp', ['ngMaterial', 'md.data.table']);
WatchDogApp.controller('DataController', ['$scope', function ($scope) {
    $scope.activeSession = false;
    $scope.session = localStorage.getItem("watch_dog_session");

    if ($scope.session) {
        $scope.session = JSON.parse($scope.session);
        $scope.activeSession = true;

    } else {
        api.getSession(function (credentials, server) {
            localStorage.setItem("watch_dog_session", JSON.stringify(api));
            api = api;
        });
    }
    // datos controlador
    $scope.Data = {
        start: new Date(),
        end: new Date()
    };
    $scope.selected = [];
    $scope.query = {
        order: 'GOSerialNumber',
        limit: 5,
        page: 1
    };
    /*
        function success(dispositivo) {
            $scope.dispositivo = dispositivo;
        }
        $scope.getDispositivo = function () {
            $scope.promise = $scope.dispositivo.get($scope.query, success).$promise;
        };
       
    */
    $scope.btnConsultar = function () {
        try {
            swal({
                imageUrl: 'https://rawgit.com/MayraDelgado/reportes/master/app/img/lg.ring-loading-gif.gif',
                timer: 5000,
                showConfirmButton: false,
                background: 'rgba(100, 100, 100, 0)'
            }).then(function (result) {
                console.log({
                    start: moment($scope.Data.start).format('MM-DD-YYYY'),
                    end: moment($scope.Data.end).format('MM-DD-YYYY')
                });
                return;
                /* var conAjax = $http.post("", {
                     start: moment($scope.Data.start).format('MM-DD-YYYY'),
                     end: moment($scope.Data.end).format('MM-DD-YYYY')
                 }, {
                     headers: {
                         'Content-Type': 'application/json'
                     }
                 }).then(function successCallback(response) {
                     console.log(response);
                     $scope.resultReporteFechas = response.data;
                 }, function errorCallback(response) {
                     console.error(response);
                 });*/
            });


        } catch (error) {
            console.log(error.message);
        }

    }
    $scope.btnImprimir = function () {
        /*if ($scope.resultReporteFechas.length === 0) {*/
        swal(
            '',
            'No hay datos que descargar',
            "error",
        )
        console.log("No hay datos que descargar");
    } /*else*/
    /*if ($scope.resultReporteFechas.length > 0) {*/
    $("#fechaInstalacion").table2excel({
        filename: "AuditoríadeRegistros_Fechas"
    });
    /*}*/





}]);