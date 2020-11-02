import app from "./config/app";

// needs to match melee-client/src/app/_services/API_ENDPOINT
const PORT = 3000;

app.listen(PORT, () =>
{
    console.log('Express server listening on port ' + PORT);
});
