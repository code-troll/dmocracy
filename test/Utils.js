module.exports = {
    hexToString: function (hex) {
        return Buffer.from(hex.substr(2), 'hex').toString('ascii').replace(/\0/g, '');
    }
};
