const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: '[name].min.js',
    },
    optimization: {
        chunkIds: 'named',
        splitChunks: {
            chunks: 'all',
            name(module, chunks, cacheGroupKey) {
                const allChunksNames = chunks.map((item) => item.name).join('~');
                return `${cacheGroupKey}-${allChunksNames}`;
            },
            filename: '[name].min.js',
        }
    }
});