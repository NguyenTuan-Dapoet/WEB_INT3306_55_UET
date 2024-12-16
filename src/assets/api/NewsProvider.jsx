import React, { createContext, useState, useEffect } from 'react';

// Tạo context cho danh sách tin tức
const NewsContext = createContext();

function NewsProvider({ children }) {
  const [newList, setNewList] = useState([]);  // State lưu danh sách tin tức
  const [error, setError] = useState(null);    // State lưu lỗi

  // Hàm bất đồng bộ để lấy dữ liệu từ API
  const getNewList = async () => {
    try {
      const response = await fetch('http://localhost:8080/news/allPublishNews');
      
      // Kiểm tra xem phản hồi có thành công không
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // Chuyển dữ liệu thành JSON
      setNewList(data);  // Cập nhật danh sách tin tức vào state
    } catch (error) {
      console.error('Có lỗi khi lấy dữ liệu tin tức: ', error);
      setError('Không thể lấy dữ liệu bài báo từ server');  // Lưu thông báo lỗi
    }
  };

  // Gọi API khi component được render lần đầu tiên
  useEffect(() => {
    getNewList();
  }, []);

  // Trả về component Provider
  return (
    <NewsContext.Provider value={{ newList, error }}>
      {children}
    </NewsContext.Provider>
  );
}

export { NewsContext, NewsProvider };
