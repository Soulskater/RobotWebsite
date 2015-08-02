angular.module("RobotControl").controller("navigationCtrl", ["$scope", "webSocketService", "eventEnum", function ($scope, webSocketService, eventEnum) {
    angular.extend($scope, {
        distance: 30,
        isConnected: false,
        isRobotConnected: false,
        onForward: _onForward,
        onBackward: _onBackward,
        onLeft: _onLeft,
        onRight: _onRight,
        onStop: _onStop,
        onKeydownHandler: _onKeydownHandler,
        onKeyupHandler: _onKeyupHandler
    });

    var _keyReleased = true;

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
        }
    }

    function _onForward() {
        webSocketService.emit(eventEnum.command, {
            name: "move",
            subCommand: "forward"
        });
    }

    function _onBackward() {
        webSocketService.emit(eventEnum.command, {
            name: "move",
            subCommand: "backward"
        });
    }

    function _onLeft() {
        webSocketService.emit(eventEnum.command, {
            name: "move",
            subCommand: "left"
        });
    }

    function _onRight() {
        webSocketService.emit(eventEnum.command, {
            name: "move",
            subCommand: "right"
        });
    }

    function _onStop() {
        webSocketService.emit(eventEnum.command, {
            name: "move",
            subCommand: "none"
        });
    }

    function _onKeydownHandler($event) {
        if (!$scope.isConnected || !_keyReleased) {
            return;
        }
        switch ($event.keyCode) {
            case 37:
                _onLeft();
                _keyReleased = false;
                break;
            case 38:
                _onForward();
                _keyReleased = false;
                break;
            case 39:
                _onRight();
                _keyReleased = false;
                break;
            case 40:
                _onBackward();
                _keyReleased = false;
                break;
        }
    }

    function _onKeyupHandler() {
        if (!$scope.isConnected) {
            return;
        }
        _onStop();
        _keyReleased = true;
    }
}]);