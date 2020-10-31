enum Environments
{
    local_environment = 'local',
    dev_environment = 'dev',
    prod_environment = 'prod'
}

class Environment
{
    private environment: String;

    constructor(environment: String)
    {
        this.environment = environment;
    }

    getPort(): Number
    {
        if (this.environment === Environments.prod_environment)
        {
            return 8081;
        }
        else if (this.environment === Environments.dev_environment)
        {
            return 8082;
        }
        else
        {
            return 3000;
        }
    }

    getDBName(): String
    {
        if (this.environment === Environments.prod_environment)
        {
            return 'db_test_project_prod';
        }
        else if (this.environment === Environments.dev_environment)
        {
            return 'db_test_project_dev';
        }
        else
        {
            return 'db_test_project_local';
        }
    }
}

export default new Environment(Environments.local_environment);
