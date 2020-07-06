import React, { Component } from 'react';
import PropTypes from "prop-types";
import OperationService from "services/OperationService";
import WithLoading from "hoc/WithLoading";
import WithErrorHandler from "hoc/WithErrorHandler";
import ToastStatus from "helpers/ToastStatus";

export default class OperationDelete extends Component {

    constructor(props) {
        super(props);
        this.operationService = new OperationService();
        this.state = {
            loading: false
        }
    }

    async submit() {
        this.setState({ loading: true });
        ToastStatus(async () => {
            await this.operationService.delete(this.props.id);
            this.props.afterSubmit && this.props.afterSubmit();
            this.setState({ loading: false });
        }, "Request sent sucessfully", "Error Submitting Data. Check the console for more logs.")
        .catch(error => {
                this.setState({ error: error, loading: false });
                console.error(error);
            });
    }

    render() {
        return (<WithLoading show={!this.state.loading}>
            <WithErrorHandler error={this.state.error}>
                <div>Are you sure you want to delete the operation {this.props.id} ?</div>
            </WithErrorHandler>
        </WithLoading>)
    }
}

OperationDelete.propTypes = {
    id: PropTypes.number,
    afterSubmit: PropTypes.func
}