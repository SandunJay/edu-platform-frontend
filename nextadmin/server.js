const app = require('./serverConfig');

// Other middleware and route handling...

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
