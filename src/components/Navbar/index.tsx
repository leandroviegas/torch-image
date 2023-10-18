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
import useUserGalley from "@/hooks/useUserGalley";

const Index = ({ isIndex = false }) => {
  const { data: session, status } = useSession();

  const { theme, SwitchTheme } = useTheme();

  const { popup, setPopup } = useAuth();

  const { userCollections } = useUserGalley();

  const loading = status === "loading";

  
  const [userDropdown, setUserDropdown] = useState<boolean>();
  const [collectionsDropdown, setCollectionsDropdown] = useState<boolean>();

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
              {(!loading && session?.user.id) && (
                <OutClick
                  onOutClick={() =>
                    setCollectionsDropdown(false)
                  }
                >
                  <li
                    onClick={() =>
                      setCollectionsDropdown(true)
                    }
                  >
                    <span>
                      Your collections <TiArrowSortedDown />
                      {collectionsDropdown && (
                        <div className="dropdown-menu">
                          {userCollections?.length !== 0 ? (
                            userCollections.map((collection) => (
                              <Link
                                href={`/collection/${collection.link}`}
                                key={collection.id}
                              >
                                <button className="item">
                                  {collection.name}
                                </button>
                              </Link>
                            ))
                          ) : (
                            <button className="empty">No collections</button>
                          )}
                        </div>
                      )}
                    </span>
                  </li>
                </OutClick>
              )}
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
                    onOutClick={() => {
                      setUserDropdown(false);
                    }}
                  >
                    <li
                      onClick={() => setUserDropdown(true)}
                    >
                      <img
                        className="profilePicture"
                        referrerPolicy="no-referrer"
                        src={session?.user?.profilePicture || ""}
                        alt={session?.user?.username || " profile picture"}
                      />
                      <span>
                        {session?.user?.username} <TiArrowSortedDown />
                        {userDropdown && (
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
