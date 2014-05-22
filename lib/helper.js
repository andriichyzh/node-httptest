
exports.getCommonOptions = function(uri) {
    return {
        uri: uri || '',
        method: 'GET',
        params: {},
        headers: {'User-Agent': 'HttpTest'}
    };
};