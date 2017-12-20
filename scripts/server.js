const express = require('express');
const app = express();
const path = require('path');

app.set('port', process.env.PORT || 8080);

app.use( express.static(
    path.join(__dirname, '../', 'public'),
    {
        extensions:['html']
    })
);

app.get( '/*', (req, res) => {
    res.sendFile( path.join(__dirname, '../', 'public', '200.html') );
});

app.listen( app.get('port'), function () {
    console.log('Server running at http://localhost:%s', app.get('port'));
});
