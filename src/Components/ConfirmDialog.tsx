import * as React from 'react';
import { Dialog, DialogFooter, PrimaryButton, DefaultButton } from 'office-ui-fabric-react';

export interface IConfirmDialogProps {
  onConfirm: () => void;
  onDismiss: () => void;
}

export default class ConfirmDialog extends React.Component<IConfirmDialogProps, {}> {
  public render() {
    return (
      <Dialog
        dialogContentProps={{
          title: "Confirmation",
          subText: "You are about to remove the task. Continue?"
        }}
        hidden={false}
        onDismiss={this.props.onDismiss}
      >
        <DialogFooter>
          <PrimaryButton text="Yes" onClick={this.props.onConfirm} />
          <DefaultButton text="No" onClick={this.props.onDismiss} />
        </DialogFooter>
      </Dialog>
    );
  }
}
