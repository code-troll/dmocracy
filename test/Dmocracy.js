const Dmocracy = artifacts.require("./Dmocracy.sol");
const expect = require("chai").expect;
const utils = require("./Utils");
let dmocracy;
let name;
let hash;
const emptyString = '0x0000000000000000000000000000000000000000000000000000000000000000';

contract('Dmocracy', function (accounts) {
    it("The proposal could not be added!", async function () {
        name = 'test1_name';
        hash = 'test1_hash';

        // Get the deployed instance
        dmocracy = await Dmocracy.deployed();

        // Checks that the proposal does not exists
        let initialProposal = await dmocracy.getProposal(name);
        expect(initialProposal[0]).to.equal(emptyString);

        // Add the proposal
        await dmocracy.addProposal(accounts[0], name, hash);

        // Checks that the proposal correspond to the added one
        let finalProposal = await dmocracy.getProposal(name);
        // The hexadecimal hash from the contract is converted to ascii and is compared with the original hash
        expect(utils.hexToString(finalProposal[0])).to.equal(hash);
    });
    it("The proposal was added with an empty name!", async function () {
        hash = 'test2_hash';

        try {
            // Add the proposal
            await dmocracy.addProposal(accounts[0], '', hash);
        } catch (err) {
            // Check that the error is the one we want
            expect(err.message).to.equal("VM Exception while processing transaction: invalid opcode");
        }
    });
    it("The proposal was added with an empty hash!", async function () {
        name = 'test3_name';

        try {
            // Add the proposal
            await dmocracy.addProposal(accounts[0], name, '');
        } catch (err) {
            // Check that the error is the one we want
            expect(err.message).to.equal("VM Exception while processing transaction: invalid opcode");
        }
    });
    it("The proposal already exists!", async function () {
        let errMessage;
        name = 'test4_name';
        hash = 'test4_hash';

        // Add the first proposal
        await dmocracy.addProposal(accounts[0], name, hash);

        // Checks that the proposal correspond to the added one
        let proposal = await dmocracy.getProposal(name);
        // The hexadecimal hash from the contract is converted to ascii and is compared with the original hash
        expect(utils.hexToString(proposal[0])).to.equal(hash);

        try {
            // The proposal is tried to be added again
            await dmocracy.addProposal(accounts[1], name, hash);
        } catch (err) {
            errMessage = err.message;
        } finally {
            // Check that the error is the one we want
            expect(errMessage).to.equal("VM Exception while processing transaction: invalid opcode");
        }
    });

});
