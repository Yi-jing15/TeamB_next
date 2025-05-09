import { useState, useEffect } from "react";
import styles from "@/styles/shop/ProductLikeButton.module.css"
import { TOGGLE_LIKE } from "@/config/shop-api-path";


export default function ProductLikeButton({ checked = false, productId, onClick }) {

  const [isLiked, setIsLiked] = useState(checked);

  // 當組件載入時，確認是否已經收藏過
  useEffect(() => {
    setIsLiked(checked); // 初始化收藏狀態
  }, [checked]);

  const toggleLike = async () => {
    const userData = localStorage.getItem("TEAM_B-auth");  // 從 localStorage 讀取用戶資料
    const parsedUser = JSON.parse(userData);  // 解析 JSON 字符串為對象
    const token = parsedUser?.token;  // 從解析出的對象中獲取 token

    if (!token) {
      alert("您尚未登入");
      return;  // 如果沒有 token，提示用戶先登入
    }

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,  // 使用提取出的 token
    };

    try {
      // 發送請求更新最愛狀態
      const res = await fetch(TOGGLE_LIKE, {
        method: "POST",
        credentials: "include",
        headers: headers,
        body: JSON.stringify({ productId }),
      });

      const data = await res.json();
      if (data.success) {
        setIsLiked(data.liked);  // 根據後端回傳的結果更新按鈕狀態

        if (onClick) {
          onClick(data.liked); // 告知父層最新狀態（紅色或灰色）
        }
      } else {
        console.error("喜歡/取消喜歡操作失敗", data);
      }
    } catch (error) {
      console.error("發送請求時出錯:", error);
    }
  };

  return (
    <span
      className={`icon-Heart-Fill ${isLiked ? styles.iconHeartFill : styles.iconLikeStroke}`}
      onClick={toggleLike}
    ></span>
  );
}
