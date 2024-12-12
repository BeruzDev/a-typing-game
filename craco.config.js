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
            [
                "@babel/plugin-transform-class-properties",
                { loose: true }
            ],
            [
                "@babel/plugin-transform-private-methods",
                { loose: true }
            ],
            [
                "@babel/plugin-transform-private-property-in-object",
                { loose: true }
            ],
        ],
    },
};
