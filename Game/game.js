var random = function (XorY) {
  if (XorY === "x") {
    return Math.floor(Math.random(6) * 27);
  } else {
    return Math.floor(Math.random(6) * 30);
  }
};

const mouve = function (PX, PY, Id, res, req) {
  var matrix;
  // var currentpositionX=(PX-100)/10
  // var currentpositionY=(PY-80)/10
  if (matrix[currentpositionX][currentpositionY] !== undefined) {
    if (req.body.Face === "top") {
      if (matrix[currentpositionX][currentpositionY] != 0) {
        res.send({ move: false });
      }
      if (matrix[currentpositionX][currentpositionY] === 0) {
        matrix[currentpositionX][currentpositionY] = Id;
        matrix[currentpositionX + 1][currentpositionY] = 0;
        res.send({ move: true });
      }
    } else if (req.body.Face === "Down") {
      if (matrix[currentpositionX][currentpositionY] != 0) {
        res.send({ move: false });
      }
      if (matrix[currentpositionX][currentpositionY] === 0) {
        matrix[currentpositionX][currentpositionY] = Id;
        matrix[currentpositionX - 1][currentpositionY] = 0;
        res.send({ move: true });
      }
    } else if (req.body.Face === "left") {
      if (matrix[currentpositionX][currentpositionY] != 0) {
        res.send({ move: false });
      }
      if (matrix[currentpositionX][currentpositionY] === 0) {
        matrix[currentpositionX][currentpositionY] = Id;
        matrix[currentpositionX][currentpositionY + 1] = 0;
        res.send({ move: true });
      }
    } else if (req.body.Face === "right") {
      if (matrix[currentpositionX][currentpositionY] != 0) {
        res.send({ move: false });
      }
      if (matrix[currentpositionX][currentpositionY] === 0) {
        matrix[currentpositionX][currentpositionY] = Id;
        matrix[currentpositionX][currentpositionY - 1] = 0;
        res.send({ move: true });
      }
    }
  } else {
    res.send("empty");
  }
};

module.exports = {
  random,
};
