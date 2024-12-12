const webpack = require('webpack');

module.exports = {
    webpack: {
        configure: (config) => {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                crypto: false, 
            };
            return config;
        },
    },
    babel: {
        plugins: [
            "@babel/plugin-proposal-private-property-in-object", 
        ],
    },
};
