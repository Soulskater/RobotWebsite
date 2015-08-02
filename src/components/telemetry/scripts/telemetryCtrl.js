angular.module("RobotControl").controller("telemetryCtrl", function ($scope, webSocketService, eventEnum, $interval) {
    angular.extend($scope, {
        telemetry: {},
        isConnected: false,
        isRobotConnected: false
    });

    _init();
    function _init() {
        _init();
        function _init() {
            webSocketService.onConnected(function () {
                $scope.isConnected = true;
            });

            webSocketService.onDisconnected(function () {
                $scope.isConnected = false;
            });

            webSocketService.onClientConnected(function () {
                $scope.isRobotConnected = true;
            });

            webSocketService.onClientDisconnected(function () {
                $scope.isRobotConnected = false;
            });

            webSocketService.onCustomEvent(eventEnum.telemetry, function (data) {
                $scope.telemetry = data;
            });

            $interval(function () {
                webSocketService.emit(eventEnum.command, {
                    name: "telemetry"
                });
            }, 1000);
        }
    }
});