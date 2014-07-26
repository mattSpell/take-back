var facebookKey    = process.env.FACEBOOKKEY;
var fbSecret       = process.env.FBSECRET;

module.exports = {
	'facebookAuth' : {
		'clientID' 		: facebookKey, // your App ID
		'clientSecret' 	: fbSecret, // your App Secret
		'callbackURL' 	: 'http://take-back-nash.portfolio.mattspell.com/auth/facebook/callback'
	}
};
