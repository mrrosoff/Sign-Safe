pragma solidity ^0.5.15;

contract SignSafeContract{

    address internal contract_owner;
    address internal second_signatory;
    uint256 public submission_date;
    uint256 public first_signatory_signature_date;
    uint256 public second_signatory_signature_date;
    bool public owner_has_signed;
    bool public second_signatory_has_signed;

    enum sign_safe_contract_state{
        PENDING, COMPLETED, CANCELLED
    }

    sign_safe_contract_state public STATE;

    event ownerSignature(address indexed contract_owner, bool owner_has_signed);
    event secondSignatorySignature(address indexed second_signatory, bool second_signatory_has_signed);
    event contractComplete(string message, bool complete);

    function () external
    {

    }

    constructor(address _owner, address _second_signatory) public {
        contract_owner = _owner;
        second_signatory = _second_signatory;
        STATE=sign_safe_contract_state.PENDING;
        owner_has_signed = false;
        second_signatory_has_signed = false;
    }

    function ownerSign() public{
        require(STATE == sign_safe_contract_state.PENDING);
        require(msg.sender == contract_owner);
        owner_has_signed = true;
        emit ownerSignature(msg.sender, owner_has_signed);

    if(second_signatory_has_signed == true){
            STATE = sign_safe_contract_state.COMPLETED;
            string memory emit_message = "Both parties have signed: ";
            emit contractComplete(emit_message, true);
        }
    }

    function secondSignatorySign() public{
        require(STATE==sign_safe_contract_state.PENDING);
        require(msg.sender == second_signatory);
        second_signatory_has_signed = true;
        emit secondSignatorySignature(msg.sender, second_signatory_has_signed);
        if(owner_has_signed == true){
            STATE = sign_safe_contract_state.COMPLETED;
            string memory emit_message = "Both parties have signed: ";
            emit contractComplete(emit_message, true);
        }
    }


}