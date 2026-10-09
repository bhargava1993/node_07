const mobiles = []

const getMobiles = (req, res) => {
    res.json({ data: mobiles })
}

const createMobile = (req, res) => {
    console.log("req.body---", req.body);

    mobiles.push(req.body)
    res.json({ message: "new mobile added", data: req.body })
}

const updateMobile = (req, res) => {
    res.send("update mobile products")
}

const deleteMobile = (req, res) => {
    res.send("delete mobile products")
}

module.exports = {
    getMobiles,
    createMobile,
    updateMobile,
    deleteMobile
}