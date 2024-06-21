import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Users from "views/admin/users/Users.js";
import Loans from "views/admin/loans/Loans.js";
import Books from "views/admin/books/Books.js";
import Authors from "views/admin/authors/Authors.js";

import BookForm from "views/admin/books/Form";
import AuthorForm from "views/admin/authors/Form";
import UserForm from "views/admin/users/Form";
import LoanForm from "views/admin/loans/Form";


class Admin extends React.Component {
  /*componentWillMount() {
    const user = this.getUser();

    if (!user) {
      window.location.href = '/login';
    }
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'))
  }*/

  render() {
    return (
      <>
        <Sidebar />
        <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar logedUser={/*this.getUser()*/null} />
          {/* Header */}
          <HeaderStats />
          <div className="px-4 md:px-10 mx-auto w-full -m-24">
            <Switch>
              <Route path="/users" exact component={Users} />
              <Route path="/authors" exact component={Authors} />
              <Route path="/books" exact component={Books} />
              <Route path="/loans" exact component={Loans} />

              <Route path="/authors/create" exact component={AuthorForm} />
              <Route path="/authors/edit/:id" exact component={AuthorForm} />

              <Route path="/books/create" exact component={BookForm} />
              <Route path="/books/edit/:id" exact component={BookForm} />

              <Route path="/users/create" exact component={UserForm} />
              <Route path="/users/edit/:id" exact component={UserForm} />

              <Route path="/loans/create" exact component={LoanForm} />
              <Route path="/loans/edit/:id" exact component={LoanForm} />

              <Redirect from="/" to="/users" />
            </Switch>
            <FooterAdmin />
          </div>
        </div>
      </>
    );
  }
}

export default Admin