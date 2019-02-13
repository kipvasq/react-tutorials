import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        {props.isAuthenticated
            ? <NavigationItem link="/orders">Orders</NavigationItem>
            : null}
        {!props.isAuthenticated 
            ? <NavigationItem link="/auth" exact>Login</NavigationItem>
            : <NavigationItem link="/logout" exact>Logout</NavigationItem>}
    </ul>
);

export default navigationItems;