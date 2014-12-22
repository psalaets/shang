angular.module("app",["app.models","app.services","app.title","app.new-game","app.play-game","app.scorecard","app.templates","ngRoute","LocalForageModule"]),function(e){e.module("app").config(["$routeProvider",function(e){e.when("/",{templateUrl:"title/title.html",controller:"TitleController",controllerAs:"shang"}).when("/games/new",{templateUrl:"new-game/new-game.html",controller:"NewGameController",controllerAs:"setup",resolve:{availablePlayers:["persistence",function(e){return e.getPlayers()}]}}).when("/games/:id",{templateUrl:"play-game/play-game.html",controller:"PlayGameController",controllerAs:"current",resolve:{currentGame:["$route","persistence",function(e,t){var n=e.current.params.id;return t.loadGame(n)}]}})}])}(angular),angular.module("app.models",[]),function(e){e.module("app.models").factory("Game",["Round","Player",function(e,t){function n(){this.players=[],this.startTime=null,this.rounds=[]}function r(e){for(var t=0;t<e.length;t++)if(e[t].active)return t;return null}var a=["2 Groups","1 Run 1 Group","2 Runs","3 Groups","2 Groups 1 Run","2 Runs 1 Group","3 Runs"];n.fromData=function(r){var a=new n;return a.players=r.players.map(function(e){return t.fromData(e)}),a.rounds=r.rounds.map(function(t){return e.fromData(t)}),a.id=r.id,a.startTime=new Date(r.startTime),a};var o=n.prototype;return o.addPlayer=function(e){var n=new t(e);this.players.push(n)},o.start=function(){var t=this.players.map(function(e){return e.name});this.rounds=a.map(function(n){return new e(n,t)},this),this.rounds[0].active=!0,this.startTime=new Date},o.getPlayer=function(e){return this.players.filter(function(t){return t.name===e})[0]||null},o.totalScore=function(e){var t=this.rounds.map(function(t){return t.scoreFor(e)}),n=t.some(function(e){return e.scoreReported()});return n?t.reduce(function(e,t){return e+t.actualScore||0},0):null},o.calculateTotalScores=function(){this.players.forEach(function(e){e.totalScore=this.totalScore(e.name)},this)},o.calculateRankings=function(){var e=this.players.slice().sort(function(e,t){return e.totalScore-t.totalScore});e.forEach(function(e,t,n){var r=n[t-1];e.rank=r&&e.totalScore===r.totalScore?r.rank:t+1})},o.nextRound=function(){var e=r(this.rounds);this.rounds[e].active=!1,this.rounds[e].completed=!0,this.calculateTotalScores(),this.calculateRankings(),this.isDone()||(this.rounds[e+1].active=!0)},o.isDone=function(){return this.rounds.every(function(e){return e.completed})},n}])}(angular),function(e){var t=e.module("app.models");t.factory("Round",["RoundScore",function(e){function t(t,n){this.name=t,this.active=!1,this.completed=!1,this.scores=n.map(function(t){return new e(t)})}t.fromData=function(n){var r=new t(n.name,[]);return r.active=n.active,r.completed=n.completed,r.scores=n.scores.map(function(t){return e.fromData(t)}),r};var n=t.prototype;return n.scoreFor=function(e){return this.scores.filter(function(t){return t.player==e})[0]||null},n.allScoresReported=function(){return this.scores.every(function(e){return e.scoreReported()})},Object.defineProperty(n,"shanghai",{set:function(e){this.scores.forEach(function(t){t.shanghai=e})},get:function(){return this.scores.some(function(e){return e.shanghai})}}),t}])}(angular),function(e){function t(e){this.player=e,this.rawScore=null,this.perfectDeal=!1,this.shanghai=!1,this.gotShanghai=!1}e.module("app.models").value("RoundScore",t);var n=t.prototype;n.scoreReported=function(){return null!==this.rawScore&&void 0!==this.rawScore},n.wentOut=function(){return 0===this.rawScore},Object.defineProperty(n,"actualScore",{get:function(){if(!this.scoreReported())return null;var e=this.rawScore;return this.perfectDeal&&(e-=5),this.shanghai&&e>0&&(e*=2),e}}),t.fromData=function(e){var n=new t(e.player);return n.rawScore=e.rawScore,n.perfectDeal=e.perfectDeal,n.shanghai=e.shanghai,n.gotShanghai=e.gotShanghai,n}}(angular),function(e){function t(e){this.name=e,this.wilds=0,this.rank=null,this.totalScore=null}e.module("app.models").value("Player",t),t.fromData=function(e){var n=new t(e.name);return n.rank=e.rank,n.wilds=e.wilds,n.totalScore=e.totalScore,n};var n=t.prototype;n.addWild=function(){this.wilds+=1},n.removeWild=function(){this.wilds&&(this.wilds-=1)}}(angular),angular.module("app.services",[]),function(e){function t(e){return{goToGameSetup:function(){e.path("/games/new")},goToGame:function(t){e.path("/games/"+t)},goToTitle:function(){e.path("/")}}}e.module("app.services").factory("navigation",t),t.$inject=["$location"]}(angular),function(e){e.module("app.services").factory("persistence",["$localForage","Game",function(e,t){function n(){return e.getItem("nextGameId").then(function(t){return t=t||0,e.setItem("nextGameId",t+1)})}function r(e){return"game-"+e}function a(){return e.getItem("players").then(function(t){return t?t:e.setItem("players",[])})}return{saveGame:function(t){function a(t){return e.setItem(r(t.id),t).then(function(){return t})}function o(e){return t.id=e,t}return t.id?a(t):n().then(o).then(a)},loadGame:function(n){return e.getItem(r(n)).then(function(e){return t.fromData(e)})},deleteGame:function(t){return e.removeItem(r(t))},getPlayers:function(){return a().then(function(e){return e.sort()})},setPlayers:function(t){return e.setItem("players",t)}}}])}(angular),function(e){function t(){return{minimumPlayersToStart:3,decksNeeded:function(e){return Math.ceil(e/2)}}}e.module("app.services").factory("rules",t)}(angular),angular.module("app.new-game",[]),function(e){function t(e,t,n,r,a){this.availablePlayers=e,this.selectedPlayers=[],this.enteredName="",this.minimumPlayersToStart=t.minimumPlayersToStart,this.decksNeeded=null,this.updateDecksNeeded=function(){this.decksNeeded=t.decksNeeded(this.selectedPlayers.length)},this.selectPlayer=function(e){this.selectedPlayers.push(e),this.updateDecksNeeded()},this.deselectPlayer=function(e){var t=this.selectedPlayers.indexOf(e);-1!=t&&(this.selectedPlayers.splice(t,1),this.updateDecksNeeded())},this.isSelected=function(e){return-1!=this.selectedPlayers.indexOf(e)},this.toggleSelection=function(e){this.isSelected(e)?this.deselectPlayer(e):this.selectPlayer(e)},this.selectEnteredPlayer=function(){this.enteredName&&(this.makeAvailable(this.enteredName),this.selectPlayer(this.enteredName),this.enteredName="")},this.makeAvailable=function(e){-1==this.availablePlayers.indexOf(e)&&this.availablePlayers.unshift(e)},this.canBeginGame=function(){return this.selectedPlayers.length>=this.minimumPlayersToStart},this.beginGame=function(){function e(e){return n.setPlayers(e)}function t(){return n.saveGame(l)}function o(){r.goToGame(l.id)}var l=new a;return this.selectedPlayers.forEach(l.addPlayer,l),l.start(),e(this.availablePlayers).then(t).then(o)}}e.module("app.new-game").controller("NewGameController",t),t.$inject=["availablePlayers","rules","persistence","navigation","Game"]}(angular),angular.module("app.play-game",[]),function(e){function t(e){this.game=e}e.module("app.play-game").controller("PlayGameController",t),t.$inject=["currentGame"]}(angular),angular.module("app.title",[]),function(e){function t(e){this.newGame=function(){e.goToGameSetup()}}e.module("app.title").controller("TitleController",t),t.$inject=["navigation"]}(angular),angular.module("app.scorecard",["mgcrea.ngStrap.popover"]),function(e){function t(){return{restrict:"E",templateUrl:"scorecard/scorecard.html",scope:{game:"="},controllerAs:"vm",bindToController:!0,controller:["$scope","persistence","navigation","$interval",function(e,t,n,r){this.minutesElapsed=0;var a=r(function(){this.minutesElapsed+=1}.bind(this),6e4);e.$on("$destroy",function(){r.cancel(a)}),e.$on("round-finished",function(){this.game.nextRound(),t.saveGame(this.game)}.bind(this)),this.gameOver=function(){n.goToTitle()}}]}}e.module("app.scorecard").directive("scorecard",t)}(angular),function(e){function t(){return{restrict:"A",templateUrl:"scorecard/round-row.html",scope:{round:"=",lastRound:"@"},controllerAs:"vm",bindToController:!0,controller:["$scope",function(e){this.nextRoundButtonLabel="true"==this.lastRound?"Game Over":"Next Round",this.readyForNextRound=function(){return this.round.active&&this.round.allScoresReported()}.bind(this),this.nextRound=function(){e.$emit("round-finished")}}]}}e.module("app.scorecard").directive("roundRow",t)}(angular),function(e){function t(){return{restrict:"A",templateUrl:"scorecard/total-row.html",scope:{players:"="},bindToController:!0,controllerAs:"vm",controller:function(){}}}e.module("app.scorecard").directive("totalRow",t)}(angular),function(e){function t(){return{restrict:"A",templateUrl:"scorecard/wild-row.html",scope:{players:"=",showButtons:"&"},bindToController:!0,controllerAs:"vm",controller:function(){}}}e.module("app.scorecard").directive("wildRow",t)}(angular),function(e){function t(){return{restrict:"A",templateUrl:"scorecard/rank-row.html",scope:{players:"="},bindToController:!0,controllerAs:"vm",controller:function(){this.isFirst=function(e){return 1===e.rank}}}}e.module("app.scorecard").directive("rankRow",t)}(angular),function(e){function t(){return{restrict:"A",templateUrl:"scorecard/player-row.html",scope:{players:"="},controllerAs:"vm",bindToController:!0,controller:function(){}}}e.module("app.scorecard").directive("playerRow",t)}(angular),function(e){function t(){return{restrict:"E",templateUrl:"scorecard/actual-score.html",scope:{round:"=",roundScore:"="},controllerAs:"vm",bindToController:!0,controller:["$scope",function(e){this.actualScore=function(){var e=this.roundScore.actualScore;return e||0===e?e:"Enter Score"},e.$watch("vm.roundScore.gotShanghai",function(e,t){e!==t&&(this.round.shanghai=e)}.bind(this))}]}}e.module("app.scorecard").directive("actualScore",t)}(angular),function(e){function t(e){return{link:function(t,n){function r(){n[0].focus()}var a=e(r,100);t.$on("$destroy",function(){e.cancel(a)})}}}e.module("app.scorecard").directive("instafocus",t),t.$inject=["$timeout"]}(angular),function(e){function t(){return function(e){e=e||0;var t=Math.floor(e/60),n=e%60,r=[];return t&&r.push(t+" hr"),n&&r.push(n+" min"),r.length||r.push("less than 1 minute"),r.join(" ")}}e.module("app.scorecard").filter("duration",t)}(angular),function(e){function t(){return function(e){if(!e)return"";if(11==e)return"11th";if(12==e)return"12th";if(13==e)return"13th";var t=e.toString().slice(-1),n={1:"st",2:"nd",3:"rd"}[t]||"th";return e+n}}e.module("app.scorecard").filter("rank",t)}(angular),angular.module("app.templates",[]),angular.module("app.templates").run(["$templateCache",function(e){e.put("new-game/new-game.html",'<div class="container"><div class="row"><div class="col-xs-6"><h2>Select Players</h2><div data-ng-if="setup.availablePlayers.length"><div class="player-name" data-ng-class="{\'bg-primary\': setup.isSelected(player)}" data-ng-repeat="player in setup.availablePlayers" data-ng-click="setup.toggleSelection(player)">{{::player}} <span class="pull-right glyphicon glyphicon-ok" data-ng-show="setup.isSelected(player)"></span></div><div class="alert alert-danger" data-ng-if="!setup.canBeginGame()"><strong>Add or select more players</strong><p>Need at least {{::setup.minimumPlayersToStart}} selected to begin game.</p></div><div data-ng-if="setup.canBeginGame()"><button class="btn btn-success btn-lg btn-block" data-ng-click="setup.beginGame()">Begin Game<br><small>({{setup.selectedPlayers.length}} players, {{setup.decksNeeded}} decks)</small></button></div></div><div data-ng-if="!setup.availablePlayers.length"><div class="alert alert-info"><strong>First game on this device?</strong><p>Add some players on the right to get started.</p></div></div></div><div class="col-xs-6"><h2>Add New Player</h2><div class="input-group"><form data-ng-submit="setup.selectEnteredPlayer()"><input type="text" class="form-control" placeholder="Player name" data-ng-model="setup.enteredName"> <span class="input-group-btn"><input class="btn btn-default" type="submit" value="Add"></span></form></div></div></div></div>'),e.put("play-game/play-game.html",'<scorecard game="current.game"></scorecard>'),e.put("scorecard/actual-score-popover.html",'<form data-ng-submit="$hide()"><div class="form-group"><input type="number" data-instafocus data-ng-model="vm.roundScore.rawScore"><div class="checkbox"><label><input type="checkbox" data-ng-model="vm.roundScore.gotShanghai"> Shanghai (2x others)</label></div><div class="checkbox"><label><input type="checkbox" data-ng-model="vm.roundScore.perfectDeal"> Perfect Deal (-5)</label></div></div><input type="submit" class="btn btn-primary" value="Done"></form>'),e.put("scorecard/actual-score.html",'<button class="actual-score btn btn-default" data-bs-popover data-content-template="scorecard/actual-score-popover.html" data-auto-close="true" data-trigger="click" data-title="Enter score for {{::vm.roundScore.player}}">{{vm.actualScore()}}</button>'),e.put("scorecard/player-row.html",'<th></th><th data-ng-repeat="player in vm.players">{{::player.name}}</th>'),e.put("scorecard/rank-row.html",'<td><strong>Rank</strong></td><td data-ng-class="{\'bg-info\': vm.isFirst(player)}" data-ng-repeat="player in vm.players">{{player.rank | rank}} <span data-ng-show="player.rank">({{::player.name}})</span></td>'),e.put("scorecard/round-row.html",'<td>{{::vm.round.name}} <button class="btn btn-primary btn-sm pull-right" data-ng-click="vm.nextRound()" data-ng-show="vm.readyForNextRound()">{{vm.nextRoundButtonLabel}}</button></td><td data-ng-repeat="roundScore in vm.round.scores"><div data-ng-if="vm.round.active"><actual-score round="vm.round" round-score="roundScore"></actual-score></div><div data-ng-if="!vm.round.active">{{::roundScore.actualScore}}</div><span class="label label-success" data-ng-show="roundScore.wentOut()">Out</span> <span class="label label-danger" data-ng-show="roundScore.gotShanghai">上海市</span> <span class="label label-info" data-ng-show="roundScore.perfectDeal">Perfect Deal</span></td>'),e.put("scorecard/scorecard.html",'<div class="container-fluid"><div class="row"><div class="col-xs-6"><strong>Started:</strong> {{::vm.game.startTime | date:\'short\'}}</div><div class="col-xs-6"><strong>Session Time:</strong> {{vm.minutesElapsed | duration}}</div></div><div class="row"><div class="col-xs-12"><table class="table table-bordered"><tr player-row players="vm.game.players"></tr><tr wild-row show-buttons="!vm.game.isDone()" players="vm.game.players"></tr><tr round-row round="round" last-round="{{$last}}" data-ng-class="{active: round.active}" data-ng-repeat="round in vm.game.rounds"></tr><tr total-row players="vm.game.players"></tr><tr rank-row players="vm.game.players"></tr></table><button class="btn btn-primary" data-ng-show="vm.game.isDone()" data-ng-click="vm.gameOver()">Return to Title</button></div></div></div>'),e.put("scorecard/total-row.html",'<td><strong>Total</strong></td><td data-ng-repeat="player in vm.players">{{player.totalScore}}</td>'),e.put("scorecard/wild-row.html",'<td><strong>2 &#x2663;</strong></td><td data-ng-repeat="player in vm.players"><div class="btn-group" data-ng-if="vm.showButtons()"><button type="button" class="btn btn-default" data-ng-click="player.addWild()"><span class="glyphicon glyphicon-plus"></span></button> <button type="button" class="btn btn-default">{{player.wilds}}</button> <button type="button" class="btn btn-default" data-ng-click="player.removeWild()"><span class="glyphicon glyphicon-minus"></span></button></div><div data-ng-if="!vm.showButtons()">{{player.wilds}}</div></td>'),e.put("title/title.html",'<div class="container"><div class="title"><h1>Shanghai Rummy</h1><button class="btn btn-primary" data-ng-click="shang.newGame()">New Game</button></div></div>')}]);