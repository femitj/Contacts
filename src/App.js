/* eslint-disable */
import React, { Component } from "react";
import { Route } from "react-router-dom";
import ListContacts from "./ListContacts";
import CreateContact from "./CreateContact";
import * as ContactsApi from "./utils/ContactsAPI";

//let view;

//state = { data: "" };

class App extends Component {
  state = {
    data: "",
    contacts: [],
    screen: "list" // list, create
  };

  componentDidMount() {
    ContactsApi.getAll().then(contacts => {
      this.setState({ contacts });
    });

    const url = "https://randomuser.me/api/";
    const options = {
      method: "GET"
    };
    fetch(`${url}`, options)
      .then(res => res.json())
      .then(res => this.setState({ data: res.results[0].picture.thumbnail }));
  }

  removeContact = contact => {
    this.setState(state => ({
      contacts: state.contacts.filter(c => c.id !== contact.id)
    }));

    ContactsApi.remove(contact);
  };

  createContact = contact => {
    ContactsApi.create(contact).then(contact => {
      this.setState(state => ({
        contacts: state.contacts.concat([contact])
      }));
    });
  };

  // navigateToCreate = () => {
  //   this.setState({
  //     screen: "create"
  //   });
  // };

  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <ListContacts
              contacts={this.state.contacts}
              onDeleteContact={this.removeContact}
              pic={this.state.data}
              //onNavigate={this.navigateToCreate}
            />
          )}
        />
        <Route
          path="/create"
          render={({ history }) => (
            <CreateContact
              onCreateContact={contact => {
                this.createContact(contact);
                history.push("/");
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
