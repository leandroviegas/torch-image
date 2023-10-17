"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

import useTheme from "@/hooks/useTheme";
import useAuth from "@/hooks/useAuth";

import { TiArrowSortedDown } from "react-icons/ti";
import { FaSearch } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";

import FlameImage from "@/images/Flame.svg";

import OpaqueBackground from "@/components/OpaqueBackground";
import Container from "@/components/Container";
import AuthPopup from "@/components/Navbar/AuthPopup";
import { Navbar, ThemeStyles } from "./styles";
import OutClick from "../OutClick";

const Index = ({ isIndex = false }) => {
  const { data: session, status } = useSession();

  const { theme, SwitchTheme } = useTheme();

  const { popup, setPopup } = useAuth();

  const loading = status === "loading";

  const [dropdowns, setDropdowns] = useState<{ [key: string]: boolean }>({
    user: false,
  });

  const router = useRouter();

  const { query } = router.query;

  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (query) setSearch(query as string);
  }, [query]);

  return (
    <>
      {popup !== "" && (
        <OpaqueBackground BackgroundClick={() => setPopup("")}>
          <AuthPopup />
        </OpaqueBackground>
      )}
      <Navbar
        className="animate__animated animate__bounceInDown"
        theme={ThemeStyles[theme]}
        {...{ isIndex }}
      >
        <Container>
          <div className="logo">
            <Link href="/">
              <Image
                width={40}
                height={40}
                src={FlameImage}
                alt="Torch-Image logo"
              />
            </Link>
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
                <HiOutlineLightBulb size={22} onClick={SwitchTheme} />
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
                  <OutClick
                    onOutClick={() =>
                      setDropdowns({ ...dropdowns, user: false })
                    }
                  >
                    <li
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
                  </OutClick>
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
