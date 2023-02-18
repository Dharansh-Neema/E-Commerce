const app = require("./app");
require("dotenv").config();
const home = require("./routes/home");

app.use("/api/v1", home);
app.listen(process.env.PORT, () => {
  console.log(`The Server is running at PORT: ${process.env.PORT}`);
});
