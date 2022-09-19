import app from './src/app.js';
const port = process.env.PORT || 3000;
// 

import 'dotenv/config'
//  require('log-timestamp') (function() { return new Date().toLocaleString();
//  });
app.listen(port,() => {
    console.log(`Server started on http://localhost:${port}`);
});
