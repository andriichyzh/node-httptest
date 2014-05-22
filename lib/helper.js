
exports.getCommonOptions = function(uri) {
    return {
        uri: uri || '',
        method: null,
        params: {},
        headers: {'User-Agent': 'HttpTest'}
    };
};

exports.getCurrentOptions = function(uri, method) {
    return {
        uri: uri || '',
        method: method,
        params: {},
        headers: {}
    };
};