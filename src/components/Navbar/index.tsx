"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

import styled from "styled-components";

import { TiArrowSortedDown } from "react-icons/ti";
import { FaSearch } from "react-icons/fa";

import FlameImage from "@/images/Flame.svg";

import OpaqueBackground from "@/components/OpaqueBackground";
import Container from "@/components/Container";
import AuthPopup from "@/components/Navbar/AuthPopup";
import useOutsideClick from "@/hooks/useOutsideClick";
import Router, { useRouter } from "next/router";
import { HiOutlineLightBulb } from "react-icons/hi";
import useTheme from "@/hooks/useTheme";

interface NavbarProps {
  isIndex: boolean;
}

const Navbar = styled.nav<NavbarProps>`
  padding: ${({ isIndex }) => (isIndex ? `30px 0` : `15px 0`)};
  width: 100%;
  flex-shrink: 0;
  border-bottom: ${({ isIndex }) => (isIndex ? `0px` : `1.5px solid #dfdfdf`)};

  & > div {
    display: flex;
    justify-content: space-between;
  }

  & > div > div {
    margin: auto 15px;
  }

  & .search {
    width: 100%;
    max-width: 500px;

    form {
      width: 100%;
      background-color: #f0f0f0;
      border-radius: 5px;
      display: flex;
      align-items: center;

      input {
        width: 100%;
        background-color: #f0f0f0;
        font-weight: 500;
        color: #545454;
        font-size: 16px;
        padding: 6px 8px;
        border-radius: 5px;
      }

      input::placeholder {
        color: #afafaf;
      }

      button {
        display: flex;
        align-items: center;
        background-color: #ff9500;
        color: white;
        padding: 8px;
        border-radius: 5px;
      }
    }
  }

  & .logo {
    color: white;
    font-size: 25px;
    -webkit-filter: drop-shadow(2px 2px 0 white) drop-shadow(-2px 2px 0 white)
      drop-shadow(2px -2px 0 white) drop-shadow(-2px -2px 0 white);
    filter: drop-shadow(2px 2px 0 white) drop-shadow(-2px 2px 0 white)
      drop-shadow(2px -2px 0 white) drop-shadow(-2px -2px 0 white);
  }

  & .nav-list {
    display: flex;
    justify-items: center;
    gap: 30px;

    li {
      align-self: center;
      display: flex;
      align-items: center;
      gap: 8px;
      position: relative;
    }

    a,
    button,
    span {
      font-size: 15px;
      text-decoration: none;
      color: ${(props) => (props.isIndex ? "#f0f0f0" : "#707070")};
      font-weight: ${(props) => (props.isIndex ? "600" : "500")};
      background-color: #00000000;
      cursor: pointer;

      &:hover {
        color: ${(props) => (props.isIndex ? "#fff" : "#141414")};
      }
    }

    button.register {
      background: #ff9500;
      padding: 10px 20px;
      color: white;
      font-size: 17px;
      font-weight: 600;
      border: none;
      border-radius: 7px;
    }

    .profilePicture {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }

  .dropdown-menu {
    position: absolute;
    right: 0;
    height: auto;
    background: white;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    margin-top: 10px;

    button {
      font-size: 12px;
      padding: 7px 12px;
      color: #818181;
      white-space: nowrap;

      &:hover {
        color: #2a2a2a;
      }
    }
  }
`;

const Index = ({ isIndex = false }) => {
  const { data: session, status } = useSession();
  const { theme, SwitchTheme } = useTheme();

  const [popup, setPopup] = useState<string>("");

  const loading = status === "loading";

  const [dropdowns, setDropdowns] = useState<{ [key: string]: boolean }>({
    user: false,
  });

  const [dropdownRef] = useOutsideClick(() =>
    setDropdowns({ ...dropdowns, user: false })
  );

  const router = useRouter();

  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const { query } = router.query;

    setSearch(query as string);
  }, [router]);

  useEffect(() => {
    document.body.style.overflowY = popup !== "" ? "hidden" : "auto";
  }, [popup]);

  return (
    <>
      <OpaqueBackground opened={popup !== ""}>
        <AuthPopup
          ChangePopup={setPopup}
          popup={popup}
          onOutsideClick={() => setPopup("")}
        />
      </OpaqueBackground>
      <Navbar {...{ isIndex }}>
        <Container>
          <div className="logo">
            <Image
              width={40}
              height={40}
              src={FlameImage}
              alt="Torch-Image logo"
            />
          </div>
          {!isIndex && (
            <div className="search">
              <form
                onSubmit={(evt) => {
                  evt.preventDefault();
                  Router.push({
                    pathname: "/search",
                    query: { query: search },
                  });
                }}
              >
                <input
                  type="text"
                  placeholder="Search"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
                <button type="submit">
                  <FaSearch size={16} />
                </button>
              </form>
            </div>
          )}
          <div>
            <ul className="nav-list">
              <li>
                <Link href="/">Explore</Link>
              </li>
              <li>
                <HiOutlineLightBulb onClick={SwitchTheme} />
              </li>
              {!loading && !session ? (
                <>
                  <li>
                    <span onClick={() => setPopup("SignIn")}>Sign In</span>
                  </li>
                  <li>
                    <button
                      onClick={() => setPopup("SignUp")}
                      className="register"
                    >
                      Sign Up
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li
                    ref={dropdownRef}
                    onClick={() => setDropdowns({ ...dropdowns, user: true })}
                  >
                    <img
                      className="profilePicture"
                      referrerPolicy="no-referrer"
                      src={session?.user?.profilePicture || ""}
                      alt={session?.user?.username || " profile picture"}
                    />
                    <span>
                      {session?.user?.username} <TiArrowSortedDown />
                      {dropdowns["user"] && (
                        <div className="dropdown-menu">
                          <button onClick={() => signOut()} className="item">
                            Sign Out
                          </button>
                        </div>
                      )}
                    </span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default Index;
