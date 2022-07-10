const data = {
    signals: require('../model/signals.json'),
    setSignals: function (data) {
        this.signals = data
    },
}
data.signals = require('../model/signals.json')

const getAllSignals = (req, res) => {
    if (!data.signals) return res.status(204).json({ message: 'No signals found!' })
    setTimeout(() => {
        res.json(data.signals)
    }, 2000)
}

const getSignal = (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ message: 'Signal ID required' })

    const signal = data.signals.find((sgl) => sgl.id === parseInt(req.params.id))

    if (!signal) return res.status(204).json({ message: `No signal matches ID ${req.params.id} ` })

    res.json(signal)
}

module.exports = {
    getAllSignals,
    getSignal,
}
