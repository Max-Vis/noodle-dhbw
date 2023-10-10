const express = require("express")
const path = require('path')

const app = express();
app.use(express.static(__dirname + '/views'));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'))
});

app.set('/views')
app.use(
    express.static(path.join(__dirname, "node_modules/bootstrap/dist/"))
  );
  
app.listen(8080, () => {
  console.log('Listening on port ' + 8080);
});
