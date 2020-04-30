import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Menu, Button, Message, Grid } from 'semantic-ui-react';

import '../styles/QuestionBoard.css';
import AuthProvider from '../AuthProvider';
import {
  fetchUnansweredQuestions,
  deleteQuestion,
  fetchQuestions,
} from '../actions';

import PhysicianLogin from './PhysicianLogin';
import AnswerForm from './AnswerForm';
import NavMenu from './NavLink';
import Footer from './Footer';

class PhysicianView extends Component {
  constructor(props) {
    super(props);
    this.state = { showUnanswered: true };
  }

  componentDidMount() {
    this.props.fetchUnansweredQuestions();
    this.props.fetchQuestions();
  }

  handleToggleView(showUnanswered) {
    this.setState({ showUnanswered });
  }

  render() {
    return !this.props.account ? (
      <PhysicianLogin onSignIn={this.props.onSignIn} />
    ) : (
      <>
        <NavMenu
          account={this.props.account}
          onSignOut={this.props.onSignOut}
        />
        <div className="physician-view-container">
          <Menu secondary style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="right menu" style={{ margin: '1rem 0' }}>
              <a
                href="https://ai-passion.appspot.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="active item"
              >
                Televideo
              </a>
            </div>
            <Menu.Menu position="right">
              {this.props.account && (
                <Menu.Item
                  active
                  name="logout"
                  onClick={this.props.onSignOut}
                />
              )}
            </Menu.Menu>
          </Menu>
          <div className="buttonGroupCustom">
            {this.props.account && (
              <Button.Group>
                <Button
                  basic
                  color="blue"
                  onClick={() => this.handleToggleView(true)}
                  active={this.state.showUnanswered}
                >
                  Unanswered Questions
                </Button>
                <Button
                  basic
                  color="green"
                  onClick={() => this.handleToggleView(false)}
                  active={!this.state.showUnanswered}
                >
                  Answered Questions
                </Button>
              </Button.Group>
            )}
          </div>
          <section className="container">
            {this.props.error && (
              <Message negative>
                <Message.Header>Sorry Something went wrong!</Message.Header>
                <p>{this.props.error}</p>
              </Message>
            )}
          </section>
          <section className="data" />
          <div>
            <Grid centered columns={2} stackable>
              <Grid.Column>
                {this.state.showUnanswered &&
                  this.props.account &&
                  this.props.unansweredQuestions &&
                  this.props.unansweredQuestions.map((q, idx) => (
                    <AnswerForm
                      history={this.props.history}
                      q={q}
                      idx={idx}
                      showUnanswered={this.state.showUnanswered}
                    />
                  ))}

                {!this.state.showUnanswered &&
                  this.props.account &&
                  this.props.questions &&
                  this.props.questions.map((q, idx) => (
                    <AnswerForm
                      history={this.props.history}
                      q={q}
                      idx={idx}
                      showUnanswered={this.state.showUnanswered}
                    />
                  ))}
              </Grid.Column>
            </Grid>
          </div>
          <Footer />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    unansweredQuestions: state.questionBoard.unansweredQuestions,
    questions: state.questionBoard.questions,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchUnansweredQuestions,
      deleteQuestion,
      fetchQuestions,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthProvider(PhysicianView));
