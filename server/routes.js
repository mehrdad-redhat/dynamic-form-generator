const app= require('express')();

app.get('/test',((req, res, next) => {
	res.status(200).send({message: 'How you doing?'})
}));
app.use('/users',require('./user/user.routes'));
app.use('/tools',require('./page/page.routes'));
module.exports = app;
