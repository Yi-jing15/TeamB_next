import styles from "../styles/shop.module.css";
import "@/public/TeamB_Icon/style.css";
import Card from "./components/card";
import Link from "next/link";
import Carousel from "./components/carousel";

export default function ShopPage() {
  return (
    <>
      <div className={styles.body}>
        <div className={styles.container}>
        {/* TODO: 麵包屑、商城bar */}
          {/* 搜尋欄 */}
          <div className={styles.search}>
            <span className={`icon-Search ${styles.iconSearch}`} />
          </div>

          <div className={styles.itemsSection}>
            <div className={styles.titleBg}>
              <div className={styles.title}>上衣</div>
            </div>
            <Carousel />
            <div className={styles.more}>
              <div>
                <Link href="../shop/top" style={{ textDecoration: "none" }}>
                  <div className={styles.textBox}>
                    <div className={styles.text}>查看更多</div>
                    <span className={`icon-Right ${styles.iconRight}`} />
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className={styles.itemsSection}>
            <div className={styles.titleBg}>
              <div className={styles.title}>褲類</div>
            </div>
            <Carousel />
            <div className={styles.more}>
              <div>
                <Link href="../shop/top" style={{ textDecoration: "none" }}>
                  <div className={styles.textBox}>
                    <div className={styles.text}>查看更多</div>
                    <span className={`icon-Right ${styles.iconRight}`} />
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className={styles.itemsSection}>
            <div className={styles.titleBg}>
              <div className={styles.title}>鞋類</div>
            </div>
            <Carousel />
            <div className={styles.more}>
              <div>
                <Link href="../shop/top" style={{ textDecoration: "none" }}>
                  <div className={styles.textBox}>
                    <div className={styles.text}>查看更多</div>
                    <span className={`icon-Right ${styles.iconRight}`} />
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className={styles.itemsSection}>
            <div className={styles.titleBg}>
              <div className={styles.title}>運動配件</div>
            </div>
            <Carousel />
            <div className={styles.more}>
              <div>
                <Link href="../shop/top" style={{ textDecoration: "none" }}>
                  <div className={styles.textBox}>
                    <div className={styles.text}>查看更多</div>
                    <span className={`icon-Right ${styles.iconRight}`} />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
