pragma solidity ^0.5.16;

import "./SignSafeContract.sol";

contract MultiplePartyContract is SignSafeContract{

    function () external {}

    uint256 private numberOfParties;
    uint256 private numberOfSignatures;
    uint256 private numberOfSignatoriesAdded;

    modifier all_signatories_added(){
        require(numberOfParties == numberOfSignatoriesAdded);
        _;
    }

    constructor (uint256 _numParties, address _owner) public{
        numberOfParties = _numParties;
        contract_owner = _owner;
        STATE = sign_safe_contract_state.SETUP;
        who_has_signed[_owner] = false;
        numberOfSignatures = 0;
        numberOfSignatoriesAdded = 0;
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
        emit signature(msg.sender, true);
        if(numberOfSignatures == numberOfParties){
            completeContract();
        }
    }

    function completeContract() only_PENDING private {
        STATE = sign_safe_contract_state.COMPLETED;
        string memory emit_message = "All signatories have signed the contract. ";
        emit contractComplete(emit_message, true);
    }

    function cancelContract() only_PENDING only_signatories public {
        STATE = sign_safe_contract_state.CANCELLED;
        string memory emit_messagte = "One of the signatories has rejected the contract. ";
        emit contractCanceled(emit_messagte, true);
    }


}



