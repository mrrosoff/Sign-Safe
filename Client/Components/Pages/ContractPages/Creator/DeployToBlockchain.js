import React, {Component} from 'react';

import {Box, Button, CircularProgress, Grid, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import MultiplePartyContract from "../../../../contract_ABI/MultiplePartyContract";
import { Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row, Form, Label } from "reactstrap";


export default class DeployToBlockChain extends Component{
    constructor(props) {
        super(props);
        this.submitNumberOfParties = this.submitNumberOfParties.bind(this);
        this.state = {
            showSetNumberOfParties: false,
            showHashContract: false,
            numberOfParties: 0,
            contractString: "",
            deployedContract: null,
        }

    }

    render() {
        return(
        <Grid>
            <Button
                onClick={ ()=> this.deployContract(this.props.web3)}
                variant={"contained"}
                color={"primary"}
            >
                Deploy to Blockchain From Class
            </Button>
            {/*<Modal isOpen={this.state.showSetupContract}>*/}
            {/*    <ModalBody>*/}
            {/*        <Row className="m-2">*/}
            {/*            <Col xs={10}>*/}
            {/*                <Form onSubmit={this.submitNumberOfParties}>*/}
            {/*                    <Label>*/}
            {/*                        File: &nbsp;*/}
            {/*                        <Input type="number" name="Number" onChange={(event)=>this.setState({numberOfParties: event.target.value})}/>*/}
            {/*                    </Label>*/}
            {/*                    <Button onClick={(e)=>this.submitNumberOfParties(e, this.props.web3)}  >Submit</Button>*/}
            {/*                </Form>*/}

            {/*            </Col>*/}
            {/*        </Row>*/}
            {/*    </ModalBody>*/}
            {/*</Modal>*/}

            <Dialog open={this.state.showSetNumberOfParties}>
                <DialogTitle id="form-dialog-title">Setup Contract on the Blockchain</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        The first step is to add the number of parties to the contract. Enter the number below. This box will close when your
                        submission has been recorded on the blockchain.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="numberOfParties"
                        label="Number of Signatories"
                        type="number"
                        fullWidth
                        onChange={(event)=>this.setState({numberOfParties: event.target.value})}
                    />
                </DialogContent>
                <DialogActions>
                    <Button >
                        Cancel
                    </Button>
                    <Button onClick={()=>this.submitNumberOfParties(this.props.web3)}>
                        Submit Number of Parties
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={this.state.showHashContract}>
                <DialogTitle id="form-dialog-title">Setup Contract on the Blockchain</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        The next step is to add the text of the contract. Enter the text below. This box will close when your
                        submission has been recorded on the blockchain.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="Contract Text"
                        label="Contract Text"
                        type="text"
                        fullWidth
                        onChange={(event)=>this.setState({contractString: event.target.value})}
                    />
                </DialogContent>
                <DialogActions>
                    <Button >
                        Cancel
                    </Button>
                    <Button onClick={()=>this.submitNumberOfParties(this.props.web3)}>
                        Submit Contract to Blockchain
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>


        );

    }

    async deployContract (x) {
        console.log(x);
        const accounts = await x.eth.getAccounts();
        console.log(accounts);
        console.log((accounts[0]));
        const MPContract = require('../../../../contract_ABI/MultiplePartyContract.json');
        const deployable = new web3.eth.Contract(MPContract.abi);


        const gas = await deployable.deploy({
            data: MPContract.bytecode
        }).estimateGas() + 500000;

        console.log("est gas is: ", gas);

        deployable.deploy({
            data: MPContract.bytecode
        }).send({
            from: accounts[0],
            gas: gas,
        })
            .on('error', (error) => {
                console.log('we have an error')
                console.log(error)
                this.setState({showSetNumberOfParties: false});
            })
            .on('transactionHash', (transactionHash) => {
                console.log('Transaction Hash:')
                console.log(transactionHash)
            })
            .on('receipt', (receipt) => {
                // receipt will contain deployed contract address
                console.log('Receipt')
                console.log(receipt)
                this.setState({showSetNumberOfParties: true});
            }).then((r) => this.setState({deployedContract: r}));



    }

    async submitNumberOfParties (web3){
        const accounts = await web3.eth.getAccounts();
        try {
            await this.state.deployedContract.methods.setNumberOfParties(this.state.numberOfParties)
                .send({
                    from: accounts[0],
                })
                .on('receipt', (receipt) => {
                    // receipt will contain deployed contract address
                    console.log('Receipt')
                    console.log(receipt)});
        } catch (err) {
            console.log(err);
        }
        this.setState({showSetNumberOfParties: false});
        this.setState({showHashContract: true});
    }

    async hashContract (web3){
        this.setState({showHashContract: false});
        const accounts = await web3.eth.getAccounts();
        try {
            await this.state.deployedContract.methods.hashContract(this.state.contractString)
                .send({
                    from: accounts[0],
                })
                .on('receipt', (receipt) => {
                    // receipt will contain deployed contract address
                    console.log('Receipt')
                    console.log(receipt)});
        } catch (err) {
            console.log(err);
        }

    }


}