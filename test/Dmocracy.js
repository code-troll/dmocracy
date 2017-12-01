const Dmocracy = artifacts.require("./Dmocracy.sol");
const expect = require("chai").expect;
const utils = require("../lib/Utils");
let dmocracy;
let proposal;
let name;
let hash;
let errMessage;
let proposalsQty = 0;
const emptyBytes32 = '0x0000000000000000000000000000000000000000000000000000000000000000';

contract('Dmocracy', function (accounts) {
    it("The proposal could not be added!", async function () {
        name = 'test1_name';
        hash = 'test1_hash';

        // Get the deployed instance
        dmocracy = await Dmocracy.deployed();

        // Checks that the proposal does not exists
        let initialProposal = await dmocracy.getProposal(name);
        expect(initialProposal[1]).to.equal('');

        // Add the proposal
        await dmocracy.addProposal(name, hash);

        // Checks that the proposal correspond to the added one
        let finalProposal = await dmocracy.getProposal(name);

        // The hexadecimal hash from the contract is converted to ascii and is compared with the original hash
        expect(finalProposal[1]).to.equal(hash);

        proposalsQty++;
    });
    it("The proposal was added with an empty name!", async function () {
        hash = 'test2_hash';

        try {
            // Add the proposal
            await dmocracy.addProposal('', hash);
        } catch (err) {
            // Check that the error is the one we want
            expect(err.message).to.equal("VM Exception while processing transaction: invalid opcode");
        }
    });
    it("The proposal was added with an empty hash!", async function () {
        name = 'test3_name';

        try {
            // Add the proposal
            await dmocracy.addProposal(name, '');
        } catch (err) {
            // Check that the error is the one we want
            expect(err.message).to.equal("VM Exception while processing transaction: invalid opcode");
        }
    });
    it("The proposal already exists!", async function () {
        name = 'test4_name';
        hash = 'test4_hash';

        // Add the first proposal
        await dmocracy.addProposal(name, hash);

        // Checks that the proposal correspond to the added one
        proposal = await dmocracy.getProposal(name);
        // The hexadecimal hash from the contract is converted to ascii and is compared with the original hash
        expect(proposal[1]).to.equal(hash);

        proposalsQty++;

        try {
            // The proposal is tried to be added again
            await dmocracy.addProposal(name, hash);
        } catch (err) {
            errMessage = err.message;
        } finally {
            // Check that the error is the one we want
            expect(errMessage).to.equal("VM Exception while processing transaction: invalid opcode");
        }
    });
    it("There was a problem voting!", async function () {
        name = 'test5_name';
        hash = 'test5_hash';

        // Add the first proposal
        await dmocracy.addProposal(name, hash);

        // Checks that the proposal correspond to the added one
        proposal = await dmocracy.getProposal(name);
        // The hexadecimal hash from the contract is converted to ascii and is compared with the original hash
        expect(proposal[1]).to.equal(hash);

        proposalsQty++;

        // The vote to the proposal is executed
        await dmocracy.vote(accounts[0], name);

        // The vote to the proposal is executed with another account
        await dmocracy.vote(accounts[1], name);
    });
    it("The voter shouldn't vote more than once!", async function () {
        name = 'test6_name';
        hash = 'test6_hash';

        // Add the first proposal
        await dmocracy.addProposal(name, hash);

        proposalsQty++;

        // Checks that the proposal correspond to the added one
        proposal = await dmocracy.getProposal(name);
        // The hexadecimal hash from the contract is converted to ascii and is compared with the original hash
        expect(proposal[1]).to.equal(hash);

        // The vote to the proposal is executed
        await dmocracy.vote(accounts[0], name);

        try {
            // The vote to the proposal is executed again
            await dmocracy.vote(accounts[0], name);
        } catch (err) {
            errMessage = err.message;
        } finally {
            // Check that the error is the one we want
            expect(errMessage).to.equal("VM Exception while processing transaction: invalid opcode");
        }
    });
    it("The proposal quantity in wrong!", async function () {
        // Get all the proposals
        let proposals = await dmocracy.getProposals();

        // Check that the proposals quantity match
        expect(proposals.length).to.equal(proposalsQty);
    });

});
