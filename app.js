const exress = require('express');
const { v4: uuidv4 } = require('uuid');

const app = exress();
app.get('/uuid', (req, res) => {
  const newUuid = uuidv4();
  res.send({ uuid: newUuid });
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});