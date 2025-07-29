const config = {
    "app_env": "production",
    "development": {
        "api_url": "http://localhost:5000",
        "api_app": "http://localhost:3000"
    },
    "production": {
        "api_url": "https://apiecom.teamexp.net",
        "api_app": "https://ecom.teamexp.net",
    },
};
const env_variables = function () {
    if (config.app_env === 'development') {
        return config.development;
    } else {
        return config.production;
    }
}
export default env_variables;
