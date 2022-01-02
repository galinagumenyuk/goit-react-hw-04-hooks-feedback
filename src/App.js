import React, { Component } from "react";
import "./App.css";
import FeedbackOptions from "./components/FeedbackOptions";
import Statistic from "./components/Statistics";
import Notification from "./components/Notification";
import PropTypes from "prop-types";

class App extends Component {
  static propTypes = {
    good: PropTypes.number,
    neutral: PropTypes.number,
    bad: PropTypes.number,
    countTotalFeedback: PropTypes.number,
    countPositiveFeedbackPercentage: PropTypes.number,
    onIncrement: PropTypes.func,
  };

  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleIncrement = (button) => {
    this.setState((prevState) => ({
      [button.target.id]: prevState[button.target.id] + 1,
    }));
  };

  render() {
    const countTotalFeedback = Object.keys(this.state).reduce(
      (acc, key) => acc + parseFloat(this.state[key] || 0),
      0
    );
    const countPositiveFeedbackPercentage =
      (this.state.good * 100) / countTotalFeedback;
    return (
      <div className="container">
        <h1>Please leave feedback</h1>
        <FeedbackOptions
          onLeaveFeedback={this.handleIncrement}
          state={this.state}
        />
        <h2>Statistics</h2>
        {countTotalFeedback > 0 ? (
          <Statistic
            good={this.state.good}
            neutral={this.state.neutral}
            bad={this.state.bad}
            countTotalFeedback={countTotalFeedback}
            countPositiveFeedbackPercentage={countPositiveFeedbackPercentage}
          />
        ) : (
          <Notification />
        )}
      </div>
    );
  }
}

export default App;
