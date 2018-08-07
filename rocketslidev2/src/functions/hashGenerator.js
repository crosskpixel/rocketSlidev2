export const generateHash = (length = 20) =>{
    
        var ret = "";
        while (ret.length < length) {
            ret += Math.random().toString(16).substring(2);
        }
        return ret.substring(0, length);
}