const mjAPI = require("mathjax-node");

const config = {
  MathJax: {
    SVG: {
      linebreaks: {
        automatic: false
      },
      scale: 100
    }
  }
};
function generateSvg(latex) {
  return new Promise((resolve, reject) => {
    mjAPI.typeset(
      {
        math: latex,
        format: "TeX",
        svg: true,
        linebreaks: false
      },
      data => {
        if (!data.errors) {
          resolve(data.svg);
        } else {
          reject(error);
        }
      }
    );
  });
}
module.exports = {
  config,
  generateSvg
};
