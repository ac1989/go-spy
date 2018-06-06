import React, { Component } from 'react';
import { connect } from 'react-redux';
import { killToast } from '../../actions';
import { Container } from './index.css';

export class Toast extends Component {
  timerAutoHide = null;

  setAutoHideTimer(autoHideDuration = null) {
    clearTimeout(this.timerAutoHide);
    console.log(this.props.autoHideDuration);
    this.timerAutoHide = setTimeout(() => {
      this.props.killToast();
    }, this.props.autoHideDuration);
  }

  componentDidMount() {
    if (this.props.toast.show) {
      this.setAutoHideTimer();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.toast.show !== this.props.toast.show) {
      if (this.props.toast.show) {
        this.setAutoHideTimer();
      } else {
        clearTimeout(this.timerAutoHide);
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timerAutoHide);
  }

  render() {
    const { show, message } = this.props.toast;
    return <Container show={show}>{message}</Container>;
  }
}

export default connect(({ toast }) => ({ toast }), { killToast })(Toast);
