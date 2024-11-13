const webpack = require('webpack');

module.exports = {
    webpack: {
        configure: (config) => {
            config.resolve.fallback = {
            ...config.resolve.fallback,
            crypto: false,  // Indica que no se necesita el módulo crypto
            };
            return config;
        },
    },
};
