class EnvironmentVariables
{
    constructor()
    {
    }

    get apiIdentifier(): String
    {
        return "https://melee-api";
    }

    get auth0Domain(): String
    {
        return "sauc3.us.auth0.com";
    }
}

export default new EnvironmentVariables();
