const soma = (req, res) => {
    const soma = 100 + 7
    res.send({soma: soma})
}

module.exports = { soma }