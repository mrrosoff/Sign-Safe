pragma solidity ^0.5.16;

import "./SignSafeContract.sol";

contract MultiplePartyContract is SignSafeContract{

    function () external {}

    uint256 internal numberOfParties;
    uint256 private numberOfSignatures;
    uint256 private numberOfSignatoriesAdded;

    modifier all_signatories_added(){
        require(numberOfParties >= 2);
        require(numberOfParties == numberOfSignatoriesAdded);
        _;
    }

    constructor () public{
        contract_owner = msg.sender;
        STATE = sign_safe_contract_state.SETUP;
        numberOfSignatures = 0;
        numberOfSignatoriesAdded = 0;
        numberOfParties = 0;
        creation_date = now;
    }

    function setNumberOfParties(uint _numParties) only_SETUP only_owner public {
        numberOfParties = _numParties;
    }

    function addSignatory(address _newSignatory) only_SETUP only_owner public {
        numberOfSignatoriesAdded++;
        who_has_signed[_newSignatory] = false;
        signatories[_newSignatory] = true;
    }

    function deleteSignatory(address _signatory) only_SETUP only_owner public {
        numberOfSignatoriesAdded--;
        delete who_has_signed[_signatory];
        delete signatories[_signatory];
    }

    function contractReadyForSignatures() only_SETUP only_owner all_signatories_added only_contract_uploaded public {
        STATE = sign_safe_contract_state.PENDING;
    }

    function sign() only_PENDING only_unsigned_signatories only_signatories only_hash_match public {
        numberOfSignatures++;
        who_has_signed[msg.sender] = true;
        signature_timestamps[msg.sender] = now;
        emit signature(msg.sender, true, now);
        if(numberOfSignatures == numberOfParties){
            completeContract();
        }
    }

    function completeContract() only_PENDING private {
        STATE = sign_safe_contract_state.COMPLETED;
        contract_completed_date = now;
        string memory emit_message = "All signatories have signed the contract. ";
        emit contractComplete(emit_message, true, now);
    }

    function cancelContract() only_PENDING only_signatories public {
        STATE = sign_safe_contract_state.CANCELLED;
        contract_cancelled_date = now;
        string memory emit_message = "One of the signatories has rejected the contract. ";
        emit contractCanceled(emit_message, true, now);
    }


}



