module.exports = function  parseStringToArray(stringToArray){
    return  stringToArray.split(',').map(techs => techs.trim());    
};