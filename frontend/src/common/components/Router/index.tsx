import React from 'react';
import {
  BrowserRouter,
  BrowserRouterProps,
  Switch,
  SwitchProps,
  Route,
  RouteProps,
  NavLink,
  NavLinkProps,
  Redirect,
  RedirectProps
} from 'react-router-dom';


export const BrowserRouterWrapper: React.FC<BrowserRouterProps> = props => {
  return (
    <BrowserRouter {...props}>
      {props.children}
    </BrowserRouter>
  )
}

export const SwitchWrapper: React.FC<SwitchProps> = props => {
  return (
    <Switch {...props}>
      {props.children}
    </Switch>
  );
}

export const RouteWrapper: React.FC<RouteProps> = props => {
  return (
    <Route {...props}>
      {props.children}
    </Route>
  );
}

export const RedirectWrapper: React.FC<RedirectProps> = props => {
  return (
    <Redirect {...props}>
      {props.children}
    </Redirect>
  );
}


interface LinkWrapperProps extends NavLinkProps {
  handleActiveLink: () => void;
}

export const LinkWrapper: React.FC<LinkWrapperProps> = props => {

  return (
    <NavLink 
    isActive={(_, location) => {
      if(location.pathname !== props.to){
        return false
      }
      props.handleActiveLink();
      return true
    }}
    {...props} >
      {props.children}
    </NavLink>
  );
}