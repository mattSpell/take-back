var facebookKey    = process.env.FACEBOOKKEY;
var fbSecret       = process.env.FBSECRET;

module.exports = {

	'facebookAuth' : {
		'clientID' 		: facebookKey, // your App ID
		'clientSecret' 	: fbSecret, // your App Secret
		'callbackURL' 	: 'http://localhost:3000/auth/facebook/callback'
	}


};
