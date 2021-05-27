import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Image
import pokeball from "../images/pokeball-png-45330.png";


const ErrorPage = () => {
  return (
    <WrapError className="section-error">
      <div className="wrap-container">
        <div className="container-error">
          <div className="container-error-item1">
            <span className="number">4</span>
            <span>
              <img src={pokeball} className="pokeball" alt="pokeball" />
            </span>
            <span className="number">4</span>
          </div>
          <div className="container-error-item2">
            <h3 className="thicker">Uh-oh!</h3>
            <p>You look lost on your journey</p>
          </div>
          <div className="container-error-item3">
            <Link to="/">
              <span>Go Back Home</span>
            </Link>
          </div>
        </div>
      </div>
    </WrapError>
  );
};

const WrapError = styled.section`
  text-align: center;
  .container-error {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .container-error-item1 {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 270px;
    span:nth-child(2) {
      margin: 0 5px;
    }
    .number {
      font-size: 16rem;
      font-weight: bold;
      color: antiquewhite;
    }
    .pokeball {
      width: 15rem;
      height: 15rem;
    }
  }
  .container-error-item2 {
    h3 {
      font-size: 2.75rem;
      letter-spacing: 2px;
    }
    p {
      font-size: 1.5rem;
      letter-spacing: 0.5px;
    }
  }
  .container-error-item3 {
    margin-top: 30px;
    a {
      text-decoration: none;
      color: #fff;
      border: 2px solid #436a96;
      border-radius: 50px;
      padding: 10px 30px;
      transition: 0.3s;
      &:hover {
        background: #000;
      }
      span {
        font-size: 1.3rem;
        letter-spacing: 1px;
      }
    }
  }

  @media (max-width: 576px) {
    .container-error-item1 {
      height: 45vw;
      .number {
        font-size: 35vw;
      }
      .pokeball {
        width: 30vw;
        height: 30vw;
      }
    }
    .container-error-item2 {
      h3 {
        font-size: 8vw;
      }
      p {
        font-size: 5vw;
      }
    }
    .container-error-item3 {
      margin-top: 7vw;
      a {
        padding: 2vw 5vw;
      }
      span {
        font-size: 5vw;
      }
    }
  }
`;

export default ErrorPage;
