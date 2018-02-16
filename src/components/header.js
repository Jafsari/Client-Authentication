import React, { Component } from 'react';
import { connect } from 'react-redux';
import { link } from 'react-router';

class Header extends Component {
  renderLinks() {
    if (this.props.auth) {
      
      return <li className="nav-item">
        <Link className="nav-link" to="/signout">Sign Out</Link>
      </li>
    } else {
      
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/signin">Sign In</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>
      ];
    }
  }



  render(){
		return(
			<nav className= "navbar navbar-light">
      <Link to ="/" className="navbar-brand"> Redux auth </Link>
			<ul className = "nav navbar-nav">
				{this.renderLinks()}
				</ul>
				</nav>
			);
	}
}

function mapStateToProps(state){
  auth:state.auth.authenticated
}

export default connect(mapStatetoProps,null)(Header);