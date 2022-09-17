const { assert, use, should } = require("chai")
const { default: Web3 } = require("web3")

require('chai')
    use(require('chai-as-promised'))
        should()

// require()

const EasyProp = artifacts.require('./EasyProp.sol')

contract('EasyProp', ([deployer, seller, buyer]) => {
    let easyprop

    before( async () => {
        easyprop = await EasyProp.deployed()
    })

    describe('Deployement', async () => {

        it('deployes successfully', async () => {
            const address = await easyprop.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, null)
            assert.notEqual(address, '')
            assert.notEqual(address, undefined)
        })
    })

    describe('Property Addition', async () => {
        
        let result, propCount
        before(async () => {
            let location = ["India", "Vijayawada", "Door No", "Street", "Pin Code"]
            let rooms = ["2", 1, 1, 1, 1, 1]
            let photos = ["i1", "i2", "i3", "i4"]
            let sellerDetails = ["Jason", "9089097765"]
            let priceAndTime = ["0.001", "10", "10/8/22", "Agreement", ""]
            result = await easyprop.addProperty("House", "House of Horrors", "THis is good", location, rooms, photos, sellerDetails, priceAndTime, { from: seller })
            
            propCount = await easyprop.propCount()
            
        })
        it('Added successfully', async () => {
            assert.equal(propCount, 1)
            const pro = await easyprop.userProps(seller, 1)
            assert.equal(pro.toNumber(), propCount)
        })
    })
}) 