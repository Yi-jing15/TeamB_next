"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "@/styles/Header.module.css";
import Navbar from "./Navbar"; // 引入 Navbar 組件
import Link from "next/link";
import Image from "next/image";
import Logo from "../public/src/assets/iconLogo.png";
import { useAuth } from "../context/auth-context"; // 引入 useAuth
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";  // 引入 react-toastify
import "react-toastify/dist/ReactToastify.css";  // 引入 CSS
import NotificationBell from "../components/NotificationBell";
import { useCart } from "@/hooks/use-cart";

const Header = React.forwardRef((_, ref) => {
  const { auth, logout } = useAuth();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const searchRef = useRef(null);
  const router = useRouter();
  const { totalQty } = useCart(); // 取得購物車的總數量

  // 登出處理
  const handleLogout = () => {
    // 紀錄當前頁面 URL
    localStorage.setItem("lastPageBeforeLogout", router.asPath);

    // 清除通知顯示狀態
    localStorage.removeItem("notificationVisibility");

    // 執行登出
    logout();

    // 顯示登出提示
    toast("會員已登出",{
      position: "top-center",
      autoClose: 2000,   
      hideProgressBar: true,
    });
  };

  // 🔹 點擊外部時關閉搜尋框
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 🔹 滾動時隱藏 Header 並關閉 Navbar
  useEffect(() => {
    let prevScroll = window.scrollY;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const header = document.querySelector(`.${styles.navbarHd}`);

      if (scrollY > 30) {
        header.classList.add(styles.scrolled);
      } else {
        header.classList.remove(styles.scrolled);
      }

      if (scrollY > prevScroll && scrollY > 100) {
        header.classList.add(styles.hideHeader);
        setIsHidden(true);
      } else {
        header.classList.remove(styles.hideHeader);
        setIsHidden(false);
      }

      // 🔹 滾動時即刻關閉 Navbar
      setIsNavbarOpen(false);

      prevScroll = scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        ref={ref}
        className={`${styles.navbarHd} ${isHidden ? styles.hideHeader : ""} navbar-hd `}
      >
        <div className={styles.navbarContent}>
          {/* Logo */}
          <div className={styles.logoContainer}>
            <Link href="/">
              <Image
                src={Logo}
                alt="TeamB Logo"
                priority
                width={160}
                height={45}
              />
            </Link>
          </div>

          <div
            className={`${styles.navbarActions} ${
              isSearchOpen ? styles.searching : ""
            }`}
          >
            <div className={styles.actionsContainer}>
              {/* 搜尋、購物車、登入按鈕 */}
              <div className={styles.navbarActions}>
                {/* 搜尋按鈕 */}
                <div
                  className={styles.searchToggle}
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                  <span className={`icon-Search ${styles.iconSearch}`}></span>
                </div>

                {/* 🔹 搜尋欄 (點擊放大鏡才顯示) */}
                <div
                  ref={searchRef}
                  className={`${styles.searchContainer} ${
                    isSearchOpen ? styles.active : ""
                  }`}
                >
                  <input
                    type="text"
                    placeholder="搜尋關鍵字"
                    className={styles.searchInput}
                  />
                </div>

                <div className={styles.iconCartArea}>
                  <span 
                    className={`icon-Cart ${styles.iconCart}`}
                    onClick={() => {
                      if (auth.token) {
                        router.push("/cart");
                      } else {
                        router.push("/auth/login");
                      }
                    }}
                    style={{ cursor: "pointer" }}
                  ></span>
                  {/* 只有在已登入時才顯示數量，否則顯示空 */}
                  {auth.token && <span className={styles.iconCartNum}>{totalQty}</span>}
                </div>
                
                <span
                  className={`icon-User ${styles.iconUser}`}
                  onClick={() => {
                    if (auth.token) {
                      router.push("/auth/member");
                    } else {
                      router.push("/auth/login");
                    }
                  }}
                  style={{ cursor: "pointer" }}
                ></span>

                {auth.id !== 0 ? (
                  <button
                    className={styles.quickActionBtn}
                    onClick={handleLogout}
                  >
                    登出
                  </button>
                ) : (
                  <button
                    className={styles.quickActionBtn}
                    onClick={() => (window.location.href = "/auth/login")}
                  >
                    登入
                  </button>
                )}

                <a href="/activity-create">
                  <button className={styles.quickActionBtn}>快速開團</button>
                </a>

                {/* 鈴鐺通知 */}
                <NotificationBell token={auth.token} />
              </div>

              {/* Navbar 開關按鈕 */}
              <div className={styles.navbarToggle}>
                <button
                  className={styles.toggleBtn}
                  onClick={() => setIsNavbarOpen((prev) => !prev)}
                  aria-expanded={isNavbarOpen}
                >
                  <span
                    className={isNavbarOpen ? "icon-Dropup" : "icon-Dropdown"}
                  ></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navbar 組件 (傳入狀態控制) */}
      <Navbar isOpen={isNavbarOpen} setIsOpen={setIsNavbarOpen} />
    </>
  );
});

export default Header;
