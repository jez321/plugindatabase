
import styled from 'styled-components';

export const AppLogo = styled.div`
  span:first-child {
    color: #115599;
  }
  .tag-text {
    margin: 0;
    padding: 0;
    color: #333;
    font-weight: normal;
    margin-top: 0.3125rem;
    font-size: 1rem;
  }
`;

export const SignIn = styled.div`
  font-weight:normal;
  font-size: 1rem;
  @media (min-width: 980px) {
    text-align:right;
  }
  p {
    margin:0;
    padding:0;
    margin-bottom: 0.125rem;
  }
`;

export const AppHeader = styled.header`
  font-size: calc(0.625rem + 3vmin);
  color: #333;
  font-size: 2rem;
  text-align: left;
  font-weight: bold;
  padding: 0.625rem 0.625rem 0 0.625rem;
  margin-bottom: 0.625rem;
  display: flex;
  justify-content: space-between;
  .top-menu {
    display: flex;
    justify-content: flex-end;
  }
 .nav-link {
    float:right;
    text-decoration: none;
    margin-right: 1.875rem;
    font-size: 1.5rem;
    line-height: 2.5rem;
    color: #999;
  }
  .nav-link:visited {
    color: #999;
  }
  .nav-link:hover {
    color: #777;
  }
  .nav-link-active {
    color: #333;
  }
  .nav-link-active:visited {
    color: #333;
  }
`;
