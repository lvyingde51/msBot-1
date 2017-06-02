module.exports = {

  normalizeCardInput: function (msg) {
    let output = msg.toLowerCase()
    .replace(":", "")
    .replace(/\s+/g, "-")

    return output
  }

}