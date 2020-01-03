
import styled from 'styled-components';

export const AppLogo = styled.div`
  span:first-child {
    color: #115599;
  }
  .tag-text {
    margin: 0;
    padding: 0;
    font-size: 16px;
    color: #333;
    font-weight: normal;
    margin-top: 5px;
  }
`;

export const SignIn = styled.div`
  font-size:16px;
  font-weight:normal;
  @media (min-width: 980px) {
    text-align:right;
  }
  p {
    margin:0;
    padding:0;
    margin-bottom:2px;
  }
`;

export const AppHeader = styled.header`
  font-size: calc(10px + 3vmin);
  color: #333;
  font-size:32px;
  text-align: left;
  font-weight: bold;
  padding: 10px 10px 0 10px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  .top-menu {
    display: flex;
    justify-content: flex-end;
  }
 .nav-link {
    float:right;
    text-decoration: none;
    margin-right:30px;
    font-size:24px;
    line-height: 40px;
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
