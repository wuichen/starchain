const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const ManagementClient = require('auth0').ManagementClient;
const { auth0_domain, auth0_clientId, auth0_clientSecret } = require('../../../config/vars');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

router.get('/idp', (req, res) => {
	const auth0 = new ManagementClient({
	  domain: auth0_domain,
	  clientId: auth0_clientId,
	  clientSecret: auth0_clientSecret,
	  scope: 'read:users read:user_idp_tokens'
	});
	auth0.getUser({id:'instagram|1446451145'}, (err, user) => {
		if (err) {
			console.log(err)
		} else {
			console.log(user)
		}
		res.send(user)
	})
})

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

router.use('/users', userRoutes);
// router.use('/auth', authRoutes);

module.exports = router;
