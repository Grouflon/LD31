if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * Events
 * ===================================*/
define([
		"playgroundjs/libs/signals/signal"
	]
	, function (Signal)
	{
		return {
			sPlayerDead: new Signal,
			sPlayerExit: new Signal,
			sGameEnterPause: new Signal,
			sGameExitPause: new Signal
		}
	});