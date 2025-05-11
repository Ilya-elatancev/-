function parser(data, separator=';') {
    var infoObj = {};

    for (let piece of data.split(separator)) {
        if (piece.trim() == "") {
            continue;
        }

        let key = piece.substring(0, piece.indexOf(":")).trim();
        let val = piece.substring(piece.indexOf(":") + 1).trim();

        infoObj[key] = val;
    }

    return infoObj;
}